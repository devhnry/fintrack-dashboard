import React from "react";

interface ErrorMessageProps {
    title: string;
    message: string;
    className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message, className }) => (
    <div className={`flex flex-col items-center justify-center py-16 space-y-4 text-center text-danger ${className}`}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="max-w-xs text-danger/70">{message}</p>
    </div>
);

export default ErrorMessage;
