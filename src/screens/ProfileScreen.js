import React, { useState } from 'react';
import { User, Mail, Briefcase, Phone, LogOut, ChevronRight, Loader2 } from 'lucide-react';

// Componente auxiliar para las filas de información
const ProfileRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center">
            <Icon className="w-5 h-5 text-[#F39C12] mr-3" />
            <span className="text-gray-600 font-medium">{label}</span>
        </div>
        <span className="text-gray-800 font-semibold">{value}</span>
    </div>
);

// Componente auxiliar para botones de acción (simula el CustomPrimaryButton)
const ActionButton = ({ children, onClick, color = 'bg-[#17202A]', disabled = false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 shadow-lg mt-6
            ${disabled
                ? 'bg-gray-400 cursor-not-allowed shadow-none'
                : `${color} hover:opacity-90 active:opacity-75 transform hover:scale-[1.01]`
            }`}
    >
        {children}
    </button>
);

const ProfileScreen = ({ user, onLogout }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Los datos del usuario vienen de la prop 'user'
    const userData = {
        name: user?.name || 'Invitado Workly',
        email: user?.email || 'email@desconocido.com',
        role: 'Desarrollador Junior',
        phone: '+1 (555) 123-4567',
    };

    const handleLogout = () => {
        setIsLoggingOut(true);
        // Simulación de latencia de cierre de sesión
        setTimeout(() => {
            setIsLoggingOut(false);
            // Ejecutamos la función onLogout pasada desde el componente principal
            onLogout(); 
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans">
            <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 space-y-8">
                
                {/* Cabecera del Perfil */}
                <header className="flex flex-col items-center border-b pb-6 border-gray-200">
                    <div className="w-24 h-24 bg-[#1ABC9C] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md mb-4">
                        {userData.name.charAt(0)}
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#17202A]">{userData.name}</h1>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                </header>

                {/* Sección de Información Personal */}
                <section>
                    <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-[#F39C12]" /> Información
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-2">
                        <ProfileRow icon={User} label="Nombre Completo" value={userData.name} />
                        <ProfileRow icon={Mail} label="Correo Electrónico" value={userData.email} />
                        <ProfileRow icon={Briefcase} label="Rol Actual" value={userData.role} />
                        <ProfileRow icon={Phone} label="Teléfono" value={userData.phone} />
                    </div>
                </section>

                {/* Sección de Configuraciones (Ejemplo) */}
                <section>
                    <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-[#F39C12]" /> Opciones de Cuenta
                    </h2>
                    <div className="bg-white rounded-xl divide-y divide-gray-100 border border-gray-200 shadow-md">
                        
                        {/* Opción 1 */}
                        <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition cursor-pointer">
                            <span className="font-medium text-gray-700">Editar Preferencias</span>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>

                        {/* Opción 2 */}
                        <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition cursor-pointer">
                            <span className="font-medium text-gray-700">Historial de Aplicaciones</span>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </section>

                {/* BOTÓN DE CERRAR SESIÓN */}
                <ActionButton onClick={handleLogout} color="bg-red-500" disabled={isLoggingOut}>
                    {isLoggingOut ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Cerrando Sesión...
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <LogOut className="w-5 h-5 mr-2" />
                            Cerrar Sesión
                        </div>
                    )}
                </ActionButton> 
                
            </div>
        </div>
    );
};

export default ProfileScreen;
