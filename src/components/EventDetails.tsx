import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventModel } from '../models/event.model';
import { responseModel } from '../models/response.model';
import EventDataService from '../services/event.service';
import { EventForm } from './EventForm';

export type FieldName = keyof EventModel;

export type props = {
  event: {
      title: string | undefined,
      description: string | undefined,
      id: string | undefined,
      imageName: string | undefined,
      image: File | undefined,
      finishDate: string | undefined
  }
  handleChange: (fieldName: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleSubmit: () => void,
  success: string,
  error: string
}

export const EventDetails = () => {
  const [event, setEvent] = useState<EventModel>({ title: '', description: '', imageName: '', image: new File([], "placeholder.txt"), finishDate: '' } as EventModel);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { eventId } = useParams<{ eventId: string }>();
  const eventService = new EventDataService();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      console.log({ eventId });
      if (eventId !== 'new') {
        const eventData = await eventService.getById(eventId);
        setEvent(eventData);
      } else {
        setEvent({ title: '', description: '' } as EventModel);
      }
    };

    fetchData();
    
    console.log({event})
  }, [eventId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("entra")
    const file = e.target.files?.[0];
    console.log({file})
    if (file) {
      console.log("file")
      setEvent((prevEvent) => ({
        ...prevEvent,
        image: file,
      }));
      console.log({event})
    }
  };

  const handleChange = (fieldName: FieldName) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value: string | boolean;
    if ((e.target as HTMLInputElement).type === 'checkbox') {
        value = (e.target as HTMLInputElement).checked;
    } else {
        value = e.target.value;
    }
    
    setEvent((prevEvent) => ({
      ...prevEvent,
      [fieldName]: value,
    }));
    console.log({event})
  };

  const handleDateChange = (fieldName: string) => (newDate: string) => {
    console.log({newDate})
    setEvent((prevEvent) => ({
      ...prevEvent,
      [fieldName]: newDate,
    }));
  };
  

  const handleSubmit = async () => {
    if (event) {
      console.log({ event });
      try {
        const updatedEvent = {
          ...event,
          title: event.title,
          description: event.description,
          published: event.published,
          imageName: event.imageName,
          image: event.image,
          finishDate: event.finishDate
        };

        console.log({ updatedEvent });

  //       const formData = new FormData()
  // formData.append("image", event.imageName)
  // formData.append("title", event.title)
  // formData.append("description", event.description)

        let res: responseModel;
        if (!event.id) {
          console.log("nuovo");
          res = await eventService.create(updatedEvent);
        } else {
          console.log("esiste");
          res = await eventService.update(event.id, updatedEvent);
        }
        setSuccess(res.message);
        setError("");
        navigate("/events", {
          state: res.message
        })
      } catch (err: any) {
        console.log({ err });
        setSuccess("");
        setError(err);
      }
    }
  };


  return (
    <div className="flex justify-center p-4">
      <EventForm event={event} handleChange={handleChange} handleFileChange={handleFileChange} handleDateChange={handleDateChange} handleSubmit={handleSubmit} success={success} error={error} />
    </div>
  );
};
