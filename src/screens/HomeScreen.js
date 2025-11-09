import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Briefcase, BookOpen, Clock, Zap, LogOut, User, ArrowLeft, GraduationCap, Clock3, Database, Send, Aperture, UserRoundCheck } from 'lucide-react';

// --- Configuración de Entorno y Firebase (OBLIGATORIO) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- COMPONENTES AUXILIARES ---

// Componente para una tarjeta de estadística
const StatCard = ({ icon: Icon, title, value, color, onClick }) => (
    <div 
        className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md ${color} text-white transition duration-300 hover:scale-[1.03] transform cursor-pointer`}
        onClick={onClick}
    >
        <Icon className="w-8 h-8 mb-2" />
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs opacity-80 mt-1">{title}</p>
    </div>
);

// Componente para una recomendación rápida (QuickLink)
const QuickLink = ({ icon: Icon, title, color, onClick }) => (
    <div 
        className={`flex flex-col items-center p-3 rounded-xl border ${color} bg-white shadow-sm hover:shadow-lg transition cursor-pointer hover:border-2`}
        onClick={onClick} // Agregamos el manejador de click
    >
        <Icon className="w-6 h-6 mb-1 text-gray-800" />
        <p className="text-sm font-medium text-center text-gray-700">{title}</p>
    </div>
);

// Componente de botón de volver para las sub-pantallas
const BackButton = ({ onBack, title }) => (
    <div className='flex justify-between items-center pt-2 pb-4 border-b-4 border-[#1ABC9C] bg-white rounded-xl shadow-lg p-6'>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A] flex items-center">
            {title === 'Mis Cursos' && <GraduationCap className='w-8 h-8 mr-3 text-[#1ABC9C]'/>}
            {title === 'Mis Postulaciones y Empleos' && <Briefcase className='w-8 h-8 mr-3 text-[#F39C12]'/>}
            {title === 'Mi Progreso de Aprendizaje' && <Database className='w-8 h-8 mr-3 text-blue-500'/>}
            {title.includes('Aridna Rosales') && <UserRoundCheck className='w-8 h-8 mr-3 text-purple-600'/>}
            {title}
        </h2>
        <button 
            onClick={onBack}
            className='flex items-center text-gray-600 font-semibold hover:bg-gray-100 p-2 rounded-lg transition border border-gray-300'
        >
            <ArrowLeft className='w-4 h-4 mr-1' />
            Volver al Dashboard
        </button>
    </div>
);

// --- VISTAS ESPECÍFICAS ---

// 1. VISTA DE CURSOS
const CoursesScreen = ({ onBack }) => {
    const enrolledCourses = [
        { title: "Diseño UX/UI Avanzado", progress: 75, instructor: "Laura Smith", color: "bg-blue-600" },
        { title: "Introducción a ReactJS", progress: 92, instructor: "John Doe", color: "bg-teal-600" },
        { title: "Fundamentos de Python", progress: 40, instructor: "Maria Garcia", color: "bg-purple-600" },
    ];

    const CourseCard = ({ title, progress, instructor, color }) => (
        <div className="bg-white p-5 rounded-xl shadow-md transition hover:shadow-lg transform hover:scale-[1.01] border-l-8 border-r-2" style={{ borderColor: color.replace('bg-', '') }}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold text-gray-800">{title}</h4>
                <div className={`${color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {progress}%
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-3">Instructor: {instructor}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className={`${color} h-2.5 rounded-full transition-all duration-500`} 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
                {progress < 100 ? 'Continúa tu progreso para obtener el certificado.' : '¡Curso completado!'}
            </p>
        </div>
    );

    return (
        <div className="p-4 space-y-6 min-h-screen bg-gray-50 font-[Inter]">
            <BackButton onBack={onBack} title="Mis Cursos" />
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-2">Inscripciones Activas ({enrolledCourses.length})</h3>
                {enrolledCourses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </section>
        </div>
    );
};

// 2. VISTA DE EMPLEOS Y POSTULACIONES
const JobsScreen = ({ onBack }) => {
    
    // Empleos Guardados (Saved Jobs)
    const savedJobs = [
        { title: "Desarrollador Full Stack (Remoto)", company: "TechSolutions Inc.", status: "Guardado", color: "text-[#F39C12]", icon: Briefcase },
        { title: "Diseñador UX Senior", company: "DesignFlow Co.", status: "Guardado", color: "text-[#F39C12]", icon: Briefcase },
    ];
    
    // Aplicaciones Enviadas (Sent Applications)
    const submittedApplications = [
        { title: "Analista de Datos Jr.", company: "DataCorp", status: "Revisión", date: "20/Oct", color: "text-red-500", icon: Send },
        { title: "Especialista en Marketing Digital", company: "Growthify", status: "Entrevista", date: "15/Oct", color: "text-[#1ABC9C]", icon: Send },
        { title: "Project Manager", company: "Global Connect", status: "Rechazado", date: "10/Oct", color: "text-gray-500", icon: Send },
    ];

    const JobPostCard = ({ title, company, status, color, icon: Icon, date }) => (
        <div className="bg-white p-4 rounded-xl shadow-md transition hover:shadow-lg flex items-center justify-between border-l-4 border-gray-200">
            <div className='flex items-center'>
                <Icon className={`w-6 h-6 mr-3 ${color}`} />
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                    <p className="text-sm text-gray-500">{company}</p>
                </div>
            </div>
            <div className="text-right">
                <span className={`text-sm font-bold ${color}`}>{status}</span>
                {date && <p className="text-xs text-gray-400">Enviado: {date}</p>}
            </div>
        </div>
    );

    return (
        <div className="p-4 space-y-6 min-h-screen bg-gray-50 font-[Inter]">
            <BackButton onBack={onBack} title="Mis Postulaciones y Empleos" />
            
            {/* Empleos Guardados */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-[#F39C12] pl-2">Empleos Guardados ({savedJobs.length})</h3>
                {savedJobs.map((job, index) => (
                    <JobPostCard key={index} {...job} />
                ))}
            </section>

            {/* Aplicaciones Enviadas */}
            <section className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-red-500 pl-2">Aplicaciones Enviadas ({submittedApplications.length})</h3>
                {submittedApplications.map((app, index) => (
                    <JobPostCard key={index} {...app} />
                ))}
            </section>
        </div>
    );
};

// 3. VISTA DE HORAS DE APRENDIZAJE
const LearningHoursScreen = ({ onBack }) => {
    
    // Datos de ejemplo para el progreso semanal
    const weeklyData = [
        { day: 'Lun', hours: 3.5 },
        { day: 'Mar', hours: 4.0 },
        { day: 'Mié', hours: 2.5 },
        { day: 'Jue', hours: 5.0 },
        { day: 'Vie', hours: 1.5 },
        { day: 'Sáb', hours: 6.0 },
        { day: 'Dom', hours: 0.0 },
    ];
    
    const totalHours = weeklyData.reduce((sum, item) => sum + item.hours, 0).toFixed(1);
    const maxHours = 6; // Para calcular la altura de las barras

    const BarChart = () => (
        <div className="flex justify-between items-end h-48 w-full p-4 bg-gray-50 rounded-lg border">
            {weeklyData.map((item, index) => (
                <div key={index} className="flex flex-col items-center h-full justify-end w-1/8 mx-1">
                    <div 
                        className="w-full rounded-t-lg bg-blue-500 transition-all duration-700 hover:bg-blue-600 shadow-md" 
                        style={{ height: `${(item.hours / maxHours) * 100}%` }}
                        title={`${item.hours} horas`}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">{item.day}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-4 space-y-6 min-h-screen bg-gray-50 font-[Inter]">
            <BackButton onBack={onBack} title="Mi Progreso de Aprendizaje" />
            
            <section className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-blue-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Clock3 className="w-6 h-6 mr-2 text-blue-500" />
                    Resumen Semanal de Estudio
                </h3>
                <div className='flex justify-between items-center mb-6'>
                    <p className='text-4xl font-extrabold text-[#17202A]'>{totalHours}h</p>
                    <span className='text-lg font-medium text-gray-600'>Total esta semana</span>
                </div>
                
                <BarChart />

                <p className="mt-6 text-sm text-gray-600 border-t pt-4">
                    **Objetivo:** Recomendamos un promedio de 25 horas semanales para acelerar tu desarrollo profesional.
                </p>
            </section>
        </div>
    );
};

// 4. VISTA DE CHAT CON ASESORA (Personalizada para Aridna Rosales)
const ChatScreen = ({ onBack }) => {
    // Placeholder de estado para el chat
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            // Mensaje de bienvenida personalizado
            text: "¡Hola! Soy Aridna Rosales, tu Asesora de Carrera AI en Workly. Estoy aquí para ayudarte a planificar tu desarrollo y conseguir tu próximo empleo. ¿En qué puedo asistirte?", 
            sender: 'ai' 
        }
    ]);
    const [input, setInput] = useState('');

    // Función de envío de mensaje (placeholder sin integración real a LLM)
    const handleSend = () => {
        if (input.trim() === '') return;
        
        const newMessage = {
            id: messages.length + 1,
            text: input,
            sender: 'user'
        };
        
        setMessages(prev => [...prev, newMessage]);
        setInput('');

        // Respuesta simple de la IA después de un breve retraso
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                text: `Gracias por compartir tu consulta. Como Aridna Rosales, te sugiero que para la próxima vez que necesites ayuda con "${input}", intentes...`,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1500);
    };

    const MessageBubble = ({ text, sender }) => (
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                sender === 'user' 
                ? 'bg-purple-500 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
            }`}>
                {text}
            </div>
        </div>
    );

    return (
        <div className="p-4 space-y-6 min-h-screen bg-gray-50 font-[Inter] flex flex-col">
            {/* Título personalizado */}
            <BackButton onBack={onBack} title="Asesora de Carreras AI: Aridna Rosales" />
            
            <div className="flex-grow bg-white rounded-xl shadow-lg flex flex-col">
                {/* Área de Mensajes */}
                <div className="flex-grow p-4 space-y-4 overflow-y-auto h-96 custom-scrollbar">
                    {messages.map(msg => (
                        <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
                    ))}
                    {/* Placeholder de scroll para la parte inferior */}
                    <div className="pb-1"></div> 
                </div>

                {/* Entrada de Texto */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
                            placeholder="Escribe tu consulta para Aridna Rosales..."
                            className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:ring-purple-500 focus:border-purple-500 shadow-inner"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- HOME SCREEN (Componente modificado) ---
const HomeScreen = ({ user, onLogout, onNavigate }) => {
    const userName = user?.displayName || "Usuario";
    const firstUserName = userName.split(' ')[0];

    // Estadísticas
    const stats = [
        { 
            icon: Briefcase, 
            title: 'Empleos Guardados', 
            value: '12', 
            color: 'bg-[#F39C12]',
            onClick: () => onNavigate('jobs') 
        },
        { 
            icon: BookOpen, 
            title: 'Cursos Inscritos', 
            value: '3', 
            color: 'bg-[#1ABC9C]',
            onClick: () => onNavigate('courses') 
        }, 
        { 
            icon: Clock, 
            title: 'Horas Aprendidas', 
            value: '45h', 
            color: 'bg-blue-500',
            onClick: () => onNavigate('hours') 
        }, 
        { 
            icon: Zap, 
            title: 'Aplicaciones Enviadas', 
            value: '7', 
            color: 'bg-[#17202A]',
            onClick: () => onNavigate('jobs') // JobScreen incluye esta sección
        },
    ];

    // Pasos Rápidos - AHORA CON NAVEGACIÓN ACTIVA
    const quickActions = [
        { 
            icon: Briefcase, 
            title: 'Buscar Trabajos', 
            color: 'border-[#F39C12]',
            onClick: () => onNavigate('jobs')
        },
        { 
            icon: BookOpen, 
            title: 'Explorar Cursos', 
            color: 'border-[#1ABC9C]',
            onClick: () => onNavigate('courses') 
        },
        { 
            icon: Aperture, // Icono de IA
            title: 'Ver Asesora', 
            color: 'border-purple-500',
            onClick: () => onNavigate('chat') // Nueva ruta al ChatScreen
        },
    ];

    return (
        <div className="p-4 space-y-8 min-h-[90vh] bg-gray-50 font-[Inter]">
            
            {/* ENCABEZADO Y SALUDO DINÁMICO */}
            <header className="pt-2 pb-4 border-b-4 border-[#1ABC9C] bg-white rounded-xl shadow-lg p-6">
                <div className='flex justify-between items-start'>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17202A]">¡Hola, {firstUserName}! 👋</h2>
                    <button 
                        onClick={onLogout}
                        className='flex items-center text-red-600 font-semibold hover:bg-red-50 p-2 rounded-full transition'
                    >
                        <LogOut className='w-5 h-5 mr-1' />
                        Salir
                    </button>
                </div>
                
                <p className="text-gray-600 mt-2">Mantente al día con tu progreso y próximos pasos en Workly.</p>
                <div className='mt-2 text-sm text-gray-400 select-all'>
                    ID de Sesión: {user?.userId || 'N/A'}
                </div>
            </header>

            {/* SECCIÓN DE ESTADÍSTICAS */}
            <section>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-[#F39C12] pl-2">Tu Actividad General</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </section>
            
            {/* SECCIÓN DE ACCIONES RÁPIDAS (Ahora con navegación) */}
            <section>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-[#1ABC9C] pl-2">Pasos Rápidos</h3>
                <div className="grid grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <QuickLink key={index} {...action} />
                    ))}
                </div>
            </section>
            
            {/* SECCIÓN DE CONTENIDO RECOMENDADO (Placeholder) */}
            <section className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-[#F39C12]">
                <h3 className="text-2xl font-bold text-[#17202A] mb-3 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-red-500" />
                    Recomendación de Alto Impacto
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    Basado en tus habilidades de **JavaScript** y tus preferencias en **Diseño UX/UI**, te recomendamos iniciar el curso intensivo de **React para Diseñadores**.
                </p>
                <div className='flex justify-end pt-4'>
                    <button className="flex items-center px-4 py-2 bg-[#1ABC9C] text-white font-bold rounded-full shadow-lg hover:bg-[#16A085] transition transform hover:scale-[1.05]">
                        Explorar Curso <BookOpen className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </section>

        </div>
    );
};


// --- LOGIN SCREEN (sin cambios) ---
const LoginScreen = ({ onLogin, loading }) => {
    const [nameInput, setNameInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(nameInput);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-[Inter]">
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-white shadow-2xl rounded-2xl border-t-8 border-[#1ABC9C]">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-[#17202A] mb-2">Workly</h2>
                    <p className="text-sm text-gray-500">Tu plataforma de crecimiento profesional.</p>
                </div>
                
                <p className="text-base text-gray-700 mb-6 text-center">
                    Por favor, ingresa tu **Nombre**.
                </p>
                <div className="mb-6">
                    <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Tu Nombre (Ej: Andrea Castro)"
                        maxLength={30}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#1ABC9C] focus:border-[#1ABC9C] text-lg shadow-sm transition duration-150 ease-in-out"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !nameInput.trim()}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] disabled:opacity-50 transition duration-150 ease-in-out"
                >
                    {loading ? 'Ingresando...' : 'Iniciar Workly'}
                </button>
            </form>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL (RUTEO Y ESTADO DE AUTH) ---
const Dashboard = () => {
    const [authReady, setAuthReady] = useState(false);
    const [user, setUser] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    // Vistas: 'home', 'courses', 'jobs', 'hours', 'chat'
    const [currentView, setCurrentView] = useState('home'); 

    // Función para manejar la navegación entre vistas
    const handleNavigate = (view) => {
        setCurrentView(view);
    };

    // Inicializar Firebase y Autenticación
    useEffect(() => {
        let unsubscribe = () => {};

        const setupFirebase = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }

                unsubscribe = onAuthStateChanged(auth, async (authUser) => {
                    if (authUser) {
                        const currentUserId = authUser.uid;
                        const userDocRef = doc(db, `artifacts/${appId}/users/${currentUserId}/profile/user_data`);
                        const userDocSnap = await getDoc(userDocRef);

                        if (userDocSnap.exists() && userDocSnap.data().displayName) {
                            setUser({ 
                                userId: currentUserId,
                                displayName: userDocSnap.data().displayName 
                            });
                        } else {
                            setUser({ userId: currentUserId, displayName: null });
                        }
                    } else {
                        setUser(null);
                    }
                    setAuthReady(true);
                    setIsLoading(false);
                });
            } catch (error) {
                console.error("Error en la configuración de Firebase/Autenticación:", error);
                setIsLoading(false);
            }
        };

        setupFirebase();
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const handleLogin = async (name) => {
        if (!name.trim() || !user || !user.userId) return;

        try {
            setIsLoading(true);
            const userDocRef = doc(db, `artifacts/${appId}/users/${user.userId}/profile/user_data`);
            
            await setDoc(userDocRef, {
                displayName: name.trim(),
                createdAt: serverTimestamp(),
            }, { merge: true });

            setUser(prev => ({ ...prev, displayName: name.trim() }));
            setIsLoading(false);
            setCurrentView('home'); 
        } catch (error) {
            console.error("Error al guardar el nombre:", error);
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        if (!user || !user.userId) return;

        try {
            setIsLoading(true);
            const userDocRef = doc(db, `artifacts/${appId}/users/${user.userId}/profile/user_data`);
            await setDoc(userDocRef, { displayName: null }, { merge: true }); 
            
            setUser(prev => ({ ...prev, displayName: null }));
            setCurrentView('home'); 
            setIsLoading(false);
        } catch (error) {
            console.error("Error al cerrar sesión/borrar nombre:", error);
            setIsLoading(false);
        }
    };


    if (isLoading || !authReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[Inter]">
                <div className="text-xl font-semibold text-[#1ABC9C] animate-pulse">Cargando Workly...</div>
            </div>
        );
    }
    
    // 1. Pantalla de Login (Si el usuario existe pero no tiene nombre)
    if (user && !user.displayName) {
        return <LoginScreen onLogin={handleLogin} loading={isLoading} />;
    }

    // 2. Pantalla Principal (Manejo del Router/Switch de Vistas)
    if (user && user.displayName) {
        return (
            <div className="min-h-screen bg-gray-100 font-[Inter]">
                <div className="max-w-7xl mx-auto">
                    {/* Renderiza la vista actual */}
                    {currentView === 'home' && (
                        <HomeScreen 
                            user={user} 
                            onLogout={handleLogout} 
                            onNavigate={handleNavigate} 
                        />
                    )}
                    {currentView === 'courses' && (
                        <CoursesScreen 
                            onBack={() => handleNavigate('home')} 
                        />
                    )}
                    {currentView === 'jobs' && (
                        <JobsScreen 
                            onBack={() => handleNavigate('home')} 
                        />
                    )}
                    {currentView === 'hours' && (
                        <LearningHoursScreen 
                            onBack={() => handleNavigate('home')} 
                        />
                    )}
                    {currentView === 'chat' && (
                        <ChatScreen 
                            onBack={() => handleNavigate('home')} 
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100 p-4 font-[Inter]">
            <p className="text-red-700">Ocurrió un error con la sesión. Por favor, recarga.</p>
        </div>
    );
};

export default HomeScreen;
