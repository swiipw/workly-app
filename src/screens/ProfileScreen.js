import React, { useState } from 'react';
import { 
    Mail, Briefcase, Star, Clock, Heart, Edit3, Camera, User, 
    BookOpen, LogOut, Save, X, Plus, Check, Zap, ArrowLeft, Calendar, FileText, Upload 
} from 'lucide-react'; 

// --- DATOS INICIALES (MANTENIDOS AL INICIO) ---

// Certificados iniciales simulados
const INITIAL_CERTIFICATES = [
    { 
        id: 1, 
        name: "Introducción a React", 
        issuer: "CodeAcademy", 
        date: "2024-05-15", 
        imageUrl: "https://placehold.co/120x80/2980B9/ffffff?text=React+Cert" 
    },
];

// Datos de aprendizaje simulados por mes
const LEARNING_DATA = [
    { Mes: 'Jul', Horas: 18 },
    { Mes: 'Ago', Horas: 25 },
    { Mes: 'Sep', Horas: 35 },
    { Mes: 'Oct', Horas: 42 },
    { Mes: 'Nov', Horas: 20 },
];

// Datos iniciales del usuario
const INITIAL_USER_DATA = {
    name: "Andrea Sofía Castro", 
    email: "andrea.castro@example.com",
    age: 24, 
    preferences: ['Programación Web', 'Marketing Digital', 'Diseño UX/UI'],
    skills: ['JavaScript', 'React', 'Tailwind CSS'],
    certificates: INITIAL_CERTIFICATES, 
    profileImageUrl: "https://i.pravatar.cc/150?img=33" // URL de imagen inicial
};

// Datos simulados para la demostración del perfil
const SIMULATED_DATA = {
    career: {
        performanceRating: 4.5,
        totalHours: LEARNING_DATA.reduce((sum, item) => sum + item.Horas, 0),
        learningData: LEARNING_DATA
    }
};

const INITIAL_PREFERENCES = [
    'Programación Web', 'Marketing Digital', 'Diseño UX/UI', 'Inteligencia Artificial',
    'Análisis de Datos', 'Gestión de Proyectos', 'Ciberseguridad', 'Cloud Computing',
    'Ventas y Negocios', 'Redes Sociales'
];

const INITIAL_SKILLS = [
    'JavaScript', 'React', 'Tailwind CSS', 'Python', 'SQL', 'Figma', 
    'Photoshop', 'Google Analytics', 'SEO', 'Scrum', 'Liderazgo', 'Comunicación'
];


// --- SIMULACIÓN DE RECHARTS (Componentes de Gráfica) ---
const Recharts = {
    ResponsiveContainer: ({ children, width = '100%', height = 300 }) => (
        <div style={{ width, height, position: 'relative' }}>{children}</div>
    ),
    BarChart: ({ children }) => <svg viewBox="0 0 500 300" className="w-full h-full">{children}</svg>,
    Bar: ({ dataKey, fill, data }) => {
        if (!data || data.length === 0) return null; 

        const maxData = Math.max(...data.map(d => d.Horas), 0);
        if (maxData === 0) return null;

        const scaleY = (value) => (value / maxData) * 200; 

        return data.map((d, index) => {
            const barHeight = scaleY(d.Horas);
            const barWidth = 30;
            const x = 50 + index * 100;
            const y = 300 - barHeight;

            return (
                <g key={index}>
                    <rect x={x} y={y} width={barWidth} height={barHeight} fill={fill} rx="4" ry="4" />
                    <text x={x + barWidth / 2} y={y - 5} fill="#333" textAnchor="middle" fontSize="12">
                        {d.Horas}h
                    </text>
                </g>
            );
        });
    },
    XAxis: ({ dataKey, data }) => (
        <g transform="translate(0, 300)">
            <line x1="50" y1="0" x2="450" y2="0" stroke="#ccc" />
            {data.map((d, index) => (
                <text key={index} x={65 + index * 100} y="15" fill="#666" textAnchor="middle" fontSize="12">
                    {d[dataKey]}
                </text>
            ))}
        </g>
    ),
    YAxis: () => (
        <g transform="translate(50, 0)">
            <line x1="0" y1="0" x2="0" y2="300" stroke="#ccc" />
            <text x="-10" y="30" fill="#666" textAnchor="end" fontSize="12">Max</text>
            <text x="-10" y="300" fill="#666" textAnchor="end" fontSize="12">0</text>
        </g>
    ),
    Tooltip: () => null, 
};

