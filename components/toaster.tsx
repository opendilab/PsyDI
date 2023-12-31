'use client'

import { toast } from 'react-hot-toast'


export { Toaster } from 'react-hot-toast'

export function errorToaster(message: string, duration: int = 2000) {
  toast.error(
    message,
    {
        duration: duration,
        style: {
            border: '1px solid #713200',
            color: '#713200',
            padding: '16px',
        },
        position: "bottom-center",
        iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
        },
    }
  )
}
