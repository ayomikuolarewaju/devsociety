"use client";
import React, { useState } from "react";

function BookEvent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-green-600 text-sm">
          Thank you for booking your spot! , {email}.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="button-submit" type="submit" onClick={(e) => {}}>
            Book Now
          </button>
        </form>
      )}
    </div>
  );
}

export default BookEvent;
