import React, { useState } from 'react';
import { Search, BookOpen, Clock, BarChart, CheckCircle, ArrowLeft, Layers, UserCheck } from 'lucide-react';

// --- DATOS INICIALES (FUERA DEL COMPONENTE PRINCIPAL) ---
const initialCatalogData = [
  { id: 101, title: "Excel Desde Cero - Domina lo basico", category: "Herramientas digitales", duration: "8h", level: "Básico", price: "Gratis", description: "Aprende a usar Excel desde lo más básico: formatos, fórmulas simples, filtros y organización de datos para tareas de oficina.", instructor: "Elena Vargas", topics: ["Introducción a Excel", "Celdas, filas, columnas", "Formatos básicos", "Fórmulas simples (SUMA, PROMEDIO, etc.)", "Manejo de datos", "Ejercicios prácticos"], students: 28 },
  { id: 102, title: "Administración básica", category: "Administración", duration: "10h", level: "Básico", price: "Gratis", description: "Aprende los principios básicos para trabajos administrativos.", instructor: "Marco Ríos", topics: ["Conceptos esenciales", "Manejo de documentos", "Organización interna", "Atención administrativa", "Reportes básicos"], students: 10 },
  { id: 103, title: "Marketing digital", category: "Marketing", duration: "12h", level: "Intermedio", price: "$30", description: "Aprende las bases del marketing digital y el manejo estratégico de redes.", instructor: "Lic. Ana Soto", topics: ["Fundamentos", "Redes Sociales", "Contenido", "Métricas"], students: 20 },
  { id: 104, title: "Edición de video", category: "Producción audiovisual", duration: "15h", level: "Intermedio", price: "Gratis", description: "Aprende a editar videos para redes de forma profesional.", instructor: "lic. Laura Gómez", topics: ["Línea de tiempo", "Transiciones", "Audio", "Estilo visual", "Exportación"], students: 15 },
  { id: 105, title: "Introducción a UX/UI", category: "Diseño digital", duration: "30h", level: "avanzado", price: "$90", description: "Aprende los fundamentos del diseño de experiencias y pantallas digitales.", instructor: "lic. Juan Pérez", topics: ["UX vs UI", "Investigación", "Wireframes", "Prototipos", "Figma básico"], students: 27 },
  { id: 106, title: "Introducción a Python", category: "Programación", duration: "20h", level: "Básico", price: "Gratis", description: "Aprende a programar desde cero con ejercicios simples.", instructor: "lic. Trampus Tramile", topics: ["Variables", "Condicionales", "Bucles", "Funciones", "Proyectos pequeños"], students: 31 },
  { id: 107, title: "PowerPoint profesional", category: "Habilidades digitales", duration: "15h", level: "básico-intermedio", price: "$20", description: "Crea presentaciones profesionales con storytelling visual y diseño moderno.", instructor: "Mgtr. Sofía Ugarte", topics: ["Principios de diseño","Diapositivas maestras","Animaciones avanzadas","Uso de plantillas","Tipografías y colores","Storytelling visual","Presentaciones corporativas"], students: 50 },
  { id: 108, title: "Canva avanzado", category: "Diseño digital", duration: "18h", level: "intermedio", price: "$30", description: "Domina Canva para crear piezas profesionales, contenido viral y diseños de nivel avanzado.", instructor: "Lic. Mariana Peña", topics: ["Brand Kits","Edición avanzada","Plantillas profesionales","Composición visual","Diseño para redes","Presentaciones avanzadas","Videos y animaciones"], students: 50 },
  { id: 109, title: "Edición de video para redes", category: "Diseño digital", duration: "30h", level: "intermedio", price: "$45", description: "Edita videos profesionales con CapCut y Premiere básico para TikTok, Reels y YouTube.", instructor: "Sr. Alejandro Chávez", topics: ["Cortes y ritmo","Transiciones limpias","Subtítulos automáticos","Colorización","Edición de audio","Escalado para redes","Exportación profesional"], students: 50 },
  { id: 110, title: "Analítica digital", category: "Marketing digital", duration: "28h", level: "intermedio", price: "$55", description: "Domina métricas digitales y toma decisiones basadas en datos.", instructor: "Ing. Valeria Ramírez", topics: ["KPIs","Google Analytics","Dashboards","Métricas de conversión","Atribución","Análisis de contenido","Informes"], students: 50 },
  { id: 111, title: "E-commerce básico", category: "Marketing digital", duration: "22h", level: "básico", price: "$25", description: "Crea y gestiona una tienda virtual desde cero.", instructor: "Sr. Eduardo Velasco", topics: ["Fundamentos del e-commerce","Tipos de tiendas","Gestión de catálogo","Pedidos","Métodos de pago","Atención al cliente digital","Analítica de ventas"], students: 50 },
  { id: 112, title: "Cómo hacer un CV atractivo", category: "Empleabilidad", duration: "10h", level: "básico", price: "Gratis", description: "Crea un CV moderno, profesional y adaptado a lo que buscan las empresas actuales.", instructor: "Lic. Andrea Paredes", topics: ["Estructura del CV","Logros vs funciones","Diseños modernos","Adaptación por puesto","Errores comunes","Plantillas","Optimización ATS"], students: 50 },
  { id: 113, title: "Optimización de perfil LinkedIn", category: "Empleabilidad", duration: "8h", level: "básico-intermedio", price: "Gratis", description: "Potencia tu perfil de LinkedIn para atraer reclutadores y aumentar tus oportunidades laborales.", instructor: "Mgtr. Diego Villalobos", topics: ["Foto profesional","Titular estratégico","Acerca de ti","Experiencia y logros","Validación de habilidades","Networking en LinkedIn","SEO de perfil"], students: 50 },
  { id: 114, title: "Preparación para entrevistas", category: "Empleabilidad", duration: "12h", level: "intermedio", price: "$20", description: "Domina entrevistas laborales tradicionales, virtuales y por competencias.", instructor: "Psic. Carolina Rivas", topics: ["Preguntas frecuentes","STAR Method","Comunicación verbal","Comunicación no verbal","Errores comunes","Entrevistas online","Práctica evaluada"], students: 50 },
  { id: 115, title: "Gestión del tiempo y productividad", category: "Desarrollo profesional", duration: "15h", level: "básico-intermedio", price: "$25", description: "Aprende a organizar tus tareas, priorizar y ser más productivo en el trabajo o estudios.", instructor: "Coach Luis Monterrey", topics: ["Método Pomodoro","Matriz Eisenhower","Planificación semanal","Gestión de energía","Eliminación de distractores","Organización digital","Hábitos productivos"], students: 50 },
  { id: 116, title: "Liderazgo y trabajo en equipo", category: "Desarrollo profesional", duration: "18h", level: "intermedio", price: "$30", description: "Desarrolla habilidades de liderazgo, comunicación y colaboración efectiva.", instructor: "Lic. Marcela Yovera", topics: ["Tipos de liderazgo","Gestión de equipos","Comunicación efectiva","Resolución de conflictos","Motivación","Delegación","Trabajo colaborativo"], students: 50 },
  { id: 117, title: "Inteligencia emocional para el trabajo", category: "Desarrollo profesional", duration: "14h", level: "intermedio", price: "$20", description: "Aprende a manejar emociones, presión laboral y relaciones interpersonales.", instructor: "Psic. Renzo Cáceres", topics: ["Autoconocimiento","Autocontrol","Empatía","Relaciones laborales","Manejo de estrés","Toma de decisiones","Escucha activa"], students: 50 },
  { id: 118, title: "Presentaciones efectivas", category: "Desarrollo profesional", duration: "16h", level: "intermedio", price: "$35", description: "Domina técnicas para exponer ideas con claridad, seguridad y alto impacto.", instructor: "Mgtr. Pamela Ruiz", topics: ["Estructura de presentaciones","Storytelling","Lenguaje corporal","Gestión del miedo","Uso de diapositivas","Práctica guiada","Feedback profesional"], students: 50 },
  { id: 119, title: "Networking para jóvenes profesionales", category: "Empleabilidad", duration: "10h", level: "básico", price: "$15", description: "Aprende a crear conexiones profesionales estratégicas que impulsen tu desarrollo laboral.", instructor: "Lic. Bruno Samaniego", topics: ["Tipos de networking","Primer contacto","Pitch personal","Networking online","Eventos profesionales","Gestión de contactos","Construcción de marca personal"], students: 50 },
  { id: 403, title: "Auxiliar contable", category: "Cursos para quienes no estudian", duration: "35h", level: "intermedio", price: "$45", description: "Aprende los principios de contabilidad, registro de operaciones y manejo básico de sistemas contables.", instructor: "C.P. Rodrigo Méndez", topics: ["Principios contables", "Libro diario", "Libro mayor", "Comprobantes", "Sistemas contables"], students: 95 },
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
                // 🛑 CORRECCIÓN 1: Se necesitan backticks (`) para el Template Literal.
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
                        // 🛑 CORRECCIÓN 2: Se necesitan backticks (`) para el valor del estilo.
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
    // Nuevo estado para manejar errores de validación sin usar alert()
    const [validationError, setValidationError] = useState('');
    
    // --- LÓGICA DE AUTO-RELLENO ELIMINADA ---
    // El formulario empieza vacío como lo solicitaste.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar el error cuando el usuario empieza a escribir
        setValidationError(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación simple, usando el estado para mostrar el error
        if (!formData.fullName || !formData.email || !formData.country) {
            setValidationError("Por favor, rellena los campos obligatorios (*).");
            return;
        }
        setValidationError(''); // Limpiar cualquier error previo
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
                
                {/* Mensaje de Error (Reemplazo de alert()) */}
                {validationError && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg font-medium text-sm border border-red-300">
                        {validationError}
                    </div>
                )}

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
                <h2 className="text-xl font-bold text-[#17202A] mb-3">Temas Principales</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                    {course.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                    ))}
                </ul>
            </section>
            
            {/* Botón de Acción (Inscribirse / Continuar) */}
            <div className="py-4">
                {isEnrolled ? (
                    <button className="w-full py-4 bg-[#1ABC9C] text-white font-bold text-xl rounded-xl shadow-lg hover:bg-[#17202A] transition">
                        Continuar Curso ({enrolledCourse.progress}%)
                    </button>
                ) : (
                    <button 
                        onClick={onEnrollClick}
                        className="w-full py-4 bg-[#F39C12] text-white font-bold text-xl rounded-xl shadow-lg hover:bg-[#E67E22] transition"
                    >
                        Inscribirse Ahora ({course.price})
                    </button>
                )}
            </div>
            
        </div>
    );
}

