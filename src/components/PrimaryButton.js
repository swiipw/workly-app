import React from 'react';

// Se usa el retorno implícito con paréntesis, que es sintácticamente seguro
const PrimaryButton = ({ children, onClick, type = 'button', disabled = false }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
            w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 shadow-md
            ${disabled 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#F39C12] hover:bg-[#E67E22] active:bg-[#C07F10] transform hover:scale-[1.01]'
            }
        `}
    >
        {children}
    </button>
);

export default PrimaryButton;
