// src/app/hooks/useCrudAction.ts

"use client";

import { useState, useTransition } from "react";

type Options = {
    onSuccess?: () => void;
    autoCloseDelay?: number; // fx 800 ms
};

export function useCrudAction<T extends any[]>(
    actionFn: (...args: T) => Promise<void>,
    options?: Options
) {
    
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    function run(...args: T) {
        if (isPending) return;

        startTransition(async () => {
            setError(null);
            setSuccess(false);

            try {
                await actionFn(...args);
                setSuccess(true);

                if (options?.onSuccess) {
                    if (options.autoCloseDelay) {
                        setTimeout(options.onSuccess, options.autoCloseDelay);
                    } else {
                        options.onSuccess();
                    }
                }
            } catch (e) {
                console.error(e);
                setError("Noget gik galt");
            }
        });
    }

    return {
        run,
        isPending,
        error,
        success,
    };
}
