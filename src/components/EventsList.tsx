import { useEffect, useState } from "react"
import EventDataService from "../services/event.service"
import { z } from "zod"



export type resultProps = {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    published: boolean
}

const EventSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    published: z.boolean()
})

type Event = z.infer<typeof EventSchema>

export const EventsList = () => {
    const [events, setEvents] = useState<Event[]>([])

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
        <div className='events ml-8 flex justify-center items-center'>

            <ul className="">
                {
                    events.map(item => {
                        return <li
                            className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                            {item.title} <br />
                            {item.description}
                        </li>
                    })
                }
            </ul>


        </div>
    )

}