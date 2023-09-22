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
  }
  handleChange: (fieldName: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleSubmit: () => void,
  success: string,
  error: string
}

export const EventDetails = () => {
  const [event, setEvent] = useState<EventModel>({ title: '', description: '' } as EventModel);
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
  }, [eventId]);

  const handleChange = (fieldName: FieldName) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [fieldName]: e.target.value,
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
        };

        console.log({ updatedEvent });

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
      <EventForm event={event} handleChange={handleChange} handleSubmit={handleSubmit} success={success} error={error} />
    </div>
  );
};
