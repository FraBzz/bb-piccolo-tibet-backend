import {
    Button,
    Card,
    Checkbox,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { ChangeEvent, FormEvent } from "react";
import { FieldName } from "./PageDetails";


export type formProps = {
    page: {
        title: string | undefined,
        description: string | undefined,
        id: string | undefined
        published: boolean
    }
    handleChange: (fieldName: FieldName) => (page: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleDateChange: (fieldName: FieldName) => (date: string) => void
    handleSubmit: () => void,
    success: string,
    error: string
}

export function PageForm(data: formProps) {

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Chiama la funzione di handle submit fornita come prop
        data.handleSubmit();
    };

    console.log(data.page)


    return (
        <Card color="transparent" shadow={false} key={data.page.id}>
            <Typography variant="h4" color="blue-gray">
                {data.page.id === undefined ? 'Crea Pagina' : 'Modifica pagina'}
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography> */}
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Titolo" crossOrigin={undefined} value={data.page.title} onChange={(e) => data.handleChange('title')(e)} />
                    <Textarea size="lg" label="Descrizione" value={data.page.description} onChange={(e) => data.handleChange('description')(e)} />
                    {/* <Input type="password" size="lg" label="Password" crossOrigin={undefined} onChange={handleChange}/> */}
                </div>
                {/* <DatePicker 
    label="Data fine pageo"
    value={data.page.finishDate ? new Date(data.page.finishDate) : null}
    onChange={data.handleDateChange('finishDate')}
/> */}
                <Checkbox label="Pubblica online" crossOrigin={undefined} checked={data.page.published} onChange={(e) => data.handleChange('published')(e)} />
                <Button className="mt-6" fullWidth type="submit">
                    {data.page.id === undefined ? 'Nuovo' : 'Modifica'}
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