// Componente Principal de Cursos
// 🚨 CAMBIO 1: Recibir showNotification como prop
const CoursesScreen = ({ showNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('catalog');
  const [selectedCourse, setSelectedCourse] = useState(null); 
  const [isEnrolling, setIsEnrolling] = useState(false); 
  
  // Estados para simular los datos de la app
  const [catalogData, setCatalogData] = useState(initialCatalogData);
  const [myCoursesData, setMyCoursesData] = useState(initialMyCoursesData);
  
  // Función que se llama al confirmar el formulario
  const handleEnrollmentConfirm = (course) => {
    
    const fullCourseDetails = initialCatalogData.find(c => c.id === course.id); 
    
    const newMyCourse = { 
        ...fullCourseDetails, 
        progress: 1, 
        price: undefined 
    };
    
    // Filtramos el curso del catálogo y lo añadimos a mis cursos
    setCatalogData(prev => prev.filter(c => c.id !== course.id));
    setMyCoursesData(prev => [...prev, newMyCourse]);
    
    // 🚨 CAMBIO 2: Llamar a showNotification
    if (showNotification) {
      showNotification(`¡Felicidades! Te has inscrito en: ${course.title}`);
    }
    
    setSelectedCourse(null);
    setIsEnrolling(false);
    setActiveView('myCourses');
  };
  
  
  // LÓGICA DE RENDERIZADO PRINCIPAL
  
  if (isEnrolling && selectedCourse) {
      return (
        <EnrollmentForm 
            course={selectedCourse} 
            onConfirm={handleEnrollmentConfirm}
            onCancel={() => setIsEnrolling(false)}
        />
      );
  }
  
  if (selectedCourse) {
      return (
        <CourseDetail 
            course={selectedCourse} 
            onBack={() => setSelectedCourse(null)} 
            onEnrollClick={() => setIsEnrolling(true)}
            myCoursesList={myCoursesData} 
        />
      );
  }

  const currentData = activeView === 'catalog' ? catalogData : myCoursesData;

  const filteredCourses = currentData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Función para renderizar la lista de cursos
  const renderCourseList = () => {
      if (filteredCourses.length === 0) {
          return (
              <p className="text-gray-500 text-center p-6 bg-white rounded-xl shadow-inner">
                {activeView === 'catalog' ? 'No hay más cursos disponibles.' : '¡Aún no te has inscrito en ningún curso! Explora el catálogo.'}
              </p>
          );
      }
      
      return (
          <section className="space-y-4">
              {filteredCourses.map(course => (
                  <CourseCard 
                      key={course.id} 
                      course={course} 
                      onClick={setSelectedCourse} 
                      isMyCourse={activeView !== 'catalog'}
                  />
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
            onClick={() => { setActiveView('catalog'); setSearchTerm(''); }}
            // 🛑 CORRECCIÓN 3: Uso de backticks (`)
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition ${activeView === 'catalog' ? 'bg-white shadow-md text-[#17202A]' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Catálogo de Cursos
          </button>
          <button
            onClick={() => { setActiveView('myCourses'); setSearchTerm(''); }}
            // 🛑 CORRECCIÓN 4: Uso de backticks (`)
            className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition ${activeView === 'myCourses' ? 'bg-white shadow-md text-[#17202A]' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Mis Cursos ({myCoursesData.length})
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
