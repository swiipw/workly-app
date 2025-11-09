import React, { useState } from 'react';
// CORRECCIÓN: Se eliminó 'DollarSign' de la importación para evitar el error 'no-unused-vars'.
import { Search, BookOpen, Clock, BarChart, CheckCircle, ArrowLeft, Layers, UserCheck } from 'lucide-react';

// --- DATOS INICIALES (FUERA DEL COMPONENTE PRINCIPAL) ---
const initialCatalogData = [
  { id: 101, title: "Introducción a la IA Generativa", category: "Tecnología", duration: "10h", level: "Básico", price: "$49", description: "Aprende los conceptos clave de la Inteligencia Artificial moderna, modelos de lenguaje y aplicaciones prácticas.", instructor: "Dr. Elena Vargas", topics: ["Modelos LLM", "Prompt Engineering", "Ética de IA"], students: 350 },
  { id: 102, title: "Master en Tailwind CSS y React", category: "Programación", duration: "25h", level: "Avanzado", price: "$199", description: "Domina la construcción de interfaces rápidas y modernas usando la librería de componentes de React y Tailwind CSS.", instructor: "Ing. Marco Ríos", topics: ["Clases de Utilidad", "Responsive Design", "Hooks de React"], students: 120 },
  { id: 103, title: "Fundamentos de UX Design", category: "Diseño", duration: "15h", level: "Intermedio", price: "$99", description: "Conoce el proceso completo de diseño de experiencia de usuario, desde la investigación hasta los prototipos de alta fidelidad.", instructor: "Lic. Ana Soto", topics: ["Investigación de Usuarios", "Wireframing", "Prototipado"], students: 480 },
  { id: 104, title: "Marketing de Contenidos 2024", category: "Negocios", duration: "8h", level: "Básico", price: "Gratis", description: "Estrategias efectivas para crear contenido que atraiga y convierta clientes en las plataformas digitales.", instructor: "Mg. Laura Gómez", topics: ["SEO", "Redacción Persuasiva", "Distribución"], students: 900 },
  { id: 105, title: "Excel Avanzado para Finanzas", category: "Datos", duration: "30h", level: "Avanzado", price: "$129", description: "Técnicas avanzadas de Excel para modelado financiero, análisis de datos y toma de decisiones empresariales.", instructor: "CPA. Juan Pérez", topics: ["Tablas Dinámicas", "VBA", "Macros"], students: 50 },
];

const initialMyCoursesData = [
    { id: 201, title: "Fundamentos de UX Design", category: "Diseño", progress: 65, duration: "15h", level: "Intermedio", description: "Conoce el proceso completo de diseño de experiencia de usuario, desde la investigación hasta los prototipos de alta fidelidad.", instructor: "Lic. Ana Soto", topics: ["Investigación de Usuarios", "Wireframing", "Prototipado"], students: 480 },
];
// -----------------------


// Componente Tarjeta de Curso
const CourseCard = ({ course, onClick, isMyCourse = false }) => (
    <div 
        onClick={() => onClick(course)} 
        className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#F39C12] cursor-pointer"
    >
         <div className="flex justify-between items-start mb-2">
             <h3 className="text-xl font-bold text-[#17202A]">{course.title}</h3>
             
             {!isMyCourse && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${course.price === 'Gratis' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {course.price}
                </span>
             )}
        </div>
        <p className="text-gray-500 mb-3 text-sm italic">{course.category}</p>
        
        {isMyCourse ? (
            <>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                        className="bg-[#1ABC9C] h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>
                <div className="
