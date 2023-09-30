import { z } from "zod"

export type props = {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    published: boolean,
    imageName: string,
    image: File | undefined
}

export const EventSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    published: z.boolean(),
    imageName: z.string(),
    image: z.instanceof(File)
})

export type EventModel = z.infer<typeof EventSchema>