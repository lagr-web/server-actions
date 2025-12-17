//src/components/DataWrapper.tsx

'use client'; // <-- Sæt "use client"; her!

import { Fragment, useState } from "react";

import PostDataModal from "./PostDataModal";
import UpdateDataModal from "./UpdateDataModal";
import DeleteDataModal from "./DeleteDataModal";
import { Edit, Pencil, Trash2 } from "lucide-react";

type ModalMode = "delete" | "update" | "post" | null;


interface Person {
  id: number;
  name: string;
  lastname: string;
}

// Modtager data fra Server Componenten via props
const DataWrapper = ({ initialData }: { initialData: Person[] })=>  {

  const [openModal, setOpenModal] = useState<ModalMode>(null);

  const [mId, setMId] = useState<number>(0);


  const handleOpenModal = (mode: "delete" | "update" | "post", id?: number) => {
    
    setMId(id || 0);
    setOpenModal(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setMId(0);
  };

  return (
    <>
        <header className="custom-header">
                <nav className="custom-navbar">
                    <h1 className="text-lg font-semibold">Personer</h1>
                    <ul className="flex gap-4">
                        <li className="hover:text-gray-300 cursor-pointer"
                            onClick={() => { handleOpenModal("post") }}>
                            Opret en person
                        </li>
                    </ul>
                </nav>
            </header>

   <div className="dashboard-content">
                <div className="p-5 grid justify-center mt-16">
                    <section className="dashboard-content-grid">
                        {initialData && initialData.map((items: Person) => (

                            <Fragment key={items.id}>

                                <div className="bg-gray-500 p-2.5 rounded-l-md">
                                    {items.name} {items.lastname}
                                </div>

                                <div className="dashboard-content-fragtment"
                                    onClick={() => { handleOpenModal("update", items.id) }}
                                >
                                    <Pencil size={18} />
                                </div>

                                <div className="dashboard-content-fragtment rounded-r-md"
                                    onClick={() => { handleOpenModal("delete", items.id) }}
                                >
                                    <Trash2 size={18} />
                                </div>

                            </Fragment>
                        ))}
                    </section>
                </div>
            </div>

         {openModal === "post" && (
                <PostDataModal close={handleCloseModal} />
            )}

             {openModal === "update" && (
                <UpdateDataModal close={handleCloseModal} id={mId} />
            )}

                 {openModal === "delete" && (
                <DeleteDataModal close={handleCloseModal} id={mId} />
            )}

    </>
    
  );
}

export default DataWrapper;

