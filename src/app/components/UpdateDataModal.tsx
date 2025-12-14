'use client';

import { updateName } from "@/actions/actions";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { X } from "lucide-react";
import { NextResponse } from "next/server";
import TextFields from './Textfields';
import SubmitButton from "./SubmitButton"; // tilpasset use

type Props = {
    close: () => void;
    id: number;
}

interface PersonFormData {
  id: number;
  name: string;
  lastname: string;
}

const UpdateDataModal = ({ close, id }: Props) => {

    const [formData, setFormData] = useState<PersonFormData | null>(null);

    useEffect(() => {
        const supabase = createSupabaseBrowserClient();

        (async () => {

            const { data, error } = await supabase
                .from('testarea')
                .select('*')
                .eq('id', id).single();

            if (error) {
                console.error("Fetch error:", error);
                return;
            }

            if (!data) {
                console.error("Record not found");
                return;
            }

            setFormData(data as PersonFormData);

            //console.log("Fetched data for update:", data);

        })()

    },[]);


     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } as PersonFormData : null);
    };
 



     const handleSubmit = async (formData: FormData) => {
    
            await updateName(id, formData); // Kalder Server Action
            close(); // Lukker modalen via klient-side state
        };
    


    return (
       
        <section
            className="modal-container"
            role="dialog"
            aria-modal="true"
        >
            <div className="grid grid-cols-1 items-center">

                <div className="justify-self-end" onClick={close}><X /></div>
            </div>

            <form action={handleSubmit}>

                <TextFields
                    label="Name"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleChange}
                />
                <span className="text-gray-400 text-sm">
                </span>

                <TextFields
                    label="Lastname"
                    name="lastname"
                    value={formData?.lastname || ''}
                    onChange={handleChange}
                />
                <span className="text-gray-400 text-sm">
                </span>

                <SubmitButton>Updater</SubmitButton>

            </form>

          

        </section>


    );



}

export default UpdateDataModal;