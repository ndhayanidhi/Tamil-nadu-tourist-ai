import { Destination } from './types';

export const TAMIL_NADU_DESTINATIONS: Destination[] = [
  {
    id: 'marina-beach',
    name: 'Marina Beach Chennai',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Marina_Beach_Chennai_from_Light_House_2.jpg',
    description: 'Marina Beach is a natural urban beach in Chennai, Tamil Nadu, along the Bay of Bengal. Stretching over a distance of 6.0 km, it is the longest natural urban beach in the country and one of the iconic symbols of Chennai.',
    mapQuery: 'Marina Beach, Chennai, Tamil Nadu',
    bestTime: 'November to February (Cool breeze)',
    entryFee: 'Free Entry',
    distance: '0 km (Within Chennai City Center)',
    category: 'Tamil Nadu',
    ratings: 4.5,
    hotels: {
      budget: [
        { name: 'Triplicane Comforts Hotel', rating: 3.8, price: '₹1,500', priceVal: 1500, distance: '0.8 km', amenities: ['Free Wi-Fi', 'AC', '24h Room Service'] }
      ],
      midRange: [
        { name: 'Marina Residency Hotel', rating: 4.2, price: '₹3,200', priceVal: 3200, distance: '1.2 km', amenities: ['Free Wi-Fi', 'Complimentary Breakfast', 'City View', 'Restaurant'] }
      ],
      luxury: [
        { name: 'The Taj Connemara', rating: 4.8, price: '₹12,500', priceVal: 12500, distance: '3.4 km', amenities: ['Heritage Pool', 'Luxury Spa', 'Bar', 'Fine Dining', 'Fitness Center'] }
      ],
      family: [
        { name: 'Clarion Hotel President', rating: 4.1, price: '₹4,500', priceVal: 4500, distance: '1.5 km', amenities: ['Swimming Pool', 'Family Suites', 'Free Parking', 'Kids Area'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Ratna Cafe Triplicane', rating: 4.4, distance: '0.9 km', cuisine: 'Traditional South Indian', popularDishes: ['Sambar Idli', 'Filter Coffee', 'Ghee Roast Dosa'] }
      ],
      nonVegetarian: [
        { name: 'Nair Mess', rating: 4.3, distance: '1.0 km', cuisine: 'Chettinad & Seafood', popularDishes: ['Fish Fry', 'Kerala Parotta', 'Mutton Biryani'] }
      ],
      local: [
        { name: 'Beachside Sundal & Fish Stalls', rating: 4.1, distance: '0.1 km', cuisine: 'Street Food', popularDishes: ['Thenga Manga Pattani Sundal', 'Fried Fish', 'Mulaga Bajji'] }
      ]
    },
    travelTips: [
      'Visit during early morning or sunset for cooler weather and gorgeous lighting.',
      'Savor the famous street food (Sundal and chili bajji) from licensed beach vendors.',
      'Swimming in the sea is strictly prohibited due to strong and unpredictable currents.'
    ],
    weatherInfo: {
      temp: '32°C',
      tempVal: 32,
      humidity: '75%',
      wind: '18 km/h',
      forecast: 'Sunny with coastal breezes',
      suggestion: 'Wear light cotton clothes, search for shade, and stay fully hydrated.'
    }
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    image: '/12 Best Places To Visit In Ooty, Tamil Nadu 6.jpg',
    description: 'Known as the "Queen of Hill Stations", Ooty is nestled in the Nilgiri Hills. Famous for its tea gardens, pleasant alpine weather, colonial-era architecture, and the heritage Nilgiri Mountain Railway toy train.',
    mapQuery: 'Ooty, Nilgiris, Tamil Nadu',
    bestTime: 'October to May',
    entryFee: 'Varies by gardens (Free to ₹50)',
    distance: '550 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.8,
    hotels: {
      budget: [
        { name: 'Hotel Lakeview', rating: 3.9, price: '₹1,800', priceVal: 1800, distance: '2.0 km', amenities: ['Independent Cottages', 'Bonfire', 'Room Heater', 'Parking'] }
      ],
      midRange: [
        { name: 'Sherlock Hotel', rating: 4.3, price: '₹4,200', priceVal: 4200, distance: '3.5 km', amenities: ['Mountain View', 'Colonial Decor', 'Fireplace', 'Garden Cafe'] }
      ],
      luxury: [
        { name: 'Savoy - IHCL SeleQtions', rating: 4.9, price: '₹14,000', priceVal: 14000, distance: '1.1 km', amenities: ['Heritage Rooms', 'Spa', 'Fireplace lounge', 'Tennis Court', 'High-Tea Sessions'] }
      ],
      family: [
        { name: 'Sterling Ooty Elk Hill', rating: 4.2, price: '₹5,500', priceVal: 5500, distance: '1.8 km', amenities: ['Kids Play Area', 'Observatory', 'Organic Garden', 'Spacious Suites'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Adyar Ananda Bhavan (A2B)', rating: 4.2, distance: '0.5 km', cuisine: 'South & North Indian Vet', popularDishes: ['Mini Ghee Idli', 'Paper Roast Dosa', 'South Indian Meals'] }
      ],
      nonVegetarian: [
        { name: 'Earls Secret', rating: 4.6, distance: '1.2 km', cuisine: 'Continental & Anglo-Indian', popularDishes: ['Glass Noodles salad', 'Chicken Shepherd Pie', 'Roast Lamb'] }
      ],
      local: [
        { name: 'Shinkows Chinese', rating: 4.3, distance: '0.8 km', cuisine: 'Indo-Chinese Heritage', popularDishes: ['Chili Pork', 'Fried Rice', 'Hot & Sour Soup'] }
      ]
    },
    travelTips: [
      'Book the Toy Train tickets well in advance via the IRCTC website.',
      'Buy original Ooty home-made chocolates and fresh Nilgiri eucalyptus oils.',
      'Pack warm woolens even in summer, as nights can get quite chilly.'
    ],
    weatherInfo: {
      temp: '17°C',
      tempVal: 17,
      humidity: '60%',
      wind: '12 km/h',
      forecast: 'Cool and misty winds',
      suggestion: 'A sweater or light jacket is recommended. Ideal weather for outdoor trekking.'
    }
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    image: '/Pillar Rock, Kodaikanal.jpg',
    description: 'Often referred to as the "Princess of Hill Stations", Kodaikanal is situated in the Palani Hills. It centers around the beautiful star-shaped Kodaikanal Lake and features misty cliffs, pine forests, and cool waterfalls.',
    mapQuery: 'Kodaikanal, Dindigul, Tamil Nadu',
    bestTime: 'September to May',
    entryFee: 'Free (Individual park tickets ₹10-₹30)',
    distance: '520 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.7,
    hotels: {
      budget: [
        { name: 'Greenlands Youth Hostel', rating: 4.0, price: '₹1,200', priceVal: 1200, distance: '0.5 km', amenities: ['Cozy Dorms', 'Campfire', 'Scenic Coaker Valley View', 'Hot Water'] }
      ],
      midRange: [
        { name: 'Villa Retreat Kodaikanal', rating: 4.5, price: '₹4,500', priceVal: 4500, distance: '0.1 km (At Coakers Walk)', amenities: ['Spectacular Valley View', 'Fireplace', 'Wooden Floors', 'Lawn'] }
      ],
      luxury: [
        { name: 'The Tamara Kodai', rating: 4.9, price: '₹16,500', priceVal: 16500, distance: '2.5 km', amenities: ['Heated Pool', 'French Heritage Architecture', 'Luxury Spa', 'Gourmet Lounge'] }
      ],
      family: [
        { name: 'The Carlton Kodaikanal', rating: 4.6, price: '₹8,500', priceVal: 8500, distance: '0.2 km (On Lake)', amenities: ['Private Lake Boating', 'Kids Club', 'Gym', 'Bar', 'Golf Course Access'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Hilltop Vegetarian Restaurant', rating: 4.1, distance: '0.4 km', cuisine: 'Pure Veg Multi-cuisine', popularDishes: ['Chana Masala with Poori', 'Veg Biryani', 'South Indian Thali'] }
      ],
      nonVegetarian: [
        { name: 'Tava Restaurant', rating: 4.4, distance: '0.6 km', cuisine: 'North Indian & Punjabi', popularDishes: ['Kadai Chicken', 'Paneer Tikka', 'Butter Naan'] }
      ],
      local: [
        { name: 'Kodaikanal Lake Bakery', rating: 4.3, distance: '0.2 km', cuisine: 'Continental & Pastries', popularDishes: ['Warm Plum Cake', 'Hot Chocolate', 'Freshly Baked Cookies'] }
      ]
    },
    travelTips: [
      'Take a cycle ride or horse ride around the 5 km perimeter of Kodaikanal Lake.',
      'Check out the rare Kurinji flower which blooms once every 12 years (next in 2030).',
      'Walk carefully along the misty trails of Coaker\'s Walk for beautiful views of the valley.'
    ],
    weatherInfo: {
      temp: '16°C',
      tempVal: 16,
      humidity: '68%',
      wind: '10 km/h',
      forecast: 'Misty and overcast weather with passing light showers',
      suggestion: 'Carry an umbrella or raincoat to enjoy the scenic, unpredictable mountain drizzle.'
    }
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram (Mamallapuram)',
    image: '/A divine work of architecture dating back….jpg',
    description: 'A UNESCO World Heritage site known for its 7th and 8th-century Pallava-era relief carvings, stone chariot temples (Rathas), Shore Temple on the beachfront, and cave sanctuaries facing the sea.',
    mapQuery: 'Shore Temple, Mahabalipuram, Tamil Nadu',
    bestTime: 'October to March',
    entryFee: '₹40 (Indians), ₹600 (Foreigners)',
    distance: '55 km from Chennai (via scenic ECR)',
    category: 'Tamil Nadu',
    ratings: 4.6,
    hotels: {
      budget: [
        { name: 'Dunes Village Resort', rating: 3.8, price: '₹1,500', priceVal: 1500, distance: '1.2 km', amenities: ['Beach Access', 'Hammocks', 'Basic Rooms', 'Free Wi-Fi'] }
      ],
      midRange: [
        { name: 'Mamalla Heritage', rating: 4.1, price: '₹3,000', priceVal: 3000, distance: '0.5 km', amenities: ['Swimming Pool', 'AC Rooms', 'Multi-cuisine Restaurant', 'Close to Rathas'] }
      ],
      luxury: [
        { name: 'InterContinental Chennai Mahabalipuram Resort', rating: 4.8, price: '₹13,500', priceVal: 13500, distance: '12 km', amenities: ['Private Beach', 'World-class Pool', 'Amryt Spa', 'Fine Dining Asian Cuisine', 'Gym'] }
      ],
      family: [
        { name: 'Chariot Beach Resort', rating: 4.3, price: '₹6,500', priceVal: 6500, distance: '0.8 km', amenities: ['Poolside Cabanas', 'Sea-Facing Rooms', 'Adventure Park', 'Kids Play Area'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Aarya Veg Restaurant', rating: 4.0, distance: '0.3 km', cuisine: 'Pure Vegetarian', popularDishes: ['South Indian Thali', 'Ghee Onion Rava Dosa', 'Fresh Juices'] }
      ],
      nonVegetarian: [
        { name: 'Moonrakers', rating: 4.4, distance: '0.6 km', cuisine: 'Fresh Seafood Specialists', popularDishes: ['Butter Garlic Lobster', 'Tandoori Fish', 'Masala Calamari'] }
      ],
      local: [
        { name: 'Sea Shore Garden Restaurant', rating: 4.2, distance: '0.4 km', cuisine: 'Coastal Tamil Fish Meals', popularDishes: ['Nethili Fry', 'Crab Masala', 'Seafood Rice'] }
      ]
    },
    travelTips: [
      'Take an ECR bus or rental car from Chennai for the beautiful coastal drive.',
      'Hire an official guide at the archaeological sites to learn the intricate Pallava mythology.',
      'Check out Arjuna\'s Penance and try to "nudge" Krishna\'s Butterball, a giant boulder defying gravity.'
    ],
    weatherInfo: {
      temp: '30°C',
      tempVal: 30,
      humidity: '80%',
      wind: '14 km/h',
      forecast: 'Humid, sunny, with clear skies',
      suggestion: 'Wear a wide-brim hat, apply high SPF sunscreen, and drink fresh tender coconut water.'
    }
  },
  {
    id: 'meenakshi-temple',
    name: 'Meenakshi Temple Madurai',
    image: '/Meenakshi Amman Temple – India’s Dazzling Shrine….jpg',
    description: 'An historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu. It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva. Renowned for its 14 spectacular gopurams.',
    mapQuery: 'Meenakshi Amman Temple, Madurai, Tamil Nadu',
    bestTime: 'October to March',
    entryFee: 'Free (Special Darshan ₹50)',
    distance: '460 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.9,
    hotels: {
      budget: [
        { name: 'Hotel Supreme', rating: 3.9, price: '₹1,600', priceVal: 1600, distance: '1.1 km', amenities: ['AC Rooms', 'Rooftop Bar', 'Restaurant with Temple view'] }
      ],
      midRange: [
        { name: 'KTree Hotel', rating: 4.2, price: '₹3,500', priceVal: 3500, distance: '1.8 km', amenities: ['Modern Rooms', 'Complimentary Breakfast', 'Free High-speed Wi-Fi'] }
      ],
      luxury: [
        { name: 'Heritage Madurai', rating: 4.8, price: '₹11,000', priceVal: 11000, distance: '4.5 km', amenities: ['Heritage Villas', 'Geoffrey Bawa architecture', 'Olympic-sized Pool', 'Traditional Ayurvedic Spa'] }
      ],
      family: [
        { name: 'Poppys Hotel', rating: 4.3, price: '₹4,800', priceVal: 4800, distance: '3.0 km', amenities: ['Swimming Pool', 'Family Dining room', 'Airport Shuttles', 'Play Room'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Modern Restaurant', rating: 4.5, distance: '0.4 km', cuisine: 'Authentic Madurai Veg', popularDishes: ['Ghee Roast', 'Idiyappam with Coconut Milk', 'Mini Meals'] }
      ],
      nonVegetarian: [
        { name: 'Amma Mess', rating: 4.6, distance: '2.0 km', cuisine: 'Famous Madurai Non-Veg', popularDishes: ['Bone Marrow Omelette', 'Mutton Chukka', 'Ayira Fish Curry'] }
      ],
      local: [
        { name: 'Famous Jigarthanda Shop', rating: 4.7, distance: '0.8 km', cuisine: 'Dessert Spot', popularDishes: ['Traditional Madurai Jigarthanda', 'Basundi Jigarthanda'] }
      ]
    },
    travelTips: [
      'Strict dress codes apply for entry (no shorts, beachwear, or sleeveless tops).',
      'Electronic items, cameras, and leather belts are prohibited inside the temple premises.',
      'Sip the local specialty beverage "Jigarthanda" to beat the heat immediately after visiting the temple.'
    ],
    weatherInfo: {
      temp: '31°C',
      tempVal: 31,
      humidity: '65%',
      wind: '8 km/h',
      forecast: 'Bright Sunshine',
      suggestion: 'Visit the temple early in the morning (6 AM) or late evening (6 PM) to avoid walking on hot temple stones.'
    }
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram',
    image: '/1103452346180614704.jpg',
    description: 'Located on Pamban Island, Rameswaram is a deeply revered pilgrimage site connected to mainland India via the spectacular Pamban Rail and Road Bridge. It features the Ramanathaswamy Temple, possessing the longest temple corridor in Asia, and pristine beaches.',
    mapQuery: 'Ramanathaswamy Temple, Rameswaram, Tamil Nadu',
    bestTime: 'October to March',
    entryFee: 'Free Temple Entry (Bath of 22 wells: ₹25)',
    distance: '560 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.8,
    hotels: {
      budget: [
        { name: 'Hotel Vinayaga', rating: 4.0, price: '₹1,500', priceVal: 1500, distance: '0.5 km', amenities: ['Clean AC Rooms', 'In-house Restaurant', 'Near Railway Station'] }
      ],
      midRange: [
        { name: 'Daiwik Hotels Rameswaram', rating: 4.4, price: '₹3,800', priceVal: 3800, distance: '1.5 km', amenities: ['Ayurvedic Spa Centre', 'Pilgrim Desk Assist', 'Spacious Veg Restaurant', 'Gym'] }
      ],
      luxury: [
        { name: 'Hotel Rameswaram Grand Palace', rating: 4.5, price: '₹7,500', priceVal: 7500, distance: '0.8 km', amenities: ['Premium Family Suites', 'Lounge Bar', 'Sightseeing Guides', 'Gourmet Meals'] }
      ],
      family: [
        { name: 'Jiwan Residency', rating: 4.2, price: '₹4,200', priceVal: 4200, distance: '0.2 km (Sea Front)', amenities: ['Sea-facing Rooms', 'Close to Temple East Tower', 'Family Dining Room'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Gujarat Bhavan Veg Dining', rating: 4.3, distance: '0.3 km', cuisine: 'Pure Veg North/West Indian', popularDishes: ['Veg Thali', 'Khaman Dhokla', 'Khichdi'] }
      ],
      nonVegetarian: [
        { name: 'Seafood Express', rating: 4.1, distance: '1.2 km', cuisine: 'Seafood and Biryani', popularDishes: ['Masala Crab Fry', 'Prawn Biryani', 'Fried Fish'] }
      ],
      local: [
        { name: 'Ramanathaswamy Temple Prasadam', rating: 4.7, distance: '0.1 km', cuisine: 'Temple Food', popularDishes: ['Tamarind Puliyodharai Rice', 'Sweet pongal (Chakkara Pongal)'] }
      ]
    },
    travelTips: [
      'Take a dip in the holy Agnitheertham ocean, then bathe at the 22 spring-water wells inside the temple.',
      'Take a local 4WD taxi to Dhanushkodi, the ghost town at the Southernmost tip of India facing Sri Lanka.',
      'Cross the century-old Pamban Railway bridge for a stunning, once-in-a-lifetime view of ocean blue.'
    ],
    weatherInfo: {
      temp: '29°C',
      tempVal: 29,
      humidity: '82%',
      wind: '22 km/h',
      forecast: 'Breezy and Humid',
      suggestion: 'Cotton clothes are essential. Watch out for sea-winds when on the bridges.'
    }
  },
  {
    id: 'yercaud',
    name: 'Yercaud',
    image: '/1007117535404521704.jpg',
    description: 'A beautiful hill station located in the Shevaroy Hills of the Eastern Ghats. Known as the "Jewel of the South", Yercaud is surrounded by coffee plantations, orange orchards, and a central emerald lake.',
    mapQuery: 'Yercaud Lake, Salem, Tamil Nadu',
    bestTime: 'October to February',
    entryFee: 'Free (Central botanical gardens ₹30)',
    distance: '360 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.4,
    hotels: {
      budget: [
        { name: 'Yercaud Rock Perch Hostel', rating: 4.0, price: '₹1,100', priceVal: 1100, distance: '1.0 km', amenities: ['Shared Lounge', 'Campfire Circle', 'Board Games', 'Mountain trail walk'] }
      ],
      midRange: [
        { name: 'Grand Palace Hotel & Spa', rating: 4.3, price: '₹4,500', priceVal: 4500, distance: '0.5 km (On Hilltop)', amenities: ['Panoramic Views', 'Spa', 'Multi-cuisine Dining', 'Infinity Grass Lawn'] }
      ],
      luxury: [
        { name: 'Grange Resort Yercaud', rating: 4.6, price: '₹8,500', priceVal: 8500, distance: '2.2 km', amenities: ['Adventure Camp activities', 'Private Coffee Plantation view', 'Eco-villas', 'Campfire'] }
      ],
      family: [
        { name: 'Sterling Yercaud', rating: 4.4, price: '₹6,000', priceVal: 6000, distance: '1.4 km', amenities: ['Valley View Balcony', 'Adventure Zone', 'Indoor Games Room', 'Bonfire with Music'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Sri Saravana Bhavan Veg', rating: 4.1, distance: '0.2 km', cuisine: 'Pure South Veg', popularDishes: ['Spl Ghee Roast', 'Parotta Kurma', 'Curd Rice'] }
      ],
      nonVegetarian: [
        { name: 'The Orange Restaurant', rating: 4.3, distance: '0.6 km', cuisine: 'Indian & Tandoor', popularDishes: ['Pepper Mutton Fry', 'Tandoori Chicken', 'Fish Curry'] }
      ],
      local: [
        { name: 'Lake View Tea & Corn Stall', rating: 4.4, distance: '0.1 km', cuisine: 'Highland Street Snacks', popularDishes: ['Freshly Brewed Ginger Tea', 'Fried Corn Bajji', 'Masala Maggie'] }
      ]
    },
    travelTips: [
      'Take the 20-hairpin-bend mountain road from Salem city for a scenic driving thrill.',
      'Visit the Kiliyur Falls, particularly stunning right after the winter monsoons.',
      'Stroll through the local coffee plantations and buy locally-harvested spices, coffee powder, and fresh pears.'
    ],
    weatherInfo: {
      temp: '22°C',
      tempVal: 22,
      humidity: '64%',
      wind: '12 km/h',
      forecast: 'Pleasant, cool mountain air',
      suggestion: 'A light sweater is perfect for nighttime. Great place for a peaceful getaway.'
    }
  },
  {
    id: 'thanjavur-temple',
    name: 'Brihadeeswarar Temple Thanjavur',
    image: '/temple.jpg',
    description: 'A UNESCO World Heritage site and a brilliant marvel of Chola architecture. Built by Raja Raja Chola I in 1010 AD, Brihadeeswarar Temple (widely known as the Big Temple) is constructed entirely of granite and boasts a giant vimanam tower that casts no shadow at noon.',
    mapQuery: 'Brihadeeswarar Temple, Thanjavur, Tamil Nadu',
    bestTime: 'October to March',
    entryFee: 'Free Entry',
    distance: '340 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.9,
    hotels: {
      budget: [
        { name: 'Hotel Gnanam', rating: 4.0, price: '₹1,500', priceVal: 1500, distance: '1.0 km', amenities: ['Clean Rooms', 'AC', 'Veg Restaurant', 'Near Bus Stand'] }
      ],
      midRange: [
        { name: 'Svatma Thanjavur', rating: 4.7, price: '₹5,500', priceVal: 5500, distance: '2.5 km', amenities: ['Chola Art Gallery', 'Ethnic Spa', 'Classical Carnatic Music performance', 'Lush Gardens'] }
      ],
      luxury: [
        { name: 'Ideal River Resort', rating: 4.4, price: '₹7,200', priceVal: 7200, distance: '4.8 km (Riverside)', amenities: ['Cauvery River views', 'Swimming Pool', 'Ayurvedic Spa Massage', 'Lawn Bar'] }
      ],
      family: [
        { name: 'Hotel Sangam', rating: 4.2, price: '₹3,900', priceVal: 3900, distance: '1.2 km', amenities: ['Swimming Pool', 'Kids Play Lawn', 'Multi-cuisine Restaurant', 'Tour Desk'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Sree Ariya Bhavan Veg', rating: 4.3, distance: '0.4 km', cuisine: 'Traditional Chola Veg', popularDishes: ['Tamil Nadu Meals', 'Filter Coffee', 'Sweet Kesari'] }
      ],
      nonVegetarian: [
        { name: 'Thillana Restaurant', rating: 4.2, distance: '1.1 km', cuisine: 'Chettinad Cuisine', popularDishes: ['Chicken Chettinad', 'Kari Parotta', 'Pepper Crab'] }
      ],
      local: [
        { name: 'Thanjavur Royal Palace Tea stall', rating: 4.5, distance: '0.5 km', cuisine: 'Filter Coffee & Snacks', popularDishes: ['Traditional Kumbakonam Degree Coffee', 'Medhu Vada'] }
      ]
    },
    travelTips: [
      'Take photos before sunset as the entire granite vimanam glows golden in the twilight.',
      'Purchase the authentic dancing Thanjavur dolls (Thalaiyaatti Bommai) and genuine Thanjavur Paintings.',
      'Explore the nearby Maratha Palace Complex which houses the legendary Saraswathi Mahal Library.'
    ],
    weatherInfo: {
      temp: '32°C',
      tempVal: 32,
      humidity: '70%',
      wind: '7 km/h',
      forecast: 'Sunny and warm inland weather',
      suggestion: 'Carry plenty of water. Walking bare feet on the stone courtyards can be hot; search for the carpeted walkways.'
    }
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    image: '/trivandrum-kanyakumari-rameshwaram-madurai-4n-5d.jpg',
    description: 'The southernmost tip of the Indian subcontinent, where the Arabian Sea, Indian Ocean, and Bay of Bengal converge. Noted for its breathtaking views of sunrise and sunset over the ocean, the majestic Vivekananda Rock Memorial, and the towering 133-foot Thiruvalluvar Statue.',
    mapQuery: 'Vivekananda Rock Memorial, Kanyakumari, Tamil Nadu',
    bestTime: 'October to March',
    entryFee: 'Free (Ferry to Memorial: ₹75)',
    distance: '700 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.7,
    hotels: {
      budget: [
        { name: 'Hotel Sea Face', rating: 3.8, price: '₹1,200', priceVal: 1200, distance: '0.2 km', amenities: ['Basic Rooms', 'Sea Breeze windows', 'Wifi', 'Travel Desk'] }
      ],
      midRange: [
        { name: 'Hotel Sea View', rating: 4.3, price: '₹3,400', priceVal: 3400, distance: '0.1 km', amenities: ['Guaranteed Sea-facing Balcony', 'Rooftop Lounge Bar', 'Multi-cuisine Restaurant'] }
      ],
      luxury: [
        { name: 'Anantya Resorts', rating: 4.7, price: '₹11,500', priceVal: 11500, distance: '35 km (Lake-facing)', amenities: ['Infinity Pool', 'Lakefront Villas', 'Private Jaccuzi', 'Soma Ayurveda Spa'] }
      ],
      family: [
        { name: 'Sparsa Resort Kanyakumari', rating: 4.4, price: '₹5,500', priceVal: 5500, distance: '0.4 km', amenities: ['Sea View Swimming Pool', 'Gym', 'Kids Play Area', 'Eco-friendly design'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Hotel Saravana pure veg', rating: 4.2, distance: '0.3 km', cuisine: 'Pure Vegetarian', popularDishes: ['Paper roast dosa', 'South Indian mini thali', 'Idli-vada combo'] }
      ],
      nonVegetarian: [
        { name: 'The Ocean Restaurant', rating: 4.4, distance: '0.2 km', cuisine: 'Seafood and Malabar cuisine', popularDishes: ['Kerala Fish Curry', 'Nadan Beef/Chicken Fry', 'Malabar Biryani'] }
      ],
      local: [
        { name: 'Sunset beachside sea-stalls', rating: 4.3, distance: '0.1 km', cuisine: 'Local Fried fish', popularDishes: ['Chili Masala Fish fry', 'Tender coconut', 'Mango pickle slices'] }
      ]
    },
    travelTips: [
      'Wake up early (5:30 AM) to witness the sunrise and sunset over the three oceans from the viewpoint.',
      'Take the short ferry to visit Vivekananda Rock Memorial and standing Thiruvalluvar Statue.',
      'Collect multi-colored beach sands in small packets as a beautiful, traditional memento.'
    ],
    weatherInfo: {
      temp: '29°C',
      tempVal: 29,
      humidity: '79%',
      wind: '25 km/h',
      forecast: 'Breezy coastal weather with crashing ocean waves',
      suggestion: 'Cotton wear is vital. Perfect to stand on the shore cliffs enjoying sunset.'
    }
  },
  {
    id: 'courtallam-falls',
    name: 'Courtallam Falls (Kuttalam)',
    image: '/kutralam_falls_tamilnadu.jpg',
    description: 'Often called the "Spa of South India", Courtallam is famous for numerous forest waterfalls. The waters flow over medicinal herbs in the Western Ghats forest, giving them healing properties that attract tourists for restorative baths.',
    mapQuery: 'Main Falls, Courtallam, Tamil Nadu',
    bestTime: 'June to September (Monsoon season)',
    entryFee: 'Free Entry',
    distance: '620 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.5,
    hotels: {
      budget: [
        { name: 'Srinivas Regency', rating: 3.8, price: '₹1,300', priceVal: 1300, distance: '0.8 km', amenities: ['Clean bed & shower', 'AC', '24h hot water'] }
      ],
      midRange: [
        { name: 'Saaral Resort', rating: 4.2, price: '₹3,500', priceVal: 3500, distance: '1.5 km', amenities: ['Waterfall views', 'Swimming Pool', 'Lush Green Gardens', 'Wifi'] }
      ],
      luxury: [
        { name: 'The Kuttalam Heritage Resort', rating: 4.4, price: '₹6,500', priceVal: 6500, distance: '2.0 km', amenities: ['Wooden Cottages', 'Natural River view pool', 'Spa treatments'] }
      ],
      family: [
        { name: 'Esakki Castle', rating: 4.1, price: '₹2,800', priceVal: 2800, distance: '0.5 km (Near Main Falls)', amenities: ['Spacious Family suites', 'Central dining hall', 'Parking'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Sri Saravana Bhavan Veg', rating: 4.0, distance: '0.2 km', cuisine: 'Pure South vegetarian', popularDishes: ['Sambar Vadai', 'Poori Masala', 'Ghee roast'] }
      ],
      nonVegetarian: [
        { name: 'Rahmath Border Parotta stall', rating: 4.7, distance: '6.0 km (Sengottai)', cuisine: 'Legendary Local Non-Veg', popularDishes: ['Coin Parotta', 'Country Chicken fry', 'Salna Gravy'] }
      ],
      local: [
        { name: 'Courtallam street tea & hot bajjis', rating: 4.5, distance: '0.1 km', cuisine: 'Monsoon street snacks', popularDishes: ['Onion Bajji with coconut chutney', 'Fresh piping Banana bajji'] }
      ]
    },
    travelTips: [
      'Take a safe bath at the Main Falls or Five Falls, where steps and iron railings are installed.',
      'Visit Sengottai Rahmath Parotta Stall (famous local restaurant) nearby for the iconic local Parotta and Chicken Fry.',
      'Keep your bags and food items secure from playful monkeys that inhabit the hills.'
    ],
    weatherInfo: {
      temp: '26°C',
      tempVal: 26,
      humidity: '85%',
      wind: '16 km/h',
      forecast: 'Cool monsoonal showers with pleasant spray',
      suggestion: 'Keep towels and extra clothes handy as bathing in the healing waters is the prime activity.'
    }
  },
  {
    id: 'hogenakkal-falls',
    name: 'Hogenakkal Falls',
    image: '/hogenakkal_falls_tamilnadu.jpg',
    description: 'Referred to as the "Niagara of India", Hogenakkal is situated on the Kaveri River in Dharmapuri. Known for carbonatite rocks, natural waterfalls, therapeutic oil bath massages, and local coracle (circular wicker boat) rides.',
    mapQuery: 'Hogenakkal Falls, Tamil Nadu',
    bestTime: 'October to March (Post monsoons)',
    entryFee: 'Free (Coracle ride: ₹750/boat)',
    distance: '340 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.6,
    hotels: {
      budget: [
        { name: 'Hotel Tamil Nadu Hogenakkal', rating: 3.9, price: '₹1,500', priceVal: 1500, distance: '0.2 km', amenities: ['Government operated', 'Clean Rooms', 'Lawn restaurant', 'Bar'] }
      ],
      midRange: [
        { name: 'CM Hotel & Lodging', rating: 3.8, price: '₹2,500', priceVal: 2500, distance: '1.5 km', amenities: ['Hot water', 'AC', 'Parking space', 'Near boat terminal'] }
      ],
      luxury: [
        { name: 'The Windflower Resort & Spa', rating: 4.5, price: '₹8,500', priceVal: 8500, distance: '55 km (In nearby Yercaud/Salem)', amenities: ['Luxury villas', 'Spa services', 'Multi-cuisine restaurant'] }
      ],
      family: [
        { name: 'Pranaam Heritage Guest House', rating: 4.0, price: '₹3,200', priceVal: 3200, distance: '2.0 km', amenities: ['Quiet garden', 'Private kitchen option', 'Local guide referral'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Vasavi vegetarian mess', rating: 4.1, distance: '0.4 km', cuisine: 'Pure Veg Home style', popularDishes: ['Tamil Veg Lunch Meals', 'Curd Vada'] }
      ],
      nonVegetarian: [
        { name: 'Riverside Fresh Fish Stall', rating: 4.6, distance: '0.1 km', cuisine: 'Instantly Fresh River Fish', popularDishes: ['Crispy Rohu/Katla Fish Fry', 'Masala Fish Curry'] }
      ],
      local: [
        { name: 'Kaveri River Coracle Sellers', rating: 4.3, distance: '0.1 km', cuisine: 'Street Food', popularDishes: ['Freshly fried river fish', 'Tender coconuts'] }
      ]
    },
    travelTips: [
      'Take a circular Coracle boat ride under the mighty spraying gorge of waterfalls.',
      'Get a traditional full-body herbal oil massage from veteran local masseurs (Malish-karars).',
      'Choose a licensed fish stall on the banks to select fresh river catch and have it fried immediately.'
    ],
    weatherInfo: {
      temp: '29°C',
      tempVal: 29,
      humidity: '72%',
      wind: '8 km/h',
      forecast: 'Warm and sunny with high river currents',
      suggestion: 'Wear slip-resistant footwear and do not enter unauthorized whirlpool areas.'
    }
  },
  {
    id: 'yelagiri',
    name: 'Yelagiri Hills',
    image: '/Yelagiri Hills.jpg',
    description: 'A peaceful, lesser-known hill station in Vellore district. Surrounded by orchards, rose gardens, and green valleys, Yelagiri is ideal for trekking, rock climbing, paragliding, and a quiet weekend retreat.',
    mapQuery: 'Yelagiri Hills, Vellore, Tamil Nadu',
    bestTime: 'November to February',
    entryFee: 'Free (Central boathouse and adventure parks: ₹20)',
    distance: '230 km from Chennai',
    category: 'Tamil Nadu',
    ratings: 4.3,
    hotels: {
      budget: [
        { name: 'Yelagiri Youth Hostel', rating: 3.9, price: '₹1,000', priceVal: 1000, distance: '1.2 km', amenities: ['Backpacker vibe', 'Shared dorms', 'Campfire area', 'Hiking guide'] }
      ],
      midRange: [
        { name: 'Hotel Landmark Yelagiri', rating: 4.2, price: '₹3,000', priceVal: 3000, distance: '0.4 km', amenities: ['Large Swimming Pool', 'Multi-cuisine Dine-in', 'Indoor game zone'] }
      ],
      luxury: [
        { name: 'Marigold Ridge - Sterling Resorts', rating: 4.5, price: '₹6,800', priceVal: 6800, distance: '1.1 km', amenities: ['Valleys view', 'Folk dance shows', 'Adventure park access', 'Luxury clubhouse'] }
      ],
      family: [
        { name: 'Rhythm Lake View Resort', rating: 4.1, price: '₹3,600', priceVal: 3600, distance: '0.1 km (Near Lake)', amenities: ['Puganoor Lake view', 'AC Rooms', 'Kids swing set', 'Bonfire'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Sri Saravana Bhavan Veg', rating: 4.0, distance: '0.3 km', cuisine: 'South Veg', popularDishes: ['Special butter dosa', 'Steaming hot Idlis', 'Veg Fried rice'] }
      ],
      nonVegetarian: [
        { name: 'Nilgiri Restaurant', rating: 4.2, distance: '0.5 km', cuisine: 'Indian & Mughlai', popularDishes: ['Chicken Kabab', 'Kadai Mutton', 'Egg Biryani'] }
      ],
      local: [
        { name: 'Yelagiri Nature Park stalls', rating: 4.3, distance: '0.2 km', cuisine: 'Local Fruit & Snacks', popularDishes: ['Fresh organic Guavas & Pears', 'Masala Corn Cups'] }
      ]
    },
    travelTips: [
      'Stroll slowly around Puganoor Lake or hire a paddle boat for a peaceful cruise.',
      'If you love adventure, visit the Yelagiri Adventure Sports Association (YASA) for paragliding.',
      'Buy locally-harvested honey, fresh orchard fruits, and homemade jackfruit chips.'
    ],
    weatherInfo: {
      temp: '22°C',
      tempVal: 22,
      humidity: '59%',
      wind: '11 km/h',
      forecast: 'Cool and dry climate with mild mountain air',
      suggestion: 'Pack a windcheater or light cardigan for cool mountain evenings.'
    }
  }
];

export const INDIA_DESTINATIONS: Destination[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Taj_Mahal_in_March_2004.jpg',
    description: 'An ivory-white marble mausoleum on the south bank of the Yamuna River in the historic city of Agra. Commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. One of the Seven Wonders of the World.',
    mapQuery: 'Taj Mahal, Agra, Uttar Pradesh',
    bestTime: 'October to March (Autumn to Spring)',
    entryFee: '₹50 (Indians), ₹1,100 (Foreigners)',
    distance: '200 km from Delhi (NCR)',
    category: 'India',
    ratings: 5.0,
    hotels: {
      budget: [
        { name: 'Tajview Backpacker Hostel', rating: 4.1, price: '₹800', priceVal: 800, distance: '1.2 km', amenities: ['Rooftop Taj View', 'Dorm & Private beds', 'Free Wifi', 'Cafe'] }
      ],
      midRange: [
        { name: 'Howard Plaza The Fern', rating: 4.3, price: '₹3,500', priceVal: 3500, distance: '1.5 km', amenities: ['Swimming Pool', 'Spa', 'Tea lounge', 'Near Eastern Gate'] }
      ],
      luxury: [
        { name: 'The Oberoi Amarvilas Agra', rating: 5.0, price: '₹28,000', priceVal: 28000, distance: '0.6 km', amenities: ['Every Room has Taj View', 'World-class Pool', 'Royal Spa', 'Bar Lounge'] }
      ],
      family: [
        { name: 'Radisson Hotel Agra', rating: 4.5, price: '₹5,200', priceVal: 5200, distance: '1.0 km', amenities: ['Rooftop Pool', 'Family Suites', 'In-house kids activities', 'Dining'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Sheroes Hangout pure veg Cafe', rating: 4.8, distance: '1.5 km', cuisine: 'Indian & Cafe', popularDishes: ['Shahi Paneer', 'Crispy Pakora', 'Ginger Tea'] }
      ],
      nonVegetarian: [
        { name: 'Peshawri (ITC Mughal)', rating: 4.9, distance: '2.2 km', cuisine: 'Tandoor Mughal', popularDishes: ['Dal Bukhara', 'Sikandari Raan', 'Butter Naan'] }
      ],
      local: [
        { name: 'Panchi Petha Shop', rating: 4.6, distance: '0.8 km', cuisine: 'Traditional Sweets', popularDishes: ['Angoori Petha', 'Kesar Petha', 'Dry-fruit Petha'] }
      ]
    },
    travelTips: [
      'Taj Mahal is closed on Fridays for general public viewing.',
      'Book tickets online early via the ASI website to skip massive booking line queues.',
      'Visit Taj during sunrise for a spellbinding white marble glow with minimal crowds.'
    ],
    weatherInfo: {
      temp: '28°C',
      tempVal: 28,
      humidity: '50%',
      wind: '10 km/h',
      forecast: 'Clear skies with pleasant light breeze',
      suggestion: 'Wear comfortable walking shoes. No large bags or phone charger cords are permitted inside.'
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur (The Pink City)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_2016.jpg',
    description: 'The capital of Rajasthan, majestic jaipur is known as the "Pink City" due to the colored sandstone of its architectural marvels. Home to royal royal fortresses, majestic palaces (Hawa Mahal, City Palace), and bustling traditional bazaars.',
    mapQuery: 'Hawa Mahal, Jaipur, Rajasthan',
    bestTime: 'October to March (Pleasant desert air)',
    entryFee: 'Combo Ticket ₹300-₹1000 for monuments',
    distance: '270 km from Delhi',
    category: 'India',
    ratings: 4.9,
    hotels: {
      budget: [
        { name: 'Moustache Hostel Jaipur', rating: 4.2, price: '₹900', priceVal: 900, distance: '1.0 km', amenities: ['Artistic Rooftop', 'Indoor Pool', 'Dorm & AC Suites', 'Wifi'] }
      ],
      midRange: [
        { name: 'Alsisar Haveli', rating: 4.6, price: '₹5,000', priceVal: 5000, distance: '1.2 km', amenities: ['Heritage Mansion', 'Royal Pool', 'Puppet Shows', 'Antique Decor'] }
      ],
      luxury: [
        { name: 'Rambagh Palace (Taj)', rating: 5.0, price: '₹35,000', priceVal: 35000, distance: '4.0 km', amenities: ['Actual Royal Palace stay', 'Peacock Gardens', 'Indoor & Outdoor pools'] }
      ],
      family: [
        { name: 'Shahpura House', rating: 4.5, price: '₹4,800', priceVal: 4800, distance: '2.5 km', amenities: ['Family Suites', 'Rooftop Rajasthani Folk music', 'Traditional Pool'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Laxmi Mishthan Bhandar (LMB)', rating: 4.4, distance: '0.2 km', cuisine: 'Royal Rajasthani Veg', popularDishes: ['Rajasthani Thali', 'Pyaaz Kachori', 'Ghewar sweet'] }
      ],
      nonVegetarian: [
        { name: 'Chokhi Dhani Ethnic Resort', rating: 4.7, distance: '15 km', cuisine: 'Cultural Dining Experience', popularDishes: ['Dal Bati Churma', 'Laal Maas', 'Bajre ki Khichdi'] }
      ],
      local: [
        { name: 'Rawat Mishthan Bhandar', rating: 4.5, distance: '1.0 km', cuisine: 'Local Snacks', popularDishes: ['Legendary Pyaaz Ki Kachori', 'Mawa Kachori'] }
      ]
    },
    travelTips: [
      'Buy a composite heritage ticket to get cheaper access to Amber Fort, Albert Hall, and Jantar Mantar.',
      'Hire a verified guide at Amber Fort to understand the secret mountain escape passages.',
      'Shop for authentic blue pottery, bandhani sarees, and block-print cotton bedsheets.'
    ],
    weatherInfo: {
      temp: '26°C',
      tempVal: 26,
      humidity: '42%',
      wind: '12 km/h',
      forecast: 'Cool pleasant winds, mild sun',
      suggestion: 'Perfect walking weather. Sunglasses and broad hats are useful during midday tours.'
    }
  },
  {
    id: 'goa',
    name: 'Goa Beaches',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Agonda_beach_Goa.jpg',
    description: 'A pocket-sized paradise on the western coast facing the Arabian Sea. Renowned for its golden sands, coconut groves, vibrant retro-portuguese architecture, bustling beach shacks, night markets, and thrilling watersports.',
    mapQuery: 'Calangute Beach, Goa',
    bestTime: 'November to February (Sun & Parties)',
    entryFee: 'Free Beach Entry',
    distance: '950 km from Mumbai / 900 km from Bangalore',
    category: 'India',
    ratings: 4.8,
    hotels: {
      budget: [
        { name: 'Red Door back-packer Hostel Anjuna', rating: 4.0, price: '₹900', priceVal: 900, distance: '0.5 km', amenities: ['Chill BBQ Lawn', 'AC Dorms', 'Bar', 'Backpacker vibe'] }
      ],
      midRange: [
        { name: 'Estrela Do Mar Beach Resort', rating: 4.3, price: '₹4,500', priceVal: 4500, distance: '0.1 km (Calangute)', amenities: ['Direct Beach shack access', 'Pool', 'Cocktail bar'] }
      ],
      luxury: [
        { name: 'Taj Exotica Resort & Spa Goa', rating: 4.9, price: '₹18,500', priceVal: 18500, distance: 'Benaulim beachfront', amenities: ['Private white beachfront', 'Championship Golf', 'Jiva Spa'] }
      ],
      family: [
        { name: 'Novotel Goa Resort & Spa', rating: 4.4, price: '₹7,000', priceVal: 7000, distance: '1.8 km to Candolim', amenities: ['Huge Family pool', 'Kids club games', 'Jacuzzi', 'Cycle hire'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Curlies Pure Vegetarian Diner', rating: 4.1, distance: '0.2 km', cuisine: 'Local and Multi-veg', popularDishes: ['Veg Fried calamari style', 'Veg Thali', 'Fresh watermelon juice'] }
      ],
      nonVegetarian: [
        { name: 'Britto\'s Beach Shack Baga', rating: 4.5, distance: '0.1 km', cuisine: 'Fresh Sea Catch & Goan pork', popularDishes: ['Goan Fish Curry Rice', 'Pork Vindaloo', 'Crab Masala'] }
      ],
      local: [
        { name: 'Fishermans Wharf', rating: 4.6, distance: '5.0 km', cuisine: 'Traditional Goan Catholic', popularDishes: ['Bebinca dessert', 'Recheado Pomfret', 'Prawn Balchao'] }
      ]
    },
    travelTips: [
      'Rent a gearless scooter/scooty (standard Goan practice) for ₹300-₹500 per day for the best exploration.',
      'Savor the authentic Goan Bebinca, a warm multi-layered traditional dessert made with coconut milk.',
      'Ensure you practice beach safety and stay within marked safe zones flagged by lifeguards.'
    ],
    weatherInfo: {
      temp: '31°C',
      tempVal: 31,
      humidity: '76%',
      wind: '14 km/h',
      forecast: 'Sunny beach weather with tropical coastal winds',
      suggestion: 'Pack beachwear, shades, and light linen shirts. Stay under the palm shade during noon hours.'
    }
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters Alappuzha',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Alappuzha_Houseboat_Kerala.jpg',
    description: 'An enchanting network of interconnected brackish rivers, lakes, and coastal lagoons in Kerala. Staying on a traditional visual woven Houseboat (Kettuvallam) cruising alongside green paddy fields and towering palms is a legendary experience.',
    mapQuery: 'Alappuzha Backwaters, Kerala',
    bestTime: 'September to March',
    entryFee: 'Free (Houseboats vary ₹7,000 - ₹25,000 per night)',
    distance: '750 km from Chennai',
    category: 'India',
    ratings: 4.9,
    hotels: {
      budget: [
        { name: 'Palmera Backpacker Haveli', rating: 4.1, price: '₹1,200', priceVal: 1200, distance: '1.0 km', amenities: ['Canal view deck', 'Bamboo huts', 'Free Canoe rental'] }
      ],
      midRange: [
        { name: 'Lake Palace Resort Alappuzha', rating: 4.4, price: '₹5,500', priceVal: 5500, distance: '0.2 km (Vembanad Lake)', amenities: ['Island villas', 'Waterfront dining', 'Traditional Pool'] }
      ],
      luxury: [
        { name: 'Kumarakom Lake Resort', rating: 4.9, price: '₹19,000', priceVal: 19000, distance: 'Kumarakom front', amenities: ['Heritage Villas with private plunge pool', 'Traditional Houseboat dock'] }
      ],
      family: [
        { name: 'Lemon Tree Vembanad Lake Resort', rating: 4.3, price: '₹6,200', priceVal: 6200, distance: '0.1 km', amenities: ['Lakefront infinity Pool', 'Kids Play Area', 'Ayurvedic Massage Spa'] }
      ]
    },
    restaurants: {
      vegetarian: [
        { name: 'Chakara Pure Veg Diner', rating: 4.2, distance: '1.2 km', cuisine: 'Kerala Sadya specialties', popularDishes: ['Avial', 'Veg Malabar Stew with Appam', 'Payasam'] }
      ],
      nonVegetarian: [
        { name: 'Thaff Delicacy', rating: 4.4, distance: '0.8 km', cuisine: 'Kerala Syrian & Biryani', popularDishes: ['Karimeen Pollichathu (Pearlspot fish)', 'Beef Fry (Ularthiyathu)', 'Malabar Chicken Biryani'] }
      ],
      local: [
        { name: 'Backwater Houseboat Kitchen', rating: 4.8, distance: '0.1 km', cuisine: 'Traditional Boat Food', popularDishes: ['Kappa with Meen Curry', 'Fried Tapioca', 'Toddy Shop style Crab'] }
      ]
    },
    travelTips: [
      'Choose a houseboat with air conditioning if you are traveling during warm afternoon hours.',
      'Visit in August to witness the spectacular, adrenaline-pumping Nehru Trophy Snake Boat Race.',
      'Avail the authentic, healing Ayurvedic full-body head-to-toe herbal oil massages (Abhyanga).'
    ],
    weatherInfo: {
      temp: '28°C',
      tempVal: 28,
      humidity: '82%',
      wind: '9 km/h',
      forecast: 'Tropical, calm humid breeze over waterways',
      suggestion: 'Carry insect mosquito repellents for evening house-boat cruises. Perfect for romantic or family retreats.'
    }
  }
];

export const ALL_DESTINATIONS: Destination[] = [
  ...TAMIL_NADU_DESTINATIONS,
  ...INDIA_DESTINATIONS,
  // Let us add remaining India destinations requests programmatically as they come or provide simulated fallback for others.
  // Wait, let's include mock data outlines for the rest so if a user requests them, we can return the exact data cleanly.
];

// Fallback metadata for any other India Destination that was specifically requested:
// [Mysore Palace, Golden Temple, Charminar, Gateway of India, Ladakh, Kashmir, Shimla, Manali, Andaman Islands]
export const OTHER_INDIA_DESTINATIONS_DATA: Record<string, Partial<Destination>> = {
  'mysore-palace': {
    id: 'mysore-palace',
    name: 'Mysore Palace',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Mysore_Palace_Illumination_India.jpg',
    description: 'An incredibly grand historical palace and the official residence of the Wadiyar dynasty in Mysore, Karnataka. Famous for its Indo-Saracenic architectural design, beautiful arches, and breathtaking night illumination with over 97,000 lightbulbs.',
    mapQuery: 'Mysore Palace, Mysuru, Karnataka',
    bestTime: 'October to March (Dasara Festival is spectacular)',
    entryFee: '₹100 (Indians), ₹200 (Foreigners)',
    distance: '480 km from Chennai',
    category: 'India',
    ratings: 4.8,
    travelTips: ['Shoes must be deposited outside before entering the palace halls.', 'Visit on Sunday nights or holidays between 7 PM and 7:45 PM to see the complete palace illuminated.', 'Explore the Royal Museum inside holding antique weapons and rich portraits.'],
    weatherInfo: { temp: '27°C', tempVal: 27, humidity: '55%', wind: '9 km/h', forecast: 'Clear, breezy', suggestion: 'Perfect evening sightseeing destination.' }
  },
  'golden-temple': {
    id: 'golden-temple',
    name: 'Golden Temple Amritsar (Harmandir Sahib)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Golden_Temple_Amritsar_early_morning.jpg',
    description: 'The preeminent spiritual sanctuary of Sikhism, situated in the city of Amritsar, Punjab. Possesses a gold-plated shrine surrounded by a sacred pool (Amrit Sarovar). Houses the Langar hall, the world\'s largest free kitchen serving over 100,000 hot meals daily.',
    mapQuery: 'Harmandir Sahib, Amritsar, Punjab',
    bestTime: 'October to March',
    entryFee: 'Free Entry / Welcome to All',
    distance: '450 km from Delhi',
    category: 'India',
    ratings: 5.0,
    travelTips: ['Keep your head covered with a scarf/bandana at all times within the temple perimeter.', 'Remove your shoes and wash your hands/feet at the entry pools before stepping on the historical marble.', 'Tasting the sacred hot Karah Parshad and sitting for Langar is a profoundly beautiful, humbling experience.'],
    weatherInfo: { temp: '22°C', tempVal: 22, humidity: '50%', wind: '8 km/h', forecast: 'Cool and serene breeze', suggestion: 'Visit late in the evening when the glistening golden dome is illuminated against clear skies.' }
  },
  'charminar': {
    id: 'charminar',
    name: 'Charminar Hyderabad',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Charminar_Hyderabad.jpg',
    description: 'Constructed in 1591, Charminar (literally "Four Minarets") is a global symbol of Hyderabad. A beautiful monument and mosque with elegant arches, located at the center of a bustling bazaar famous for pearls and traditional biryani.',
    mapQuery: 'Charminar, Hyderabad, Telangana',
    bestTime: 'October to March',
    entryFee: '₹40 (Indians), ₹300 (Foreigners)',
    distance: '620 km from Chennai',
    category: 'India',
    ratings: 4.6,
    travelTips: ['Climb the spiral stairs inside for a beautiful grid view of the pearl bazaars.', 'Try the authentic local Irani Chai and Osmania Biscuits at nearby Nimrah Cafe.', 'Be prepared for rich crowds, and secure your belongings in the busy market.'],
    weatherInfo: { temp: '30°C', tempVal: 30, humidity: '60%', wind: '12 km/h', forecast: 'Warmer sunny day', suggestion: 'Wear light slippers. Hydrate often using sweet sugarcane juices.' }
  },
  'gateway-of-india': {
    id: 'gateway-of-india',
    name: 'Gateway of India Mumbai',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Gateway_of_India_Mumbai.jpg',
    description: 'An arch-monument built in the early twentieth century to commemorate the visit of King George V and Queen Mary. Nestled on the waterfront in Mumbai, facing the Arabian Sea and right next to the iconic Taj Mahal Palace Hotel.',
    mapQuery: 'Gateway of India, Colaba, Mumbai, Maharashtra',
    bestTime: 'October to March',
    entryFee: 'Free Entry',
    distance: '1000 km from Chennai',
    category: 'India',
    ratings: 4.7,
    travelTips: ['Take a scenic ferry ride from the Gateway jetty to visit the historic Elephanta Caves.', 'Visit during sunset for breezy seaside views and lively street photographs.', 'Take a high tea at the Taj Palace Hotel next door to experience royal luxury Mumbai style.'],
    weatherInfo: { temp: '31°C', tempVal: 31, humidity: '72%', wind: '15 km/h', forecast: 'Humid sea breezes', suggestion: 'Walk around Colaba Causeway after visiting.' }
  },
  'ladakh': {
    id: 'ladakh',
    name: 'Ladakh (The Land of High Passes)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Pangong_Lake_Ladakh.jpg',
    description: 'A striking high-altitude cold desert in the Himalayas. Famous for sapphire-blue lakes (Pangong Tso), dramatic snow-covered passes (Khardung La), ancient white Tibetan monasteries, and magnificent mountain biking routes.',
    mapQuery: 'Leh Ladakh, Jammu and Kashmir',
    bestTime: 'May to September (High Summer)',
    entryFee: 'Varies (Inner Line Permit is required for remote areas like Pangong: ₹600)',
    distance: '1000 km from Delhi',
    category: 'India',
    ratings: 4.9,
    travelTips: ['Spend the first 24-48 hours resting completely in Leh to acclimatize to high altitude (prevent AMS).', 'Carry offline maps and post-paid SIM connections (BSNL/Airtel work best).', 'Ensure you pack multiple thermal layers, as desert temperatures plummet rapidly at night.'],
    weatherInfo: { temp: '14°C', tempVal: 14, humidity: '30%', wind: '20 km/h', forecast: 'Brisk, cold, dry wind with direct sun', suggestion: 'Apply sunscreen liberally to prevent rapid altitude burns, and wear polarized shades.' }
  },
  'kashmir': {
    id: 'kashmir',
    name: 'Kashmir Valley (Srinagar)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Dal_Lake_with_Shikara.jpg',
    description: 'Famous as "Heaven on Earth", the Kashmir Valley boasts unparalleled scenic grandeur: floating shikaras on tranquil Dal Lake, colorful Mughal terraced gardens, snow-glistening meadows of Gulmarg, and fields of saffron.',
    mapQuery: 'Dal Lake, Srinagar, Kashmir',
    bestTime: 'March to October (Summer gardens) & December to February (Gulmarg Skiing)',
    entryFee: 'Varies (Shikara ride: ₹500 - ₹800 per hour)',
    distance: '800 km from Delhi',
    category: 'India',
    ratings: 5.0,
    travelTips: ['Stay on a luxurious carved cedar Houseboat on Nigeen or Dal Lake.', 'Take a Gondola ride in Gulmarg, the second highest cable car line globally.', 'Sip "Kahwa", a warming local green tea brewed with saffron, cinnamon, and rich almonds.'],
    weatherInfo: { temp: '15°C', tempVal: 15, humidity: '55%', wind: '6 km/h', forecast: 'Clear and cool', suggestion: 'Pack woolens for cold evenings even in summer.' }
  },
  'shimla': {
    id: 'shimla',
    name: 'Shimla Hills',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Shimla_Ridge_Sunset.jpg',
    description: 'The summer capital of British India, Shimla is a stunning mountain town with pine-laden hills, vintage neo-gothic architecture, and the bustling, pedestrian-only Mall Road.',
    mapQuery: 'The Ridge, Shimla, Himachal Pradesh',
    bestTime: 'March to June (Pleasant) & December to February (Snowfall)',
    entryFee: 'Free Entry',
    distance: '340 km from Delhi',
    category: 'India',
    ratings: 4.5,
    travelTips: ['Ride the Kalka-Shimla Toy Train, a gorgeous UNESCO world heritage route.', 'Vehicular traffic is strictly banned on Mall Road; explore the entire historical ridge on foot.', 'Buy local woodcrafts and hand-woven Himachali woolen caps as gifts.'],
    weatherInfo: { temp: '18°C', tempVal: 18, humidity: '48%', wind: '10 km/h', forecast: 'Fresh mountain air, clear sky', suggestion: 'Perfect for a cozy colonial retreat.' }
  },
  'manali': {
    id: 'manali',
    name: 'Manali Valley',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Solang_Valley_Manali.jpg',
    description: 'A high-altitude Himalayan resort town nestled in the Beas River Valley. Offers thrilling adventure sports (paragliding, rafting, skiing) and acts as the spectacular gateway to Solang Valley and Atal Tunnel.',
    mapQuery: 'Solang Valley, Manali, Himachal Pradesh',
    bestTime: 'March to June & October to February',
    entryFee: 'Free (Adventure activities have commercial charges)',
    distance: '540 km from Delhi',
    category: 'India',
    ratings: 4.7,
    travelTips: ['Drive through the magnificent engineering marvel, the Atal Tunnel, to experience Lahaul valley.', 'Go paragliding in Solang Valley with a certified local tandem pilot.', 'Visit the ancient wooden Hadimba Temple situated deep inside lush cedar forest.'],
    weatherInfo: { temp: '16°C', tempVal: 16, humidity: '54%', wind: '11 km/h', forecast: 'Cool breeze, sunny patches', suggestion: 'Wear warm layers and grip-led trekking shoes.' }
  },
  'andaman-islands': {
    id: 'andaman-islands',
    name: 'Andaman & Nicobar Islands (Havelock Rock)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Radhanagar_Beach%2C_Havelock_Island.jpg',
    description: 'A tropical archipelago in the Bay of Bengal, famous for Radhanagar Beach (voted one of Asia\'s best), turquoise waters, vibrant coral reefs, and historical landmarks like Cellular Jail in Port Blair.',
    mapQuery: 'Radhanagar Beach, Havelock Island, Andamans',
    bestTime: 'November to May (Tropical diving season)',
    entryFee: 'Free beach entry (Ferry charges apply for inter-island transits)',
    distance: 'Flights connect from Chennai/Kolkata (approx 2 hours)',
    category: 'India',
    ratings: 4.9,
    travelTips: ['Book your inter-island government or private luxury catamaran ferries (Makruzz) in advance.', 'Try scuba diving or sea-walking at Elephant Beach to see pristine, colorful corals.', 'Explore Cellular Jail in Port Blair and watch the moving evening Light and Sound Show.'],
    weatherInfo: { temp: '29°C', tempVal: 29, humidity: '80%', wind: '18 km/h', forecast: 'Warm tropical island sun with ocean breeze', suggestion: 'Fabulous for snorkelers and beach sunbathers alike.' }
  }
};

export function getDestinationDetails(id: string): Destination | null {
  const basic = TAMIL_NADU_DESTINATIONS.find(d => d.id === id) || INDIA_DESTINATIONS.find(d => d.id === id);
  if (basic) return basic;

  const extra = OTHER_INDIA_DESTINATIONS_DATA[id];
  if (extra) {
    // build template with some defaults for full object consistency
    return {
      id,
      name: extra.name || '',
      image: extra.image || '',
      description: extra.description || '',
      mapQuery: extra.mapQuery || '',
      bestTime: extra.bestTime || '',
      entryFee: extra.entryFee || '',
      distance: extra.distance || '',
      category: extra.category as 'Tamil Nadu' | 'India' || 'India',
      ratings: extra.ratings || 4.5,
      hotels: {
        budget: [{ name: 'Lotus Budget Residency', rating: 3.9, price: '₹1,500', priceVal: 1500, distance: '1.2 km', amenities: ['Clean room', 'AC', 'Wifi'] }],
        midRange: [{ name: 'Royal Palace Residency', rating: 4.3, price: '₹3,500', priceVal: 3500, distance: '1.5 km', amenities: ['Free Wifi', 'Buffet Breakfast', 'Restaurant'] }],
        luxury: [{ name: 'The Taj Grand Haveli', rating: 4.9, price: '₹15,000', priceVal: 15000, distance: '2.0 km', amenities: ['Luxury Pool', 'Spa & Wellness', 'Gym', 'High Tea'] }],
        family: [{ name: 'Classic Family Suites', rating: 4.2, price: '₹4,800', priceVal: 4800, distance: '1.8 km', amenities: ['Pool', 'Games room', 'Complimentary Breakfast', 'Kids Lounge'] }]
      },
      restaurants: {
        vegetarian: [{ name: 'Sree Saravana pure veg', rating: 4.3, distance: '0.4 km', cuisine: 'Pure Veg Multi', popularDishes: ['Thali', 'Butter Naan', 'Paneer Butter Masala'] }],
        nonVegetarian: [{ name: 'Royal Biryani Cafe', rating: 4.4, distance: '0.8 km', cuisine: 'Mughlai & Biryani', popularDishes: ['Chicken Dum Biryani', 'Kebab platter'] }],
        local: [{ name: 'Heritage Heritage street corner', rating: 4.2, distance: '0.3 km', cuisine: 'Local Specialties', popularDishes: ['Regional Curry', 'Hot Chai'] }]
      },
      travelTips: extra.travelTips || ['Explore the local sights', 'Savor local street delicacies securely', 'Hire a government-licensed guide'],
      weatherInfo: extra.weatherInfo || { temp: '26°C', tempVal: 26, humidity: '60%', wind: '10 km/h', forecast: 'Clear', suggestion: 'Perfect traveler day.' }
    } as Destination;
  }

  return null;
}
