import React from 'react'
import ExplorerBtn from '../components/ExplorerBtn'
import EventCard from '@/components/EventCard'
import { events } from '@/lib/constants'
import { IEvent } from '@/database';
import { cacheLife } from 'next/cache';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const page = async() => {
  'use cache';
  cacheLife('hours');
  // const response = await fetch(`${BASE_URL}/api/events`);
  // const {events} = await response.json();
  return (
    <section>
      <h1>The hub for anime events</h1>
      <p className='text-center mt-5'>Discover and attend the latest anime events in your area</p>
      <ExplorerBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.map((event) => (
              <EventCard {...event} key={event.title}/>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page