import React, { useState } from 'react';
import { LogOut, ChevronRight, Loader2, BookOpen, Heart, Code, Edit } from 'lucide-react';

// Componente auxiliar para las filas de información (Simula ser editable)
const EditableRow = ({ icon: Icon, label, value }) => {
    // Simulamos la funcionalidad de edición (el valor no cambiará, solo la interfaz)
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    const handleSave = () => {
        // En una app real: Aquí se llamaría a una API para guardar el cambio.
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col border-b border-gray-100 last:border-b-0 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Icon className="w-5 h-5 text-[#1ABC9C] mr-3" />
                    <span className="text-gray-600 font-medium">{label}</span>
                </div>
                <button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="text-sm text-[#F39C12] hover:text-[#E67E22] font-semibold flex items-center transition"
                >
                    {isEditing ? 'Guardar' : <Edit className="w-4 h-4 ml-1" />}
                </button>
            </div>
            
            <div className="mt-1">
                {isEditing ? (
                    <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className="w-full p-2 border border-[#F39C12] rounded-lg text-gray-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#F39C12]"
                    />
                ) : (
                    <span className="text-gray-800 font-semibold ml-8">{currentValue}</span>
                )}
            </div>
        </div>
    );
};

// Componente auxiliar para botones de acción (Reutilizado)
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
    // Estado para mostrar el indicador de carga al cerrar sesión
    const [isLoggingOut, setIsLoggingOut] = useState(false); 

    // Los datos del usuario vienen de la prop 'user'
    const userData = {
        name: user?.name || 'Invitado Workly',
        email: user?.email || 'email@desconocido.com',
        role: 'Desarrollador Junior',
        phone: '+1 (555) 123-4567',
        skills: 'React, Tailwind CSS, JavaScript ES6+, UX/UI Design',
        hobbies: 'Fotografía, Senderismo, Videojuegos',
        education: 'Licenciatura en Ingeniería de Software (2020-2024)',
    };

    // Función que se ejecuta al hacer clic en Cerrar Sesión
    const handleLogout = () => {
        setIsLoggingOut(true);
        // Simulación de latencia de cierre de sesión
        setTimeout(() => {
            setIsLoggingOut(false);
            // ESTO ES LO QUE HACE FUNCIONAL EL LOGOUT: Llama a la función del App.jsx
            onLogout(); 
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans">
            <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 space-y-8">
                
                {/* 1. SECCIÓN DE INFORMACIÓN BÁSICA Y FOTO */}
                <header className="flex flex-col items-center border-b pb-6 border-gray-200">
                    <div className="w-24 h-24 bg-[#1ABC9C] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md mb-4">
                        {userData.name.charAt(0)}
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#17202A]">{userData.name}</h1>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                </header>

                {/* 2. HABILIDADES TÉCNICAS */}
                <section>
                    <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-[#F39C12]" /> Habilidades Técnicas
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-2">
                        <EditableRow 
                            icon={Code} 
                            label="Tecnologías Clave" 
                            value={userData.skills} 
                        />
                    </div>
                </section>
                
                {/* 3. GUSTOS Y PREFERENCIAS */}
                <section>
                    <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-[#F39C12]" /> Gustos y Preferencias
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-2">
                        <EditableRow 
                            icon={Heart} 
                            label="Intereses Personales" 
                            value={userData.hobbies} 
                        />
                    </div>
                </section>

                {/* 4. MI TRAYECTORIA ACADÉMICA / PROFESIONAL */}
                <section>
                    <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-[#F39C12]" /> Trayectoria
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-2">
                        <EditableRow 
                            icon={BookOpen} 
                            label="Estudios / Experiencia" 
                            value={userData.education} 
                        />
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
