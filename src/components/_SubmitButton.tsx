// src/app/components/SubmitButton.tsx

import { useFormStatus } from 'react-dom'; // Importér denne hook


type TextFieldProps = {
  className?: string;

} & React.ButtonHTMLAttributes<HTMLButtonElement>;


const SubmitButton = ({children}:TextFieldProps)=> {
    
    const { pending } = useFormStatus();//arbejder super sammen med Server Actions
    
    return (
        // Vi bruger flexbox her for at placere knappen til højre 
        // og teksten lige under knappen, men centreret i den lille kolonne.
        <>
        <div className="flex flex-col items-end mt-4"> 
            <button 
                type="submit" 
                className={`bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 cursor-pointer'
                }`} 
                disabled={pending}
            >
             {children}
            </button>
               </div>
            {/* Teksten vises centreret under knappen med en lille margin */}
            <div className= "pt-2 text-md text-gray-600 text-center"  >
                {pending ? 'Gemmer...' : ''}
            </div>
     
        </>
    );
}

export default SubmitButton;