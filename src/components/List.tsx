import {
  Avatar,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Typography
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { responseModel } from "../models/response.model";
import EventDataService from "../services/event.service";
import { DialogCustom } from "./DialogCustom";


export type listElement = {
  title: string,
  description: string,
  id: string,
  imageName: string,
  finishDate: string,
  handleMessage: (type: string, message: string) => void,
  handleList: (id: string) => void
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ListWithAvatar(data: listElement) {
  const eventService = new EventDataService();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    if (data.id !== undefined) {
      try {
        handleOpen();
        const res: responseModel = await eventService.delete(data.id);
        data.handleMessage("success", res.message)
        data.handleList(data.id)
      } catch (err: any) {
        data.handleMessage("error", err.message)
      }
    }
  }

  console.log(Date.parse(data.finishDate))
  console.log(Date.now())
  console.log(Date.parse(data.finishDate) < Date.now())


  return (
    <Card className="w-96 md:w-2/3 lg:w-3/4 xl:w-4/5" key={data.id}>
      <List>
        <ListItem>


          <Link to={`/events/${data.id}`} className="flex-grow">
            <div className="flex flex-col items-center justify-center">
              <Typography variant="h4" color="blue-gray" className="text-center mb-2">
                {data.title}
              </Typography>
              {
              data.imageName && data.imageName !== "undefined" ? 
              <Avatar variant="rounded" alt="candice" size="xxl" src={`http://localhost:8080/images/eventImages/${data.imageName}`} className="mb-4" />
              : ""
              }

<p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
  
                {Date.parse(data.finishDate) < Date.now() ? 'Evento passato' : 'Pubblicato online'}
            </p>
              
              {/* <Typography variant="small" color="gray" className="font-normal text-center">
                {data.description}
              </Typography> */}
            </div>
          </Link>


          <ListItemSuffix >
            <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
              <TrashIcon />
            </IconButton>
          </ListItemSuffix>
        </ListItem>
        {/* <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="alexander" src="/img/face-2.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Alexander
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Backend Developer @ Material Tailwind
              </Typography>
            </div>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="emma" src="/img/face-3.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Emma Willever
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                UI/UX Designer @ Material Tailwind
              </Typography>
            </div>
          </ListItem> */}
      </List>
      <DialogCustom handleOpen={handleOpen} open={open} id={data.id} handleDelete={handleDelete} title={data.title} />
    </Card >
  );
}