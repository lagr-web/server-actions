//src/app/components/UpdateDataModal.tsx

"use client";

import { updateName } from "@/actions/actions";
import { useEffect, useState, useTransition } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { X } from "lucide-react";
import TextFields from "./Textfields";
import SubmitButton from "./SubmitButton";

type Props = {
  close: () => void;
  id: number;
};

interface PersonFormData {
  name: string;
  lastname: string;
}

const UpdateDataModal = ({ close, id }: Props) => {

  const [formData, setFormData] = useState<PersonFormData | null>(null);

  const [isPending, startTransition] = useTransition(); // Bruges til at håndtere overgangstilstande ved opdatering og fryser ikke UI'et
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    (async () => {
      const { data, error } = await supabase
        .from("testarea")
        .select("name, lastname")
        .eq("id", id)
        .single();

      if (!error && data) {
        setFormData(data);
      }
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;// Opdaterer kun det ændrede felt i formData og bevarer de andre felter 
    setFormData(prev => prev ? { ...prev, [name]: value } : prev); // Sikrer at prev ikke er null og opdaterer kun hvis det ikke er det
  };




  const action = (fd: FormData) => {


    if (isPending) return;

    startTransition(async () => {
      setError(null);
      try {

        await updateName(id, fd);
        setSuccess(true);
        setTimeout(close, 800);

      } catch (e) {

        console.log(e);
        setError('Noget gik galt');

      }
    });

  }


  if (!formData) return null;

  return (

    <section className="modal-container" role="dialog" aria-modal="true">
      <div className="grid grid-cols-1">
        <button className="justify-self-end" type="button" onClick={close}>
          <X />
        </button>
      </div>

      <form
        action={action}
      >
        <TextFields
          label="Name"
          name="name"
          value={formData?.name}
          onChange={handleChange}
        />

        <TextFields
          label="Lastname"
          name="lastname"
          value={formData?.lastname}
          onChange={handleChange}
        />

        <SubmitButton
          pendingText="Opdaterer..."
          isPending={isPending} >
          Opdater
        </SubmitButton>

      </form>

      <div className="grid grid-cols-1 text-center font-bold">
        {error && <p className="error">{error}</p>}
        {success && <p>Opdateret</p>}
      </div>



    </section>
  );
};

export default UpdateDataModal;
