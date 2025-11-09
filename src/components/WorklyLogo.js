import React from 'react';
import { Briefcase } from 'lucide-react'; 

const WorklyLogo = () => {
    
    // Ruta donde debería estar tu icono simplificado (la 'W' o el logo simple)
    const iconPath = "/workly_logo.png"; 
    
    // Estado simple para manejar si la imagen ha fallado al cargar
    const [imageFailed, setImageFailed] = React.useState(false);

    return (
        <div className="flex items-center space-x-2">
            
            {/* 1. Intenta cargar la imagen */}
            {!imageFailed ? (
                <img 
                    src={iconPath} 
                    alt="Workly Logo"
                    className="w-8 h-8 object-contain"
                    // Si la imagen falla (error 404, no existe), establece el estado de fallo
                    onError={() => setImageFailed(true)} 
                />
            ) : (
                /* 2. Fallback: Muestra un ícono genérico si la imagen falla */
                <Briefcase className="w-8 h-8 text-[#1ABC9C]" />
            )}
            
            {/* Texto Workly */}
            <span className="text-2xl font-extrabold text-[#17202A]">
                Workly
            </span>
        </div>
    );
};

export default WorklyLogo;
