import Explore from "@/components/Explore";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants"

const Home = () => {
 
  return (
    <section>
      <h1 className="text-center z-50">
        The Society for Every Dev <br />
        Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <Explore />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
