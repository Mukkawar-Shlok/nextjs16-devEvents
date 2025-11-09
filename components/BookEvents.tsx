'use client';
import { bookEvent } from '@/lib/actions/booking.actions';
import React, { useState } from 'react'
import posthog from 'posthog-js';
import { toast } from 'react-toastify';
const BookEvents = ({ eventId, eventSlug }: { eventId: string, eventSlug: string }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { success, message } = await bookEvent(eventId, eventSlug, email);
        if(success) {
            setSubmitted(true);
            posthog.capture('event_booked', {
                eventId: eventId,
                eventSlug: eventSlug,
                email: email,
                message: message,
            });
        }else{
            console.error('Failed to book event');
            posthog.captureException(message);
            toast.error(message);
        }
    }

  return (
    <div id='book-event'>
        {submitted ? (
            <p className='text-sm'>Thank you for booking this event.</p>
        ) : (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Enter your email' id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="submit" className='button-submit'>Book Event</button>
                </div>
            </form>
        )}
    </div>
  )
}

export default BookEvents