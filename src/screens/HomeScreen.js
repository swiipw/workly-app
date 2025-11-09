import React from 'react';
import { Briefcase, BookOpen, Clock, Zap } from 'lucide-react';

// Componente para una tarjeta de estadística
const StatCard = ({ icon: Icon, title, value, color }) => (
    // CORRECCIÓN: Se añadieron backticks (`) para usar la interpolación de strings (${color})
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md ${color} text-white transition duration-300 hover:scale-[1.03]`}>
        <Icon className="w-8 h-8 mb-2" />
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs opacity-80 mt-1">{title}</p>
    </div>
);

// Componente para una recomendación rápida
const QuickLink = ({ icon: Icon, title, color }) => (
    // CORRECCIÓN: Se añadieron backticks (`) para usar la interpolación de strings (${color})
    <div className={`flex flex-col items-center p-3 rounded-xl border ${color} bg-white shadow-sm hover:shadow-md transition cursor-pointer`}>
        <Icon className="w-6 h-6 mb-1 text-black" />
        <p className="text-sm font-medium text-center text-gray-700">{title}</p>
    </div>
);

const HomeScreen = ({ user }) => {
    
    // Simulación de datos del usuario, asumiendo que 'user' tiene una propiedad 'name'
    const userName = user?.name || 'Usuario'; 

    const stats = [
        { icon: Briefcase, title: 'Empleos Guardados', value: '12', color: 'bg-[#F39C12]' }, // Accent Orange
        { icon: BookOpen, title: 'Cursos Inscritos', value: '3', color: 'bg-[#1ABC9C]' },      // Secondary Green
        { icon: Clock, title: 'Horas Aprendidas', value: '45h', color: 'bg-[#85C1E9]' },        // Light Blue
        { icon: Zap, title: 'Aplicaciones Enviadas', value: '7', color: 'bg-[#17202A]' },        // Primary Dark
    ];

    const quickActions = [
        { icon: Briefcase, title: 'Buscar Trabajos', color: 'border-[#F39C12] hover:border-2' },
        { icon: BookOpen, title: 'Explorar Cursos', color: 'border-[#1ABC9C] hover:border-2' },
        { icon: Zap, title: 'Ver Asistente AI', color: 'border-[#17202A] hover:border-2' },
    ];

    return (
        <div className="p-4 space-y-6 max-w-4xl mx-auto">
            
            {/* SALUDO DINÁMICO */}
            <header className="pt-2 pb-4 border-b border-gray-200">
                {/* Asegurando que se muestre un nombre por defecto si 'user' es nulo */}
                <h2 className="text-3xl font-extrabold text-[#17202A]">¡Hola, {userName}! 👋</h2>
                <p className="text-gray-600 mt-1">Mantente al día con tu progreso en Workly.</p>
            </header>

            {/* SECCIÓN DE ESTADÍSTICAS */}
            <section>
                <h3 className="text-lg font-bold text-gray-700 mb-3">Tu Actividad</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </section>
            
            {/* SECCIÓN DE ACCIONES RÁPIDAS */}
            <section>
                <h3 className="text-lg font-bold text-gray-700 mb-3">Acciones Rápidas</h3>
                <div className="grid grid-cols-3 gap-3">
                    {quickActions.map((action, index) => (
                        <QuickLink key={index} {...action} />
                    ))}
                </div>
            </section>
            
            {/* SECCIÓN DE CONTENIDO RECOMENDADO (Placeholder) */}
            <section className="bg-white p-4 rounded-xl shadow-md border-t-4 border-[#F39C12]">
                <h3 className="text-xl font-bold text-[#17202A] mb-2">Recomendación Personalizada</h3>
                <p className="text-gray-600">Te recomendamos el curso de *Diseño UX/UI Avanzado* para mejorar tus oportunidades en empleos remotos.</p>
                <button className="mt-3 text-[#1ABC9C] hover:text-[#17202A] font-semibold flex items-center transition duration-150">
                    Ver Curso <BookOpen className="w-4 h-4 ml-1" />
                </button>
            </section>
        </div>
    );
};

export default HomeScreen;
