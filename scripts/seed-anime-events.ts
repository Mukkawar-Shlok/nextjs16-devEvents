import mongoose from "mongoose";
import Event from "../database/event.model";
import connectDB from "../lib/mongodb";

const animeEvents = [
  {
    title: "Anime Expo 2024",
    description: "The largest anime convention in North America returns with special guests, exclusive screenings, and more!",
    overview: "Join thousands of anime fans from around the world at Anime Expo 2024. This year features exclusive premieres, celebrity voice actors, cosplay competitions, artist alleys, and panels covering everything from classic anime to the latest releases.",
    image: "/images/event1.png",
    venue: "Los Angeles Convention Center",
    location: "Los Angeles Convention Center, CA",
    date: "2024-07-04",
    time: "10:00 AM - 8:00 PM",
    mode: "offline",
    audience: "All ages, anime fans, cosplayers",
    agenda: [
      "Opening ceremony with special guest announcements",
      "Exclusive anime premiere screenings",
      "Voice actor Q&A panels",
      "Cosplay competition finals",
      "Artist alley and vendor exhibits",
      "Closing concert featuring J-pop artists"
    ],
    organizer: "Society for the Promotion of Japanese Animation",
    tags: ["anime", "convention", "cosplay", "voice-actors", "premiere"]
  },
  {
    title: "Sakura Matsuri Festival",
    description: "Celebrate Japanese culture and cherry blossoms with anime screenings, traditional performances, and more.",
    overview: "Experience the beauty of Japanese culture at Brooklyn Botanic Garden's annual Sakura Matsuri. This family-friendly event combines traditional Japanese arts with modern anime culture, featuring outdoor screenings, manga workshops, and authentic Japanese cuisine.",
    image: "/images/event2.png",
    venue: "Brooklyn Botanic Garden",
    location: "Brooklyn Botanic Garden, NY",
    date: "2024-04-27",
    time: "10:00 AM - 6:00 PM",
    mode: "offline",
    audience: "Families, anime enthusiasts, culture lovers",
    agenda: [
      "Traditional tea ceremony demonstrations",
      "Anime film screenings under cherry blossoms",
      "Manga drawing workshops",
      "Taiko drumming performances",
      "Japanese street food vendors",
      "Cosplay photo opportunities"
    ],
    organizer: "Brooklyn Botanic Garden Cultural Events",
    tags: ["anime", "culture", "festival", "family-friendly", "manga"]
  },
  {
    title: "Otakon Convention",
    description: "One of the premier anime conventions celebrating Japanese pop culture in all its forms.",
    overview: "Otakon brings together anime, manga, video games, and Japanese culture enthusiasts for three days of non-stop entertainment. Featuring industry panels, exclusive merchandise, gaming tournaments, and meet-and-greets with your favorite creators.",
    image: "/images/event3.png",
    venue: "Walter E. Washington Convention Center",
    location: "Walter E. Washington Convention Center, DC",
    date: "2024-07-26",
    time: "9:00 AM - 9:00 PM",
    mode: "offline",
    audience: "Teenagers, adults, anime fans",
    agenda: [
      "Industry announcements and licensing news",
      "Video game tournaments",
      "Manga and anime artist workshops",
      "Late-night anime viewing rooms",
      "Dealer hall with exclusive merchandise",
      "Live performances by Japanese bands"
    ],
    organizer: "Otakorp Inc.",
    tags: ["anime", "manga", "gaming", "convention", "otaku"]
  },
  {
    title: "Crunchyroll Expo",
    description: "The ultimate anime experience hosted by the world's largest anime streaming platform.",
    overview: "Crunchyroll Expo offers fans a unique opportunity to celebrate anime with exclusive content reveals, meet creators and voice actors, compete in tournaments, and immerse themselves in the latest anime trends and merchandise.",
    image: "/images/event4.png",
    venue: "San Jose Convention Center",
    location: "San Jose Convention Center, CA",
    date: "2024-08-16",
    time: "10:00 AM - 7:00 PM",
    mode: "offline",
    audience: "Anime streamers, fans, content creators",
    agenda: [
      "Crunchyroll original series announcements",
      "World premiere screenings",
      "Voice actor autograph sessions",
      "Cosplay masquerade",
      "Gaming lounge with latest anime games",
      "Creator meet-and-greets"
    ],
    organizer: "Crunchyroll LLC",
    tags: ["anime", "streaming", "premiere", "gaming", "cosplay"]
  },
  {
    title: "Demon Slayer Movie Premiere",
    description: "Be among the first to watch the latest Demon Slayer movie on the big screen!",
    overview: "Experience the epic conclusion to the latest Demon Slayer arc in theaters. This special premiere includes exclusive behind-the-scenes content, director commentary, and limited edition merchandise for attendees.",
    image: "/images/event5.png",
    venue: "Regal Cinemas",
    location: "Regal Cinemas, Tokyo",
    date: "2024-06-15",
    time: "7:00 PM - 10:00 PM",
    mode: "offline",
    audience: "Demon Slayer fans, anime movie enthusiasts",
    agenda: [
      "Red carpet arrival",
      "Pre-screening director message",
      "World premiere screening",
      "Post-credit scenes and announcements",
      "Q&A with production team (live stream)",
      "Limited merchandise sale"
    ],
    organizer: "Ufotable & Aniplex",
    tags: ["demon-slayer", "movie", "premiere", "anime-film", "ufotable"]
  },
  {
    title: "Studio Ghibli Retrospective",
    description: "A month-long celebration of Studio Ghibli's masterpieces at the Museum of Modern Art.",
    overview: "Immerse yourself in the magical worlds created by Hayao Miyazaki and Studio Ghibli. This retrospective features screenings of all major Ghibli films, original artwork displays, concept art exhibitions, and discussions with animation historians.",
    image: "/images/event6.png",
    venue: "Museum of Modern Art",
    location: "Museum of Modern Art, NY",
    date: "2024-09-01",
    time: "11:00 AM - 6:00 PM",
    mode: "offline",
    audience: "Animation lovers, families, art enthusiasts",
    agenda: [
      "Daily film screenings (rotating schedule)",
      "Original artwork and storyboard exhibitions",
      "Animation technique workshops",
      "Panel discussions on Miyazaki's influence",
      "Children's drawing activities",
      "Gift shop with exclusive merchandise"
    ],
    organizer: "Museum of Modern Art Film Department",
    tags: ["ghibli", "miyazaki", "exhibition", "animation", "family"]
  },
  {
    title: "World Cosplay Championship",
    description: "The most prestigious cosplay competition showcasing incredible craftsmanship and performance.",
    overview: "Watch the world's best cosplayers compete for the championship title. This event showcases incredible costume craftsmanship, performance art, and dedication to bringing anime characters to life. Features workshops, photo opportunities, and vendor halls.",
    image: "/images/event1.png",
    venue: "Chicago Convention Center",
    location: "Chicago Convention Center, IL",
    date: "2024-10-05",
    time: "12:00 PM - 8:00 PM",
    mode: "offline",
    audience: "Cosplayers, costume enthusiasts, photographers",
    agenda: [
      "Preliminary competition rounds",
      "Craftsmanship judging",
      "Performance showcase",
      "Costume construction workshops",
      "Photography session areas",
      "Finals and awards ceremony"
    ],
    organizer: "World Cosplay Summit Organization",
    tags: ["cosplay", "competition", "costume", "performance", "championship"]
  },
  {
    title: "J-Pop Concert Extravaganza",
    description: "A spectacular concert featuring top J-Pop artists and anime theme song performers.",
    overview: "Experience the best of Japanese pop music and iconic anime opening themes performed live at Madison Square Garden. This concert brings together legendary artists and rising stars for an unforgettable musical journey through anime history.",
    image: "/images/event2.png",
    venue: "Madison Square Garden",
    location: "Madison Square Garden, NY",
    date: "2024-11-12",
    time: "7:00 PM - 11:00 PM",
    mode: "offline",
    audience: "Music fans, anime lovers, J-Pop enthusiasts",
    agenda: [
      "Opening act by emerging artists",
      "Classic anime theme performances",
      "Headliner performances",
      "Special collaborative performances",
      "Audience participation segments",
      "Encore with fan-favorite songs"
    ],
    organizer: "Live Nation Japan",
    tags: ["jpop", "concert", "music", "anime-songs", "live-performance"]
  },
  {
    title: "Manga Artists Workshop",
    description: "Learn from professional manga artists in this intensive three-day workshop.",
    overview: "Aspiring manga artists and enthusiasts will learn professional techniques from published manga creators. Topics include character design, panel composition, inking techniques, digital manga creation, and storytelling fundamentals.",
    image: "/images/event3.png",
    venue: "Art Institute of Seattle",
    location: "Art Institute of Seattle, WA",
    date: "2024-08-20",
    time: "9:00 AM - 5:00 PM",
    mode: "hybrid",
    audience: "Artists, manga creators, students",
    agenda: [
      "Character design fundamentals",
      "Dynamic panel composition",
      "Traditional inking techniques",
      "Digital manga tools and software",
      "Storytelling and pacing",
      "Portfolio review and feedback"
    ],
    organizer: "Manga Artists Guild",
    tags: ["manga", "workshop", "art", "education", "character-design"]
  },
  {
    title: "Attack on Titan Finale Screening",
    description: "Watch the epic conclusion to Attack on Titan's final season in theaters nationwide!",
    overview: "Experience the thrilling finale of Attack on Titan on the big screen with fellow fans. This theatrical event includes exclusive interviews with the cast and crew, never-before-seen content, and commemorative gifts for attendees.",
    image: "/images/event4.png",
    venue: "AMC Theaters",
    location: "AMC Theaters Nationwide",
    date: "2024-12-03",
    time: "8:00 PM - 11:00 PM",
    mode: "offline",
    audience: "Attack on Titan fans, anime viewers",
    agenda: [
      "Pre-screening recap video",
      "Exclusive behind-the-scenes footage",
      "Finale episodes screening",
      "Post-credits special announcement",
      "Cast and crew video messages",
      "Limited merchandise distribution"
    ],
    organizer: "Funimation & MAPPA Studio",
    tags: ["attack-on-titan", "finale", "anime-screening", "mappa", "theatrical"]
  },
  {
    title: "Anime Voice Actor Meet & Greet",
    description: "Meet your favorite English and Japanese voice actors in person!",
    overview: "This exclusive event brings together renowned voice actors from popular anime series for autograph sessions, photo opportunities, panel discussions about their craft, and behind-the-scenes stories from their most iconic roles.",
    image: "/images/event5.png",
    venue: "Austin Convention Center",
    location: "Austin Convention Center, TX",
    date: "2024-05-10",
    time: "2:00 PM - 6:00 PM",
    mode: "offline",
    audience: "Anime fans, voice acting enthusiasts",
    agenda: [
      "Voice actor panel discussions",
      "Autograph signing sessions",
      "Professional photo opportunities",
      "Voice acting workshop demos",
      "Q&A with attendees",
      "Special character voice performances"
    ],
    organizer: "Voice Actors United",
    tags: ["voice-actors", "meet-and-greet", "autographs", "panel", "anime-industry"]
  },
  {
    title: "Pokemon TCG World Championship",
    description: "The ultimate Pokemon Trading Card Game tournament with competitors from around the globe.",
    overview: "The world's best Pokemon TCG players compete for the championship title in this four-day tournament. Also features side events, trading areas, exclusive card releases, and activities for players of all skill levels.",
    image: "/images/event6.png",
    venue: "Honolulu Convention Center",
    location: "Honolulu Convention Center, HI",
    date: "2024-08-15",
    time: "9:00 AM - 7:00 PM",
    mode: "offline",
    audience: "Pokemon players, card collectors, competitive gamers",
    agenda: [
      "Registration and deck checks",
      "Swiss rounds competition",
      "Top cut elimination rounds",
      "Side event tournaments",
      "Trading card marketplace",
      "Finals and awards ceremony"
    ],
    organizer: "The Pokemon Company International",
    tags: ["pokemon", "tcg", "tournament", "competitive", "card-game"]
  },
  {
    title: "Naruto-Themed Ramen Festival",
    description: "Experience Ichiraku Ramen and other delicious Japanese noodles at this Naruto-inspired food festival.",
    overview: "Celebrate everyone's favorite ninja with an entire festival dedicated to ramen! Sample authentic Japanese ramen from various vendors, participate in Naruto trivia, watch the series on big screens, and enjoy themed activities for the whole family.",
    image: "/images/event1.png",
    venue: "San Francisco Pier 39",
    location: "San Francisco Pier 39, CA",
    date: "2024-06-22",
    time: "11:00 AM - 9:00 PM",
    mode: "offline",
    audience: "Naruto fans, foodies, families",
    agenda: [
      "Ramen tasting from 15+ vendors",
      "Naruto episode marathon screening",
      "Ramen eating competition",
      "Ninja training activities for kids",
      "Cosplay contest (Naruto characters)",
      "Live DJ and entertainment"
    ],
    organizer: "Anime Food Festivals Inc.",
    tags: ["naruto", "ramen", "food-festival", "family-event", "anime-theme"]
  },
  {
    title: "Contemporary Anime Art Exhibition",
    description: "A curated exhibition showcasing how anime has influenced modern art and culture.",
    overview: "Explore the intersection of anime and contemporary art through works by international artists. This exhibition features paintings, sculptures, digital art, and multimedia installations inspired by anime aesthetics and storytelling.",
    image: "/images/event2.png",
    venue: "Getty Center",
    location: "Getty Center, Los Angeles, CA",
    date: "2024-10-15",
    time: "10:00 AM - 5:00 PM",
    mode: "offline",
    audience: "Art enthusiasts, anime fans, students",
    agenda: [
      "Guided exhibition tours",
      "Artist talks and presentations",
      "Interactive digital art installations",
      "Anime art history lectures",
      "Student workshop sessions",
      "Curator Q&A sessions"
    ],
    organizer: "Getty Museum Contemporary Art Department",
    tags: ["anime-art", "exhibition", "contemporary", "culture", "museum"]
  },
  {
    title: "My Hero Academia Fan Convention",
    description: "A convention dedicated entirely to the world of My Hero Academia and superhero anime.",
    overview: "Plus Ultra! Join fellow heroes at this My Hero Academia-focused convention featuring exclusive merchandise, character meet-and-greets, quirk-themed activities, cosplay contests, and special announcements about upcoming seasons and movies.",
    image: "/images/event3.png",
    venue: "Orlando Convention Center",
    location: "Orlando Convention Center, FL",
    date: "2024-07-19",
    time: "10:00 AM - 8:00 PM",
    mode: "offline",
    audience: "My Hero Academia fans, superhero anime lovers",
    agenda: [
      "Opening ceremony with special guests",
      "Quirk assessment activities",
      "Exclusive merchandise shopping",
      "Cosplay competition and parade",
      "Voice actor panels and signings",
      "Season premiere screening"
    ],
    organizer: "Plus Ultra Events",
    tags: ["my-hero-academia", "convention", "superhero", "anime-specific", "cosplay"]
  },
  {
    title: "Anime Music Festival",
    description: "An outdoor music festival celebrating anime soundtracks, openings, and J-Rock bands.",
    overview: "Rock out to your favorite anime songs performed live at the iconic Red Rocks Amphitheatre. This festival features popular J-Rock bands, orchestral arrangements of anime soundtracks, and DJ sets mixing the best anime music.",
    image: "/images/event4.png",
    venue: "Red Rocks Amphitheatre",
    location: "Red Rocks Amphitheatre, Denver, CO",
    date: "2024-09-14",
    time: "6:00 PM - 11:00 PM",
    mode: "offline",
    audience: "Music fans, anime enthusiasts, outdoor event lovers",
    agenda: [
      "Opening DJ set with anime remixes",
      "J-Rock band performances",
      "Orchestral anime soundtrack performance",
      "Surprise guest appearances",
      "Crowd sing-alongs to popular OPs",
      "Headliner and fireworks finale"
    ],
    organizer: "Anime Music Live Productions",
    tags: ["music-festival", "anime-music", "jrock", "outdoor", "live-concert"]
  },
  {
    title: "One Piece 25th Anniversary Celebration",
    description: "Celebrate 25 years of One Piece with this massive fan event at Tokyo Dome!",
    overview: "Join the biggest One Piece celebration ever! This anniversary event features exclusive announcements, special episode screenings, treasure hunt activities, life-size ship replicas, character meet-and-greets, and surprises from creator Eiichiro Oda.",
    image: "/images/event5.png",
    venue: "Tokyo Dome",
    location: "Tokyo Dome, Japan",
    date: "2024-07-22",
    time: "1:00 PM - 9:00 PM",
    mode: "offline",
    audience: "One Piece fans, manga readers, anime viewers",
    agenda: [
      "Opening ceremony with special message from Oda",
      "Exclusive new episode premiere",
      "Live action series preview",
      "Treasure hunt across venue",
      "Character appearance shows",
      "Anniversary merchandise launch",
      "Grand finale celebration"
    ],
    organizer: "Toei Animation & Shueisha",
    tags: ["one-piece", "anniversary", "celebration", "manga", "toei"]
  },
  {
    title: "Anime Gaming Tournament",
    description: "Compete in the biggest anime-based video game tournament of the year!",
    overview: "Top players compete in various anime fighting games, including Dragon Ball FighterZ, Naruto Storm, My Hero One's Justice, and more. Features cash prizes, sponsored gaming setups, and professional commentary.",
    image: "/images/event6.png",
    venue: "Las Vegas Convention Center",
    location: "Las Vegas Convention Center, NV",
    date: "2024-11-08",
    time: "10:00 AM - 10:00 PM",
    mode: "offline",
    audience: "Gamers, competitive players, anime fans",
    agenda: [
      "Tournament registration and pools",
      "Qualifier matches",
      "Sponsored exhibition matches",
      "Semi-finals with live commentary",
      "Professional player meet-and-greets",
      "Championship finals with prize ceremony"
    ],
    organizer: "EVO Gaming & Bandai Namco",
    tags: ["gaming", "tournament", "competitive", "fighting-games", "esports"]
  },
  {
    title: "Kawaii Culture Festival",
    description: "Embrace the cute side of anime culture at this kawaii-themed festival!",
    overview: "Immerse yourself in kawaii culture with this colorful festival featuring cute character parades, pastel fashion shows, kawaii-themed food trucks, plushie giveaways, and activities celebrating everything adorable in anime and Japanese pop culture.",
    image: "/images/event1.png",
    venue: "Little Tokyo District",
    location: "Little Tokyo, Los Angeles, CA",
    date: "2024-05-25",
    time: "12:00 PM - 8:00 PM",
    mode: "offline",
    audience: "Kawaii culture fans, families, fashion enthusiasts",
    agenda: [
      "Kawaii character parade",
      "Harajuku fashion show",
      "Cute food and dessert vendors",
      "DIY kawaii crafts workshops",
      "Photo booth with kawaii props",
      "Sanrio character appearances"
    ],
    organizer: "Kawaii Culture Association",
    tags: ["kawaii", "cute", "culture", "fashion", "family-friendly"]
  },
  {
    title: "Virtual Reality Anime Experience",
    description: "Step into your favorite anime worlds with cutting-edge VR technology!",
    overview: "Experience anime like never before with immersive VR experiences that put you inside iconic anime scenes and worlds. Features VR adaptations of popular series, interactive character encounters, and technology demonstrations of anime production.",
    image: "/images/event2.png",
    venue: "Tech Museum of Innovation",
    location: "Tech Museum, San Jose, CA",
    date: "2024-12-15",
    time: "10:00 AM - 7:00 PM",
    mode: "offline",
    audience: "Tech enthusiasts, anime fans, VR gamers",
    agenda: [
      "VR anime world experiences (rotating)",
      "Interactive character meet-and-greets in VR",
      "Behind-the-scenes anime production VR tours",
      "VR game demos",
      "Technology panel discussions",
      "Future of anime and VR presentation"
    ],
    organizer: "Tech Museum & Anime VR Studios",
    tags: ["virtual-reality", "technology", "immersive", "vr-gaming", "innovation"]
  }
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");
    
    // Connect to MongoDB
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Check if events already exist
    const existingCount = await Event.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} events.`);
      console.log("🗑️  Clearing existing events...");
      await Event.deleteMany({});
      console.log("✅ Existing events cleared");
    }

    // Insert anime events
    console.log("📝 Inserting anime events...");
    const insertedEvents = await Event.insertMany(animeEvents);
    console.log(`✅ Successfully inserted ${insertedEvents.length} anime events`);

    // Display inserted events
    console.log("\n📋 Inserted Events:");
    insertedEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} (${event.slug})`);
    });

    console.log("\n🎉 Database seeding completed successfully!");
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();

