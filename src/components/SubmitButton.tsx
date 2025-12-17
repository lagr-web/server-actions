// src/app/components/SubmitButton.tsx

"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  pendingText: string;
  isPending?: boolean;
};

function SubmitButton({ children, pendingText, isPending = false }: Props) {
  return (
    <div className="grid grid-cols-1 items-end">
      <button
        type="submit"
        className="button-style"
        disabled={isPending}
      >
        {isPending ? pendingText : children}
      </button>
    </div>
  );
}

export default SubmitButton;
