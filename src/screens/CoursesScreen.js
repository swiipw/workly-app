import React, { useState } from 'react';
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
                <div className="flex justify-between items-center text-sm font-medium">
                    <p className="text-gray-700">Progreso:</p>
                    {course.progress === 100 ? (
                        <span className="text-[#1ABC9C] flex items-center">
                            Completado <CheckCircle className="w-4 h-4 ml-1" />
                        </span>
                    ) : (
                        <span className="text-[#F39C12]">{course.progress}%</span>
                    )}
                </div>
            </>
        ) : (
            <div className="flex flex-wrap text-sm text-gray-500 space-x-4">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-[#1ABC9C]" /> {course.duration}</span>
                <span className="flex items-center"><BarChart className="w-4 h-4 mr-1 text-[#F39C12]" /> {course.level}</span>
            </div>
        )}
    </div>
);


// Componente Formulario de Inscripción
const EnrollmentForm = ({ course, onConfirm, onCancel }) => {
    // Inicialización de estado vacío por defecto
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
    });
    
    // --- LÓGICA DE AUTO-RELLENO ELIMINADA ---
    // El formulario empieza vacío como lo solicitaste.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación simple
        if (!formData.fullName || !formData.email || !formData.country) {
            alert("Por favor, rellena los campos obligatorios.");
            return;
        }
        console.log("Datos de inscripción enviados:", formData);
        onConfirm(course); // Pasa el curso de vuelta al componente padre
    };

    const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C]";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1 mt-3"; // Clase para la etiqueta

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-extrabold text-[#17202A]">Inscripción a: {course.title}</h1>
            <p className="text-gray-600">Completa tus datos para confirmar tu inscripción. <span className="font-semibold text-[#F39C12]">{course.price}</span></p>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
                
                {/* Campo Nombre Completo */}
                <div>
                    <label htmlFor="fullName" className={labelClasses}>Nombre Completo *</label>
                    <input 
                        id="fullName"
                        type="text" 
                        name="fullName" 
                        placeholder="Escribe tu nombre completo" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        required
                        className={inputClasses}
                    />
                </div>
                
                {/* Campo Correo Electrónico */}
                <div>
                    <label htmlFor="email" className={labelClasses}>Correo Electrónico *</label>
                    <input 
                        id="email"
                        type="email" 
                        name="email" 
                        placeholder="ejemplo@correo.com" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required
                        className={inputClasses}
                    />
                </div>
                
                {/* Campo Teléfono */}
                <div>
                    <label htmlFor="phone" className={labelClasses}>Teléfono (Opcional)</label>
                    <input 
                        id="phone"
                        type="tel" 
                        name="phone" 
                        placeholder="555-123-4567" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className={inputClasses}
                    />
                </div>
                
                {/* Campo País */}
                <div>
                    <label htmlFor="country" className={labelClasses}>País de Residencia *</label>
                    <input 
                        id="country"
                        type="text" 
                        name="country" 
                        placeholder="Ingresa tu país" 
                        value={formData.country} 
                        onChange={handleChange} 
                        required
                        className={inputClasses}
                    />
                </div>
                
                {/* Botón de Confirmar Inscripción */}
                <button 
                    type="submit"
                    className="w-full py-3 bg-[#1ABC9C] text-white font-bold text-lg rounded-xl shadow-lg hover:bg-[#17202A] transition mt-6"
                >
                    Confirmar Inscripción
                </button>
                
                {/* Botón de Cancelar */}
                <button 
                    type="button"
                    onClick={onCancel}
                    className="w-full py-3 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition"
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
};

// Componente Vista de Detalle del Curso
const CourseDetail = ({ course, onBack, onEnrollClick, myCoursesList }) => {
    
    const isEnrolled = myCoursesList.some(mc => mc.id === course.id);
    
    const enrolledCourse = isEnrolled ? myCoursesList.find(mc => mc.id === course.id) : null;

    return (
        <div className="p-4 space-y-6">
            
            {/* Botón de Regreso */}
            <button 
                onClick={onBack} 
                className="flex items-center text-[#17202A] hover:text-[#1ABC9C] font-semibold mb-6 transition"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a Cursos
            </button>
            
            <header>
                <span className="text-sm font-medium text-white px-3 py-1 rounded-full bg-[#F39C12]">{course.category}</span>
                <h1 className="text-3xl font-extrabold text-[#17202A] mt-2">{course.title}</h1>
            </header>
            
            <section className="bg-white p-4 rounded-xl shadow-md space-y-3">
                <h2 className="text-xl font-bold text-[#17202A]">Acerca del Curso</h2>
                <p className="text-gray-600">{course.description}</p>
            </section>

            <section className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-[#17202A] mb-3">Información Clave</h2>
                <div className="space-y-2 text-gray-700">
                    <p className="flex items-center"><UserCheck className="w-5 h-5 mr-2 text-[#1ABC9C]" /> Instructor: <span className="font-semibold ml-1">{course.instructor}</span></p>
                    <p className="flex items-center"><Clock className="w-5 h-5 mr-2 text-[#F39C12]" /> Duración: <span className="font-semibold ml-1">{course.duration}</span></p>
                    <p className="flex items-center"><BarChart className="w-5 h-5 mr-2 text-[#17202A]" /> Nivel: <span className="font-semibold ml-1">{course.level}</span></p>
                    <p className="flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-500" /> Estudiantes Inscritos: <span className="font-semibold ml-1">{course.students}</span></p>
                </div>
            </section>
            
             <section className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-[#17202A]
