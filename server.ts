import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

// Load env variables
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export const app = express();
app.use(express.json());

  // ------------------------------------------------------------------
  // 1. API: HEALTH & PREFERENCES
  // ------------------------------------------------------------------
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // ------------------------------------------------------------------
  // 1b. GOOGLE OAUTH ENDPOINTS FOR SECURE SIGN-IN WITH GMAIL SUPPORT
  // ------------------------------------------------------------------
  app.get('/api/auth/url', (req: Request, res: Response) => {
    const redirectUri = (req.query.redirectUri as string) || `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback`;
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.CLIENT_ID;
    
    if (!clientId) {
      return res.status(500).json({ error: 'Google Client ID is not configured in the server environment.' });
    }

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send',
      access_type: 'offline',
      prompt: 'consent'
    }).toString();

    res.json({ url: oauthUrl });
  });

  app.get(['/auth/callback', '/auth/callback/'], async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send('Authorization code is missing.');
    }

    try {
      const clientId = process.env.GOOGLE_CLIENT_ID || process.env.CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.CLIENT_SECRET;
      const redirectUri = `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback`;

      if (!clientId || !clientSecret) {
        throw new Error('Google OAuth credentials are not fully configured in the server environment.');
      }

      // Exchange authorization code for access tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code as string,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }).toString(),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        throw new Error(`Token exchange failed: ${errorText}`);
      }

      const tokens = await tokenResponse.json() as { access_token: string };

      // Retrieve user info from standard Google userinfo endpoint
      const userinfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      if (!userinfoResponse.ok) {
        throw new Error('Failed to retrieve traveler details from Google Profile.');
      }

      const googleUser = await userinfoResponse.json() as {
        id: string;
        email: string;
        name: string;
        picture?: string;
      };

      // Direct parent postMessage script bypasses iframe restrictions safely
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Personalization Connected</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; padding: 48px 24px; background-color: #f8fafc; color: #0f172a; margin: 0; }
              .card { max-width: 420px; margin: 0 auto; background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05); border: 1px solid #e2e8f0; }
              .spinner { border: 4px solid #e2e8f0; width: 40px; height: 40px; border-radius: 50%; border-top-color: #f59e0b; animation: spin 0.8s linear infinite; margin: 24px auto; }
              h2 { font-size: 20px; font-weight: 700; margin: 0 0 8px 0; color: #1e293b; }
              p { font-size: 14px; text-align: center; color: #64748b; line-height: 1.5; margin: 0; }
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="spinner"></div>
              <h2>Connection Successful!</h2>
              <p>We are securing your digital traveler profile. This secure popup window will auto-close immediately...</p>
            </div>
            <script>
              try {
                const profileObj = ${JSON.stringify(googleUser)};
                const tokenVal = ${JSON.stringify(tokens.access_token)};
                if (window.opener) {
                  window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', profile: profileObj, accessToken: tokenVal }, '*');
                  window.close();
                } else {
                  window.location.href = '/';
                }
              } catch (err) {
                console.error("Popup communication error:", err);
                document.querySelector('p').innerText = "An interface issue occurred. Please close this window manually.";
              }
            </script>
          </body>
        </html>
      `);

    } catch (error: any) {
      console.error('OAuth Callback Exception:', error);
      res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Google Connect Mismatch</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; padding: 48px 24px; background-color: #fff1f2; color: #991b1b; }
              .card { max-width: 420px; margin: 0 auto; background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 12px rgba(153, 27, 27, 0.08); border: 1px solid #fecdd3; }
              h2 { font-size: 20px; font-weight: 700; margin: 0 0 12px 0; }
              p { font-size: 14px; margin: 0 0 24px 0; line-height: 1.5; color: #b91c1c; }
              button { background: #dc2626; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.2s; }
              button:hover { background: #b91c1c; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>Setup Failed</h2>
              <p>${error.message || 'An authentication exchange error was encountered. Ensure env secrets are configured.'}</p>
              <button onclick="window.close()">Close Window</button>
            </div>
          </body>
        </html>
      `);
    }
  });

  // ------------------------------------------------------------------
  // 1c. GMAIL SECURE PROXY ENDPOINTS (LIST / SEND / EXTRACT)
  // ------------------------------------------------------------------
  app.get('/api/gmail/list', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'OAuth context token is missing.' });
    }
    const token = authHeader.split(' ')[1];

    try {
      // Query travel-related documents and confirmations
      const searchQuery = 'subject:(flight OR booking OR hotel OR travel OR itinerary OR ticket OR reservation)';
      const listRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(searchQuery)}&maxResults=8`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!listRes.ok) {
        throw new Error('Failed to query Google Gmail list: ' + await listRes.text());
      }

      const listData = (await listRes.json()) as { messages?: { id: string }[] };
      const messages = listData.messages || [];

      // Resolve details in parallel
      const resolvedEmails = await Promise.all(
        messages.map(async (msg: { id: string }) => {
          try {
            const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (!detailRes.ok) return null;
            const detail = await detailRes.json() as any;

            const headers = detail.payload?.headers || [];
            const getHeader = (name: string) => headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

            return {
              id: msg.id,
              threadId: detail.threadId,
              snippet: detail.snippet || '',
              subject: getHeader('subject') || 'No Subject',
              from: getHeader('from') || 'Sender Unknown',
              date: getHeader('date') || 'Time Unknown',
              body: detail.snippet || '',
            };
          } catch {
            return null;
          }
        })
      );

      res.json({ emails: resolvedEmails.filter(Boolean) });
    } catch (err: any) {
      console.error('List Gmail Error:', err);
      res.status(500).json({ error: err.message || 'Error occurred querying Gmail.' });
    }
  });

  app.post('/api/gmail/send', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'OAuth context token is missing.' });
    }
    const token = authHeader.split(' ')[1];
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({ error: 'Missing recipient (to), subject, or message body.' });
    }

    try {
      const emailParts = [
        `To: ${to}`,
        `Subject: ${subject}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        '',
        body
      ];
      const rawEmail = emailParts.join('\r\n');
      const base64UrlEmail = Buffer.from(rawEmail)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const sendRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw: base64UrlEmail })
      });

      if (!sendRes.ok) {
        throw new Error('Google Gmail sending error: ' + await sendRes.text());
      }

      res.json({ success: true, message: 'Your itinerary was successfully emailed via Gmail!' });
    } catch (err: any) {
      console.error('Gmail Send Error:', err);
      res.status(500).json({ error: err.message || 'Failed to send itinerary email.' });
    }
  });

  app.post('/api/gmail/parse', async (req: Request, res: Response) => {
    const { subject, snippet } = req.body;
    if (!subject || !snippet) {
      return res.status(400).json({ error: 'Missing subject or details snippet for extraction.' });
    }

    try {
      const prompt = `You are an expert travel detail extractor. Analyze the following subject line and email snippet for a travel booking, reservation, flight or hotel, and output a valid JSON containing a single structured travel plan activity block.

Email Subject: "${subject}"
Email Booking Details: "${snippet}"

Output MUST strictly follow this TypeScript structure:
{
  "id": "random-slug-string",
  "title": "Clean concise title (e.g. Flight 6E-243 to Chennai or Stay Check-in at Highland)",
  "time": "Estimated local time, e.g., '10:00 AM' or '02:00 PM'",
  "duration": "Duration e.g., '3.5 hours', '2 hours' or 'Overnight'",
  "cost": 2500, // estimated cost in number (digits only, or standard typical default)
  "location": "Concise localized spot, e.g. 'Chennai Airport' or 'Ooty Hills'",
  "rating": 4.8,
  "reviewCount": 150,
  "category": "Transport" | "Stay" | "Sightseeing" | "Dining",
  "description": "Short description of the booking. Mention flight code, booking confirmation number or check-in rules if visible. Max 140 chars."
}

Respond ONLY with valid, parsable JSON. Do not write markdown, backticks, comments, or any extra text.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          temperature: 0.1,
        }
      });

      const text = response.text || '';
      const cleaned = text.trim().replace(/^```json/i, '').replace(/```$/i, '').trim();
      const extractedActivity = JSON.parse(cleaned);

      res.json({ success: true, activity: extractedActivity });
    } catch (err: any) {
      console.error('Gemini Extraction Error:', err);
      res.status(500).json({ error: err.message || 'Gemini detail parsing failed.' });
    }
  });

  // ------------------------------------------------------------------
  // 2. API: CHATBOT - PERSONAL TRAVEL EXPERT
  // ------------------------------------------------------------------
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { userProfile, chatHistory, userMessage, currentDestinationId, currentDestinationName } = req.body;

      // Build robust system prompt
      const systemInstruction = `You are a highly professional, friendly, multilingual, and intelligent AI Travel Expert & Currency Guide.
You offer enterprise-grade tourist support combining the capabilities of Google Maps, Booking.com, TripAdvisor, and Google Translate.

User Profiling Context:
- Name: ${userProfile?.name || 'Traveler'}
- Home Country: ${userProfile?.country || 'Not specified'}
- Preferred Language: ${userProfile?.preferredLanguage || 'English'}
- Travel Interests: ${(userProfile?.travelInterests || []).join(', ') || 'General sightseeing'}
- Budget Level: ${userProfile?.budgetRange || 'Mid-range'}
${currentDestinationName ? `- Current Context: Looking at ${currentDestinationName}` : ''}

Always:
1. Speak in their preferred language (${userProfile?.preferredLanguage || 'English'}). Be personable, warm, and highly professional.
2. Formulate helpful answers, offering direct travel advice, nearby hotel/restaurant options, safety advisories, and estimated expenses.
3. Suggest 2-3 specific follow-up prompt buttons they can click next. Return them as a JSON field at the end of your response, or separate them clearly if text.
4. Keep answers clean, beautifully formatted in Markdown, utilizing spacing, bullets, and bold titles. Avoid logs, system jargon, or code details.
5. If they mention emergency or high danger, immediately provide nearby hospitals, police contacts, and advice first!`;

      // Formulate simple message contents
      const formattedHistory = (chatHistory || []).map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Append current user message
      formattedHistory.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      // Query content
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedHistory.map((h: any) => h.parts[0].text).join('\n\n'), // convert format down for simple text generateContent
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || 'I apologize, something made me lose train of thought. Please check your network and ask again!';

      // Try generating a few quick suggested follow-up prompts using a light helper prompt in a secondary step or extract intelligently
      // To keep it fast, let's create a standard set of suggested follow up prompts if not parsed, or use regex.
      // We will parse standard suggestions or append them
      const items = [
        `What are the best local foods here?`,
        `How much would it cost to travel there?`,
        `What are the emergency numbers for this spot?`
      ];

      res.json({
        text: responseText,
        suggestedPrompts: items
      });

    } catch (error: any) {
      console.error('Chat API Error:', error);
      res.status(500).json({ error: error.message || 'Error occurred in Gemini chat communication' });
    }
  });

  // ------------------------------------------------------------------
  // 3. API: DYNAMIC TRAVEL ITINERARY GENERATOR
  // ------------------------------------------------------------------
  app.post('/api/generate-itinerary', async (req: Request, res: Response) => {
    try {
      const { destinationName, days, budget, interests, familySize, weatherContext } = req.body;

      const duration = Number(days) || 3;
      const targetBudget = budget || 'Mid-range';
      const userInterests = interests || ['Adventure', 'Sightseeing'];
      const size = Number(familySize) || 1;

      const prompt = `Create a highly professional, detailed, and realistic custom travel itinerary for:
- Destination: ${destinationName}
- Duration: ${duration} Days
- Budget Category: ${targetBudget}
- Interests of traveler: ${userInterests.join(', ')}
- Group size: ${size} people
- Weather current forecast: ${weatherContext || 'Pleasant'}

Make all expenses matched to the budget currency (INR ₹). Generate realistic, beautiful daily schedules, meals, estimated costs, hotel selection, specific travel tips, and transport guidelines suitable for this family size of ${size}.`;

      // Set up response schema to parse perfectly
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              destination: { type: Type.STRING },
              durationDays: { type: Type.INTEGER },
              familySize: { type: Type.INTEGER },
              interests: { type: Type.ARRAY, items: { type: Type.STRING } },
              budgetLevel: { type: Type.STRING },
              overallCost: { type: Type.INTEGER, description: 'Estimated overall cost in INR for the total trip duration for all group members' },
              hotelSuggestion: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  rating: { type: Type.NUMBER },
                  pricePerNight: { type: Type.INTEGER, description: 'Price in INR per night' },
                  amenities: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['name', 'rating', 'pricePerNight', 'amenities']
              },
              transportation: { type: Type.STRING, description: 'Best transport recommendation (e.g. rent car, local auto, cabs, metro)' },
              foodTips: { type: Type.ARRAY, items: { type: Type.STRING } },
              weatherWarning: { type: Type.STRING },
              dailySchedule: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    theme: { type: Type.STRING, description: 'Direct theme/title for this day' },
                    estimatedCost: { type: Type.INTEGER, description: 'Cost in INR for activities/food this day' },
                    meals: {
                      type: Type.OBJECT,
                      properties: {
                        breakfast: { type: Type.STRING },
                        lunch: { type: Type.STRING },
                        dinner: { type: Type.STRING }
                      },
                      required: ['breakfast', 'lunch', 'dinner']
                    },
                    activities: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          time: { type: Type.STRING, description: 'e.g. 09:00 AM' },
                          description: { type: Type.STRING, description: 'What to visit, detailed description' },
                          cost: { type: Type.INTEGER, description: 'Cost in INR (0 if free)' }
                        },
                        required: ['time', 'description', 'cost']
                      }
                    }
                  },
                  required: ['day', 'theme', 'estimatedCost', 'meals', 'activities']
                }
              }
            },
            required: ['id', 'destination', 'durationDays', 'familySize', 'interests', 'budgetLevel', 'overallCost', 'hotelSuggestion', 'transportation', 'foodTips', 'dailySchedule']
          }
        }
      });

      const parsedJSON = JSON.parse(response.text || '{}');
      res.json(parsedJSON);

    } catch (error: any) {
      console.error('Itinerary Generation Error:', error);
      res.status(500).json({ error: error.message || 'Error occurred generating the custom itinerary' });
    }
  });

  // ------------------------------------------------------------------
  // 4. API: LIVE TRANSLATION & TEXT-TO-SPEECH
  // ------------------------------------------------------------------
  app.post('/api/translate', async (req: Request, res: Response) => {
    try {
      const { text, from, to } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Text to translate is missing' });
      }

      const prompt = `Act as an expert travel translator.
Translate the following traveler text from "${from || 'Auto-detect'}" to "${to || 'Tamil'}".
Text to translate:
"${text}"

Provide the translation in the target language. Also provide a phonetics/pronunciation guide in English inside parenthesis if the target language is non-English.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              translatedText: { type: Type.STRING, description: 'The translated string' },
              phonetics: { type: Type.STRING, description: 'Phonetic phonetic spelling or pronunciation guide in English, e.g. "Ariga-ulla maruthu-vamanai engaye?"' },
              culturalNote: { type: Type.STRING, description: 'Brief advice on how to say it politely in local culture' }
            },
            required: ['translatedText', 'phonetics']
          }
        }
      });

      const parsedJSON = JSON.parse(response.text || '{}');
      res.json(parsedJSON);

    } catch (error: any) {
      console.error('Translation Error:', error);
      res.status(500).json({ error: error.message || 'Translation failed' });
    }
  });

  // ------------------------------------------------------------------
  // 5. API: TEXT-TO-SPEECH VOICE GENERATION (GEMINI TTS)
  // ------------------------------------------------------------------
  app.post('/api/tts', async (req: Request, res: Response) => {
    try {
      const { text, voiceName } = req.body;
      const selectedVoice = voiceName || 'Zephyr'; // Zephyr, Charon, Kore, Fenrir, Puck

      if (!text) {
        return res.status(400).json({ error: 'Text is required for TTS' });
      }

      // We call the model specified in the skill
      // "gemini-3.1-flash-tts-preview"
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [{ parts: [{ text: `Say clearly and politely: ${text}` }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        res.json({ audio: base64Audio });
      } else {
        res.status(500).json({ error: 'Failed to generate audio stream from Gemini TTS' });
      }

    } catch (error: any) {
      console.error('TTS API Error:', error);
      res.status(500).json({ error: error.message || 'TTS generation failed' });
    }
  });

  // ------------------------------------------------------------------
  // 6. API: CURRENCY RATE SERVICE WITH TREND SUMMARIES
  // ------------------------------------------------------------------
  app.post('/api/exchange-rates', async (req: Request, res: Response) => {
    try {
      const { amount, from, to } = req.body;

      // Real conversion reference based on mid-2026 standard average rates relative to INR
      // 1 Unit of Currency = X INR
      const inrRates: Record<string, number> = {
        INR: 1,
        USD: 83.6,
        EUR: 90.2,
        GBP: 105.8,
        AED: 22.75,
        SGD: 62.15,
        JPY: 0.531, // 1 JPY = 0.53 INR
        AUD: 55.4,
        CAD: 61.2,
        CNY: 11.5
      };

      const fromAmount = Number(amount) || 1;
      const fromCurr = (from || 'USD').toUpperCase();
      const toCurr = (to || 'INR').toUpperCase();

      const valInINR = fromAmount * (inrRates[fromCurr] || 1);
      const convertedVal = valInINR / (inrRates[toCurr] || 1);

      // Simple rate formula calculation
      const forwardRate = (inrRates[fromCurr] || 1) / (inrRates[toCurr] || 1);

      // Now query Gemini for a stunning trend summary of this currency pair
      const prompt = `Give a concise 2-sentence expert currency summary on the recent trend of ${fromCurr} to ${toCurr}. Why are rates hovering around ${forwardRate.toFixed(4)}? Specify standard tourist currency tips in a brief manner.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          temperature: 0.6,
        }
      });

      res.json({
        fromCurrency: fromCurr,
        toCurrency: toCurr,
        amount: fromAmount,
        convertedAmount: parseFloat(convertedVal.toFixed(2)),
        exchangeRate: parseFloat(forwardRate.toFixed(4)),
        trendSummary: response.text || 'Exchange rates are stable with typical holiday season seasonal travel variations.'
      });

    } catch (error: any) {
      console.error('Exchange rates API Error:', error);
      res.status(500).json({ error: error.message || 'Exchange calculation failed' });
    }
  });

  // ------------------------------------------------------------------
  // 7. PUBLIC FRONTEND STATIC & MIDDLEWARE
  // ------------------------------------------------------------------
  async function init() {
    if (isProd) {
      // Serve static files in production
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else if (!process.env.VERCEL) {
      // Configure Vite in middleware mode
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }

    // Error Handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error('Server error:', err);
      res.status(500).send('Internal Server Error: ' + err.message);
    });

    if (!process.env.VERCEL) {
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server launched successfully at http://localhost:${PORT}`);
      });
    }
  }

  init().catch((err) => {
    console.error('Fatal initialization error:', err);
  });
