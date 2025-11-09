# 🎌 Anime Events Platform

A modern, production-ready event management platform built with **Next.js 16** featuring advanced caching strategies, real-time analytics, and beautiful UI/UX.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)

## 🚀 Features

### Core Functionality
- **Event Discovery**: Browse and search anime events with beautiful card layouts
- **Event Details**: Comprehensive event pages with agenda, venue, and booking information
- **Event Booking**: Simple email-based booking system with confirmation
- **Similar Events**: Smart recommendation engine based on event tags
- **Image Upload**: Cloudinary integration for optimized image hosting

### Performance & Caching
- **Next.js 16 Caching**: Leverages `'use cache'` directive with configurable cache lifetimes
- **Component Caching**: Enabled via `cacheComponents: true` in Next.js config
- **Database Connection Pooling**: Cached MongoDB connections prevent redundant connections
- **Optimized Images**: Next.js Image component with Cloudinary CDN
- **API Route Caching**: Strategic caching at the API layer

### Developer Experience
- **TypeScript**: Fully typed codebase with comprehensive interfaces
- **Server Actions**: Modern data mutations with `'use server'` directive
- **Mongoose ODM**: Type-safe database operations with schema validation
- **ESLint**: Code quality and consistency enforcement
- **Hot Reload**: Optimized development with connection caching

### Analytics & Monitoring
- **PostHog Integration**: Event tracking and user analytics
- **Error Tracking**: Automatic exception capture with PostHog
- **Custom Events**: Track user interactions (event bookings, page views)
- **Debug Mode**: Development-only debug logging

