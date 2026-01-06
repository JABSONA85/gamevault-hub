export type Platform = 'PS4' | 'PS5' | 'Xbox One' | 'Xbox Series X/S';
export type Genre = 'Action' | 'RPG' | 'Shooter' | 'Sports' | 'Adventure' | 'Racing' | 'Fighting' | 'Horror' | 'Simulation';

export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  screenshots: string[];
  platform: Platform;
  genre: Genre;
  releaseDate: string;
  publisher: string;
  developer: string;
  rating: number;
  featured?: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
}

export const games: Game[] = [
  {
    id: 'god-of-war-ragnarok',
    title: 'God of War Ragnarök',
    description: 'Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go. Witness the changing dynamic of their relationship as they prepare for war; Atreus hungers for knowledge to help him understand the prophecy of "Loki", as Kratos struggles to free himself from his past and be the father his son needs.',
    shortDescription: 'Embark on an epic journey with Kratos and Atreus.',
    price: 59.99,
    originalPrice: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    ],
    platform: 'PS5',
    genre: 'Action',
    releaseDate: '2022-11-09',
    publisher: 'Sony Interactive Entertainment',
    developer: 'Santa Monica Studio',
    rating: 4.9,
    featured: true,
    bestseller: true,
  },
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected.',
    shortDescription: 'Become an Elden Lord in the Lands Between.',
    price: 49.99,
    originalPrice: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=800&q=80',
    ],
    platform: 'PS5',
    genre: 'RPG',
    releaseDate: '2022-02-25',
    publisher: 'Bandai Namco',
    developer: 'FromSoftware',
    rating: 4.8,
    featured: true,
    bestseller: true,
  },
  {
    id: 'call-of-duty-mw3',
    title: 'Call of Duty: Modern Warfare III',
    description: 'In the direct sequel to the record-breaking Modern Warfare II, Captain Price and Task Force 141 face off against the ultimate threat. The ultranationalist war criminal Vladimir Makarov is extending his grasp across the world, causing Task Force 141 to fight like never before.',
    shortDescription: 'Task Force 141 faces the ultimate threat.',
    price: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
    screenshots: [],
    platform: 'Xbox Series X/S',
    genre: 'Shooter',
    releaseDate: '2023-11-10',
    publisher: 'Activision',
    developer: 'Sledgehammer Games',
    rating: 4.5,
    featured: true,
    newRelease: true,
  },
  {
    id: 'fc-25',
    title: 'EA Sports FC 25',
    description: 'Experience the next generation of football with EA Sports FC 25. Featuring HyperMotionV technology, a new tactical system, and over 19,000 players across 700+ teams in 100+ stadiums from around the world.',
    shortDescription: 'The next generation of football gaming.',
    price: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    screenshots: [],
    platform: 'PS5',
    genre: 'Sports',
    releaseDate: '2024-09-27',
    publisher: 'Electronic Arts',
    developer: 'EA Vancouver',
    rating: 4.3,
    newRelease: true,
  },
  {
    id: 'spider-man-2',
    title: "Marvel's Spider-Man 2",
    description: 'Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask as they fight to save the city, each other, and the ones they love, from the monstrous Venom and the dangerous new symbiote threat.',
    shortDescription: 'Swing through NYC as Peter and Miles.',
    price: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80',
    screenshots: [],
    platform: 'PS5',
    genre: 'Action',
    releaseDate: '2023-10-20',
    publisher: 'Sony Interactive Entertainment',
    developer: 'Insomniac Games',
    rating: 4.9,
    featured: true,
    bestseller: true,
  },
  {
    id: 'halo-infinite',
    title: 'Halo Infinite',
    description: 'When all hope is lost and humanity\'s fate hangs in the balance, the Master Chief is ready to confront the most ruthless foe he\'s ever faced. Step inside the armor of humanity\'s greatest hero to experience an epic adventure and explore the massive scale of the Halo ring.',
    shortDescription: 'Master Chief faces his most ruthless foe.',
    price: 39.99,
    originalPrice: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&q=80',
    screenshots: [],
    platform: 'Xbox Series X/S',
    genre: 'Shooter',
    releaseDate: '2021-12-08',
    publisher: 'Xbox Game Studios',
    developer: '343 Industries',
    rating: 4.6,
    bestseller: true,
  },
  {
    id: 'horizon-forbidden-west',
    title: 'Horizon Forbidden West',
    description: 'Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier that conceals mysterious new threats. Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes as you return to the far-future, post-apocalyptic world of Horizon.',
    shortDescription: 'Brave the dangerous Forbidden West.',
    price: 49.99,
    originalPrice: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80',
    screenshots: [],
    platform: 'PS5',
    genre: 'Adventure',
    releaseDate: '2022-02-18',
    publisher: 'Sony Interactive Entertainment',
    developer: 'Guerrilla Games',
    rating: 4.7,
    bestseller: true,
  },
  {
    id: 'forza-motorsport',
    title: 'Forza Motorsport',
    description: 'Experience the thrill of racing with the most technically advanced racing game ever made. Forza Motorsport features stunning visuals, real-time ray tracing, and over 500 cars to collect and race on world-famous tracks.',
    shortDescription: 'The most advanced racing game ever.',
    price: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    screenshots: [],
    platform: 'Xbox Series X/S',
    genre: 'Racing',
    releaseDate: '2023-10-10',
    publisher: 'Xbox Game Studios',
    developer: 'Turn 10 Studios',
    rating: 4.4,
    newRelease: true,
  },
  {
    id: 'final-fantasy-xvi',
    title: 'Final Fantasy XVI',
    description: 'An epic dark fantasy world where the weights of life and duty have cursed its people. The story focuses on Clive Rosfield, a young man dedicated to mastering the blade, who is swept up in a great tragedy and dark revenge.',
    shortDescription: 'An epic dark fantasy adventure.',
    price: 54.99,
    originalPrice: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=800&q=80',
    screenshots: [],
    platform: 'PS5',
    genre: 'RPG',
    releaseDate: '2023-06-22',
    publisher: 'Square Enix',
    developer: 'Square Enix',
    rating: 4.7,
    bestseller: true,
  },
  {
    id: 'resident-evil-4',
    title: 'Resident Evil 4',
    description: 'Survival is just the beginning. Remake of the 2005 original, Resident Evil 4 preserves the essence of the classic game while using modern technology to dramatically enhance the quality.',
    shortDescription: 'Survival horror at its finest.',
    price: 39.99,
    originalPrice: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=800&q=80',
    screenshots: [],
    platform: 'PS4',
    genre: 'Horror',
    releaseDate: '2023-03-24',
    publisher: 'Capcom',
    developer: 'Capcom',
    rating: 4.8,
    bestseller: true,
  },
  {
    id: 'tekken-8',
    title: 'Tekken 8',
    description: 'The new generation of Tekken is here! Experience the most visually stunning Tekken game ever, featuring a new "Heat" system, destructible environments, and the next chapter in the Mishima saga.',
    shortDescription: 'The new generation of fighting.',
    price: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80',
    screenshots: [],
    platform: 'PS5',
    genre: 'Fighting',
    releaseDate: '2024-01-26',
    publisher: 'Bandai Namco',
    developer: 'Bandai Namco Studios',
    rating: 4.6,
    newRelease: true,
  },
  {
    id: 'starfield',
    title: 'Starfield',
    description: 'Starfield is the first new universe in 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4. In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom.',
    shortDescription: 'Explore the stars in Bethesda\'s epic RPG.',
    price: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    screenshots: [],
    platform: 'Xbox Series X/S',
    genre: 'RPG',
    releaseDate: '2023-09-06',
    publisher: 'Bethesda Softworks',
    developer: 'Bethesda Game Studios',
    rating: 4.2,
    featured: true,
  },
  {
    id: 'gran-turismo-7',
    title: 'Gran Turismo 7',
    description: 'Whether you\'re a competitive or casual racer, collector, tuner, livery designer or photographer – find your line with an iconic franchise. Gran Turismo 7 brings together the best features of the Real Driving Simulator.',
    shortDescription: 'The Real Driving Simulator.',
    price: 49.99,
    originalPrice: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    screenshots: [],
    platform: 'PS5',
    genre: 'Racing',
    releaseDate: '2022-03-04',
    publisher: 'Sony Interactive Entertainment',
    developer: 'Polyphony Digital',
    rating: 4.5,
  },
  {
    id: 'the-last-of-us-part-i',
    title: 'The Last of Us Part I',
    description: 'Experience the emotional storytelling and unforgettable characters in The Last of Us, winner of over 200 Game of the Year awards. Rebuilt from the ground up for PlayStation 5.',
    shortDescription: 'An unforgettable emotional journey.',
    price: 49.99,
    originalPrice: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    screenshots: [],
    platform: 'PS5',
    genre: 'Adventure',
    releaseDate: '2022-09-02',
    publisher: 'Sony Interactive Entertainment',
    developer: 'Naughty Dog',
    rating: 4.9,
    bestseller: true,
  },
  {
    id: 'nba-2k25',
    title: 'NBA 2K25',
    description: 'Rise to the occasion in NBA 2K25. Experience the game like never before with groundbreaking ProPLAY technology, realistic player movements, and the most immersive MyCAREER experience yet.',
    shortDescription: 'Rise to the occasion on the court.',
    price: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    screenshots: [],
    platform: 'Xbox One',
    genre: 'Sports',
    releaseDate: '2024-09-06',
    publisher: '2K Games',
    developer: 'Visual Concepts',
    rating: 4.1,
    newRelease: true,
  },
  {
    id: 'assassins-creed-mirage',
    title: "Assassin's Creed Mirage",
    description: 'Experience the story of Basim, a cunning street thief seeking answers and justice as he navigates the bustling streets of ninth-century Baghdad. Through a mysterious, ancient organization known as the Hidden Ones, he will become a deadly Master Assassin.',
    shortDescription: 'Become a Master Assassin in Baghdad.',
    price: 49.99,
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    screenshots: [],
    platform: 'PS4',
    genre: 'Action',
    releaseDate: '2023-10-05',
    publisher: 'Ubisoft',
    developer: 'Ubisoft Bordeaux',
    rating: 4.3,
  },
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

export const getGamesByPlatform = (platform: Platform): Game[] => {
  return games.filter(game => game.platform === platform);
};

export const getGamesByGenre = (genre: Genre): Game[] => {
  return games.filter(game => game.genre === genre);
};

export const getFeaturedGames = (): Game[] => {
  return games.filter(game => game.featured);
};

export const getBestsellers = (): Game[] => {
  return games.filter(game => game.bestseller);
};

export const getNewReleases = (): Game[] => {
  return games.filter(game => game.newRelease);
};

export const platforms: Platform[] = ['PS4', 'PS5', 'Xbox One', 'Xbox Series X/S'];
export const genres: Genre[] = ['Action', 'RPG', 'Shooter', 'Sports', 'Adventure', 'Racing', 'Fighting', 'Horror', 'Simulation'];
