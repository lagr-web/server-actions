//src/app/components/DeleteDataModal.tsx

//Server Actions håndterer data, klienten orkestrerer oplevelsen via useTransition

"use client";

import { deleteName } from "@/actions/actions";
import SubmitButton from "./SubmitButton";
import { useState, useTransition } from "react";
import { useCrudAction } from "@/hooks/useCrudAction";

type Props = {
  close: () => void;
  id: number;
};

const DeleteDataModal = ({ close, id }: Props) => {


  /* const { run, isPending, error, success } = useCrudAction(
    deleteName,
    {
      onSuccess: close,
      autoCloseDelay: 800,
    }
  ); */



    const [isPending, startTransition] = useTransition(); // Bruges til at håndtere overgangstilstande ved opdatering og fryser ikke UI'et
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


   const action = () => {

    if (isPending) return; // Forhindrer dobbeltklik under igangværende sletning

    startTransition(async () => {
      setError(null);

      try {
        await deleteName(id);
        setSuccess(true);
        setTimeout(close, 800);
      } catch (e) {
        console.log(e);
        setError('Noget gik galt');
      }
    });

  } 


  return (

    <section className="modal-container" role="dialog" aria-modal="true">
      <p className="mb-4">Vil du slette denne post?</p>

      <form
        action={action}
        className="grid grid-cols-2"
      >

        <button
          type="button"
          className="button-style"
          onClick={close}
        >
          Annuller
        </button>

        <SubmitButton
          pendingText="Sletter..."
          isPending={isPending}>
          Slet
        </SubmitButton>

      </form>

      {error && <p className="error">{error}</p>}
      <div className="grid grid-cols-1 text-center font-bold"> {success && <p>Slettet</p>}</div>

    </section>




  )

}

export default DeleteDataModal;