### UI/UX
- **Modern Design**: Beautiful gradient animations and light ray effects
- **Responsive Layout**: Mobile-first design with Tailwind CSS 4
- **Custom Fonts**: Google Fonts integration (Schibsted Grotesk, Martian Mono)
- **Toast Notifications**: Real-time feedback with React Toastify
- **Loading States**: Suspense boundaries for optimal UX
- **3D Effects**: Three.js integration for immersive experiences

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Caching Strategy](#caching-strategy)
- [Components](#components)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Server Actions](#server-actions)
- [Analytics](#analytics)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm** or **bun**
- **MongoDB** 7.x (local or Atlas)
- **Cloudinary Account** (for image uploads)
- **PostHog Account** (for analytics)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nextjs_16
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/anime-events
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anime-events?retryWrites=true&w=majority

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Getting API Keys

#### MongoDB Atlas
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string from "Connect" → "Connect your application"
4. Whitelist your IP address in Network Access

#### Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Find your credentials in Dashboard → Settings → API Keys

#### PostHog
1. Sign up at [PostHog](https://posthog.com/)
2. Get your project API key from Project Settings

## 💾 Database Setup

### Local MongoDB
```bash
# Install MongoDB
brew install mongodb-community@7.0  # macOS
# or follow official docs for other OS

# Start MongoDB
brew services start mongodb-community@7.0
```

### MongoDB Atlas (Cloud)
See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed setup instructions.

### Seed the Database
```bash
npm run seed
```

This will populate your database with sample anime events.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

The page auto-updates as you edit files thanks to hot module replacement.

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
nextjs_16/
├── app/
│   ├── api/
│   │   └── events/
│   │       ├── route.ts              # GET all events, POST create event
│   │       └── [slug]/
│   │           └── route.ts          # GET event by slug
│   ├── events/
│   │   └── [slug]/
│   │       └── page.tsx              # Event detail page
│   ├── layout.tsx                    # Root layout with fonts & providers
│   ├── page.tsx                      # Home page with event listing
│   └── globals.css                   # Global styles
├── components/
│   ├── BookEvents.tsx                # Event booking form component
│   ├── EventCard.tsx                 # Event card display component
│   ├── EventDetails.tsx              # Detailed event view component
│   ├── ExplorerBtn.tsx               # Animated explore button
│   ├── LightRays.tsx                 # 3D light ray effect
│   ├── LightRays.css                 # Light ray styles
│   └── Navbar.tsx                    # Navigation component
├── database/
│   ├── event.model.ts                # Event Mongoose schema
│   ├── booking.model.ts              # Booking Mongoose schema
│   └── index.ts                      # Database exports
├── lib/
│   ├── actions/
│   │   ├── events.actions.ts         # Event server actions
│   │   └── booking.actions.ts        # Booking server actions
│   ├── mongodb.ts                    # MongoDB connection handler
│   ├── utils.ts                      # Utility functions
│   └── constants.ts                  # App constants
├── public/
│   ├── icons/                        # SVG icons
│   └── images/                       # Event images
├── scripts/
│   └── seed-anime-events.ts          # Database seeding script
├── .env.local                        # Environment variables (create this)
├── instrumentation-client.ts         # PostHog client setup
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

## 🎯 Caching Strategy

This application implements a comprehensive caching strategy for optimal performance:

### 1. **Next.js 16 Server Component Caching**

The home page uses Next.js 16's new caching directives:

```typescript
// app/page.tsx
const page = async() => {
  'use cache';              // Enable caching for this component
  cacheLife('hours');       // Cache for 1 hour
  
  const response = await fetch(`${BASE_URL}/api/events`);
  const {events} = await response.json();
  // ... render events
}
```

**Cache Lifetime Options:**
- `cacheLife('seconds')` - Cache for seconds
- `cacheLife('minutes')` - Cache for minutes  
- `cacheLife('hours')` - Cache for hours (recommended for event listings)
- `cacheLife('days')` - Cache for days
- `cacheLife('weeks')` - Cache for weeks

### 2. **Component Caching**

Enabled in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  cacheComponents: true,  // Cache component outputs
  // ...
};
```

This caches the rendered output of React Server Components for faster subsequent renders.

### 3. **Database Connection Pooling**

MongoDB connections are cached to prevent redundant connections:

```typescript
// lib/mongodb.ts
let cached = global.mongoose;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;  // Return existing connection
  }
  // ... establish new connection
}
```

**Benefits:**
- Prevents multiple connections during hot-reload in development
- Reuses connections in production for better performance
- Reduces database connection overhead

### 4. **Image Optimization**

Next.js Image component with Cloudinary CDN:

```typescript
// components/EventCard.tsx
<Image 
  src={image} 
  alt={title} 
  width={410} 
  height={300}
  // Automatically optimized and cached
/>
```

**Features:**
- Automatic WebP conversion
- Responsive images
- Lazy loading
- CDN caching via Cloudinary

### 5. **API Response Caching**

Consider adding these headers to API routes for additional caching:

```typescript
export async function GET() {
  const events = await Event.find();
  
  return NextResponse.json(
    { events },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    }
  );
}
```

### Cache Invalidation

To invalidate caches:
- **Server Component Cache**: Redeploy or use `revalidatePath()` / `revalidateTag()`
- **Database Cache**: Automatic on connection close
- **CDN Cache**: Configure TTL in Cloudinary settings

## 🧩 Components

### Client Components

#### `BookEvents.tsx`
Event booking form with email validation and PostHog tracking.

```typescript
<BookEvents eventId={event._id} eventSlug={event.slug} />
```

**Features:**
- Email validation
- Form submission handling
- Success/error states
- Analytics tracking
- Toast notifications

#### `EventCard.tsx`
Display card for event listings with image, location, date, and time.

```typescript
<EventCard 
  title="Event Title"
  image="/images/event1.png"
  slug="event-title"
  location="Tokyo, Japan"
  date="2025-12-01"
  time="18:00"
/>
```

#### `LightRays.tsx`
Interactive 3D light ray background effect using Three.js and OGL.

```typescript
<LightRays
  raysOrigin="top-center-offset"
  raysColor="#ff6ec7"
  raysSpeed={2}
  lightSpread={1}
  rayLength={1.2}
  followMouse={true}
  mouseInfluence={0.5}
  noiseAmount={0.1}
  distortion={0.05}
