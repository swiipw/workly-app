import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Clock, ArrowLeft, Send, FileText, ClipboardList } from 'lucide-react';

// --- DATOS DE EMPLEO COMPLETOS ---
const initialJobData = [
    { id: 1, title: "Asistente administrativo junior", category: "Primer Empleo", modality: "Presencial", salary: "S/1,200", level: "básico", description: "Apoyo en tareas administrativas, manejo de documentos y atención de correo.", company: "Grupo Andino", location: "San Borja, Lima", requirements: ["Ofimática básica"], responsibilities: ["Documentos", "Atención telefónica"], slots: 3 },
    { id: 2, title: "Community Manager Junior", category: "Primer Empleo", modality: "Remoto", salary: "S/1,000", level: "intermedio", description: "Gestión de redes sociales, creación de contenido y atención de DM’s.", company: "Agencia SocialLab", location: "Remoto", requirements: ["Canva y redes"], responsibilities: ["Calendario digital", "Publicaciones"], slots: 2 },
    { id: 3, title: "Asistente de marketing digital", category: "Primer Empleo", modality: "Híbrido", salary: "S/1,300", level: "intermedio", description: "Apoyo en campañas, análisis de redes y coordinación con diseñadores.", company: "DigitalUp", location: "Lince, Lima", requirements: ["Meta Ads básico"], responsibilities: ["Seguimiento de campañas"], slots: 2 },
    { id: 4, title: "Asesor telefónico (Call Center)", category: "Part-Time", modality: "Híbrido", salary: "S/900", level: "básico", description: "Gestión de llamadas de atención o ventas para empresas de telecomunicaciones.", company: "TeleConnect", location: "Lima", requirements: ["Buena dicción"], responsibilities: ["Atender llamadas", "Registrar casos"], slots: 12 },
    { id: 5, title: "Practicante de Recursos Humanos", category: "Pasantía", modality: "Presencial", salary: "S/930", level: "sin experiencia", description: "Apoyo en reclutamiento, filtros, citaciones y base de datos de candidatos.", company: "TalentPro", location: "La Molina, Lima", requirements: ["Buena comunicación"], responsibilities: ["Reclutamiento", "Citaciones"], slots: 4 },
    { id: 6, title: "Practicante de logística", category: "Pasantía", modality: "Presencial", salary: "S/930", level: "básico", description: "Control de inventario, despacho y registro de documentos logísticos.", company: "LogistiMax", location: "Callao", requirements: ["Organización"], responsibilities: ["Inventario", "Guías de remisión"], slots: 3 },
    { id: 7, title: "Practicante de diseño gráfico", category: "Pasantía", modality: "Remoto", salary: "S/850", level: "intermedio", description: "Diseño de piezas para redes, landing pages y branding básico.", company: "Creativo Studio", location: "Remoto", requirements: ["Canva o Illustrator"], responsibilities: ["Piezas gráficas"], slots: 2 },
    { id: 8, title: "Practicante de comunicaciones", category: "Pasantía", modality: "Híbrido", salary: "S/900", level: "intermedio", description: "Redacción, campañas, notas de prensa y apoyo en redes sociales.", company: "ComuniLab", location: "Jesús María, Lima", requirements: ["Redacción"], responsibilities: ["Notas", "RRSS"], slots: 2 },
    { id: 9, title: "Operario de almacén", category: "Operativo", modality: "Presencial", salary: "S/1,100", level: "básico", description: "Picking, packing, recepción y almacenamiento de productos.", company: "MegaLog Perú", location: "Callao", requirements: ["Buena condición física"], responsibilities: ["Picking", "Inventario"], slots: 6 },
    { id: 10, title: "Diseñador de contenido freelance", category: "Remoto", modality: "Remoto", salary: "S/300 por proyecto", level: "intermedio", description: "Creación de piezas gráficas, reels y contenido para redes.", company: "Marca Personal LATAM", location: "Latam", requirements: ["Canva avanzado"], responsibilities: ["Contenido gráfico"], slots: 10 },
    { id: 11, title: "Editor de video para redes", category: "Remoto", modality: "Remoto", salary: "S/50 por video", level: "intermedio", description: "Edición de videos cortos para TikTok, Reels y YouTube Shorts.", company: "ViralHub", location: "Remoto", requirements: ["CapCut o Premiere"], responsibilities: ["Edición de clips"], slots: 7 },
    { id: 12, title: "Practicante de administración", type: "Pre-profesional", modality: "Híbrido", salary: "$100 - $200", requirements: ["Excel básico", "Gestión de documentos"], description: "Apoyo en inventarios, reportes simples y organización administrativa.", company: "Corpimax" },    
    { id: 13, title: "Practicante de gastronomía", type: "Pasantía", modality: "Presencial", salary: "No remunerado", requirements: ["Conocimientos básicos de cocina", "Orden y limpieza"], description: "Apoyo en mise en place, preparación de insumos y armado de platos.", company: "Restaurante La Cosecha" },
    { id: 14, title: "Asistente de producción audiovisual", type: "Pasantía", modality: "Presencial", salary: "$150", requirements: ["Manejo básico de cámara", "Organización"], description: "Apoyar en grabaciones, mover equipos, hacer tomas simples y llevar checklists.", company: "Estudio Framehouse" },
    { id: 15, title: "Practicante de educación inicial", type: "Prácticas pre-profesionales", modality: "Presencial", salary: "$0 - $100", requirements: ["Paciencia y creatividad", "Gusto por trabajar con niños"], description: "Apoyo en actividades, canciones, juegos y refuerzo escolar.", company: "Nido The care"},
    { id: 16, title: "Auxiliar de biblioteca", type: "Part-time", modality: "Presencial", salary: "$250", requirements: ["Orden", "Lectura básica"], description: "Clasificación de libros, registro de préstamos y guía a usuarios.", company: "Biblioteca Municipal Armonía" },
    { id: 17, title: "Asistente de arqueología (campo)", type: "Pasantía", modality: "Presencial", salary: "$150 + movilidad", requirements: ["Interés en historia", "Capacidad física"], description: "Excavación básica, limpieza de piezas y organización de materiales.", company: "Proyecto Arqueológico Huaca Azul"},
    { id: 18, title: "Practicante de antropología social", type: "Pasantía", modality: "Remoto/Híbrido", salary: "No remunerado", requirements: ["Buena escritura", "Interés en comunidades"], description: "Apoyo en entrevistas, transcripciones y análisis cualitativo básico.", company: "Centro de Estudios Humanos"},
    { id: 19, title: "Asistente de laboratorio (biología)", type: "Prácticas", modality: "Presencial", salary: "$200", requirements: ["Bioseguridad básica", "Interés por investigación"], description: "Limpieza de material, preparación de muestras y registro de resultados simples.", company: "LabBioTech" },
    { id: 20, title: "Asistente de hotelería", type: "Tiempo parcial", modality: "Presencial", salary: "$280 - $350", requirements: ["Atención al cliente", "Buena presencia"], description: "Recepción, apoyo en reservas y acompañamiento a huéspedes.", company: "Hotel Miramar" },
    { id: 21, title: "Auxiliar de psicología educativa", type: "Pasantía", modality: "Presencial", salary: "No remunerado", requirements: ["Capacidad de escucha", "Empatía"], description: "Observación en aulas, apoyo en talleres y registro de conductas.", company: "Centro Psicopedagógico Prisma" },
    { id: 22, title: "Asistente de logística", type: "Tiempo parcial", modality: "Presencial", salary: "$300 - $400", requirements: ["Control de inventarios", "Excel"], description: "Recepción de carga, conteos simples y clasificación.", company: "ManchayMax" },
    { id: 23, title: "Practicante de educación física", type: "Pasantía", modality: "Presencial", salary: "$100 - $150", requirements: ["Deportes básicos", "Buen trato con niños"], description: "Apoyo en clases, armado de circuitos y acompañamiento en evaluaciones.", company: "Colegio Deportivo Andino"},
    { id: 24, title: "Redactor junior", type: "Empleo", modality: "Remoto/Híbrido", salary: "$300 - $450", requirements: ["Ortografía impecable", "Creatividad"], description: "Redacción de artículos sencillos, notas y contenido para redes.", company: "Agencia Creativa Punto"},
    { id: 25, title: "Asistente de producción audiovisual", type: "Empleo", modality: "Presencial", salary: "$350", requirements: ["Conocimientos básicos de cámara", "Puntualidad"], description: "Apoyo en grabaciones, armado de sets y control de sonido simple.", company: "VisualPro Studio" },
    { id: 26, title: "Profesor/a de reforzamiento (primaria)", type: "Empleo", modality: "Presencial", salary: "$350 - $450", requirements: ["Paciencia", "Conocimiento básico de matemáticas y comunicación"], description: "Clases personalizadas para niños de primaria en grupos pequeños.", company: "Academia PRO-EduKids" },
    { id: 27, title: "Técnico de soporte TI junior", type: "Empleo", modality: "Presencial", salary: "$450 - $700", requirements: ["Instalación de software", "Conocimientos básicos de redes"], description: "Resolver problemas básicos de computadoras y brindar soporte a usuarios.", company: "Alerta Perú" },
    { id: 28, title: "Asistente de laboratorio clínico", type: "Empleo", modality: "Presencial", salary: "$400 - $650", requirements: ["Bioseguridad", "Conocimientos básicos de laboratorio"], description: "Preparación de muestras, limpieza de material y apoyo a tecnólogos.", company: "Laboratorio SaludPlus" },
    { id: 29, title: "Asesor de ventas retail", type: "Empleo", modality: "Presencial", salary: "$350 + comisiones", requirements: ["Carisma", "Conocimiento de productos"], description: "Atención en tienda, explicación de productos y gestión de ventas.", company: "FashionStore" },
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
