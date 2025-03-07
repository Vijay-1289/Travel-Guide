
// Destinations data with India's top tourist places
export interface TransportOption {
  type: 'bus' | 'train' | 'plane' | 'taxi' | 'car' | 'metro' | 'boat';
  duration: string;
  cost: string;
  frequency?: string;
  availabilityStatus?: 'high' | 'medium' | 'low';
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  shortDescription: string;
  historicalSignificance: string;
  imageUrl: string;
  gallery: string[];
  bestTimeToVisit: string;
  averageRating: number;
  reviewCount: number;
  tags: string[];
  transport: TransportOption[];
  nearbyAttractions: {
    name: string;
    distance: string;
  }[];
  entryFee?: {
    indian: string;
    foreign: string;
  };
  openingHours?: string;
}

export const destinations: Destination[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    coordinates: {
      lat: 27.1751,
      lng: 78.0421,
    },
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.',
    shortDescription: 'An iconic ivory-white marble mausoleum and one of the Seven Wonders of the World.',
    historicalSignificance: 'Built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the Taj Mahal is considered the greatest architectural achievement in the whole range of Indo-Islamic architecture. Its recognized architectural beauty has a rhythmic combination of solids and voids, concave and convex and light shadow.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
    ],
    bestTimeToVisit: 'October to March',
    averageRating: 4.8,
    reviewCount: 25614,
    tags: ['UNESCO World Heritage', 'Architecture', 'Historical', 'Monument'],
    transport: [
      {
        type: 'train',
        duration: '2-3 hours from Delhi',
        cost: '₹500 - ₹1500',
        frequency: 'Multiple trains daily',
        availabilityStatus: 'high'
      },
      {
        type: 'bus',
        duration: '4-5 hours from Delhi',
        cost: '₹400 - ₹800',
        frequency: 'Hourly',
        availabilityStatus: 'high'
      },
      {
        type: 'plane',
        duration: '1 hour from Delhi to Agra Airport',
        cost: '₹2000 - ₹5000',
        availabilityStatus: 'medium'
      },
      {
        type: 'taxi',
        duration: '3-4 hours from Delhi',
        cost: '₹2500 - ₹3500',
        availabilityStatus: 'high'
      }
    ],
    nearbyAttractions: [
      {
        name: 'Agra Fort',
        distance: '2.5 km'
      },
      {
        name: 'Fatehpur Sikri',
        distance: '40 km'
      },
      {
        name: 'Mehtab Bagh',
        distance: '1 km'
      }
    ],
    entryFee: {
      indian: '₹50',
      foreign: '₹1100'
    },
    openingHours: 'Sunrise to Sunset (Closed on Fridays)'
  },
  {
    id: 'red-fort',
    name: 'Red Fort',
    location: 'Delhi',
    coordinates: {
      lat: 28.6562,
      lng: 77.2410,
    },
    description: 'The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi.',
    shortDescription: 'A historic fort complex that was the main residence of Mughal emperors for nearly 200 years.',
    historicalSignificance: 'Built in 1639 by the fifth Mughal Emperor Shah Jahan as the palace of his fortified capital Shahjahanabad, the Red Fort is named for its massive enclosing walls of red sandstone. It was the ceremonial and political center of the Mughal state and would serve as the main residence of the emperors for nearly 200 years.',
    imageUrl: 'https://images.unsplash.com/photo-1585376459122-839cb6401b61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1592639296346-560c37a0f711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1632761747660-b916abd5c9e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80'
    ],
    bestTimeToVisit: 'October to March',
    averageRating: 4.5,
    reviewCount: 18945,
    tags: ['UNESCO World Heritage', 'Architecture', 'Historical', 'Monument'],
    transport: [
      {
        type: 'metro',
        duration: 'Varies by location in Delhi',
        cost: '₹20 - ₹50',
        frequency: 'Every 5-10 minutes',
        availabilityStatus: 'high'
      },
      {
        type: 'bus',
        duration: 'Varies by location in Delhi',
        cost: '₹10 - ₹30',
        frequency: 'Frequent',
        availabilityStatus: 'high'
      },
      {
        type: 'taxi',
        duration: 'Varies by location in Delhi',
        cost: '₹100 - ₹300',
        availabilityStatus: 'high'
      }
    ],
    nearbyAttractions: [
      {
        name: 'Chandni Chowk',
        distance: '0.5 km'
      },
      {
        name: 'Jama Masjid',
        distance: '2 km'
      },
      {
        name: 'India Gate',
        distance: '6 km'
      }
    ],
    entryFee: {
      indian: '₹35',
      foreign: '₹500'
    },
    openingHours: '9:30 AM to 4:30 PM (Closed on Mondays)'
  },
  {
    id: 'jaipur-city-palace',
    name: 'City Palace',
    location: 'Jaipur, Rajasthan',
    coordinates: {
      lat: 26.9258,
      lng: 75.8237,
    },
    description: 'The City Palace, Jaipur is a palace complex in Jaipur, the capital of the Rajasthan state, India. It was built between 1729 and 1732 by Sawai Jai Singh II, the ruler of Amber. The palace complex, which includes the Chandra Mahal and Mubarak Mahal palaces and other buildings, is a blend of Rajput and Mughal architectural styles.',
    shortDescription: 'A stunning palace complex showcasing a perfect blend of Rajasthani and Mughal architecture.',
    historicalSignificance: 'The City Palace was established at the same time as the city of Jaipur by Maharaja Sawai Jai Singh II who moved his court to Jaipur from Amber in 1727. The palace complex has several buildings, various courtyards, gardens, and temples. A portion of the palace is still a royal residence while the remaining has been converted into museums.',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1624806992066-5ffaaeaec6c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1598085728022-d41fc1cc6bb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1617516202907-ff75846e6667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    bestTimeToVisit: 'October to March',
    averageRating: 4.6,
    reviewCount: 12400,
    tags: ['Architecture', 'Historical', 'Palace', 'Museum'],
    transport: [
      {
        type: 'plane',
        duration: '1 hour from Delhi',
        cost: '₹2500 - ₹6000',
        frequency: 'Multiple flights daily',
        availabilityStatus: 'high'
      },
      {
        type: 'train',
        duration: '4-5 hours from Delhi',
        cost: '₹500 - ₹1500',
        frequency: 'Multiple trains daily',
        availabilityStatus: 'high'
      },
      {
        type: 'bus',
        duration: '5-6 hours from Delhi',
        cost: '₹500 - ₹1000',
        frequency: 'Frequent',
        availabilityStatus: 'high'
      },
      {
        type: 'car',
        duration: '4-5 hours from Delhi',
        cost: '₹2000 - ₹3000',
        availabilityStatus: 'high'
      }
    ],
    nearbyAttractions: [
      {
        name: 'Hawa Mahal',
        distance: '1 km'
      },
      {
        name: 'Jantar Mantar',
        distance: '0.5 km'
      },
      {
        name: 'Amber Fort',
        distance: '11 km'
      }
    ],
    entryFee: {
      indian: '₹100',
      foreign: '₹500'
    },
    openingHours: '9:30 AM to 5:00 PM (Open all days)'
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    location: 'Kerala',
    coordinates: {
      lat: 9.4981,
      lng: 76.3388,
    },
    description: 'The Kerala backwaters are a network of interconnected canals, rivers, lakes, and inlets, a labyrinthine system formed by more than 900 km of waterways, and sometimes compared to the American Bayou. The network includes five large lakes linked by canals, both man made and natural, fed by 38 rivers, and extending virtually half the length of Kerala state.',
    shortDescription: 'A network of serene lagoons, lakes, and canals running parallel to the Arabian Sea coast.',
    historicalSignificance: 'The backwaters of Kerala have been used for centuries by the local people for transportation, fishing and agriculture. The houseboats, known as Kettuvallams, were traditionally used to transport rice and spices but have now been converted into luxury accommodation for tourists wanting to experience the beauty of the backwaters.',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609340618112-f7afb08ac945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      'https://images.unsplash.com/photo-1623830866768-0b9743052794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    bestTimeToVisit: 'September to March',
    averageRating: 4.7,
    reviewCount: 15678,
    tags: ['Nature', 'Boat Rides', 'Relaxation', 'Scenic'],
    transport: [
      {
        type: 'plane',
        duration: '2-3 hours to Kochi from major cities',
        cost: '₹3000 - ₹8000',
        frequency: 'Multiple flights daily',
        availabilityStatus: 'high'
      },
      {
        type: 'train',
        duration: 'Varies by origin city',
        cost: '₹800 - ₹2500',
        frequency: 'Multiple trains to Alappuzha/Kochi',
        availabilityStatus: 'medium'
      },
      {
        type: 'bus',
        duration: '2-3 hours from Kochi to Alappuzha',
        cost: '₹100 - ₹300',
        frequency: 'Frequent',
        availabilityStatus: 'high'
      },
      {
        type: 'boat',
        duration: 'Varies by route',
        cost: '₹2000 - ₹10000 per day (houseboat)',
        availabilityStatus: 'medium'
      }
    ],
    nearbyAttractions: [
      {
        name: 'Alappuzha Beach',
        distance: '5 km'
      },
      {
        name: 'Kumarakom Bird Sanctuary',
        distance: '15 km'
      },
      {
        name: 'Marari Beach',
        distance: '11 km'
      }
    ],
    entryFee: {
      indian: 'Varies by boat type',
      foreign: 'Varies by boat type'
    },
    openingHours: 'Available throughout the day and night for houseboat stays'
  },
  {
    id: 'varanasi-ghats',
    name: 'Varanasi Ghats',
    location: 'Varanasi, Uttar Pradesh',
    coordinates: {
      lat: 25.3176,
      lng: 83.0130,
    },
    description: 'Varanasi is a city on the banks of the Ganges in Uttar Pradesh, India. The city has nearly 100 ghats, steps leading down to the river. Many of the ghats were built when the city was under Maratha control. Most of the ghats are bathing ghats, while others are used as cremation sites.',
    shortDescription: 'Ancient riverside steps leading to the sacred Ganges River in one of the world\'s oldest continuously inhabited cities.',
    historicalSignificance: 'Varanasi, also known as Kashi or Banaras, is one of the oldest living cities in the world. The ghats of Varanasi are an integral part of Hindu religious life and culture. The city is famous for its fine silk sarees, perfumes, sculptures, and ivory works. It is considered one of the seven holy cities which can provide Moksha.',
    imageUrl: 'https://images.unsplash.com/photo-1561361058-c24ceccc6dd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626071154688-65756b2d0da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1211&q=80',
      'https://images.unsplash.com/photo-1602508207901-52253b16ef4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1608023142253-5bbb0d728f50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    bestTimeToVisit: 'October to March',
    averageRating: 4.6,
    reviewCount: 13289,
    tags: ['Spiritual', 'Historical', 'Cultural', 'Religious'],
    transport: [
      {
        type: 'plane',
        duration: '1.5 hours from Delhi',
        cost: '₹3000 - ₹7000',
        frequency: 'Multiple flights daily',
        availabilityStatus: 'high'
      },
      {
        type: 'train',
        duration: '8-10 hours from Delhi',
        cost: '₹500 - ₹1500',
        frequency: 'Multiple trains daily',
        availabilityStatus: 'high'
      },
      {
        type: 'bus',
        duration: '10-12 hours from Delhi',
        cost: '₹800 - ₹1500',
        frequency: 'Daily',
        availabilityStatus: 'medium'
      },
      {
        type: 'boat',
        duration: 'Varies for local ghat tours',
        cost: '₹200 - ₹1000',
        availabilityStatus: 'high'
      }
    ],
    nearbyAttractions: [
      {
        name: 'Kashi Vishwanath Temple',
        distance: '1 km'
      },
      {
        name: 'Sarnath',
        distance: '10 km'
      },
      {
        name: 'Ramnagar Fort',
        distance: '14 km'
      }
    ],
    entryFee: {
      indian: 'Free (Boat rides are charged separately)',
      foreign: 'Free (Boat rides are charged separately)'
    },
    openingHours: 'Open 24 hours (Best time for Ganga Aarti is evening)'
  }
];

export const getRandomDestinations = (count: number): Destination[] => {
  const shuffled = [...destinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(destination => destination.id === id);
};
