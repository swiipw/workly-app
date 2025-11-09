import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Clock, ArrowLeft, Send, FileText, ClipboardList } from 'lucide-react';

// --- DATOS DE EMPLEO COMPLETOS ---
const initialJobData = [
    { 
        id: 1, 
        title: "Diseñador UX/UI Senior", 
        company: "Tech Innovate", 
        location: "Remoto", 
        salary: "$70k - $85k / año", 
        type: "Full-Time",
        description: "Buscamos un Diseñador UX/UI con 5+ años de experiencia para liderar la evolución de nuestra plataforma SaaS. Serás responsable de la investigación de usuarios, prototipado de alta fidelidad y la creación de un sistema de diseño escalable. Se requiere dominio de Figma y metodologías Agile.",
        requirements: ["5+ años de experiencia en diseño UX/UI.", "Portafolio comprobable.", "Dominio de herramientas de prototipado.", "Habilidad para trabajar en equipos multidisciplinarios."],
    },
    { 
        id: 2, 
        title: "Desarrollador Frontend (React)", 
        company: "Workly Labs", 
        location: "Lima, PE", 
        // FIX: Se corrigió el error de sintaxis en el string de salary.
        salary: "$55k - $65k / año", 
        type: "Full-Time",
        description: "Únete a nuestro equipo de desarrollo para crear interfaces rápidas y responsivas usando React y TypeScript. Necesitamos a alguien apasionado por la calidad del código y la optimización del rendimiento web. Experiencia con Next.js o Vite es un plus.",
        requirements: ["3+ años de experiencia con React.", "Conocimiento profundo de JavaScript ES6+.", "Experiencia con gestión de estado (Redux, Zustand, Context).", "Conocimiento de pruebas unitarias (Jest, RTL)."],
    },
    { 
        id: 3, 
        title: "Analista de Datos Jr.", 
        company: "Data Insight", 
        location: "Híbrido", 
        salary: "$40k - $50k / año", 
        type: "Part-Time",
        description: "Posición de medio tiempo enfocada en la limpieza, procesamiento y visualización de grandes conjuntos de datos. Ideal para estudiantes avanzados o recién graduados con un fuerte enfoque analítico y ganas de aprender sobre Business Intelligence.",
        requirements: ["Dominio de SQL.", "Experiencia con Python o R para análisis.", "Conocimiento básico de Tableau o Power BI.", "Excelentes habilidades de comunicación."],
    },
    { id: 4, title: "Especialista en Marketing Digital", company: "Global Reach", location: "Remoto", salary: "$45k / mes", type: "Contrato",
        description: "Contrato de 6 meses para gestionar campañas de publicidad digital (Google Ads, Meta). El enfoque es en la optimización de ROAS y la generación de reportes detallados para la dirección.",
        requirements: ["Certificaciones en Google Ads y Meta Blueprint.", "2 años de experiencia gestionando presupuestos de publicidad.", "Conocimiento de Google Analytics 4.", "Capacidad para trabajar de forma independiente en remoto."],
    },
    { id: 5, title: "Asistente de Recursos Humanos", company: "People First", location: "Santiago, CL", salary: "$35k / año", type: "Full-Time",
        description: "Asistencia en el proceso de reclutamiento y selección, administración de nóminas y organización de eventos internos. Es una posición junior con gran potencial de crecimiento dentro de la empresa.",
        requirements: ["Título técnico o universitario en RRHH o Administración.", "Manejo intermedio de Excel.", "Conocimiento de legislación laboral local.", "Alto nivel de discreción y confidencialidad."],
    },
];

// Simulamos una postulación ya enviada para tener algo en "Mis Postulaciones"
const initialMyApplicationsData = [
    { 
        id: 6, 
        title: "Scrum Master", 
        company: "Agile Solutions", 
        location: "Remoto", 
        salary: "$60k - $75k / año", 
        type: "Full-Time",
        status: "En Revisión", // Nuevo campo de estado
        date: "2025-10-01",
        description: "Postulación enviada para liderar el equipo de desarrollo, asegurando la adopción y el cumplimiento de las prácticas de Scrum. Foco en la eliminación de impedimentos y la mejora continua.",
        requirements: ["Certificación Scrum Master (CSM/PSM).", "3+ años de experiencia como SM.", "Excelentes habilidades de coaching y comunicación."],
    }
];

