import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Calendar,
  Hotel as HotelIcon,
  Utensils,
  Coins,
  Languages,
  CreditCard,
  AlertTriangle,
  PhoneCall,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Search,
  Settings,
  User,
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle,
  MapPin,
  Sun,
  Cloud,
  Wind,
  Droplets,
  Plus,
  Trash2,
  Send,
  Sparkles,
  RefreshCw,
  Clock,
  Briefcase,
  AlertOctagon,
  Languages as LangIcon,
  Check,
  Mail,
  Inbox,
  LogOut
} from 'lucide-react';

import { TAMIL_NADU_DESTINATIONS, INDIA_DESTINATIONS, getDestinationDetails, OTHER_INDIA_DESTINATIONS_DATA } from './destinationsData';
import { TravellerProfile, DayPlan, TravelItinerary, Destination, Hotel, Restaurant, ExpenseItem, ChatMessage } from './types';
import { auth, db, googleProvider, signInWithPopup, signOut, doc, getDoc, setDoc } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  // ------------------------------------------------------------------
  // 1. STATE INITIALIZATION
  // ------------------------------------------------------------------
  
  // User Authentication States
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [guestMode, setGuestMode] = useState<boolean>(() => {
    return localStorage.getItem('ai_tourism_guest_mode') === 'true';
  });

  // Profile settings state
  const [profile, setProfile] = useState<TravellerProfile | null>(null);

  // Profile Form states (Intermediate state during setup)
  const [formName, setFormName] = useState('');
  const [formCountry, setFormCountry] = useState('United States');
  const [formLang, setFormLang] = useState('English');
  const [formInterests, setFormInterests] = useState<string[]>(['Sightseeing', 'Spiritual']);
  const [formBudget, setFormBudget] = useState<'Budget' | 'Mid-Range' | 'Luxury' | 'Family'>('Mid-Range');
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Layout tabs
  const [selectedTab, setSelectedTab] = useState<'discovery' | 'planner' | 'hotels' | 'dining' | 'currency' | 'translator' | 'expenses' | 'emergency'>('discovery');

  // Discovery mode carousel state
  const [discoveryCategory, setDiscoveryCategory] = useState<'Tamil Nadu' | 'India'>('Tamil Nadu');
  const [tnIndex, setTnIndex] = useState(0);
  const [indiaIndex, setIndiaIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDestination, setCurrentDestination] = useState<Destination>(TAMIL_NADU_DESTINATIONS[0]);

  // Travel planner states
  const [planDestination, setPlanDestination] = useState('Ooty');
  const [planDays, setPlanDays] = useState<'1' | '3' | '5' | '7'>('3');
  const [planningMode, setPlanningMode] = useState<boolean>(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<TravelItinerary | null>(null);

  // Currency Converter states
  const [convAmount, setConvAmount] = useState<number>(5000);
  const [convFrom, setConvFrom] = useState<string>('INR');
  const [convTo, setConvTo] = useState<string>('USD');
  const [currResult, setCurrResult] = useState<{
    convertedAmount: number;
    exchangeRate: number;
    trendSummary: string;
  } | null>({
    convertedAmount: 59.81,
    exchangeRate: 0.012,
    trendSummary: 'Rates are hovering near steady averages. Good opportunity to convert minor funds before mountain itineraries.'
  });
  const [currencyLoading, setCurrencyLoading] = useState(false);

  // Travel Wallet Ledger State
  const [walletBalances, setWalletBalances] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('ai_tourism_wallet_balances');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      INR: 12000,
      USD: 250,
      EUR: 100,
      GBP: 50,
      AED: 200,
      SGD: 80,
      JPY: 5000,
      AUD: 40,
      CAD: 60,
      CNY: 100
    };
  });

  // Hot rate trigger alerts
  const [alertTarget, setAlertTarget] = useState<string>('84.0');
  const [rateAlertList, setRateAlertList] = useState<{from: string, to: string, target: number}[]>([]);

  // Translator States
  const [transText, setTransText] = useState('Where is the nearest hospital?');
  const [transFrom, setTransFrom] = useState('English');
  const [transTo, setTransTo] = useState('Tamil');
  const [transResult, setTransResult] = useState<{
    translatedText: string;
    phonetics: string;
    culturalNote?: string;
  } | null>({
    translatedText: 'அருகிலுள்ள மருத்துவமனை எங்கே?',
    phonetics: 'Aru-gith-ulla Maru-thuva-manai En-gae?',
    culturalNote: 'Speak in a soft, polite tone. Chennai residents are extremely helpful when asked with simple humility.'
  });
  const [transLoading, setTransLoading] = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [ttsAudioObj, setTtsAudioObj] = useState<HTMLAudioElement | null>(null);

  // Expense tracker states
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('ai_tourism_expenses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: '1', title: 'Marina Beach Sundal Snacks', amount: 80, category: 'Food', date: '2026-05-30' },
      { id: '2', title: 'Villas Stay in Ooty (1 Night)', amount: 4200, category: 'Hotel', date: '2026-05-31' },
      { id: '3', title: 'Toy Train Ticket Booking', amount: 180, category: 'Transport', date: '2026-05-31' },
      { id: '4', title: 'Eucalyptus Organic Essential Oil', amount: 350, category: 'Shopping', date: '2026-05-31' }
    ];
  });
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpCat, setNewExpCat] = useState<'Food' | 'Hotel' | 'Transport' | 'Shopping'>('Food');

  // Multi-assistant Voice Assistant state
  const [listening, setListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [voiceAlert, setVoiceAlert] = useState('');

  // Interactive Live Chatbot section
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome',
        sender: 'ai',
        text: 'Hello there! I am your AI Global Concierge. Ask me anything about finding hidden vistas, restaurant recommendations, translating signs, estimating travel costs, or managing your schedule.',
        timestamp: '04:45 AM',
        suggestedPrompts: [
          'What are the must-eat local dishes in Madurai?',
          'How do I travel safely to Courtallam Falls?',
          'Translate "Please give me mineral bottled water" into Tamil'
        ]
      }
    ];
  });
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // DOM ref elements for scroll syncing
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------------
  // 2. EFFECT HOOKS
  // ------------------------------------------------------------------

  // Firebase Authentication Observer Hook
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setAuthLoading(true);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as TravellerProfile;
            setProfile(data);
          } else {
            // Profile does not exist in Firestore. Fill in defaults & trigger preferences modal
            setProfile(null);
            setFormName(user.displayName || '');
            setShowProfileModal(true);
          }
        } catch (error) {
          console.warn("Offline or failed connection loading profile from Firestore, using local fallback:", error);
          // Local fallback
          const savedLocal = localStorage.getItem('ai_tourism_user_profile');
          if (savedLocal) {
            try {
              setProfile(JSON.parse(savedLocal));
            } catch (e) {
              setProfile(null);
            }
          } else {
            // Auto fallback profile based on Google user metadata since we are offline and have no cached profile
            const fallbackProfile: TravellerProfile = {
              name: user.displayName || 'Venerable Guest',
              country: 'India',
              preferredLanguage: 'English',
              travelInterests: ['Sightseeing', 'Nature'],
              budgetRange: 'Mid-Range',
              travelHistory: [],
              createdAt: new Date().toISOString(),
              email: user.email || undefined,
              picture: user.photoURL || undefined,
              googleConnected: true
            };
            setProfile(fallbackProfile);
            localStorage.setItem('ai_tourism_user_profile', JSON.stringify(fallbackProfile));
          }
        } finally {
          setAuthLoading(false);
        }
      } else {
        if (!guestMode) {
          setProfile(null);
        } else {
          const savedLocal = localStorage.getItem('ai_tourism_user_profile');
          if (savedLocal) {
            try {
              setProfile(JSON.parse(savedLocal));
            } catch (e) {}
          }
        }
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, [guestMode]);
  
  // Persist wallet & expenses
  useEffect(() => {
    localStorage.setItem('ai_tourism_wallet_balances', JSON.stringify(walletBalances));
  }, [walletBalances]);

  useEffect(() => {
    localStorage.setItem('ai_tourism_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Adjust current destination relative to state indicators
  useEffect(() => {
    if (discoveryCategory === 'Tamil Nadu') {
      const dest = TAMIL_NADU_DESTINATIONS[tnIndex];
      if (dest) {
        setCurrentDestination(dest);
        setPlanDestination(dest.name);
      }
    } else {
      const dest = INDIA_DESTINATIONS[indiaIndex];
      if (dest) {
        setCurrentDestination(dest);
        setPlanDestination(dest.name);
      }
    }
  }, [discoveryCategory, tnIndex, indiaIndex]);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // ------------------------------------------------------------------
  // 3. CORE HANDLERS
  // ------------------------------------------------------------------

  // Auth Handlers for Google Login / Guest flows
  const handleGoogleLogin = async () => {
    try {
      setAuthLoading(true);
      await signInWithPopup(auth, googleProvider);
      setGuestMode(false);
      localStorage.setItem('ai_tourism_guest_mode', 'false');
    } catch (err) {
      console.error("Google login error:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    setGuestMode(true);
    localStorage.setItem('ai_tourism_guest_mode', 'true');
    const savedLocal = localStorage.getItem('ai_tourism_user_profile');
    if (savedLocal) {
      try {
        setProfile(JSON.parse(savedLocal));
      } catch (e) {
        setShowProfileModal(true);
      }
    } else {
      setShowProfileModal(true);
    }
  };

  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      if (currentUser) {
        await signOut(auth);
      }
      setGuestMode(false);
      localStorage.removeItem('ai_tourism_guest_mode');
      localStorage.removeItem('ai_tourism_user_profile');
      setProfile(null);
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  // Profile saving wizard
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newProfile: TravellerProfile = {
      name: formName,
      country: formCountry,
      preferredLanguage: formLang,
      travelInterests: formInterests,
      budgetRange: formBudget,
      travelHistory: [],
      createdAt: new Date().toISOString(),
      email: currentUser?.email || undefined,
      picture: currentUser?.photoURL || undefined,
      googleConnected: currentUser ? true : false
    };

    setProfile(newProfile);
    localStorage.setItem('ai_tourism_user_profile', JSON.stringify(newProfile));

    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await setDoc(userDocRef, newProfile);
      } catch (err) {
        console.error("Error writing user profile to Firestore:", err);
      }
    }

    setShowProfileModal(false);

    // Initial greeting in chat customized for user's language and interests
    setChatMessages(prev => [
      ...prev,
      {
        id: `greet-${Date.now()}`,
        sender: 'ai',
        text: `Welcome aboard, **${formName}**! I have customized our system for your preferred language (**${formLang}**) and focused on **${formInterests.join(', ')}** trips under a **${formBudget}** budget. Let me know if you would like me to draft an initial plan or fetch exchange rates!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Switch destination category
  const toggleDestinationCategory = (cat: 'Tamil Nadu' | 'India') => {
    setDiscoveryCategory(cat);
    if (cat === 'Tamil Nadu') {
      setCurrentDestination(TAMIL_NADU_DESTINATIONS[0]);
    } else {
      setCurrentDestination(INDIA_DESTINATIONS[0]);
    }
  };

  // Next/Prev carousel transitions
  const handleNextDestination = () => {
    if (discoveryCategory === 'Tamil Nadu') {
      const nextIdx = (tnIndex + 1) % TAMIL_NADU_DESTINATIONS.length;
      setTnIndex(nextIdx);
    } else {
      const nextIdx = (indiaIndex + 1) % INDIA_DESTINATIONS.length;
      setIndiaIndex(nextIdx);
    }
  };

  const handlePrevDestination = () => {
    if (discoveryCategory === 'Tamil Nadu') {
      const prevIdx = (tnIndex - 1 + TAMIL_NADU_DESTINATIONS.length) % TAMIL_NADU_DESTINATIONS.length;
      setTnIndex(prevIdx);
    } else {
      const prevIdx = (indiaIndex - 1 + INDIA_DESTINATIONS.length) % INDIA_DESTINATIONS.length;
      setIndiaIndex(prevIdx);
    }
  };

  const handleToggleInterest = (interest: string) => {
    if (formInterests.includes(interest)) {
      setFormInterests(formInterests.filter(i => i !== interest));
    } else {
      setFormInterests([...formInterests, interest]);
    }
  };

  // Calculate dynamic currency rates & trends
  const handleCurrencyConvert = async () => {
    if (!convAmount || convAmount <= 0) return;
    setCurrencyLoading(true);
    try {
      const res = await fetch('/api/exchange-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: convAmount, from: convFrom, to: convTo })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrResult({
          convertedAmount: data.convertedAmount,
          exchangeRate: data.exchangeRate,
          trendSummary: data.trendSummary
        });
      }
    } catch (e) {
      // Offline fallback calculation in case node server is still compiling
      const sampleRates: Record<string, number> = {
        INR: 1, USD: 83.6, EUR: 90.2, GBP: 105.8, AED: 22.75,
        SGD: 62.15, JPY: 0.531, AUD: 55.4, CAD: 61.2, CNY: 11.5
      };
      const fromRate = sampleRates[convFrom] || 1;
      const toRate = sampleRates[convTo] || 1;
      const calcResult = (convAmount * fromRate) / toRate;
      setCurrResult({
        convertedAmount: parseFloat(calcResult.toFixed(2)),
        exchangeRate: parseFloat((fromRate / toRate).toFixed(4)),
        trendSummary: `Conversion calculated securely offline. ${convFrom} stays robust as tourism volume increases towards the end of this month.`
      });
    } finally {
      setCurrencyLoading(false);
    }
  };

  // Secure simulated Wallet exchanges
  const handleWalletExchange = () => {
    if (!currResult || !convAmount) return;
    const currentFromBalance = walletBalances[convFrom] || 0;
    if (currentFromBalance < convAmount) {
      alert(`Insufficient funds in your visual wallet under ${convFrom}! Add money or select a different currency.`);
      return;
    }

    setWalletBalances(prev => ({
      ...prev,
      [convFrom]: parseFloat((currentFromBalance - convAmount).toFixed(2)),
      [convTo]: parseFloat(((prev[convTo] || 0) + currResult.convertedAmount).toFixed(2))
    }));

    // Log this exchange as an expense if it converted to INR, or add a receipt
    alert(`Successfully exchanged ${convAmount} ${convFrom} to ${currResult.convertedAmount} ${convTo} inside your Secure Travel Wallet!`);
  };

  const handleAddWalletFunds = (currency: string, amount: number) => {
    setWalletBalances(prev => ({
      ...prev,
      [currency]: (prev[currency] || 0) + amount
    }));
  };

  // Add customized exchange rate alerts
  const handleAddRateAlert = () => {
    const nr = parseFloat(alertTarget);
    if (!isNaN(nr)) {
      setRateAlertList(prev => [...prev, { from: convFrom, to: convTo, target: nr }]);
      alert(`Alert set! We will notify you when ${convFrom} / ${convTo} touches ${nr}.`);
    }
  };

  // Handle Translate calls
  const handleTranslateText = async () => {
    if (!transText.trim()) return;
    setTransLoading(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transText, from: transFrom, to: transTo })
      });
      if (res.ok) {
        const data = await res.json();
        setTransResult({
          translatedText: data.translatedText,
          phonetics: data.phonetics,
          culturalNote: data.culturalNote
        });
      }
    } catch (e) {
      // Fallback
      setTransResult({
        translatedText: `[Translated offline to ${transTo}] ${transText}`,
        phonetics: 'Phonetic guide loading...',
        culturalNote: 'Connect to Gemini API for live phonetic pronunciation assistance and cultural guides.'
      });
    } finally {
      setTransLoading(false);
    }
  };

  // Play audio voice preview via Gemini TTS
  const handlePlayTTS = async (textToSpeak: string) => {
    if (!textToSpeak) return;
    
    // If audio is currently playing, stop it
    if (ttsPlaying && ttsAudioObj) {
      ttsAudioObj.pause();
      setTtsPlaying(false);
      return;
    }

    setTtsPlaying(true);
    try {
      const voice = profile?.preferredLanguage === 'Tamil' || transTo === 'Tamil' ? 'Kore' : 'Zephyr';
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, voiceName: voice })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
          setTtsAudioObj(audio);
          audio.play();
          audio.onended = () => {
            setTtsPlaying(false);
          };
        } else {
          fallbackWebSpeech(textToSpeak);
        }
      } else {
        fallbackWebSpeech(textToSpeak);
      }
    } catch (e) {
      fallbackWebSpeech(textToSpeak);
    }
  };

  const fallbackWebSpeech = (text: string) => {
    try {
      // standard speech synth fallback
      const u = new SpeechSynthesisUtterance(text);
      if (transTo === 'Tamil') u.lang = 'ta-IN';
      else if (transTo === 'French') u.lang = 'fr-FR';
      else if (transTo === 'Spanish') u.lang = 'es-ES';
      else if (transTo === 'Japanese') u.lang = 'ja-JP';
      else u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    } catch (err) {}
    setTimeout(() => setTtsPlaying(false), 2000);
  };

  // Generate multi-day AI itinerary using backend proxy
  const handlePlanTrip = async () => {
    setPlanningMode(true);
    try {
      const interestsToSend = profile?.travelInterests || ['Sightseeing'];
      const budgetToSend = profile?.budgetRange || 'Mid-Range';

      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationName: planDestination,
          days: planDays,
          budget: budgetToSend,
          interests: interestsToSend,
          familySize: budgetToSend === 'Family' ? 4 : 2,
          weatherContext: currentDestination?.weatherInfo?.forecast || 'Pleasant'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedItinerary(data);
      } else {
        throw new Error('Vite API generated non-200. Reverting to smart fallback.');
      }
    } catch (e) {
      // High reliability offline generator which simulates custom plan
      const mockItinerary: TravelItinerary = {
        id: `plan-${Date.now()}`,
        destination: planDestination,
        durationDays: Number(planDays),
        familySize: profile?.budgetRange === 'Family' ? 4 : 2,
        interests: profile?.travelInterests || ['Sightseeing', 'Spiritual'],
        budgetLevel: profile?.budgetRange || 'Mid-range',
        overallCost: Number(planDays) * (profile?.budgetRange === 'Budget' ? 1500 : profile?.budgetRange === 'Luxury' ? 9500 : 4000),
        transportation: 'We recommend renting a reliable local prepaid SUV cab configured for mountain curves.',
        foodTips: [
          'Savor pure wood-smoked traditional South Indian breakfasts.',
          'Always ask for mild spices at roadside highland shacks.'
        ],
        hotelSuggestion: {
          name: `${planDestination} Residency Resort`,
          rating: 4.6,
          pricePerNight: profile?.budgetRange === 'Budget' ? 1200 : profile?.budgetRange === 'Luxury' ? 11000 : 3800,
          amenities: ['Spectacular view balcony', 'Free High-speed WiFi', 'Complimentary morning breakfast']
        },
        dailySchedule: Array.from({ length: Number(planDays) }).map((_, i) => ({
          day: i + 1,
          theme: i === 0 ? 'Heritage Spotlights' : i === 1 ? 'Adventure Lookout Trekking' : 'Local Craft & Bazaar Tour',
          estimatedCost: profile?.budgetRange === 'Budget' ? 800 : 2500,
          meals: {
            breakfast: 'Steaming ghee idlis at a local clean outlet',
            lunch: 'Classic vegetarian meals served on a banana leaf',
            dinner: 'Flavorful spiced tandoori items with butter naan'
          },
          activities: [
            { time: '09:00 AM', description: `Explore primary historical vistas around the center of ${planDestination}`, cost: 100 },
            { time: '02:00 PM', description: 'Scenic valley photography at the best surrounding lookout views', cost: 0 },
            { time: '06:00 PM', description: 'Leisurely walk in the traditional handicraft bazaars and night markets', cost: 150 }
          ]
        }))
      };
      setGeneratedItinerary(mockItinerary);
    } finally {
      setPlanningMode(false);
    }
  };

  // Expense Logger handlers
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpTitle.trim() || !newExpAmount) return;

    const parsedAmount = parseFloat(newExpAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    const item: ExpenseItem = {
      id: Date.now().toString(),
      title: newExpTitle,
      amount: parsedAmount,
      category: newExpCat,
      date: new Date().toISOString().slice(0, 10)
    };

    setExpenses(prev => [item, ...prev]);
    setNewExpTitle('');
    setNewExpAmount('');
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(x => x.id !== id));
  };

  // Search through all 25 loaded spots (Tamil Nadu + India + fallback keys)
  const handleSearchDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    
    // First lookup in Tamil Nadu
    const tnMatch = TAMIL_NADU_DESTINATIONS.find(d => d.name.toLowerCase().includes(query) || d.id.includes(query));
    if (tnMatch) {
      setDiscoveryCategory('Tamil Nadu');
      const idx = TAMIL_NADU_DESTINATIONS.findIndex(d => d.id === tnMatch.id);
      if (idx !== -1) setTnIndex(idx);
      setSearchQuery('');
      return;
    }

    // Secondary lookup in India State destinations
    const indiaMatch = INDIA_DESTINATIONS.find(d => d.name.toLowerCase().includes(query) || d.id.includes(query));
    if (indiaMatch) {
      setDiscoveryCategory('India');
      const idx = INDIA_DESTINATIONS.findIndex(d => d.id === indiaMatch.id);
      if (idx !== -1) setIndiaIndex(idx);
      setSearchQuery('');
      return;
    }

    // Dynamic search lookup for generic items (like Mysore Palace, Ladakh, Kashmir etc)
    const matchedKey = Object.keys(OTHER_INDIA_DESTINATIONS_DATA).find(key => key.includes(query) || OTHER_INDIA_DESTINATIONS_DATA[key].name?.toLowerCase().includes(query));
    if (matchedKey) {
      const destDetails = getDestinationDetails(matchedKey);
      if (destDetails) {
        // Embed dynamically inside the state
        setDiscoveryCategory('India');
        // Let us replace current index destination or set context
        setCurrentDestination(destDetails);
        setPlanDestination(destDetails.name);
        setSearchQuery('');
        return;
      }
    }

    alert(`We could not find "${searchQuery}" in our local database, but our AI Travel Assistant can guide you! Ask in the Chatbox on the side.`);
  };

  // SOS Quick Shock Alarm
  const triggerEmergencySOS = () => {
    alert("🚨 SOS ALARM TRIGGERED! Nearby emergency help alerts have been compiled. In a real emergency, call local authorities instantly.");
    setSelectedTab('emergency');
  };

  // Chat conversation
  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    if (!presetText) setChatInput('');

    // Append user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: profile,
          chatHistory: chatMessages.slice(-8), // send last 8 messages for context
          userMessage: textToSend,
          currentDestinationId: currentDestination?.id,
          currentDestinationName: currentDestination?.name
        })
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedPrompts: data.suggestedPrompts
          }
        ]);
      } else {
        throw new Error('Chat API failed');
      }
    } catch (e) {
      // Friendly fallback responses simulated to fit user traveler queries
      let simulatedResponse = `I processed your question offline: **"${textToSend}"**. Here is my travel expert recommendation:

- **Transportation**: Local auto-rickshaws are highly active. Agree on the price before embarking!
- **Budget Tip**: Use your Secure Travel Wallet to convert currency during weekdays to secure optimal bank conversion rates.
- **Sightseeing**: Visit high points in early mornings to bypass queues.

*Tip: Please complete set up of your GEMINI_API_KEY inside the Secrets panel to activate live customized smart responses!*`;

      if (textToSend.toLowerCase().includes('hotel')) {
        simulatedResponse = `Regarding accommodations near **${currentDestination.name}**:
1. **${currentDestination.hotels.luxury[0]?.name || 'Highland Resort'}** possesses amazing ratings of ${currentDestination.hotels.luxury[0]?.rating || 4.8} / 5 stars.
2. **${currentDestination.hotels.budget[0]?.name || 'Comfort Inn'}** is a lovely budget option costing only ${currentDestination.hotels.budget[0]?.price || '₹1,500'} per night.`;
      } else if (textToSend.toLowerCase().includes('food') || textToSend.toLowerCase().includes('restaurant')) {
        simulatedResponse = `Excellent culinary choice! Here are top culinary recommendations near **${currentDestination.name}**:
- **Vegetarian**: ${currentDestination.restaurants.vegetarian[0]?.name} (${currentDestination.restaurants.vegetarian[0]?.cuisine}) - Try their famous *${currentDestination.restaurants.vegetarian[0]?.popularDishes.join(', ')}*.
- **Local Street Food**: ${currentDestination.restaurants.local[0]?.name} - Specializing in *${currentDestination.restaurants.local[0]?.popularDishes[0]}*.`;
      } else if (textToSend.toLowerCase().includes('emergency') || textToSend.toLowerCase().includes('hospital')) {
        simulatedResponse = `⚠️ **SAFETY FIRST NOTICE** ⚠️
For **${currentDestination.name}**, immediately find emergency assistance at:
- Local Emergency Line: **112 / 100 (Police)**, **108 (Ambulance)**
- Sree Meenakshi Mission Hospital & Research Centre is accessible with complete medical units. Stay in secure lit zones.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: simulatedResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedPrompts: [
            'What is the best time to visit here?',
            'List the closest budget hotel options',
            'Show me translation tips'
          ]
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // ------------------------------------------------------------------
  // 4. SPEECH WIDGET / VOICE CONSOLE COMMANDS
  // ------------------------------------------------------------------
  const handleVoiceAssistantToggle = () => {
    // Check if web speech is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser Speech Recognition is not supported in this iframe. Try typing your command directly in the Chatbox.");
      return;
    }

    if (listening) {
      setListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setListening(true);
      setVoiceAlert('Listening... Speak a travel command!');
    };

    rec.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setVoiceText(speechToText);
      parseVoiceCommand(speechToText);
    };

    rec.onerror = (e: any) => {
      console.error(e);
      setListening(false);
      setVoiceAlert('Speech interpretation failed. Try again.');
    };

    rec.onend = () => {
      setListening(false);
    };

    rec.start();
  };

  // Interpret commands:
  // "Find tourist places near me" (switch to discovery)
  // "Convert currency" (switch to currency)
  // "Plan my trip" (switch to planner)
  // "Find hotels nearby" (switch to accommodations)
  // "Find restaurants nearby" (switch to dining)
  const parseVoiceCommand = (rawText: string) => {
    const text = rawText.toLowerCase();
    setVoiceAlert(`Interpreted text: "${rawText}"`);

    // Switch tab logic based on vocal keywords
    if (text.includes('tourist') || text.includes('places') || text.includes('discovery') || text.includes('see')) {
      setSelectedTab('discovery');
      setChatMessages(prev => [...prev, {
        id: `voice-${Date.now()}`,
        sender: 'user',
        text: `[Voice Command] Navigate to Discovery: "${rawText}"`,
        timestamp: 'Just now'
      }]);
    } else if (text.includes('convert') || text.includes('currency') || text.includes('exchange') || text.includes('rate')) {
      setSelectedTab('currency');
    } else if (text.includes('plan') || text.includes('trip') || text.includes('itinerary') || text.includes('schedule')) {
      setSelectedTab('planner');
    } else if (text.includes('hotel') || text.includes('accommodations') || text.includes('stay')) {
      setSelectedTab('hotels');
    } else if (text.includes('restaurant') || text.includes('dining') || text.includes('food') || text.includes('eat')) {
      setSelectedTab('dining');
    } else {
      // General question. Pass to chatbot!
      handleSendChatMessage(`[Vocal Request] ${rawText}`);
    }
  };

  // ------------------------------------------------------------------
  // 5. RETAIN CORE DESIGN MATH
  // ------------------------------------------------------------------
  
  // Total expenses calculated
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const maxBudget = profile?.budgetRange === 'Budget' ? 15000 : profile?.budgetRange === 'Luxury' ? 150000 : 50000;
  const spentPct = Math.min(100, Math.floor((totalSpent / maxBudget) * 100));

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold tracking-wide text-slate-400 animate-pulse">Initializing secure concierge...</p>
        </div>
      </div>
    );
  }

  if (!currentUser && !guestMode) {
    return (
      <div className="h-screen w-screen flex flex-col md:flex-row bg-slate-950 font-sans text-slate-100 overflow-y-auto">
        {/* Left Side Accent Panel (Hero) */}
        <div className="relative flex-1 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 flex flex-col justify-between p-12 overflow-hidden border-b-0 border-r border-slate-800 min-h-[40vh] md:min-h-0">
          {/* Ambient glowing blobs */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-[128px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none"></div>
          
          <div className="flex items-center gap-3 z-10 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/10 text-lg">
              AI
            </div>
            <span className="font-extrabold tracking-wider text-sm text-slate-200">AI GLOBAL GUIDE</span>
          </div>

          <div className="z-10 my-auto py-12 max-w-lg space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Your Journey,<br />
              Intelligently Curated.
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Explore historic locales of Tamil Nadu and India with our smart currency exchange, real-time linguistic translator, automated itinerary planning, and safety concierge.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-slate-500 text-xs shrink-0">
            <div>© 2026 AI Tourist Assistant. All security certified.</div>
            <div className="flex items-center gap-4">
              <span>Secure Cloud Auth</span>
              <span>•</span>
              <span>Zero-Trust Rules</span>
            </div>
          </div>
        </div>

        {/* Right Side Login Card */}
        <div className="flex-[0.8] flex items-center justify-center p-8 bg-slate-900/40 relative">
          <div className="w-full max-w-md space-y-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-amber-400/5">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white font-sans">Experience Seamless Travel</h2>
              <p className="text-xs text-slate-400 font-sans">Establish a secure workspace or log in to sync saved itineraries</p>
            </div>

            <div className="space-y-4">
              {/* GOOGLE POPUP LOGIN */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-900 font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-white/5 cursor-pointer border-0"
              >
                {/* Google Logo SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.87-4.54-6.19-4.54z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span className="font-sans font-extrabold text-slate-900">Continue with Google</span>
              </button>

              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-x-0 border-t border-slate-800"></div>
                <span className="relative bg-slate-950 px-4 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Or proceed offline</span>
              </div>

              {/* CONTINUE AS GUEST */}
              <button
                onClick={handleContinueAsGuest}
                className="w-full py-3 px-4 bg-slate-850 hover:bg-slate-800 active:scale-[0.99] text-slate-300 hover:text-white font-medium text-sm rounded-xl border border-slate-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="font-sans font-bold">Explore as Guest</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Feature lists */}
            <div className="border-t border-slate-800/80 pt-6 space-y-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Connected Ecosystem Advantages</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-350 leading-none">Cloud Vault</p>
                    <p className="text-[10px] text-slate-500">Auto profile backup</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-350 leading-none">AI Planner</p>
                    <p className="text-[10px] text-slate-500">Persistent schedules</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-350 leading-none">Exchange Sync</p>
                    <p className="text-[10px] text-slate-500">Wallet ledger storage</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-350 leading-none">Safety Grid</p>
                    <p className="text-[10px] text-slate-500">Personalized SOS cards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-slate-50 font-sans text-slate-800 antialiased overflow-hidden">
      
      {/* INITIAL PROFILE CONFIG WIZARD MODAL */}
      {(!profile || showProfileModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/85 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 font-extrabold flex items-center justify-center">AI</div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">AI Global Concierge</h2>
                  <p className="text-xs text-slate-400">Please personalize your high-fidelity travel profile</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 pb-0 bg-slate-50"></div>

            <form onSubmit={handleSaveProfile} className="p-6 pt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Miller"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-350 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Origin Country</label>
                  <select
                    value={formCountry}
                    onChange={e => setFormCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-350 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Japan">Japan</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Preferred Language</label>
                  <select
                    value={formLang}
                    onChange={e => setFormLang(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-350 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Hindi">Hindi</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Budget tier</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Budget', 'Mid-Range', 'Luxury', 'Family'] as const).map(tier => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setFormBudget(tier)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        formBudget === tier
                          ? 'border-slate-900 bg-slate-950 text-white shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Estimates spend caps starting from ₹15k up to ₹1.5L</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Travel Interests</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Spiritual', 'Adventure', 'Nature', 'Heritage', 'Food', 'Shopping'].map(interest => {
                    const active = formInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleToggleInterest(interest)}
                        className={`py-2 px-1 text-xs rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                          active
                            ? 'bg-amber-100/70 text-amber-900 border-amber-300 font-semibold shadow-sm'
                            : 'border-slate-250 text-slate-600 bg-white hover:bg-slate-50'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5" />}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                {profile && (
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-lg shadow-lg shadow-amber-950/10 transition-colors"
                >
                  🚀 Launch Assistant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
        {/* LOGO GROUP */}
        <div className="p-5 border-b border-slate-850">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-amber-400 rounded-sm flex items-center justify-center text-slate-900 font-extrabold text-xs">AI</div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">TravelAssist</h1>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Global Concierge v4.2</p>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 py-4 overflow-y-auto space-y-1">
          <div className="px-5 py-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">Navigation</div>
          
          <button
            onClick={() => setSelectedTab('discovery')}
            className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-xs font-semibold ${
              selectedTab === 'discovery' ? 'bg-amber-400 text-slate-900' : 'text-slate-350 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            📍 Discovery Mode
          </button>

          <button
            onClick={() => setSelectedTab('planner')}
            className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-xs font-semibold ${
              selectedTab === 'planner' ? 'bg-amber-400 text-slate-900' : 'text-slate-350 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            📅 Trip Planner
          </button>

          <button
            onClick={() => setSelectedTab('hotels')}
            className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-xs font-semibold ${
              selectedTab === 'hotels' ? 'bg-amber-400 text-slate-900' : 'text-slate-350 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <HotelIcon className="w-4 h-4 shrink-0" />
            🏨 Accommodations
          </button>

          <button
            onClick={() => setSelectedTab('dining')}
            className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-xs font-semibold ${
              selectedTab === 'dining' ? 'bg-amber-400 text-slate-900' : 'text-slate-350 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4 shrink-0" />
            🍽️ Dining Guide
          </button>

          <div className="px-5 mt-4 py-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">Utilities & Trackers</div>

          <button
            onClick={() => setSelectedTab('currency')}
            className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-xs font-semibold ${
              selectedTab === 'currency' ? 'bg-amber-400 text-slate-900' : 'text-slate-350 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4 shrink-0" />
            💱 Currency Converter
          </button>

          <button
            onClick={() => setSelectedTab('translator')}
            className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-xs font-semibold ${
              selectedTab === 'translator' ? 'bg-amber-400 text-slate-900' : 'text-slate-350 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Languages className="w-4 h-4 shrink-0" />
            🗣️ Live Translator
          </button>

          <button
            onClick={() => setSelectedTab('expenses')}
            className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-xs font-semibold ${
              selectedTab === 'expenses' ? 'bg-amber-400 text-slate-900' : 'text-slate-350 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            📊 Expense Tracker
          </button>
        </nav>

        {/* VOICE ASSISTANT ACTION HUB */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-850">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Voice Mic Control</span>
            <span className={`w-2 h-2 rounded-full ${listening ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
          </div>
          <button
            onClick={handleVoiceAssistantToggle}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              listening 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-inner animate-pulse'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-200'
            }`}
          >
            {listening ? <Mic className="w-3.5 h-3.5 animate-bounce" /> : <Mic className="w-3.5 h-3.5" />}
            {listening ? "Listening... Speak" : "Voice Control"}
          </button>
          
          {voiceText && (
            <p className="mt-2 text-[10px] text-slate-400 italic line-clamp-1 bg-slate-900 p-1.5 rounded">
              "{voiceText}"
            </p>
          )}
          {voiceAlert && !listening && (
            <p className="text-[9px] text-amber-400 mt-1">{voiceAlert}</p>
          )}
        </div>

        {/* EMERGENCY DOCK AT FOOTER */}
        <div className="p-4 border-t border-slate-850">
          <button
            onClick={triggerEmergencySOS}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-lg shadow-lg shadow-red-950/30 transition-all hover:scale-[1.02]"
          >
            🚨 SOS EMERGENCY INFO
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE - VERTICAL GROUP */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-100 overflow-hidden">
        
        {/* HEADER SECTION */}
        <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 select-none overflow-hidden relative border border-slate-200">
              {profile?.picture ? (
                <img src={profile.picture} alt={profile.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xs text-slate-500 font-medium">Welcome, {profile?.name || 'Venerable Guest'}</span>
              </div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 leading-none mt-1">
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                {currentDestination?.name || 'Chennai, Tamil Nadu'} — {currentDestination?.weatherInfo?.temp} {currentDestination?.weatherInfo?.forecast}
              </span>
            </div>
          </div>

          {/* DYNAMIC SEARCH COMPASS BAR */}
          <form onSubmit={handleSearchDestination} className="relative w-80 max-w-sm hidden md:flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search spots (e.g. Ooty, Taj Mahal)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-1.5 pl-9 pr-4 text-xs font-medium bg-slate-100 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </form>

          {/* BUDGET STATUS BUTTONBAR */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{convFrom}:</span>
              <span className="text-xs font-black text-slate-800">{walletBalances[convFrom] || 0}</span>
              <span className="text-slate-350">|</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{convTo}:</span>
              <span className="text-xs font-black text-emerald-700">{(walletBalances[convTo] || 0).toFixed(1)}</span>
            </div>

            <button
              onClick={() => setShowProfileModal(true)}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
              title="Edit Travel Preferences"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>

            {/* LOG OUT BUTTON */}
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-550 rounded-full hover:bg-red-50 transition-colors"
              title={currentUser ? "Sign Out" : "Leave Guest Session (Clear Profile)"}
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </header>

        {/* WORKSPACE MIDDLE SCALER */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* PRIMARY WORKSPACE CONTENT */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* 1. DISCOVERY WORKSPACE TAB */}
            {selectedTab === 'discovery' && (
              <div className="space-y-6">
                
                {/* SUB-HEADER STATE SELECTOR */}
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleDestinationCategory('Tamil Nadu')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        discoveryCategory === 'Tamil Nadu'
                          ? 'bg-amber-400 text-slate-900 shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      🌴 Tamil Nadu Tourism
                    </button>
                    <button
                      onClick={() => toggleDestinationCategory('India')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        discoveryCategory === 'India'
                          ? 'bg-amber-400 text-slate-900 shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      🇮🇳 India Tourism Mode
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">
                      {discoveryCategory === 'Tamil Nadu' 
                        ? `Spot ${tnIndex + 1} of ${TAMIL_NADU_DESTINATIONS.length}` 
                        : `Spot ${indiaIndex + 1} of ${INDIA_DESTINATIONS.length}`
                      }
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={handlePrevDestination}
                        className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextDestination}
                        className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* MAIN SPOTLIGHT BANNER */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[480px]">
                  
                  {/* PHOTO VIEW */}
                  <div className="lg:w-1/2 h-64 lg:h-full relative bg-slate-900 overflow-hidden shrink-0">
                    <img
                      key={currentDestination?.id}
                      src={currentDestination?.image}
                      alt={currentDestination?.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const fallbackUrl = `https://picsum.photos/seed/${currentDestination?.id || 'tour'}/800/600`;
                        if (target.src !== fallbackUrl) {
                          target.src = fallbackUrl;
                        }
                      }}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white text-left">
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded">
                        {currentDestination?.category} SERIES
                      </span>
                      <h2 className="text-2xl font-black mt-2 tracking-tight drop-shadow-md">{currentDestination?.name}</h2>
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mt-1.5">
                        <Star className="w-4.5 h-4.5 fill-amber-300" />
                        <span>{currentDestination?.ratings} Rating</span>
                        <span className="text-slate-400">|</span>
                        <span>{currentDestination?.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* INFO PANEL */}
                  <div className="lg:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between border-b pb-4 mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          Verified Guide Available
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {currentDestination?.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Best Time to Visit</p>
                          <p className="text-xs font-extrabold text-slate-800">{currentDestination?.bestTime}</p>
                        </div>
                        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Entry Fee / Cost</p>
                          <p className="text-xs font-extrabold text-slate-800">{currentDestination?.entryFee}</p>
                        </div>
                      </div>

                      {/* WEATHER GUIDE QUICK */}
                      <div className="mt-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center">
                            <Sun className="w-6 h-6 animate-spin duration-10000" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block leading-none">Weather Condition</span>
                            <span className="text-xs font-bold text-slate-800 mt-1 block">
                              {currentDestination?.weatherInfo?.temp} / {currentDestination?.weatherInfo?.humidity} Humidity
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] bg-white border border-amber-150 px-3 py-1.5 rounded-lg max-w-xs text-amber-900 font-semibold italic text-right">
                          "{currentDestination?.weatherInfo?.suggestion}"
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3 border-t pt-4">
                      <button
                        onClick={() => setSelectedTab('planner')}
                        className="flex-1 bg-slate-900 hover:bg-slate-950 text-white py-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors"
                      >
                        📅 Add to Trip Planner
                      </button>
                      
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentDestination?.mapQuery)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 py-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors text-center inline-block"
                      >
                        🗺️ Explore on Google Maps
                      </a>
                    </div>
                  </div>
                </div>

                {/* SPLIT ACCOMMODATIONS & DINING TEASER CORES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* HOTELS PANEL */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b">
                      <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <HotelIcon className="w-4 h-4 text-amber-500" /> Nearby Accommodations
                      </h3>
                      <button
                        onClick={() => setSelectedTab('hotels')}
                        className="text-[10px] text-amber-600 font-bold uppercase tracking-wider hover:underline"
                      >
                        View More
                      </button>
                    </div>
                    <div className="space-y-3">
                      {currentDestination?.hotels?.midRange?.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 hover:border-slate-300 transition-all">
                          <div>
                            <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider mr-2">Mid-Range</span>
                            <span className="text-xs font-extrabold text-slate-800">{h.name}</span>
                            <p className="text-[10px] text-slate-500 mt-1">{h.distance} from site • {h.amenities.slice(0, 2).join(', ')}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-emerald-700">{h.price}</span>
                            <div className="flex items-center gap-0.5 mt-0.5 text-amber-500 justify-end">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span className="text-[10px] text-slate-700 font-bold">{h.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {currentDestination?.hotels?.budget?.slice(0, 1).map((h, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div>
                            <span className="bg-slate-200 text-slate-800 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider mr-2">Budget</span>
                            <span className="text-xs font-extrabold text-slate-800">{h.name}</span>
                            <p className="text-[10px] text-slate-500 mt-1">{h.distance} from site • {h.amenities.slice(0, 2).join(', ')}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-slate-700">{h.price}</span>
                            <p className="text-[10px] text-slate-500">Rating: {h.rating}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RESTAURANTS PANEL */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b">
                      <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-emerald-500" /> Regional Cuisine & Dining
                      </h3>
                      <button
                        onClick={() => setSelectedTab('dining')}
                        className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider hover:underline"
                      >
                        Explore dining
                      </button>
                    </div>
                    <div className="space-y-3">
                      {currentDestination?.restaurants?.local?.slice(0, 1).map((r, i) => (
                        <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="flex justify-between">
                            <span className="text-xs font-extrabold text-slate-800">{r.name} (Local Specialty)</span>
                            <span className="text-amber-500 text-xs font-bold flex items-center gap-1">★ {r.rating}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1">Cuisine: {r.cuisine} • {r.distance} away</p>
                          <div className="flex gap-1.5 flex-wrap mt-2">
                            {r.popularDishes.map((d, di) => (
                              <span key={di} className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">{d}</span>
                            ))}
                          </div>
                        </div>
                      ))}

                      {currentDestination?.restaurants?.vegetarian?.slice(0, 1).map((r, i) => (
                        <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="flex justify-between">
                            <span className="text-xs font-extrabold text-slate-800">{r.name} (Pure Veg)</span>
                            <span className="text-amber-500 text-xs font-bold flex items-center gap-1">★ {r.rating}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1">Specialties: {r.popularDishes.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TRAVEL TIPS */}
                <div className="bg-indigo-900 text-indigo-100 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 font-bold text-8xl text-indigo-50 select-none pointer-events-none">TIPS</div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-3 block">Expert Travel Tips</h3>
                  <ul className="space-y-2 text-xs">
                    {currentDestination?.travelTips?.map((tip, index) => (
                      <li key={index} className="flex gap-2.5 items-start">
                        <span className="w-5 h-5 bg-indigo-850 text-amber-400 font-bold rounded-full select-none flex items-center justify-center shrink-0">{index + 1}</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}

            {/* 2. TRIP PLANNER VIEW */}
            {selectedTab === 'planner' && (
              <div className="space-y-6">
                
                {/* TOOLBAR */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-amber-500" /> Personal Trip Itinerary Workspace
                  </h2>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b">
                    <div>
                      <label className="block text-xs text-slate-500 font-bold mb-1">Destination Target</label>
                      <input
                        type="text"
                        value={planDestination}
                        onChange={e => setPlanDestination(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-350 rounded-lg text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 font-bold mb-1">Trip Duration</label>
                      <select
                        value={planDays}
                        onChange={e => setPlanDays(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-350 rounded-lg text-slate-800"
                      >
                        <option value="1">1 Day Plan</option>
                        <option value="3">3 Day Plan</option>
                        <option value="5">5 Day Plan</option>
                        <option value="7">7 Day Plan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 font-bold mb-1">Budget Level</label>
                      <div className="w-full py-2 px-3 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-extrabold text-left leading-none">
                        {profile?.budgetRange || 'Mid-Range'} Base
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 font-bold mb-1">Group Size Info</label>
                      <div className="w-full py-2 px-3 text-xs bg-slate-100 border border-slate-250 rounded-lg text-slate-600 font-extrabold text-left leading-none">
                        {profile?.budgetRange === 'Family' ? '4 Members' : '2 Members'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <p className="text-[11px] text-slate-500">
                      Generating an interactive plan dynamically tracks interests like: {profile?.travelInterests.join(', ') || 'Culture'}
                    </p>
                    <button
                      onClick={handlePlanTrip}
                      disabled={planningMode}
                      className="bg-amber-400 hover:bg-amber-500 disabled:bg-slate-350 text-slate-900 font-bold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow shadow-amber-950/10"
                    >
                      {planningMode ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {planningMode ? "Compiling..." : "Generate AI Plan"}
                    </button>
                  </div>
                </div>

                {/* TRIP ITINERARY RENDER */}
                {generatedItinerary ? (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    {/* Header summary banner */}
                    <div className="bg-slate-900 p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800">
                      <div>
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider block w-max mb-2">
                          {generatedItinerary.budgetLevel} Level
                        </span>
                        <h3 className="text-xl font-bold tracking-tight">Custom Plan for {generatedItinerary.destination}</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Estimated Cumulative Cost: <span className="text-amber-300 font-bold text-sm">₹{generatedItinerary.overallCost.toLocaleString()}</span> for {generatedItinerary.familySize} travelers
                        </p>
                      </div>

                      <div className="mt-4 md:mt-0 bg-slate-800 p-3 rounded-lg border border-slate-750">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono mb-1">Core Transport Recommendation</span>
                        <p className="text-xs font-semibold text-slate-200">{generatedItinerary.transportation}</p>
                      </div>
                    </div>

                    {/* HOTEL CORNER */}
                    <div className="p-6 bg-slate-50 border-b flex flex-col md:flex-row gap-6 justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Selected Recommended Accommodation</span>
                        <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                          🏨 {generatedItinerary.hotelSuggestion.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Price per night: <span className="font-bold text-slate-800">₹{generatedItinerary.hotelSuggestion.pricePerNight.toLocaleString()}</span> (Includes taxes)
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pb-1">Included Amenities</span>
                        <div className="flex flex-wrap gap-1">
                          {generatedItinerary.hotelSuggestion.amenities.map((am, ai) => (
                            <span key={ai} className="bg-white text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* FOOD TIPS CORNER */}
                    <div className="p-6 bg-amber-50/30 border-b flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 select-none">🍛</div>
                      <div>
                        <span className="text-xs font-bold text-amber-900 block uppercase mb-1">Local Culinary Suggestions</span>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-amber-800">
                          {generatedItinerary.foodTips?.map((tip, ti) => (
                            <span key={ti} className="flex items-center gap-1.5 font-medium">
                              • {tip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* DAY TO DAY TIMECORE TIMELINE */}
                    <div className="p-6 space-y-8">
                      {generatedItinerary.dailySchedule.map((day, di) => (
                        <div key={di} className="relative pl-8 border-l-2 border-amber-400/30 space-y-4">
                          <div className="absolute -left-[14px] top-0 w-6.5 h-6.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center select-none shadow">
                            {day.day}
                          </div>
                          
                          <div className="flex justify-between items-start border-b pb-2">
                            <div>
                              <h4 className="text-sm font-extrabold text-slate-900">Day {day.day}: {day.theme}</h4>
                              <p className="text-xs text-slate-500 mt-1">Est. Day expense: <span className="font-bold text-slate-700">₹{day.estimatedCost.toLocaleString()}</span></p>
                            </div>
                            
                            <div className="bg-slate-100 px-3 py-1.5 rounded-lg border text-[10px] flex gap-2">
                              <div><span className="text-slate-400 block uppercase">Breakfast</span><span className="font-semibold text-slate-700">{day.meals.breakfast}</span></div>
                              <div><span className="text-slate-400 block uppercase">Lunch</span><span className="font-semibold text-slate-700">{day.meals.lunch}</span></div>
                              <div><span className="text-slate-400 block uppercase">Dinner</span><span className="font-semibold text-slate-700">{day.meals.dinner}</span></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {day.activities.map((act, ai) => (
                              <div key={ai} className="bg-slate-50 p-3.5 rounded-lg border border-slate-150 hover:border-slate-300 transition-all flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center gap-1 text-amber-600 mb-2">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold font-mono">{act.time}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-normal">{act.description}</p>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 block text-right mt-3">
                                  {act.cost === 0 ? "FREE ENTRY" : `Cost: ₹${act.cost}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ) : (
                  <div className="bg-slate-100 border-2 border-dashed border-slate-300 p-12 text-center rounded-2xl">
                    <div className="w-16 h-16 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📅</div>
                    <h3 className="font-semibold text-slate-700">No Custom Itinerary Generated Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2">
                      Select your destination, duration, and click the "Generate AI Plan" button above to dynamically build an interactive personalized travel dashboard.
                    </p>
                  </div>
                )}
                
              </div>
            )}

            {/* 3. ACCOMMODATIONS FORWARD AGENT */}
            {selectedTab === 'hotels' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Hotel Finder Assistant</h2>
                    <p className="text-xs text-slate-500 mt-1">Listing premium hotels suited for your category near {currentDestination?.name}</p>
                  </div>
                  <span className="text-xs bg-slate-100 border text-slate-600 font-extrabold py-2 px-4 rounded-full">
                    📍 {currentDestination?.name} Focus
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Luxury Section */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      👑 Premium Luxury & Heritage Experiences
                    </h3>
                    <div className="space-y-4">
                      {currentDestination?.hotels?.luxury?.map((h, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-40">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-extrabold text-slate-900">{h.name}</h4>
                              <p className="text-[10px] text-slate-500 mt-1">Distance: {h.distance} from landmark</p>
                            </div>
                            <span className="text-sm font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-100">{h.price}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {h.amenities.map((am, ai) => (
                              <span key={ai} className="bg-white text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded border">{am}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Family Section */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      👨‍👩‍👧 Family Suites & Mid-Range Stays
                    </h3>
                    <div className="space-y-4">
                      {currentDestination?.hotels?.family?.map((h, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between h-40">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-extrabold text-slate-900">{h.name}</h4>
                              <p className="text-[10px] text-slate-500 mt-1">Distance: {h.distance} • Child friendly games</p>
                            </div>
                            <span className="text-sm font-black text-indigo-850 bg-indigo-50 px-3 py-1 rounded">{h.price}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {h.amenities.map((am, ai) => (
                              <span key={ai} className="bg-white text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded border">{am}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. DINING SEARCH VIEW */}
            {selectedTab === 'dining' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Regional Culinary Recommender</h2>
                    <p className="text-xs text-slate-500 mt-1">Savor local specialty curries and hygienically prepared street stalls</p>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 font-extrabold py-1.5 px-3 rounded-full">
                    🍛 Tamil Cuisine Engine
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Recommended dining spots near {currentDestination?.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Local Foods */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <span className="text-[9px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-black uppercase">Local Specialty</span>
                      <h4 className="text-sm font-extrabold text-slate-800 mt-2">{currentDestination?.restaurants?.local[0]?.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">Frequented by locals. Authentic kitchen setup.</p>
                      <div className="mt-4 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                        <span className="text-[10px] block font-bold text-amber-900 uppercase">Must Try Items:</span>
                        <p className="text-xs mt-1 text-slate-700 font-medium">{currentDestination?.restaurants?.local[0]?.popularDishes.join(', ')}</p>
                      </div>
                    </div>

                    {/* Vegetarian Choice */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <span className="text-[9px] bg-green-100 text-green-900 px-2 py-0.5 rounded-full font-black uppercase">Pure Vegetarian</span>
                      <h4 className="text-sm font-extrabold text-slate-800 mt-2">{currentDestination?.restaurants?.vegetarian[0]?.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">Hygienic traditional brass-pan serving methods.</p>
                      <div className="mt-4 p-3 bg-green-50/20 rounded-lg border border-green-100">
                        <span className="text-[10px] block font-bold text-green-900 uppercase">Top dishes:</span>
                        <p className="text-xs mt-1 text-slate-700 font-medium">{currentDestination?.restaurants?.vegetarian[0]?.popularDishes.join(', ')}</p>
                      </div>
                    </div>

                    {/* Non-Vegetarian Chettinad */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <span className="text-[9px] bg-red-100 text-red-900 px-2 py-0.5 rounded-full font-black uppercase">Spiced / Non-Veg</span>
                      <h4 className="text-sm font-extrabold text-slate-800 mt-2">{currentDestination?.restaurants?.nonVegetarian[0]?.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">Rich wood-smoked Chettinad ground masalas.</p>
                      <div className="mt-4 p-3 bg-red-50/20 rounded-lg border border-red-100">
                        <span className="text-[10px] block font-bold text-red-900 uppercase">Chef Recommendations:</span>
                        <p className="text-xs mt-1 text-slate-700 font-bold">{currentDestination?.restaurants?.nonVegetarian[0]?.popularDishes.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. CURRENCY CONVERTER TAB */}
            {selectedTab === 'currency' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* DYNAMIC CALCULATOR */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Coins className="w-6 h-6 text-amber-500" /> Advanced Exchange Calculation Console
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Amount to Convert</label>
                      <input
                        type="number"
                        value={convAmount}
                        onChange={e => setConvAmount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-350 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Convert From</label>
                      <select
                        value={convFrom}
                        onChange={e => setConvFrom(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-350 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        {['USD', 'INR', 'EUR', 'GBP', 'AED', 'SGD', 'JPY', 'AUD', 'CAD', 'CNY'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Convert To</label>
                      <select
                        value={convTo}
                        onChange={e => setConvTo(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-350 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        {['USD', 'INR', 'EUR', 'GBP', 'AED', 'SGD', 'JPY', 'AUD', 'CAD', 'CNY'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <p className="text-[11px] text-slate-400">
                      XE rates are estimated based on real-time midmarket rates of May 2026.
                    </p>
                    <button
                      onClick={handleCurrencyConvert}
                      disabled={currencyLoading}
                      className="bg-amber-400 hover:bg-amber-500 disabled:bg-slate-300 text-slate-905 font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow"
                    >
                      {currencyLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      {currencyLoading ? "Converting..." : "Convert Funds"}
                    </button>
                  </div>
                </div>

                {/* CONVERSION RESULT BOX */}
                {currResult && (
                  <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden shadow">
                    <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider block w-max">
                      Exchange Success
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <span className="text-xs text-slate-400">Calculated amount</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-3xl font-black text-amber-300">{currResult.convertedAmount.toLocaleString()}</span>
                          <span className="text-sm font-bold text-slate-300">{convTo}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Rate: 1 {convFrom} = {currResult.exchangeRate} {convTo}
                        </p>
                      </div>

                      <div className="bg-slate-800 p-4 rounded-xl border border-slate-750">
                        <span className="text-xs font-bold text-amber-400 block mb-1">Currency Trend Summary</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          {currResult.trendSummary}
                        </p>
                      </div>
                    </div>

                    {/* CONVERT BUTTON WALLET BRIDGE */}
                    <div className="mt-6 border-t border-slate-800 pt-4 flex flex-col sm:flex-row gap-2 justify-end">
                      <button
                        onClick={handleAddRateAlert}
                        className="px-4 py-2 text-xs font-bold border border-slate-700 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors"
                      >
                        🔔 Set Target Rate Alert
                      </button>
                      <button
                        onClick={handleWalletExchange}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-lg text-xs tracking-wider transition-colors"
                      >
                        💼 Store inside Safe Wallet
                      </button>
                    </div>
                  </div>
                )}

                {/* WEB WALLET LEDGER LEDGER */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <div className="flex border-b pb-4 mb-4 justify-between items-center">
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">
                        🛡️ Your Secured Multi-currency Mobile Travel Wallet
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Visual ledger simulating actual localized exchange balances</p>
                    </div>
                    <span className="text-xs text-slate-500 font-bold">Total Liquid Cash Available</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {Object.entries(walletBalances).map(([curr, bal]) => (
                      <div key={curr} className="bg-slate-55 bg-slate-50 p-3 h-20 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block tracking-wider leading-none uppercase">{curr} Balance</span>
                          <span className="text-sm font-black text-slate-800 block mt-1.5">{bal.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => handleAddWalletFunds(curr, curr === 'INR' ? 1000 : 50)}
                          className="text-[9px] text-left text-amber-600 font-bold hover:underline"
                        >
                          + Quick Topup
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 6. LIVE TRANSLATOR VIEW */}
            {selectedTab === 'translator' && (
              <div className="space-y-6">
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Languages className="w-6 h-6 text-amber-500" /> Smart Bilingual Translation Console
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Translate From</label>
                      <select
                        value={transFrom}
                        onChange={e => setFormLang(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-55 rounded-lg border border-slate-300 focus:outline-none"
                      >
                        <option value="English">English</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Hindi">Hindi</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                      <textarea
                        value={transText}
                        onChange={e => setTransText(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 mt-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                        placeholder="Type travel words here..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Translate To</label>
                      <select
                        value={transTo}
                        onChange={e => setTransTo(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-55 rounded-lg border border-slate-300 focus:outline-none"
                      >
                        <option value="Tamil">Tamil</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                      <div className="w-full h-32 md:h-28 bg-slate-50 border rounded-xl mt-3 p-4 text-sm font-bold text-slate-800 relative">
                        {transLoading ? (
                          <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                            <RefreshCw className="w-4 h-4 animate-spin" /> Interpreting grammar rules...
                          </div>
                        ) : transResult ? (
                          <div className="space-y-1 text-left text-amber-900 leading-tight">
                            <p className="text-base text-slate-950 font-black">"{transResult.translatedText}"</p>
                            <p className="text-xs text-slate-500 italic">Phonetic: {transResult.phonetics}</p>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-medium italic">Output text will print here...</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <p className="text-[11px] text-slate-400">
                      Gemini estimates grammar structures perfectly to prevent local social faux pas.
                    </p>
                    <div className="flex gap-2">
                      {transResult && (
                        <button
                          onClick={() => handlePlayTTS(transResult.translatedText)}
                          className={`py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 border transition-colors ${
                            ttsPlaying 
                              ? 'bg-red-50 border-red-300 text-red-600 animate-pulse'
                              : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                          }`}
                        >
                          {ttsPlaying ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                          {ttsPlaying ? "Mute Voice" : "Speak (Gemini Voice)"}
                        </button>
                      )}
                      
                      <button
                        onClick={handleTranslateText}
                        className="bg-amber-400 hover:bg-amber-500 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        🗣️ Translate Input
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cultural instructions sidebar helper */}
                {transResult?.culturalNote && (
                  <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-widest block mb-1">Cultural Pronunciation Tip</h4>
                      <p className="text-xs text-amber-900 leading-relaxed font-semibold italic">
                        "{transResult.culturalNote}"
                      </p>
                    </div>
                  </div>
                )}
                
              </div>
            )}

            {/* 7. EXPENSE TRACKER */}
            {selectedTab === 'expenses' && (
              <div className="space-y-6">
                
                {/* HIGH Polish spent indicator header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Ledger summary */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl shadow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">Total Trip Spent Balance</span>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="text-3xl font-black text-amber-300">₹{totalSpent.toLocaleString()}</span>
                        <span className="text-xs text-slate-400">spent of ₹{(maxBudget / 1000).toFixed(0)}k cap</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full mt-4 overflow-hidden">
                      <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${spentPct}%` }}></div>
                    </div>
                  </div>

                  {/* Daily speed tracker */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-widest">Calculated Daily Average</span>
                      <span className="text-2xl font-black text-slate-800 block mt-2">
                        ₹{expenses.length > 0 ? Math.floor(totalSpent / 3).toLocaleString() : '0'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold tracking-tight">Assumed spread over a realistic 3-day active travel timeline</p>
                  </div>

                  {/* Budget warning status */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-widest">Financial Safety Status</span>
                      <span className={`text-sm font-black block mt-2 ${spentPct > 75 ? 'text-red-600' : 'text-green-600'}`}>
                        {spentPct > 85 ? "🚨 REACHING LIMIT WARNING" : spentPct > 50 ? "⚠️ MID-WAY WARNING" : "✅ HIGH BUDGET SURPLUS"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">Secure wallet exchange continues top-up limits during emergencies.</p>
                  </div>
                </div>

                {/* ADD LOGGERS SPLIT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* EXPENSE CREATOR STACK FORM */}
                  <div className="md:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b pb-2 mb-4">
                      Add Travel Expense
                    </h3>
                    <form onSubmit={handleAddExpense} className="space-y-4">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Item Title</label>
                        <input
                          type="text"
                          required
                          value={newExpTitle}
                          onChange={e => setNewExpTitle(e.target.value)}
                          placeholder="e.g. Traditional Lunch"
                          className="w-full px-3 py-2 border rounded-lg text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Cost (INR ₹)</label>
                          <input
                            type="number"
                            required
                            value={newExpAmount}
                            onChange={e => setNewExpAmount(e.target.value)}
                            placeholder="350"
                            className="w-full px-3 py-2 border rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Category</label>
                          <select
                            value={newExpCat}
                            onChange={e => setNewExpCat(e.target.value as any)}
                            className="w-full px-3 py-2 border rounded-lg text-xs"
                          >
                            <option value="Food">🍛 Food</option>
                            <option value="Hotel">🏨 Hotel</option>
                            <option value="Transport">🚕 Transport</option>
                            <option value="Shopping">🛍️ Shopping</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-slate-950 hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-colors"
                      >
                        + Record Cost
                      </button>
                    </form>
                  </div>

                  {/* LOGS LISTER */}
                  <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b pb-2 mb-4">
                      Expense Ledger Logs
                    </h3>
                    
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {expenses.length > 0 ? (
                        expenses.map(exp => (
                          <div key={exp.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border hover:border-slate-300 transition-all">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">
                                {exp.category === 'Food' ? '🍛' : exp.category === 'Hotel' ? '🏨' : exp.category === 'Transport' ? '🚕' : '🛍️'}
                              </span>
                              <div>
                                <h4 className="text-xs font-extrabold text-slate-800 leading-none">{exp.title}</h4>
                                <span className="text-[9px] text-slate-400 font-mono mt-1 block">{exp.date} • {exp.category}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-xs font-black text-slate-900">₹{exp.amount.toLocaleString()}</span>
                              <button
                                onClick={() => handleDeleteExpense(exp.id)}
                                className="p-1 text-slate-400 hover:text-red-500 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic text-center py-6">No recorded receipts yet.</p>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 8. EMERGENCY SOS VIEW */}
            {selectedTab === 'emergency' && (
              <div className="space-y-6">
                
                {/* CRITICAL WARNING CARD */}
                <div className="bg-red-65 bg-red-900 text-white p-6 rounded-2xl flex items-start gap-4 shadow-xl">
                  <div className="w-12 h-12 bg-red-950 text-red-500 rounded-full flex items-center justify-center shrink-0 text-2xl select-none">🚨</div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-wider">SECURE EMERGENCY & EMBASSY NETWORK</h2>
                    <p className="text-xs text-red-200 mt-1 leading-relaxed font-semibold">
                      Your life and personal safety are the absolute highest priorities. Below is our verified medical, security, and diplomatic network setup near {currentDestination?.name || 'Chennai, Tamil Nadu'}.
                    </p>
                  </div>
                </div>

                {/* AMBULANCE POLICE CONTACT MATRIX */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Local crisis lines */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-4">
                      National Crisis Hotlines (India Wide)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-xl border flex justify-between items-center">
                        <div><span className="text-[10px] text-slate-400 block font-bold leading-none">POLICE CONTROL</span><span className="text-sm font-black text-slate-800">100 / 112</span></div>
                        <span className="text-lg">📞</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border flex justify-between items-center">
                        <div><span className="text-[10px] text-slate-400 block font-bold leading-none">AMBULANCE</span><span className="text-sm font-black text-slate-800">108 / 102</span></div>
                        <span className="text-lg">🚑</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border flex justify-between items-center col-span-2">
                        <div><span className="text-[10px] text-slate-400 block font-bold leading-none">TOURIST HELPLINE (MULTI-LINGUAL)</span><span className="text-xs font-black text-amber-700">1800-11-1363 (Toll Free)</span></div>
                        <span className="text-lg">🌴</span>
                      </div>
                    </div>
                  </div>

                  {/* Nearest hospitals verified */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">
                      Verified Surrounding Hospitals & Units
                    </h3>
                    <div className="space-y-2.5">
                      <div className="p-3 bg-red-50/20 rounded-lg border border-red-100">
                        <span className="text-xs font-extrabold text-slate-800 leading-none">Apollo Hospitals Chennai (Greams Road)</span>
                        <p className="text-[10px] text-slate-500 mt-1">Multi-specialty, open 24/7. Phone: +91 44 2829 0200</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border">
                        <span className="text-xs font-extrabold text-slate-800 leading-none">Sree Meenakshi Mission Hospital (Madurai Unit)</span>
                        <p className="text-[10px] text-slate-500 mt-1">Lake Area, Melur Road. Phone: +91 452 258 8741</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONSULATE & EMBASSY DIRECTORY */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b pb-2 mb-4">
                    Diplomatic Consul General Directories (Chennai based)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-50 rounded-xl border">
                      <span className="font-extrabold text-xs text-slate-800 block">🇺🇸 U.S. Consulate General Chennai</span>
                      <p className="text-[10px] text-slate-500 mt-2">Gemini Circle, Anna Salai. Support: +91 44 2857 4000</p>
                      <span className="text-[9px] text-indigo-700 font-bold block mt-3">chennai.usconsulate.gov</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border">
                      <span className="font-extrabold text-xs text-slate-800 block">🇬🇧 British Consulate General</span>
                      <p className="text-[10px] text-slate-500 mt-2">Anderson Road, Nungambakkam. Support: +91 44 4219 2151</p>
                      <span className="text-[9px] text-indigo-700 font-bold block mt-3">gov.uk/world/organisations/british-consulate-general-chennai</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border">
                      <span className="font-extrabold text-xs text-slate-800 block">🇫🇷 French Consulate General Pondicherry</span>
                      <p className="text-[10px] text-slate-500 mt-2">Rue Gabriel Debertrand. Support: +91 413 223 8000</p>
                      <span className="text-[9px] text-indigo-700 font-bold block mt-3">inde.consulfrance.org</span>
                    </div>
                  </div>
                </div>

              </div>
            )}



          </div>

          {/* DENSE INTELLIGENT TRAVEL CHATBOT CONSOLE PANEL */}
          <div className="w-80 shrink-0 bg-white border-l border-slate-200 flex flex-col justify-between hidden xl:flex">
            
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-xs">AI Travel Expert Chat</h3>
                  <span className="text-[9px] text-emerald-400 block font-bold">● Active Online Concierge</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">UTC 04:45</span>
            </div>

            {/* Conversation Logs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map(msg => (
                <div key={msg.id} className="space-y-1 text-left">
                  <span className={`text-[10px] font-bold block ${msg.sender === 'user' ? 'text-blue-600 text-right' : 'text-slate-400'}`}>
                    {msg.sender === 'user' ? 'You' : 'Conceirge Assist'} • {msg.timestamp}
                  </span>
                  <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none max-w-xs ml-auto shadow-sm'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none shadow-sm border border-slate-200'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Render preset target buttons inside chat */}
                  {msg.suggestedPrompts && (
                    <div className="flex flex-wrap gap-1 pt-1.5 justify-start">
                      {msg.suggestedPrompts.map((p, pi) => (
                        <button
                          key={pi}
                          onClick={() => handleSendChatMessage(p)}
                          className="bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-amber-200 transition-colors"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {chatLoading && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 italic pb-2 animate-pulse text-left">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Consultant planning response...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Interaction Footer input */}
            <div className="p-3 border-t bg-slate-50">
              <div className="flex gap-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendChatMessage()}
                  placeholder="Ask for recommendations..."
                  className="flex-1 py-1 px-3 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-400 text-slate-800"
                />
                <button
                  onClick={() => handleSendChatMessage()}
                  className="bg-slate-900 hover:bg-slate-950 text-white p-2 rounded-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
