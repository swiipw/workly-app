import React from 'react';
// IMPORTACIÓN CORREGIDA: Se agregaron 'User' y 'BookOpen'
import { Mail, Briefcase, Star, Clock, Heart, Edit3, Camera, User, BookOpen } from 'lucide-react'; 

// Datos simulados para la demostración
const simulatedData = {
    age: 24,
    photoUrl: "https://i.pravatar.cc/150?img=33", // URL de foto de perfil de ejemplo
    preferences: ['Programación Web', 'Marketing Digital', 'Diseño UX/UI', 'Inteligencia Artificial'],
    career: {
        completedCourses: 7,
        performanceRating: 4.5, // 4.5 estrellas de 5
        totalHours: 120,
    }
};

// Componente para renderizar estrellas de rendimiento
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
        <div className="flex items-center text-[#F39C12]">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-5 h-5 fill-current" />
            ))}
            {hasHalfStar && (
                // Simulamos media estrella con un clip para mostrar solo la mitad
                <div key="half" className="relative w-5 h-5 overflow-hidden">
                    <Star className="absolute w-5 h-5 fill-current" />
                    <div className="absolute w-1/2 h-full bg-white right-0"></div>
                </div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
            ))}
            <span className="text-sm text-gray-600 ml-2">({rating.toFixed(1)} / 5)</span>
        </div>
    );
};


const ProfileScreen = ({ user, onLogout }) => {
    // Generamos un nombre de usuario simple a partir del nombre
    const username = user.name.toLowerCase().replace(/\s/g, ''); 

    return (
        <div className="p-4 space-y-8">

            {/* 1. SECCIÓN DE INFORMACIÓN BÁSICA Y FOTO */}
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#1ABC9C]">
                
                {/* Contenedor de Foto y Botón de Edición */}
                <div className="relative mb-4">
                    <img 
                        src={simulatedData.photoUrl} 
                        alt="Foto de Perfil"
                        className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
                    />
                    <button 
                        className="absolute bottom-0 right-0 p-2 bg-[#F39C12] text-white rounded-full hover:bg-[#E67E22] transition shadow-md"
                        aria-label="Cambiar foto"
                    >
                        <Camera className="w-4 h-4" />
                    </button>
                </div>

                <h2 className="text-3xl font-extrabold text-[#17202A]">{user.name}</h2>
                <p className="text-gray-500 text-lg mb-4">@{username}</p>
                
                <div className="w-full space-y-2 text-gray-700">
                    <p className="flex items-center"><Mail className="w-5 h-5 mr-3 text-[#1ABC9C]" /> {user.email}</p>
                    <p className="flex items-center"><User className="w-5 h-5 mr-3 text-[#1ABC9C]" /> {simulatedData.age} años</p>
                </div>
            </div>

            {/* 2. GUSTOS Y PREFERENCIAS */}
            <section className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-bold text-[#17202A] flex items-center"><Heart className="w-5 h-5 mr-2 text-red-500" /> Gustos y Preferencias</h3>
                    <button className="text-[#1ABC9C] hover:text-[#17202A]"><Edit3 className="w-5 h-5" /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {simulatedData.preferences.map((pref, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            {pref}
                        </span>
                    ))}
                </div>
            </section>

            {/* 3. MI TRAYECTORIA */}
            <section className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-[#17202A] mb-4 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-[#F39C12]" /> Mi Trayectoria</h3>
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <p className="flex items-center text-gray-700"><BookOpen className="w-5 h-5 mr-2 text-[#1ABC9C]" /> Cursos Completados:</p>
                        <span className="font-bold text-lg">{simulatedData.career.completedCourses}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <p className="flex items-center text-gray-700"><Clock className="w-5 h-5 mr-2 text-[#1ABC9C]" /> Horas de Aprendizaje:</p>
                        <span className="font-bold text-lg">{simulatedData.career.totalHours}h</span>
                    </div>
                    
                    <div className="border-t pt-3">
                        <p className="text-gray-700 font-semibold mb-1">Rendimiento (Promedio de Estrellas):</p>
                        <StarRating rating={simulatedData.career.performanceRating} />
                    </div>
                </div>
            </section>


            {/* BOTÓN DE CERRAR SESIÓN */}
            <div className="pt-4 pb-12">
                <button
                    onClick={onLogout}
                    className="w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 transition"
                >
                    Cerrar Sesión
                </button>
            </div>
            
        </div>
    );
};

export default ProfileScreen;
