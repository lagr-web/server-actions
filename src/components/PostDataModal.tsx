
// src/app/components/PostDataModal.tsx

'use client';

import { addName } from "@/actions/actions";
import { X } from "lucide-react";
import TextFields from "./Textfields";
import SubmitButton from "./SubmitButton"; // tilpasset use
import { useState, useTransition } from "react";

type Props = {

    close: () => void;

}

const PostDataModal = ({ close }: Props) => {

    const [isPending, startTransition] = useTransition(); // Bruges til at håndtere overgangstilstande ved opdatering og fryser ikke UI'et
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const action = (fd: FormData) => {

        if (isPending) return; // Forhindrer dobbeltklik under igangværende indsættelse

        startTransition(async () => { // Starter en overgangstilstand som ikke blokerer UI'et
            
            setError(null);

            try {
                await addName(fd);
                setSuccess(true);
                setTimeout(close, 800);
            } catch (e) {
                console.log(e);
                setError('Noget gik galt');
            }
        });

    }


    return (

        <>
            <section className="form-container">

                <div className="grid grid-cols-1 items-center">
                    <div className="justify-self-end cursor-pointer" onClick={close}><X /></div>
                </div>

                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
                    Tilføj person
                </h2>

                <section className="p-4">

                    <form action={action}>

                        <TextFields
                            name="name"
                            placeholder="Fornavn"

                        />

                        <TextFields
                            name="lastname"
                            placeholder="Efternavn"

                        />

                        <SubmitButton
                            pendingText="Gemmer..."
                            isPending={isPending} >
                            Gem
                        </SubmitButton>


                    </form>

                </section>

              
                <div className="grid grid-cols-1 text-center font-bold"> 
                      {error && <p className="error">{error}</p>}
                    {success && <p>Oprettet</p>}
                    </div>

            </section>


        </>

    )

}

export default PostDataModal;