const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } = Recharts;
// --- FIN DE SIMULACIÓN DE RECHARTS ---

// --- COMPONENTES AUXILIARES ---

// Componente StarRating
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const decimalPart = rating % 1;
    const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75;
    const starsAccountedFor = fullStars + (hasHalfStar ? 1 : 0);
    const emptyStars = 5 - starsAccountedFor;

    return (
        <div className="flex items-center text-[#F39C12]">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={full-${i}} className="w-5 h-5 fill-current" />
            ))}
            {hasHalfStar && (
                <div key="half" className="relative w-5 h-5 overflow-hidden">
                    <Star className="absolute w-5 h-5 fill-current" />
                    <div className="absolute w-1/2 h-full bg-white right-0"></div> 
                </div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={empty-${i}} className="w-5 h-5 text-gray-300" />
            ))}
            <span className="text-sm text-gray-600 ml-2">({rating.toFixed(1)} / 5)</span>
        </div>
    );
};

const generateUsername = (name) => {
    return name ? name.toLowerCase().replace(/\s/g, '') : '';
};


// --- PANTALLAS ---

const LearningHoursScreen = ({ data, onBack, totalHours }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-green-500/80 mb-6">
            <div className="flex items-center mb-6 border-b pb-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition" aria-label="Volver al perfil">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-[#17202A] ml-3 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-green-600" />
                    Historial de Horas de Aprendizaje
                </h2>
            </div>

            <div className="text-center mb-6 p-4 bg-green-50 rounded-lg">
                <p className="text-lg text-gray-700">Horas totales registradas:</p>
                <p className="text-5xl font-extrabold text-green-700">{totalHours}h</p>
                <p className="text-sm text-gray-500 mt-2">Progreso de los últimos 5 meses</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-inner h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart>
                        <XAxis dataKey="Mes" data={data} />
                        <YAxis />
                        <Bar data={data} dataKey="Horas" fill="#16A085" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <p className="mt-6 text-sm text-gray-600 italic border-t pt-4">
                Esta gráfica muestra tu consistencia y crecimiento en horas de formación por mes.
            </p>
        </div>
    );
};

