import React, { useState } from 'react';
import { Search, BookOpen, Clock, BarChart, CheckCircle } from 'lucide-react';

// --- DATOS SIMULADOS ---
// 1. Datos del Catálogo (Todos los cursos disponibles)
const catalogData = [
  { id: 101, title: "Introducción a la IA Generativa", category: "Tecnología", duration: "10h", level: "Básico", price: "$49" },
  { id: 102, title: "Master en Tailwind CSS y React", category: "Programación", duration: "25h", level: "Avanzado", price: "$199" },
  { id: 103, title: "Fundamentos de UX Design", category: "Diseño", duration: "15h", level: "Intermedio", price: "$99" },
  { id: 104, title: "Marketing de Contenidos 2024", category: "Negocios", duration: "8h", level: "Básico", price: "Gratis" },
  { id: 105, title: "Excel Avanzado para Finanzas", category: "Datos", duration: "30h", level: "Avanzado", price: "$129" },
];

// 2. Datos de Mis Cursos (Cursos inscritos o en progreso)
const myCoursesData = [
    { id: 201, title: "Fundamentos de UX Design", category: "Diseño", progress: 65, duration: "15h", level: "Intermedio" },
    { id: 202, title: "Introducción a la IA Generativa", category: "Tecnología", progress: 100, duration: "10h", level: "Básico" },
    { id: 203, title: "Master en Tailwind CSS y React", category: "Programación", progress: 20, duration: "25h", level: "Avanzado" },
];
// -----------------------

// Componente para una tarjeta de Curso (Catálogo)
const CourseCard = ({ course }) => (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#F39C12] cursor-pointer">
        <div className="flex justify-between items-start mb-2">
             <h3 className="text-xl font-bold text-[#17202A]">{course.title}</h3>
             <span className={`text-xs font-semibold px-3 py-1 rounded-full ${course.price === 'Gratis' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {course.price}
             </span>
        </div>
        <p className="text-gray-500 mb-3 text-sm italic">{course.category}</p>
        <div className="flex flex-wrap text-sm text-gray-500 space-x-4">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-[#1ABC9C]" /> {course.duration}</span>
            <span className="flex items-center"><BarChart className="w-4 h-4 mr-1 text-[#F39C12]" /> {course.level}</span>
        </div>
    </div>
);

// Nuevo Componente para una tarjeta de Mis Cursos (Muestra progreso)
const MyCourseCard = ({ course }) => (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#1ABC9C] cursor-pointer">
        <h3 className="text-xl font-bold text-[#17202A] mb-2">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{course.category} · {course.level}</p>

        {/* Barra de Progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
                className="bg-[#F39C12] h-2.5 rounded-full" 
                style={{ width: `${course.progress}%` }}
            ></div>
        </div>
        
        {/* Etiqueta de Progreso */}
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
    </div>
);

const CoursesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('catalog'); // 'catalog' o 'myCourses'
  
  // Selecciona la fuente de datos basada en la vista activa
  const currentData = activeView === 'catalog' ? catalogData : myCoursesData;

  // Lógica de filtrado
  const filteredCourses = currentData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Función para renderizar la lista de cursos
  const renderCourseList = () => {
      if (filteredCourses.length === 0) {
          return (
              <p className="text-gray-500 text-center p-6 bg-white rounded-xl shadow-inner">
                No se encontraron cursos que coincidan con "{searchTerm}".
              </p>
          );
      }
      
      return (
          <section className="space-y-4">
              {filteredCourses.map(course => (
                  activeView === 'catalog' ? (
                      <CourseCard key={course.id} course={course} />
                  ) : (
                      <MyCourseCard key={course.id} course={course} />
                  )
              ))}
          </section>
      );
  }

  return (
    <div className="p-4 space-y-6">
      
      {/* 1. BARRA DE PESTAÑAS (TABS) */}
      <div className="sticky top-0 bg-gray-50 pt-4 pb-3 z-10">
        <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner mb-4">
          <button
            onClick={() => setActiveView('catalog')}
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition ${activeView === 'catalog' ? 'bg-white shadow-md text-[#17202A]' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Catálogo de Cursos
          </button>
          <button
            onClick={() => setActiveView('myCourses')}
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition ${activeView === 'myCourses' ? 'bg-white shadow-md text-[#17202A]' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Mis Cursos
          </button>
        </div>
        
        {/* 2. BARRA DE BÚSQUEDA */}
        <div className="relative shadow-md rounded-xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder={activeView === 'catalog' ? "Buscar en el catálogo..." : "Buscar en mis cursos..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition"
          />
        </div>
      </div>
      
      {/* 3. RESULTADOS DE LA VISTA ACTIVA */}
      <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-[#F39C12]" />
        {activeView === 'catalog' ? 'Cursos Disponibles' : 'Cursos en Progreso'} ({filteredCourses.length})
      </h2>
      
      {renderCourseList()}
      
    </div>
  );
};

export default CoursesScreen;
