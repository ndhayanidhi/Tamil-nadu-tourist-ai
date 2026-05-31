/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TravellerProfile {
  name: string;
  country: string;
  preferredLanguage: string;
  travelInterests: string[];
  budgetRange: 'Budget' | 'Mid-Range' | 'Luxury' | 'Family';
  travelHistory: string[];
  currentLocation?: string;
  createdAt: string;
  email?: string;
  picture?: string;
  googleConnected?: boolean;
}

export interface Activity {
  time: string;
  description: string;
  cost: number;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  estimatedCost: number;
}

export interface TravelItinerary {
  id: string;
  destination: string;
  durationDays: number;
  familySize: number;
  interests: string[];
  budgetLevel: string;
  overallCost: number;
  dailySchedule: DayPlan[];
  hotelSuggestion: {
    name: string;
    rating: number;
    pricePerNight: number;
    amenities: string[];
  };
  transportation: string;
  foodTips: string[];
  weatherWarning?: string;
}

export interface Destination {
  name: string;
  id: string;
  image: string;
  description: string;
  mapEmbedUrl?: string;
  mapQuery: string; // fallback search query for maps
  bestTime: string;
  entryFee: string;
  distance: string;
  hotels: {
    budget: Hotel[];
    midRange: Hotel[];
    luxury: Hotel[];
    family: Hotel[];
  };
  restaurants: {
    vegetarian: Restaurant[];
    nonVegetarian: Restaurant[];
    local: Restaurant[];
  };
  travelTips: string[];
  weatherInfo: {
    temp: string;
    tempVal: number;
    humidity: string;
    wind: string;
    forecast: string;
    suggestion: string;
  };
  category: 'Tamil Nadu' | 'India';
  ratings: number;
}

export interface Hotel {
  name: string;
  rating: number;
  price: string;
  priceVal: number;
  distance: string;
  amenities: string[];
}

export interface Restaurant {
  name: string;
  rating: number;
  distance: string;
  cuisine: string;
  popularDishes: string[];
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: 'Food' | 'Hotel' | 'Transport' | 'Shopping';
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}

export interface ExchangeRateData {
  rates: { [key: string]: number };
  trendSummary: { [key: string]: string };
}
