import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageModel } from '../models/page.model';
import { responseModel } from '../models/response.model';
import PageDataService from '../services/page.service';
import { PageForm } from './PageForm';

export type FieldName = keyof PageModel;

export type props = {
  page: {
      title: string | undefined,
      description: string | undefined,
      id: string | undefined,
      imageName: string | undefined,
      image: File | undefined,
      finishDate: string | undefined
  }
  handleChange: (fieldName: FieldName) => (page: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleSubmit: () => void,
  success: string,
  error: string
}

export const PageDetails = () => {
  const [page, setPage] = useState<PageModel>({ title: '', description: '' } as PageModel);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { pageId } = useParams<{ pageId: string }>();
  const pageService = new PageDataService();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      console.log({ pageId });
      if (pageId !== 'new') {
        const pageData = await pageService.getById(pageId);
        setPage(pageData);
      } else {
        setPage({ title: '', description: '' } as PageModel);
      }
    };

    fetchData();
    
    console.log({page})
  }, [pageId]);

  const handleChange = (fieldName: FieldName) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value: string | boolean;
    if ((e.target as HTMLInputElement).type === 'checkbox') {
        value = (e.target as HTMLInputElement).checked;
    } else {
        value = e.target.value;
    }
    
    setPage((prevPage) => ({
      ...prevPage,
      [fieldName]: value,
    }));
    console.log({page})
  };

  const handleDateChange = (fieldName: string) => (newDate: string) => {
    console.log({newDate})
    setPage((prevPage) => ({
      ...prevPage,
      [fieldName]: newDate,
    }));
  };
  

  const handleSubmit = async () => {
    if (page) {
      console.log({ page });
      try {
        const updatedPage = {
          ...page,
          title: page.title,
          description: page.description,
          published: page.published
        };

        console.log({ updatedPage });

        let res: responseModel;
        if (!page.id) {
          console.log("nuovo");
          res = await pageService.create(updatedPage);
        } else {
          console.log("esiste");
          res = await pageService.update(page.id, updatedPage);
        }
        setSuccess(res.message);
        setError("");
        navigate("/pages", {
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
      <PageForm page={page} handleChange={handleChange} handleDateChange={handleDateChange} handleSubmit={handleSubmit} success={success} error={error} />
    </div>
  );
};
