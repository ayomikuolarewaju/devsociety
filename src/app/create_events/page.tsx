"use client";

import { useActionState } from "react";
import { createEvents, FormState } from "@/lib/actions/event.action";

function page() {
  const initialState: FormState = {
    error: {},
  };

  const [state, formAction, isPending] = useActionState(
    createEvents,
    initialState
  );

  return (
    <div id="create-event">
      <form action={formAction}>
        <div className="mt-3">
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Title</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="title"
              placeholder="title"
            />
            {state?.error.title && (
              <p className="text-red-500 text-sm mt-1">{state.error.title}</p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Description</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="description"
              placeholder="description"
            />
            {state?.error.description && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.description}
              </p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Overview</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="overview"
              placeholder="overview"
            />
            {state?.error.overview && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.overview}
              </p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Venue</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="venue"
              placeholder="venue"
            />
            {state?.error.venue && (
              <p className="text-red-500 text-sm mt-1">{state.error.venue}</p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Location</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="location"
              placeholder="location"
            />
            {state?.error.location && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.location}
              </p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Date</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="date"
              placeholder="date"
            />
            {state?.error.date && (
              <p className="text-red-500 text-sm mt-1">{state.error.date}</p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Time</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="time"
              placeholder="time"
            />
            {state?.error.time && (
              <p className="text-red-500 text-sm mt-1">{state.error.time}</p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Audience</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="audience"
              placeholder="audience"
            />
            {state?.error.audience && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.audience}
              </p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Mode</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="mode"
              placeholder="mode"
            />
            {state?.error.mode && (
              <p className="text-red-500 text-sm mt-1">{state.error.mode}</p>
            )}
          </div>
          <div className="flex flex-row items-center justify-start gap-x-10">
            <label className="w-[100px]">Organizer</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="text"
              id="email"
              name="organizer"
              placeholder="organizer"
            />
            {state?.error.organizer && (
              <p className="text-red-500 text-sm mt-1">
                {state.error.organizer}
              </p>
            )}
          </div>
          <textarea
            className="focus:border-white focus:border p-1 bg-dark-200 rounded-[6px]"
            required
            id="email"
            name="agenda"
            placeholder="agenda here"
          >
            Enter your agenda
          </textarea>
          <textarea
            className="focus:border-white focus:border p-1 bg-dark-200 rounded-[6px]"
            required
            id="email"
            name="tags"
            placeholder="tags here"
          >
            Enter your tags
          </textarea>
          <div className="justify-start items-center flex flex-row gap-x-10">
            <label className="w-[100px]">Image</label>
            <input
              className="w-[600px] flex justify-start"
              required
              type="file"
              id="email"
              name="image"
              placeholder="image"
            />
          </div>
        </div>
        <button className="button-submit" type="submit">
          {isPending ? "Creating event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default page;
