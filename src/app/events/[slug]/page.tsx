import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";

const Base_url = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  img,
  label,
  alt,
}: {
  img: string;
  label: string;
  alt: string;
}) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <Image src={img} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul className="mt-2">
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <div key={tag} className="pill">
          {tag}
        </div>
      ))}
    </div>
  );
};

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const resp = await fetch(`${Base_url}/api/events/${slug}`);
  if (!resp.ok) {
    return notFound();
  }
  const { data } = await resp.json();

  console.log(data);

  if (!data) {
    return notFound();
  }

  const bookings = 10;

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="">{data.description}</p>
      </div>
      <section className="flex justisfy-center gap-[70px]">
        <div className="details">
          <div className="content">
            <Image
              src={data.image}
              alt="event image"
              width={800}
              height={800}
              className="banner"
            />
          </div>

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{data.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              img="/icons/calendar.svg"
              alt="calendar"
              label={data.date}
            />
            <EventDetailItem
              img="/icons/clock.svg"
              alt="time"
              label={data.time}
            />
            <EventDetailItem
              img="/icons/pin.svg"
              alt="pin"
              label={data.location}
            />
            <EventDetailItem
              img="/icons/audience.svg"
              alt="location"
              label={data.audience}
            />
            <EventDetailItem
              img="/icons/mode.svg"
              alt="venue"
              label={data.mode}
            />
          </section>
          <EventAgenda agendaItems={data.agenda} />
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{data.organizer}</p>
          </section>
          <EventTags tags={JSON.parse(data.tags[0])} />
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </section>
    </section>
  );
};

export default EventDetails;
