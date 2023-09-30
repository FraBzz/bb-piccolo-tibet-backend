import {
    Button,
    Card,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { ChangeEvent, FormEvent } from "react";
import { FieldName } from "./EventDetails";

export type formProps = {
    event: {
        title: string | undefined,
        description: string | undefined,
        id: string | undefined,
        imageName: string | undefined,
        image: File
    }
    handleChange: (fieldName: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: () => void,
    success: string,
    error: string
}

export function EventForm(data: formProps) {
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Chiama la funzione di handle submit fornita come prop
        data.handleSubmit();
    };

    return (
        <Card color="transparent" shadow={false} key={data.event.id}>
            <Typography variant="h4" color="blue-gray">
                Modifica evento
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography> */}
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        name="file"
                        crossOrigin={undefined}
                        onChange={e => {
                            data.handleFileChange(e)
                        }}
                        type="file"
                        accept="image/*"
                        className="h-96 w-full rounded-lg object-cover object-center"
                    ></Input>
                    {data.event.imageName && <img
                        className="h-96 w-full rounded-lg object-cover object-center"
                        src={`http://localhost:8080/images/eventImages/${data.event.imageName}`}
                        alt="image"
                    />}
                    <Input size="lg" label="Titolo" crossOrigin={undefined} value={data.event.title} onChange={(e) => data.handleChange('title')(e)} />
                    <Textarea size="lg" label="Descrizione" value={data.event.description} onChange={(e) => data.handleChange('description')(e)} />
                    {/* <Input type="password" size="lg" label="Password" crossOrigin={undefined} onChange={handleChange}/> */}
                </div>
                {/* <Checkbox   
                    label={<Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                    >
                        I agree the
                        <a
                            href="#"
                            className="font-medium transition-colors hover:text-gray-900"
                        >
                            &nbsp;Terms and Conditions
                        </a>
                    </Typography>}
                    containerProps={{ className: "-ml-2.5" }} crossOrigin={undefined}          /> */}
                <Button className="mt-6" fullWidth type="submit">
                    {data.event.id === undefined ? 'Nuovo' : 'Modifica'}
                </Button>
                {/* <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography> */}
            </form>
            <div className="py-6 text-center">
                <Typography variant="h5" color="green">
                    {data.success}
                </Typography>
                <Typography variant="h5" color="red">
                    {data.error}
                </Typography>
            </div>
        </Card>
    );
}