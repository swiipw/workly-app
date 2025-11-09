import React from 'react';
import { CheckCircle } from 'lucide-react';

const NotificationBar = ({ message, isVisible }) => {
    return (
        <div 
            // Posicionamiento fijo en la parte superior, cubriendo el ancho
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out 
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="bg-[#1ABC9C] text-white p-4 shadow-2xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-3" />
                <span className="font-semibold text-sm md:text-base">{message}</span>
            </div>
        </div>
    );
};

export default NotificationBar;
