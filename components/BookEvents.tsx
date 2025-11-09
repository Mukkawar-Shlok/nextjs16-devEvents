'use client';
import React, { useState } from 'react'

const BookEvents = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
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