const CertificatesScreen = ({ certificates, onBack, onAddCertificate }) => {
    const [newCertName, setNewCertName] = useState('');
    const [newCertIssuer, setNewCertIssuer] = useState('');
    const [newCertDate, setNewCertDate] = useState('');
    const [certificateFile, setCertificateFile] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleFileChange = (e) => {
        setCertificateFile(e.target.files[0] || null);
    };

    const handleAddCertificateSubmit = (e) => {
        e.preventDefault();
        
        if (!newCertName || !newCertIssuer || !newCertDate || !certificateFile) {
            console.error("Por favor, completa todos los campos y sube el certificado.");
            return;
        }

        onAddCertificate({
            name: newCertName.trim(),
            issuer: newCertIssuer.trim(),
            date: newCertDate,
            fileName: certificateFile.name 
        });

        setNewCertName('');
        setNewCertIssuer('');
        setNewCertDate('');
        setCertificateFile(null); 
        setIsFormVisible(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-blue-500/80 mb-6">
            <div className="flex items-center mb-6 border-b pb-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition" aria-label="Volver al perfil">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-[#17202A] ml-3 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Mis Certificados ({certificates.length})
                </h2>
            </div>

            <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-2">
                {certificates.length > 0 ? (
                    certificates.map((cert) => (
                        <div key={cert.id} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
                            <img 
                                src={cert.imageUrl} 
                                alt={Certificado de ${cert.name}}
                                className="w-16 h-12 object-cover rounded-md border mr-4 shadow-sm"
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = "https://placehold.co/120x80/CCCCCC/666666?text=Certificado";
                                }}
                            />
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-900">{cert.name}</p>
                                <p className="text-sm text-gray-600">Emitido por: {cert.issuer}</p>
                                {cert.fileName && (
                                    <p className="text-xs text-blue-500 flex items-center mt-1">
                                        <Check className="w-3 h-3 mr-1" /> Archivo: {cert.fileName}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col items-end text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1 inline text-blue-400" />
                                {cert.date}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 italic p-4 border border-dashed rounded-lg">
                        Aún no tienes certificados registrados. ¡Añade el primero!
                    </p>
                )}
            </div>

            <div className="border-t pt-4">
                <button 
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-lg"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    {isFormVisible ? 'Ocultar Formulario' : 'Añadir Nuevo Certificado'}
                </button>

                {isFormVisible && (
                    <form onSubmit={handleAddCertificateSubmit} className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
                        <h3 className="text-lg font-bold text-blue-800">Detalles del Certificado</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre del Curso</label>
                            <input
                                type="text"
                                value={newCertName}
                                onChange={(e) => setNewCertName(e.target.value)}
                                placeholder="Ej: Especialista en Python"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Emisor / Institución</label>
                            <input
                                type="text"
                                value={newCertIssuer}
                                onChange={(e) => setNewCertIssuer(e.target.value)}
                                placeholder="Ej: Universidad de Tecnología"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de Finalización</label>
                            <input
                                type="date"
                                value={newCertDate}
                                onChange={(e) => setNewCertDate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subir Archivo del Certificado (PDF/JPG/PNG)
                            </label>
                            <label htmlFor="certificate-upload" className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
                                <Upload className="w-5 h-5 mr-2 text-blue-600" />
                                <span className="text-sm font-medium text-blue-700">
                                    {certificateFile ? certificateFile.name : 'Seleccionar archivo...'}
                                </span>
                                <input
                                    id="certificate-upload"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required
                                />
                            </label>
                            {certificateFile && (
                                <p className="text-xs text-green-600 mt-1 flex items-center">
                                    <Check className="w-3 h-3 mr-1" /> Archivo listo para subir.
                                </p>
                            )}
                        </div>
                        
                        <div className='pt-2'>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                Guardar Certificado
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                            *Nota: La subida de archivos es simulada. Solo se guarda el nombre del archivo y se genera un placeholder visual.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

const EditProfileForm = ({ user, initialPreferences, initialSkills, onSave, onCancel }) => {
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);
    const [email, setEmail] = useState(user.email);
    const [selectedPreferences, setSelectedPreferences] = useState(user.preferences);
    const [selectedSkills, setSelectedSkills] = useState(user.skills); 

    const [allPreferences, setAllPreferences] = useState(initialPreferences);
    const [allSkills, setAllSkills] = useState(initialSkills);

    const [newSkillInput, setNewSkillInput] = useState('');
    const [newPrefInput, setNewPrefInput] = useState('');

    const handleToggleSelection = (item, setter) => {
        setter(prev => {
            const normalizedItem = item.trim();
            if (prev.includes(normalizedItem)) {
                return prev.filter(p => p !== normalizedItem);
            } else {
                return [...prev, normalizedItem];
            }
        });
    };

    const handleAddSkill = () => {
        const skill = newSkillInput.trim();
        if (!skill) return;

        if (!allSkills.includes(skill)) {
            setAllSkills(prev => [...prev, skill]);
        }
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills(prev => [...prev, skill]);
        }
        setNewSkillInput('');
    };

    const handleAddPreference = () => {
        const preference = newPrefInput.trim();
        if (!preference) return;

        if (!allPreferences.includes(preference)) {
            setAllPreferences(prev => [...prev, preference]);
        }
        if (!selectedPreferences.includes(preference)) {
            setSelectedPreferences(prev => [...prev, preference]);
        }
        setNewPrefInput('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            name, 
            age: parseInt(age),
            email,
            preferences: selectedPreferences,
            skills: selectedSkills,
        });
    };

    const isSaveDisabled = selectedPreferences.length === 0 || selectedSkills.length === 0;

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-yellow-500/80 mb-6">
            <h2 className="text-2xl font-bold text-[#17202A] mb-6 flex items-center">
                <Edit3 className="w-6 h-6 mr-2 text-yellow-600" />
                Editar Perfil
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#F39C12] focus:border-[#F39C12] transition"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
                        <input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#F39C12] focus:border-[#F39C12] transition"
                            min="16"
                            max="100"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#F39C12] focus:border-[#F39C12] transition"
                        required
                    />
                </div>
                
                <div className='pt-4 border-t'>
                    <h3 className="text-lg font-bold text-[#17202A] mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-blue-500" /> 
                        Habilidades Técnicas
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4 max-h-40 overflow-y-auto pr-2">
                        {allSkills.map((skill) => {
                            const isSelected = selectedSkills.includes(skill);
                            return (
                                <button
                                    key={skill}
                                    type="button"
                                    onClick={() => handleToggleSelection(skill, setSelectedSkills)}
                                    className={`
                                        flex items-center px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                                        ${isSelected 
                                            ? 'bg-blue-600 text-white border-2 border-blue-600 shadow-md hover:bg-blue-700'
                                            : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                                        }
                                    `}
                                >
                                    {isSelected ? <Check className="w-4 h-4 mr-1" /> : <Plus className="w-4 h-4 mr-1 opacity-50" />}
                                    {skill}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex space-x-2 mt-4">
                        <input
                            type="text"
                            placeholder="Ej: TypeScript, NodeJS"
                            value={newSkillInput}
                            onChange={(e) => setNewSkillInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddSkill();
                                }
                            }}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <button
                            type="button"
                            onClick={handleAddSkill}
                            disabled={!newSkillInput.trim()}
                            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                newSkillInput.trim()
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Añadir
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Selecciona y/o añade tus habilidades técnicas.</p>
                </div>

                <div className='pt-4 border-t'>
                    <h3 className="text-lg font-bold text-[#17202A] mb-3 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-red-500" /> 
                        Preferencias de Empleo
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4 max-h-40 overflow-y-auto pr-2">
                        {allPreferences.map((pref) => {
                            const isSelected = selectedPreferences.includes(pref);
                            return (
                                <button
                                    key={pref}
                                    type="button"
                                    onClick={() => handleToggleSelection(pref, setSelectedPreferences)}
                                    className={`
                                        flex items-center px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                                        ${isSelected 
                                            ? 'bg-[#1ABC9C] text-white border-2 border-[#1ABC9C] shadow-md hover:bg-[#16A085]'
                                            : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                                        }
                                    `}
                                >
                                    {isSelected ? <Check className="w-4 h-4 mr-1" /> : <Plus className="w-4 h-4 mr-1 opacity-50" />}
                                    {pref}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex space-x-2 mt-4">
                        <input
                            type="text"
                            placeholder="Ej: Trabajo Remoto, Freelance"
                            value={newPrefInput}
                            onChange={(e) => setNewPrefInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddPreference();
                                }
                            }}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] transition"
                        />
                        <button
                            type="button"
                            onClick={handleAddPreference}
                            disabled={!newPrefInput.trim()}
                            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition ${
                                newPrefInput.trim()
                                    ? 'bg-[#1ABC9C] text-white hover:bg-[#16A085]'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Añadir
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Selecciona al menos un área de interés o añade una nueva.</p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition"
                    >
                        <X className="w-5 h-5 mr-1" />
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSaveDisabled}
                        className={`flex items-center px-4 py-2 font-semibold rounded-full shadow-md transition ${
                            isSaveDisabled
                                ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                                : 'bg-[#1ABC9C] text-white hover:bg-[#16A085]'
                        }`}
                    >
                        <Save className="w-5 h-5 mr-1" />
                        Guardar Cambios
                    </button>
                </div>
                {isSaveDisabled && (
                    <p className="text-center text-sm text-red-500">Debes seleccionar al menos una Habilidad y una Preferencia para guardar.</p>
                )}
            </form>
        </div>
    );
};


// Componente principal de la Pantalla de Perfil
const ProfileScreen = () => {
    // Definimos el estado inicial usando los datos estáticos definidos arriba
    const [user, setUser] = useState(INITIAL_USER_DATA);
    const [view, setView] = useState('profile');

    const handleLogout = () => {
        console.log("Sesión cerrada. (Simulación)"); 
    };

    const handleSaveProfile = (updatedData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...updatedData,
        }));
        setView('profile');
        console.log("Perfil actualizado:", updatedData);
    };

    const handleAddCertificate = (newCert) => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
        
        setUser(prevUser => ({
            ...prevUser,
            certificates: [...prevUser.certificates, { 
                ...newCert, 
                id: Date.now(), 
                imageUrl: https://placehold.co/120x80/${randomColor}/ffffff?text=${newCert.name.split(' ')[0]}
            }]
        }));
    };

    const handleProfileImageChange = (file) => {
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setUser(prevUser => ({
                ...prevUser,
                profileImageUrl: newImageUrl,
            }));
            console.log("Nueva imagen de perfil seleccionada:", file.name);
        }
    };
    
    // Función de renderizado para el modo de visualización del perfil
    const ProfileView = () => {
        const username = generateUsername(user.name); 

        const TagList = ({ items, emptyMessage, borderColor }) => (
            <div className="flex flex-wrap gap-2">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <span 
                            key={index} 
                            className={`
                                px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border shadow-sm
                                ${borderColor}
                            `}
                        >
                            {item}
                        </span>
                    ))
                ) : (
                    <p className="text-gray-500 italic text-sm">{emptyMessage}</p>
                )}
            </div>
        );


        return (
            <div className="p-4 space-y-6">

                {/* 1. SECCIÓN DE INFORMACIÓN BÁSICA Y FOTO */}
                <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-xl border-t-8 border-[#1ABC9C]/80">
                    
                    <div className="relative mb-4">
                        <img 
                            src={user.profileImageUrl}
                            alt="Foto de Perfil"
                            className="w-32 h-32 object-cover rounded-full border-4 border-gray-100 shadow-lg"
                        />
                        
                        <input
                            type="file"
                            id="profile-image-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleProfileImageChange(e.target.files[0])} 
                        />

                        <label
                            htmlFor="profile-image-upload"
                            className="absolute bottom-0 right-0 p-2 bg-[#F39C12] text-white rounded-full hover:bg-[#E67E22] transition shadow-lg ring-4 ring-white cursor-pointer"
                            aria-label="Cambiar foto"
                        >
                            <Camera className="w-5 h-5" />
                        </label>
                    </div>

                    <h2 className="text-3xl font-extrabold text-[#17202A] mt-2">{user.name}</h2>
                    <p className="text-gray-500 text-lg mb-4">@{username}</p>
                    
                    <div className="w-full space-y-3 text-gray-700 max-w-sm">
                        <p className="flex items-center text-md font-medium">
                            <Mail className="w-5 h-5 mr-3 text-[#1ABC9C]" /> {user.email}
                        </p>
                        <p className="flex items-center text-md font-medium">
                            <User className="w-5 h-5 mr-3 text-[#1ABC9C]" /> {user.age} años 
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => setView('edit')} 
                        className="mt-4 flex items-center px-4 py-2 text-[#1ABC9C] border border-[#1ABC9C] rounded-full text-sm font-semibold hover:bg-[#1ABC9C] hover:text-white transition-all"
                    >
                        <Edit3 className="w-4 h-4 mr-2" /> 
                        Editar Datos
                    </button>
                </div>
                
                {/* 2. HABILIDADES TÉCNICAS */}
                <section className="bg-white p-6 rounded-xl shadow-xl">
                    <div className="flex justify-between items-center mb-4 border-b pb-3">
                        <h3 className="text-xl font-bold text-[#17202A] flex items-center">
                            <Zap className="w-6 h-6 mr-2 text-blue-500" /> Habilidades Técnicas
                        </h3>
                        <button 
                            onClick={() => setView('edit')} 
                            className="text-[#1ABC9C] hover:text-[#17202A] p-2 rounded-full hover:bg-gray-100 transition"
                            aria-label="Editar habilidades"
                        >
                            <Edit3 className="w-5 h-5" />
                        </button>
                    </div>
                    <TagList 
                        items={user.skills} 
                        emptyMessage="Añade tus habilidades para destacar."
                        borderColor="border-blue-200"
                    />
                </section>

                {/* 3. GUSTOS Y PREFERENCIAS */}
                <section className="bg-white p-6 rounded-xl shadow-xl">
                    <div className="flex justify-between items-center mb-4 border-b pb-3">
                        <h3 className="text-xl font-bold text-[#17202A] flex items-center">
                            <Heart className="w-6 h-6 mr-2 text-red-500" /> Preferencias de Empleo
                        </h3>
                        <button 
                            onClick={() => setView('edit')} 
                            className="text-[#1ABC9C] hover:text-[#17202A] p-2 rounded-full hover:bg-gray-100 transition"
                            aria-label="Editar preferencias"
                        >
                            <Edit3 className="w-5 h-5" />
                        </button>
                    </div>
                    <TagList 
                        items={user.preferences} 
                        emptyMessage="No has seleccionado preferencias aún."
                        borderColor="border-red-200"
                    />
                </section>

                {/* 4. MI TRAYECTORIA ACADÉMICA / PROFESIONAL */}
                <section className="bg-white p-6 rounded-xl shadow-xl">
                    <h3 className="text-xl font-bold text-[#17202A] mb-5 flex items-center"><Briefcase className="w-6 h-6 mr-2 text-[#F39C12]" /> Mi Trayectoria</h3>
                    
                    <div className="space-y-4">
                        <div 
                            onClick={() => setView('certificates')}
                            className="flex justify-between items-center p-3 bg-blue-50/50 rounded-lg border-l-4 border-blue-500 cursor-pointer hover:bg-blue-100 transition shadow-sm"
                        >
                            <p className="flex items-center text-gray-700 font-semibold">
                                <BookOpen className="w-5 h-5 mr-3 text-blue-500" /> 
                                Cursos Completados:
                            </p>
                            <span className="font-extrabold text-xl text-blue-700">{user.certificates.length}</span>
                        </div>

                        <div 
                            onClick={() => setView('learning')}
                            className="flex justify-between items-center p-3 bg-green-50/50 rounded-lg border-l-4 border-green-500 cursor-pointer hover:bg-green-100 transition shadow-sm"
                        >
                            <p className="flex items-center text-gray-700 font-semibold"><Clock className="w-5 h-5 mr-3 text-green-500" /> Horas de Aprendizaje:</p>
                            <span className="font-extrabold text-xl text-green-700">{SIMULATED_DATA.career.totalHours}h</span>
                        </div>
                        
                        <div className="border-t pt-4">
                            <p className="text-gray-700 font-semibold mb-2 flex items-center"><Star className="w-5 h-5 mr-2 text-[#F39C12]" /> Rendimiento (Promedio de Estrellas):</p>
                            <StarRating rating={SIMULATED_DATA.career.performanceRating} />
                        </div>
                    </div>
                </section>

                <div className="pt-4 pb-8">
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 flex items-center justify-center bg-red-600/90 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition transform hover:scale-[1.01]"
                    >
                        <LogOut className="w-5 h-5 mr-2" />
                        Cerrar Sesión
                    </button>
                </div>
                
            </div>
        );
    }
    

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-[Inter]">
            <div className="w-full max-w-2xl bg-gray-50 shadow-xl">
                
                <header className="sticky top-0 z-10 bg-[#1ABC9C] text-white p-4 shadow-md">
                    <h1 className="text-xl font-bold">Workly | Mi Perfil</h1>
                </header>
                
                <main className="p-4">
                    {view === 'edit' ? (
                        <EditProfileForm 
                            user={user}
                            initialPreferences={INITIAL_PREFERENCES}
                            initialSkills={INITIAL_SKILLS}
                            onSave={handleSaveProfile}
                            onCancel={() => setView('profile')}
                        />
                    ) : view === 'certificates' ? (
                        <CertificatesScreen
                            certificates={user.certificates}
                            onBack={() => setView('profile')}
                            onAddCertificate={handleAddCertificate}
                        />
                    ) : view === 'learning' ? (
                        <LearningHoursScreen
                            data={SIMULATED_DATA.career.learningData}
                            totalHours={SIMULATED_DATA.career.totalHours}
                            onBack={() => setView('profile')}
                        />
                    ) : (
                        <ProfileView />
                    )}
                </main>
            </div>
        </div>
    );
};

// Se realiza la exportación directa de ProfileScreen, eliminando el wrapper.
export default ProfileScreen;
