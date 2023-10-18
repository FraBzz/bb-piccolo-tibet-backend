import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PageModel } from "../models/page.model";
import PageDataService from "../services/page.service";
import { NormalList } from "./NormalList";

export const PagesList = () => {
    const [pages, setPages] = useState<PageModel[]>([])
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

    const handleList = (pageId: string) => {
        const updatepages = pages.filter(item => item.id !== pageId);
        setPages(updatepages);
    }

    const pageservice = new PageDataService;

    useEffect(() => {
        setSuccess("");
        setError("");

        const e = async () => {
            const a = await pageservice.getAll();
            setPages(a);
        }

        console.log({state})
        if(state !== undefined) setSuccess(state);

        e();
    }, [])



    return (
        <>
            <div className="flex justify-end p-4">
                <Link to={`/pages/new`}>
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
                pages.map(item => {
                    console.log(item.id)

                    return (
                        <div className="flex justify-center p-4" key={item.id}>
                            <NormalList title={item.title} description={item.description} id={item.id} handleMessage={handleMessage} handleList={handleList} />
                        </div>
                    )
                })
            }
        </>

    )

}