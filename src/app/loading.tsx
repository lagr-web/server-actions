// src/app/loading.tsx


import { Loader2, Loader, LoaderPinwheel } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">

      <div className="grid grid-cols-2 w-56 bg-gray-800 text-white p-2 rounded-full shadow-md shadow-black/50 ">
        <div> <Loader className="animate-spin h-8 w-8 text-white" /></div>
        <div className='p-1'>Henter data...</div>
      </div>

    </div>
  );
};

export default Loading;
 