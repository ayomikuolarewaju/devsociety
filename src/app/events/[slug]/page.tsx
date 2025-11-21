import {notFound} from "next/navigation"

const Base_url = process.env.NEXT_PUBLIC_BASE_URL

const EventDetails = async( {params}:{params:Promise<{slug:string}>}) => {

    const {slug} = await params
    const resp = await fetch(`${Base_url}/api/events/${slug}`)
    const {data} = await resp.json()

    if(!data){
        return notFound()
    }
    
  return (
    
    <section id = "event">
        <h1>Event Deatails: <br/>{slug}</h1>
        </section>
  )
}

export default EventDetails