// Componente Tarjeta de Empleo (clickable)
const JobCard = ({ job, onClick, isApplication = false }) => (
    <div 
        className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#1ABC9C] cursor-pointer"
        onClick={() => onClick(job)}
    >
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-[#17202A] mb-1">{job.title}</h3>
            {isApplication && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${job.status === 'En Revisión' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {job.status}
                </span>
            )}
        </div>
        
        <p className="text-gray-600 mb-3">{job.company}</p>
        <div className="flex flex-wrap text-sm text-gray-500 space-x-4">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-[#F39C12]" /> {job.location}</span>
            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1 text-[#1ABC9C]" /> {job.salary}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {job.type}</span>
        </div>
    </div>
);

// Componente de Detalle de Empleo
const JobDetail = ({ job, onBack, onApplyClick, isApplication = false }) => (
    <div className="p-4 space-y-6">
        <button 
            onClick={onBack} 
            className="flex items-center text-[#17202A] hover:text-[#1ABC9C] font-semibold mb-6 transition"
        >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {isApplication ? 'Volver a Mis Postulaciones' : 'Volver a la Búsqueda'}
        </button>

        <header className="bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-[#17202A]">{job.title}</h1>
            <p className="text-xl text-gray-600 mt-1">{job.company}</p>
            <div className="flex flex-wrap text-base text-gray-500 space-x-6 mt-3">
                <span className="flex items-center"><MapPin className="w-5 h-5 mr-1 text-[#F39C12]" /> {job.location}</span>
                <span className="flex items-center"><DollarSign className="w-5 h-5 mr-1 text-[#1ABC9C]" /> {job.salary}</span>
                <span className="flex items-center"><Clock className="w-5 h-5 mr-1" /> {job.type}</span>
            </div>
            {isApplication && (
                <div className="mt-4 flex items-center justify-between text-lg font-medium">
                    <p className="text-gray-700">Estado de Postulación:</p>
                    <span className={`font-bold px-3 py-1 rounded-full ${job.status === 'En Revisión' ? 'text-yellow-700 bg-yellow-100' : 'text-green-700 bg-green-100'}`}>
                        {job.status}
                    </span>
                </div>
            )}
        </header>

        <section className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-[#17202A] mb-3">Descripción del Puesto</h2>
                {/* Usamos un valor por defecto si job.description es nulo/indefinido */}
                <p className="text-gray-700 leading-relaxed">{job.description || "Descripción no disponible."}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-[#17202A] mb-3">Requisitos Clave</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    {/* Usamos encadenamiento opcional (?) para evitar llamar .map() si job.requirements es undefined o null */}
                    {job.requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                    {/* Mostramos un mensaje si no hay requisitos definidos */}
                    {(!job.requirements || job.requirements.length === 0) && (
                         <li className="text-gray-500 italic">No hay requisitos listados para esta posición.</li>
                    )}
                </ul>
            </div>
        </section>

        {/* Botón de Postular (solo visible si no está postulado) */}
        {!isApplication && (
            <div className="py-4">
                <button
                    onClick={onApplyClick}
                    className="w-full py-4 bg-[#F39C12] text-white font-bold text-xl rounded-xl shadow-lg hover:bg-[#E67E22] transition flex items-center justify-center"
                >
                    <Send className="w-6 h-6 mr-3" />
                    Postular Ahora
                </button>
            </div>
        )}
    </div>
);


// Componente Formulario de Postulación (sin cambios en la corrección de padding)
const ApplicationForm = ({ job, onConfirm, onCancel }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        cvFile: null, // Guardará el objeto File
    });
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'cvFile') {
            setFormData(prev => ({ ...prev, cvFile: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        setValidationError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Usamos un mensaje de error en la UI en lugar de alert()
        if (!formData.fullName || !formData.email || !formData.cvFile) {
            setValidationError("Por favor, rellena tu nombre, correo y sube tu CV.");
            return;
        }

        console.log("Datos de Postulación Enviados:", {
            ...formData,
            jobTitle: job.title,
            cvFileName: formData.cvFile.name,
        });

        // Llama a la función de confirmación (simulación de éxito)
        onConfirm(job);
    };

    const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ABC9C] focus:border-[#1ABC9C]";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1 mt-3";

    return (
        // Se mantiene la CORRECCIÓN DE PADDING: pb-28 para el espacio del navbar
        <div className="p-4 space-y-6 pb-28"> 
            <button 
                onClick={onCancel} 
                className="flex items-center text-[#17202A] hover:text-red-600 font-semibold transition"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al Detalle
            </button>

            <h1 className="text-2xl font-extrabold text-[#17202A]">Postular a: {job.title}</h1>
            <p className="text-gray-600">Completa tus datos y adjunta tu currículum vitae (CV) para enviar tu aplicación a <span className="font-semibold text-[#1ABC9C]">{job.company}</span>.</p>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
                
                {/* Mensaje de Error */}
                {validationError && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg font-medium text-sm border border-red-300">
                        {validationError}
                    </div>
                )}

                {/* Campos de formulario */}
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
                
                {/* Campo Subir CV */}
                <div className="mt-4">
                    <label className={labelClasses}>Adjuntar CV (PDF, DOCX) *</label>
                    <div className="flex items-center justify-between p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <input 
                            id="cvFile"
                            type="file" 
                            name="cvFile" 
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange}
                            className="hidden"
                        />
                        <label 
                            htmlFor="cvFile" 
                            className="cursor-pointer text-[#F39C12] hover:text-[#E67E22] font-semibold flex items-center transition"
                        >
                            <FileText className="w-5 h-5 mr-2" />
                            {formData.cvFile ? formData.cvFile.name : 'Seleccionar Archivo...'}
                        </label>
                        {formData.cvFile && <span className="text-green-600 text-sm">Listo</span>}
                    </div>
                </div>
                
                {/* Botón de Enviar Postulación */}
                <div className="pt-6"> 
                    <button 
                        type="submit"
                        className="w-full py-3 bg-[#1ABC9C] text-white font-bold text-lg rounded-xl shadow-lg hover:bg-[#17202A] transition flex items-center justify-center"
                    >
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Postulación
                    </button>
                </div>
            </form>
        </div>
    );
};


const JobsScreen = ({ showNotification }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeView, setActiveView] = useState('catalog'); // Nuevo estado para la vista activa
    const [selectedJob, setSelectedJob] = useState(null); 
    const [isApplying, setIsApplying] = useState(false); 
    
    // Estados para simular los datos de la app
    const [jobData, setJobData] = useState(initialJobData);
    const [myApplicationsData, setMyApplicationsData] = useState(initialMyApplicationsData);
    
    // Define el conjunto de datos actual basado en la vista activa
    const currentData = activeView === 'catalog' ? jobData : myApplicationsData;
    
    // Lógica de filtrado
    const filteredJobs = currentData.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función que se llama al confirmar el formulario
    const handleApplicationConfirm = (job) => {
        
        // 1. Crear el objeto de postulación con el estado inicial
        const newApplication = { 
            ...job, 
            status: "En Revisión", 
            date: new Date().toISOString().slice(0, 10) 
        };
        
        // 2. Mover el trabajo del catálogo a mis postulaciones (simulación)
        setJobData(prev => prev.filter(j => j.id !== job.id));
        setMyApplicationsData(prev => [...prev, newApplication]);
        
        // 3. Notificación y limpieza de estado
        if (typeof showNotification === 'function') {
            showNotification(`¡Postulación exitosa a ${job.title}! Recibirás un correo de confirmación.`);
        } else {
            console.log("Notificación: ¡Postulación exitosa! (showNotification no definida)");
        }
        
        // 4. Volver a la vista de lista y cambiar a "Mis Postulaciones"
        setSelectedJob(null);
        setIsApplying(false);
        setActiveView('myApplications');
    };
    
    // Función para renderizar la lista de empleos/postulaciones
    const renderJobList = () => {
        if (filteredJobs.length === 0) {
            return (
                <p className="text-gray-500 text-center p-6 bg-white rounded-xl shadow-inner">
                    {activeView === 'catalog' ? 'No se encontraron empleos que coincidan con la búsqueda.' : 'Aún no has enviado ninguna postulación.'}
                </p>
            );
        }
        
        return (
            <section className="space-y-4">
                {filteredJobs.map(job => (
                    <JobCard 
                        key={job.id} 
                        job={job} 
                        onClick={setSelectedJob} 
                        isApplication={activeView !== 'catalog'} // Pasa si es postulación
                    />
                ))}
            </section>
        );
    }

    // LÓGICA DE RENDERIZADO PRINCIPAL
    
    if (isApplying && selectedJob) {
        return (
            <ApplicationForm 
                job={selectedJob}
                onConfirm={handleApplicationConfirm}
                onCancel={() => setIsApplying(false)}
            />
        );
    }
    
    if (selectedJob) {
        return (
            <JobDetail
                job={selectedJob}
                onBack={() => setSelectedJob(null)}
                onApplyClick={() => setIsApplying(true)}
                isApplication={activeView !== 'catalog'} // Pasa si es postulación
            />
        );
    }
    
    // Vista de Lista (Default)
    return (
        // Se añade un padding-bottom para el espacio del navbar fijo
        <div className="p-4 space-y-6 pb-20"> 
            
            {/* 1. BARRA DE PESTAÑAS (TABS) */}
            <div className="sticky top-0 bg-gray-50 pt-4 pb-3 z-10">
                <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner mb-4">
                    <button
                        onClick={() => { setActiveView('catalog'); setSearchTerm(''); }}
                        className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition ${activeView === 'catalog' ? 'bg-white shadow-md text-[#17202A]' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        Catálogo de Empleos
                    </button>
                    <button
                        onClick={() => { setActiveView('myApplications'); setSearchTerm(''); }}
                        className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg transition ${activeView === 'myApplications' ? 'bg-white shadow-md text-[#17202A]' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        Mis Postulaciones ({myApplicationsData.length})
                    </button>
                </div>
                
                {/* 2. BARRA DE BÚSQUEDA */}
                <div className="relative shadow-md rounded-xl">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder={activeView === 'catalog' ? "Buscar en el catálogo..." : "Buscar en tus postulaciones..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F39C12] focus:border-transparent transition"
                    />
                </div>
            </div>
            
            {/* 3. RESULTADOS DE LA VISTA ACTIVA */}
            <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
                {activeView === 'catalog' ? 
                    <Briefcase className="w-6 h-6 mr-2 text-[#1ABC9C]" /> : 
                    <ClipboardList className="w-6 h-6 mr-2 text-[#F39C12]" />
                }
                {activeView === 'catalog' ? 'Empleos Disponibles' : 'Postulaciones Enviadas'} ({filteredJobs.length})
            </h2>
            
            {renderJobList()}
            
        </div>
    );
};

export default JobsScreen;
