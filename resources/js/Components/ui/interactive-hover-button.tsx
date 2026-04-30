import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface InteractiveHoverButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    text?: string
    loadingText?: string
    successText?: string
    className?: string
}

export default function InteractiveHoverButton({
    text = 'Button',
    loadingText = 'Processing...',
    successText = 'Complete!',
    className,
    ...props
}: InteractiveHoverButtonProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    const isIdle = status === 'idle'

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (status !== 'idle') return

        setStatus('loading')
        // Simulate async process (for demo purpose only)
        setTimeout(() => {
            setStatus('success')
            setTimeout(() => {
                setStatus('idle')
                // Add any actual redirect or form submission logic after success
            }, 1500) // Reset after success
        }, 1500)
        
        if (props.onClick) {
            props.onClick(e);
        }
    }

    return (
        <motion.button
            className={cn(
                'group relative flex items-center justify-center overflow-hidden font-bold transition-all',
                'bg-navy-600 rounded-xl border border-navy-700 p-2 px-6 min-w-40 text-white shadow-sm hover:shadow-md',
                status === 'loading' && 'px-2', // Circle shape when loading
                className
            )}
            onClick={handleClick}
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            {...props}
        >
            <AnimatePresence mode='popLayout' initial={false}>
                <motion.div
                    key='idle'
                    className='flex items-center gap-2'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <div
                        className={cn(
                            'bg-white h-2 w-2 rounded-full transition-all duration-500 group-hover:scale-[60]',
                            !isIdle && 'scale-[60]'
                        )}
                    />
                    <span
                        className={cn(
                            'inline-block transition-all duration-500 group-hover:translate-x-20 group-hover:opacity-0',
                            !isIdle && 'translate-x-20 opacity-0'
                        )}
                    >
                        {text}
                    </span>
                    <div
                        className={cn(
                            'text-navy-600 absolute top-0 left-0 z-10 flex h-full w-full -translate-x-16 items-center justify-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100',
                            !isIdle && 'translate-x-0 opacity-100'
                        )}
                    >
                        {status === 'idle' ? (
                            <>
                                <span>{text}</span>
                                <ArrowRight className='h-4 w-4' />
                            </>
                        ) : status === 'loading' ? (
                            <>
                                <div className='border-white/30 border-t-white h-5 w-5 animate-spin rounded-full border-2' />
                                <span>{loadingText}</span>
                            </>
                        ) : (
                            // success
                            <>
                                <Check className='h-5 w-5' />
                                <span>{successText}</span>
                            </>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.button>
    )
}
