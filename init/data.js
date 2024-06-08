const sampleListings = [
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage1",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [-120.007568, 39.096849]
    }
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage2",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [-118.243683, 34.052235]
    }
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage3",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [7.221304, 46.096991]
    }
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage4",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [34.8233, -2.3333]
    }
  },
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage5",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [4.9041, 52.3676]
    }
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage6",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [179.194, -16.5781]
    }
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage7",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [-1.8392, 51.8334]
    }
  },
  {
    title: "Historic Brownstone in Boston",
    description: "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage8",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [-71.0589, 42.3601]
    }
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage9",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095]
    }
  },
  {
    title: "Mountain View Cabin in Banff",
    description: "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      filename: "listingimage10",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    reviews: [],
    owner: "665ffa5c10d85c7dc00e17ec",
    geometry: {
      type: "Point",
      coordinates: [-115.5708, 51.1784]
    }
  }
];

  
  module.exports = { data: sampleListings };