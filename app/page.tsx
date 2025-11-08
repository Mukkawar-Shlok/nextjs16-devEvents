import React from 'react'
import ExplorerBtn from '../components/ExplorerBtn'
import EventCard from '@/components/EventCard'
import { events } from '@/lib/constants'

const page = () => {
  return (
    <section>
      <h1>The hub for developer events</h1>
      <p className='text-center mt-5'>Discover and attend the latest events in your area</p>
      <ExplorerBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
              <EventCard {...event} key={event.title}/>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page