/>
```

### Server Components

#### `EventDetails.tsx`
Displays comprehensive event information with booking form and similar events.

#### `Navbar.tsx`
Navigation bar with logo and branding.

#### `ExplorerBtn.tsx`
Animated button with scroll functionality.

## 🔌 API Routes

### `GET /api/events`
Fetch all events (limited to 20, sorted by creation date).

**Response:**
```json
{
  "message": "Events fetched successfully",
  "events": [...]
}
```

### `POST /api/events`
Create a new event with image upload to Cloudinary.

**Request:** `multipart/form-data`
- `title`: string (required)
- `description`: string (required)
- `overview`: string (required)
- `image`: File (required, max 5MB, JPEG/PNG/WebP/GIF)
- `venue`: string (required)
- `location`: string (required)
- `date`: string (required, YYYY-MM-DD)
- `time`: string (required, HH:MM)
- `mode`: "online" | "offline" | "hybrid" (required)
- `audience`: string (required)
- `agenda`: JSON array of strings (required)
- `organizer`: string (required)
- `tags`: JSON array of strings (required)

**Response:**
```json
{
  "message": "Event created successfully",
  "event": {...}
}
```

### `GET /api/events/[slug]`
Fetch a single event by slug.

**Response:**
```json
{
  "message": "Event fetched successfully",
  "event": {...}
}
```

## 💿 Database Models

### Event Model

```typescript
interface IEvent {
  title: string;
  slug: string;                    // Auto-generated from title
  description: string;
  overview: string;
  image: string;                   // Cloudinary URL
  venue: string;
  location: string;
  date: string;                    // ISO format YYYY-MM-DD
  time: string;                    // 24-hour format HH:MM
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;                 // Auto-generated
  updatedAt: Date;                 // Auto-generated
}
```

**Schema Features:**
- Automatic slug generation from title
- Date/time normalization
- Unique slug index for fast lookups
- Pre-save validation hooks
- Timestamps (createdAt, updatedAt)

### Booking Model

```typescript
interface IBooking {
  eventId: ObjectId;
  slug: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## ⚡ Server Actions

### Event Actions

**`getSimilarEventsBySlug(slug: string)`**
- Fetches events with matching tags
- Excludes the current event
- Returns array of similar events

**`getBookingsByEventId(eventId: string)`**
- Counts total bookings for an event
- Returns number of bookings

### Booking Actions

**`bookEvent(eventId: string, eventSlug: string, email: string)`**
- Creates a new booking
- Triggers PostHog analytics
- Returns success/error response

## 📊 Analytics

### PostHog Integration

Analytics are configured in `instrumentation-client.ts`:

```typescript
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: '2025-05-24',
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
});
```

### Tracked Events

**Event Booking:**
```typescript
posthog.capture('event_booked', {
  eventId: string,
  eventSlug: string,
  email: string,
  message: string,
});
```

### Error Tracking

Automatic exception capture is enabled. Manual error tracking:

```typescript
posthog.captureException(error);
```

### Privacy & GDPR Compliance

PostHog respects Do Not Track signals and provides user opt-out capabilities. Configure in PostHog dashboard.

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Add environment variables
   - Deploy

3. **Configure Environment Variables**
   Add all variables from `.env.local` to Vercel project settings.

### Environment-Specific Variables

**Production:**
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NODE_ENV=production
```

**Staging:**
```env
NEXT_PUBLIC_BASE_URL=https://staging.your-domain.com
NODE_ENV=production
```

### Build Optimization

The production build includes:
- Automatic code splitting
- Tree shaking for smaller bundles
- Image optimization
- CSS minification
- Component caching

### Post-Deployment Checklist

- [ ] Verify environment variables are set
- [ ] Test database connectivity
- [ ] Confirm image uploads work (Cloudinary)
- [ ] Check analytics tracking (PostHog)
- [ ] Test event creation and booking
- [ ] Verify caching behavior
- [ ] Monitor performance metrics

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start development server on port 3000 |
| **build** | `npm run build` | Create optimized production build |
| **start** | `npm start` | Start production server |
| **lint** | `npm run lint` | Run ESLint for code quality checks |
| **seed** | `npm run seed` | Populate database with sample events |

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library with Server Components
- **TypeScript 5.x** - Type-safe JavaScript

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **tw-animate-css** - Animation utilities
- **PostCSS** - CSS processing

### Database & ODM
- **MongoDB 7.0** - NoSQL database
- **Mongoose 8.19** - MongoDB object modeling

### Media & Assets
- **Cloudinary 2.8** - Image hosting and optimization
- **Next/Image** - Optimized image component
- **Lucide React** - Icon library

### 3D & Animations
- **Three.js 0.180** - 3D graphics library
- **OGL 1.0** - Minimal WebGL library
- **Postprocessing 6.37** - Post-processing effects

### Analytics & Monitoring
- **PostHog (JS)** - Product analytics
- **PostHog (Node)** - Server-side analytics

### UI Components
- **React Toastify** - Toast notifications
- **Class Variance Authority** - Component variants
- **clsx / tailwind-merge** - Class name utilities

### Development Tools
- **ESLint 9** - Code linting
- **tsx** - TypeScript execution for scripts

## 🏗️ Architecture Decisions

### Why Next.js 16?
- **Server Components**: Reduced JavaScript bundle size
- **New Caching API**: Granular control with `'use cache'` directive
- **Component Caching**: Faster page loads with `cacheComponents`
- **Improved Performance**: Better Core Web Vitals

### Why MongoDB + Mongoose?
- **Flexible Schema**: Easy to evolve event structure
- **Rich Queries**: Complex filtering by tags, dates
- **Indexes**: Fast slug-based lookups
- **Type Safety**: Mongoose + TypeScript integration

### Why PostHog?
- **Privacy-First**: GDPR compliant, self-hostable
- **Session Replay**: Debug user issues
- **Feature Flags**: Gradual feature rollout (future use)
- **Open Source**: Transparent and extensible

### Why Cloudinary?
- **CDN**: Global image delivery
- **Automatic Optimization**: WebP, responsive images
- **Transformations**: On-the-fly image processing
- **Generous Free Tier**: Cost-effective for startups

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
Error: Could not connect to MongoDB
```
- Verify `MONGODB_URI` in `.env.local`
- Check MongoDB is running (local) or IP is whitelisted (Atlas)
- Test connection with `mongosh` CLI

**Image Upload Fails**
```
Error: Invalid Cloudinary credentials
```
- Verify Cloudinary environment variables
- Check API key permissions in Cloudinary dashboard
- Ensure image size is under 5MB

**PostHog Not Tracking**
```
PostHog events not appearing in dashboard
```
- Verify `NEXT_PUBLIC_POSTHOG_KEY` is set
- Check browser console for errors
- Disable ad blockers during testing
- Confirm project is active in PostHog

**Build Errors**
```
Type error: Cannot find module...
```
- Run `npm install` to ensure dependencies are installed
- Delete `.next` folder and rebuild
- Check TypeScript version compatibility

### Performance Tips

1. **Optimize Images**: Use WebP format, serve from Cloudinary
2. **Database Queries**: Add indexes for frequently queried fields
3. **Bundle Size**: Use dynamic imports for large components
4. **Caching**: Leverage `'use cache'` for expensive operations
5. **Monitoring**: Use PostHog to identify slow pages

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Use TypeScript for all new files
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for functions
- Test locally before submitting PR

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [MongoDB](https://www.mongodb.com/) for the database
- [Cloudinary](https://cloudinary.com/) for image management
- [PostHog](https://posthog.com/) for analytics

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Check existing issues and discussions
- Review the [Next.js documentation](https://nextjs.org/docs)
- Consult the [MongoDB documentation](https://www.mongodb.com/docs/)

---

**Built with ❤️ using Next.js 16, React 19, and TypeScript**
