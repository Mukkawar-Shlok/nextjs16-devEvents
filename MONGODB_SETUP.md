# MongoDB Connection Setup

This guide explains how to use the MongoDB connection in your Next.js application.

## Overview

The `lib/mongodb.ts` file provides a cached MongoDB connection using Mongoose. The connection caching prevents multiple database connections during development (hot-reloading) and optimizes performance in production.

## Setup

### 1. Environment Variables

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/your-database-name
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

### 2. Usage

Import and use the `connectDB` function in your API routes, Server Components, or Server Actions:

#### In API Routes

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    // Your database operations here
    // Example: const users = await User.find({});
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}
```

#### In Server Components

```typescript
// app/users/page.tsx
import connectDB from '@/lib/mongodb';
import User from '@/models/User'; // Your Mongoose model

export default async function UsersPage() {
  await connectDB();
  const users = await User.find({}).lean();
  
  return (
    <div>
      {users.map((user) => (
        <div key={user._id.toString()}>{user.name}</div>
      ))}
    </div>
  );
}
```

#### In Server Actions

```typescript
// app/actions/user-actions.ts
'use server';

import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function createUser(formData: FormData) {
  await connectDB();
  
  const user = await User.create({
    name: formData.get('name'),
    email: formData.get('email'),
  });
  
  return { success: true, user };
}
```

## Creating Mongoose Models

Create your Mongoose models in a `models` directory:

```typescript
// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Use existing model if available (prevents recompilation during hot-reload)
const User = models.User || model<IUser>('User', UserSchema);

export default User;
```

## Key Features

### Connection Caching
- **Development**: Prevents multiple connections during hot-reloading
- **Production**: Reuses connections for optimal performance
- **Error Handling**: Automatically retries on connection failure

### Type Safety
- Full TypeScript support with proper type definitions
- No use of `any` types
- Comprehensive JSDoc comments

### Best Practices
- Environment variable validation
- Proper error handling
- Connection pooling via Mongoose defaults
- Fast-fail strategy with `bufferCommands: false`

## Troubleshooting

### Connection Errors
If you encounter connection errors:
1. Verify your `MONGODB_URI` in `.env.local`
2. Check network connectivity to MongoDB
3. Ensure IP address is whitelisted (for MongoDB Atlas)
4. Verify database user permissions

### Multiple Connections Warning
If you see multiple connection warnings, ensure you're:
- Importing `connectDB` from the same file
- Not creating new connections elsewhere
- Using the cached connection properly

## References
- [Mongoose Documentation](https://mongoosejs.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

