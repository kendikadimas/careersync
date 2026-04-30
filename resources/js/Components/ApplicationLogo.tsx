import { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    variant?: 'white' | 'blue';
}

export default function ApplicationLogo({ variant = 'white', ...props }: Props) {
    return (
        <img
            {...props}
            src={variant === 'white' ? "/logo-white.svg" : "/logo1.svg"}
            alt="Kembangin Logo"
        />
    );
}
