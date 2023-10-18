
import { PageModel } from "../models/page.model";
import { responseModel } from "../models/response.model";

export default class PageDataService {
    async getAll(): Promise<PageModel[]> {
        const res = await fetch("http://localhost:8080/api/pages");
        const data = await res.json();
        return data;
    }

    async getById(pageId: string | undefined): Promise<PageModel> {
        const res = await fetch(`http://localhost:8080/api/pages/${pageId}`);
        const data = await res.json();
        console.log({data})
        return data;
    }

    async delete(pageId: string | undefined): Promise<responseModel> {
        const res = await fetch(`http://localhost:8080/api/pages/${pageId}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        return data;
    }

    async create(page: PageModel): Promise<responseModel> {
        console.log("create", JSON.stringify(page))

        const formData = new FormData();
    
        formData.append('title', page.title);
        formData.append('description', page.description);
        formData.append('published', String(page.published));

        console.log({formData})

        const res = await fetch(`http://localhost:8080/api/pages/`, {
            method: 'POST',
            body: formData
        });
        return res.json();
    }

    async update(pageId: string | undefined, page: PageModel): Promise<responseModel> {
        console.log("update", JSON.stringify(page))

        const formData = new FormData();
    
        formData.append('title', page.title);
        formData.append('description', page.description);
        formData.append('published', String(page.published));

        console.log({formData})

        const res = await fetch(`http://localhost:8080/api/pages/${pageId}`, {
            method: 'PUT',
            body: formData
        });
        return res.json();
    }
}
