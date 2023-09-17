import { z } from "zod"

export type props = {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    published: boolean
}

export const EventSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    published: z.boolean()
})

export type EventModel = z.infer<typeof EventSchema>