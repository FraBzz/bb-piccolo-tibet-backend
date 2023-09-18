import { useEffect, useState } from "react"
import EventDataService from "../services/event.service"
import { EventModel } from "../models/event.model"
import { ListWithAvatar } from "./List"
import { Link } from "react-router-dom"



// export type resultProps = {
//     id: string,
//     title: string,
//     description: string,
//     createdAt: string,
//     updatedAt: string,
//     published: boolean
// }

// const EventSchema = z.object({
//     id: z.string(),
//     title: z.string(),
//     description: z.string(),
//     createdAt: z.string(),
//     updatedAt: z.string(),
//     published: z.boolean()
// })

// type Event = z.infer<typeof EventSchema>

export const EventsList = () => {
    const [events, setEvents] = useState<EventModel[]>([])

    const eventService = new EventDataService;

    useEffect(() => {
        const e = async () => {
            const a = await eventService.getAll();
            setEvents(a);
        }

        e();
        console.log({ events })
    }, [])

    console.log({ events })



    return (
        // <div className='events ml-8 flex justify-center items-center'>

        //     <ul className="">
        //         {
        //             events.map(item => {
        //                 return <li key={item.id}
        //                     className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
        //                     {item.title} <br />
        //                     {item.description}
        //                     <Link to={`/events/${item.id}`}>
        //               <div className="btn">View Details</div>
        //            </Link>
        //                 </li>
        //             })
        //         }
        //     </ul>


        // </div>
        <>
            {
                events.map(item => {

                    return (

                        <Link to={`/events/${item.id}`}>
                            <div className="flex justify-center p-4">
                                <ListWithAvatar title={item.title} description={item.description} key={item.id} />
                            </div>
                        </Link>
                    )
                })
            }
        </>

    )

}