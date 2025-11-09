import React, { useState } from 'react';
import { Search, BookOpen, Clock, BarChart } from 'lucide-react';

// Datos de cursos de ejemplo
const courseData = [
  { id: 101, title: "Introducción a la IA Generativa", category: "Tecnología", duration: "10h", level: "Básico", price: "$49" },
  { id: 102, title: "Master en Tailwind CSS y React", category: "Programación", duration: "25h", level: "Avanzado", price: "$199" },
  { id: 103, title: "Fundamentos de UX Design", category: "Diseño", duration: "15h", level: "Intermedio", price: "$99" },
  { id: 104, title: "Marketing de Contenidos 2024", category: "Negocios", duration: "8h", level: "Básico", price: "Gratis" },
  { id: 105, title: "Excel Avanzado para Finanzas", category: "Datos", duration: "30h", level: "Avanzado", price: "$129" },
];

// Componente para una tarjeta de Curso
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


const CoursesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Lógica de filtrado
  const filteredCourses = courseData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-4 space-y-6">
      
      {/* 1. BARRA DE BÚSQUEDA */}
      <div className="sticky top-0 bg-gray-50 pt-4 pb-3 z-10">
        <div className="relative shadow-md rounded-xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar cursos por título o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition"
          />
        </div>
      </div>
      
      {/* 2. RESULTADOS DE LA BÚSQUEDA */}
      <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-[#F39C12]" />
        Cursos Disponibles ({filteredCourses.length})
      </h2>
      
      <section className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="text-gray-500 text-center p-6 bg-white rounded-xl shadow-inner">
            No se encontraron cursos que coincidan con "{searchTerm}".
          </p>
        )}
      </section>
      
    </div>
  );
};

export default CoursesScreen;
