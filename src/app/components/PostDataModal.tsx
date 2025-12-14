
// src/app/components/PostDataModal.tsx

'use client';

import { addName } from "@/actions/actions";
import { X } from "lucide-react";
import TextFields from "./Textfields";
import SubmitButton from "./SubmitButton"; // tilpasset use

type Props = {

    close: () => void;

}

const PostDataModal = ({ close }: Props) => {
    

    const handleSubmitAction = async (formData: FormData) => {

        await addName(formData); // Kalder Server Action
        close(); // Lukker modalen via klient-side state
    };


    return (

        <>
            <section className="form-container">

                <div className="grid grid-cols-1 items-center">
                    <div className="justify-self-end cursor-pointer" onClick={close}><X /></div>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
                    Tilføj person
                </h2>

                <section style={{ padding: 20 }}>

                    <form action={handleSubmitAction}>

                        <TextFields
                            name="name"
                            placeholder="Fornavn"

                        />

                        <TextFields
                            name="lastname"
                            placeholder="Efternavn"

                        />

                        <SubmitButton>Gem</SubmitButton>


                    </form>

                </section>


            </section>


        </>

    )

}

export default PostDataModal;


