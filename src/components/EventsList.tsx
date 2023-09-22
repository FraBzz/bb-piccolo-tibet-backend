import { Button, Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { EventModel } from "../models/event.model"
import EventDataService from "../services/event.service"
import { ListWithAvatar } from "./List"



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
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const {state} = useLocation()

    const handleMessage = (type: string, message: string) => {
        if (type === "success") {
            setError("")
            setSuccess(message)
        } else {
            setSuccess("")
            setError(message)
        }
    };

    const handleList = (eventId: string) => {
        const updateEvents = events.filter(item => item.id !== eventId);
        setEvents(updateEvents);
    }

    const eventService = new EventDataService;

    // const body = {
    //     username: "pietro.roversi@evoluzionetelematica.it",
    //     password: "456Evoltel123$"
    // }

    useEffect(() => {
        setSuccess("");
        setError("");

        const e = async () => {
            // const post = await fetch("https://demo7.evoluzionetelematica.it/api.monhey.it/api/v1/User/login", {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "application/json",
            //     },

            //     body: JSON.stringify(body)
            // })

            // console.log("pocketbase",await post.json())
            const a = await eventService.getAll();
            setEvents(a);
        }

        console.log({state})
        if(state !== undefined) setSuccess(state);

        e();
    }, [])



    return (
        <>
            <div className="flex justify-end p-4">
                <Link to={`/events/new`}>
                    <Button className="mr-4 md:mr-32">Nuovo</Button>
                </Link>
            </div>
            
            <div className="py-6 text-center">
                <Typography variant="h5" color="green">
                    {success}
                </Typography>
                <Typography variant="h5" color="red">
                    {error}
                </Typography>
            </div>
            {
                events.map(item => {
                    console.log(item.id)

                    return (
                        <div className="flex justify-center p-4" key={item.id}>
                            <ListWithAvatar title={item.title} description={item.description} id={item.id} handleMessage={handleMessage} handleList={handleList} />
                        </div>
                    )
                })
            }
        </>

    )

}