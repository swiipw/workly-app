import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, HelpCircle } from 'lucide-react';

// --- CONFIGURACIÓN DE RESPUESTAS AUTOMÁTICAS ---
const initialOptions = [
    { 
        id: 'cv_management', 
        question: "¿Dónde subo o edito mi Currículum Vítae (CV)?", 
        answer: "¡Claro! Puedes gestionar tu CV o documentos de postulación en la sección 'Mi Perfil' o 'Documentos'. Ahí puedes subir un nuevo archivo o editar la información que ya tienes guardada en el sistema. 📄" 
    },
    { 
        id: 'jobs_notifications', 
        question: "¿Cómo configuro las alertas de empleo?", 
        answer: "Para configurar tus alertas, ve a 'Notificaciones' o 'Preferencias de Búsqueda'. Puedes crear una alerta basada en palabras clave, cargo o ubicación, y te avisaremos cuando haya ofertas nuevas. 🔔" 
    },
    { 
        id: 'other_contact', 
        question: "Tengo otra pregunta / Necesito contactar a alguien.", 
        answer: "Entendido. No te preocupes. Estoy enviando un aviso a nuestro equipo. *Josue se comunicará contigo en breve* para ayudarte personalmente con tu consulta. Por favor, mantente atento a tus notificaciones. ¡Gracias! 🤝" 
    },
];

// --- COMPONENTE MENSAJE ---
const ChatMessage = ({ message, isUser }) => {
    // Clases de Tailwind CSS para la burbuja de chat
    const bubbleClass = isUser 
        ? "bg-[#1ABC9C] text-white rounded-t-xl rounded-bl-xl" // Verde Workly
        : "bg-white shadow-md border-b-2 border-[#1ABC9C] text-gray-700"; // Fondo blanco con borde verde

    const alignClass = isUser ? "justify-end" : "justify-start";
    
    return (
        <div className={`flex ${alignClass}`}>
            <div className={`max-w-[85%] ${bubbleClass} p-3 rounded-xl whitespace-pre-wrap`}>
                <p className="text-sm font-[Inter]">{message}</p>
            </div>
        </div>
    );
};

// --- COMPONENTE MODAL DE CHAT (AssistantChatModal) ---
// Exportado por defecto
const AssistantChatModal = ({ isOpen: propIsOpen, onClose: propOnClose, userName = "Usuario" }) => {
    const [messages, setMessages] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(true); 
    const messagesEndRef = useRef(null);
    const initialMessage = `Hola, ${userName}. Soy Josué, tu asistente de Workly. ¿Tienes alguna de estas consultas sobre cómo usar la app?`;
    
    // Estado interno para manejar la visibilidad en el modo de demostración (si no hay props)
    const [internalOpen, setInternalOpen] = useState(propIsOpen ?? false);

    // Determinar el estado y el controlador (priorizando props externos)
    const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;
    const handleClose = propOnClose || (() => setInternalOpen(false));
    const handleOpen = () => setInternalOpen(true);

    // Inicializar el mensaje de Josué
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ type: 'bot', text: initialMessage }]);
        }
    }, [isOpen, initialMessage, messages.length]);

    // Scroll automático al final de los mensajes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Manejar el clic en una opción predefinida
    const handleOptionClick = (option) => {
        // Ocultar las opciones mientras se procesa la respuesta (para evitar doble clic)
        setOptionsVisible(false);

        // 1. Añadir pregunta del usuario
        setMessages(prev => [...prev, { type: 'user', text: option.question }]);
        
        // 2. Añadir respuesta automática de Josué después de un breve retraso
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: option.answer }]);
            
            // Lógica de visibilidad post-respuesta:
            // Si elige contactar (other_contact), las opciones permanecen ocultas (false) 
            // para fomentar el contacto o el uso del input libre.
            // Para cualquier otra opción, las opciones vuelven a ser visibles (true).
            const shouldShowOptions = option.id !== 'other_contact';
            setOptionsVisible(shouldShowOptions); 

        }, 500); 
    };

    // Manejar el envío de texto libre
    const handleFreeTextSend = (e) => {
        e.preventDefault();
        const input = e.target.elements.messageInput.value.trim();
        if (!input) return;

        // 1. Añadir el mensaje del usuario
        setMessages(prev => [...prev, { type: 'user', text: input }]);
        e.target.elements.messageInput.value = '';

        // Ocultar opciones al escribir texto libre, ya que Josué no puede responder preguntas abiertas
        setOptionsVisible(false);

        // 2. Respuesta genérica de Josué para texto libre
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                type: 'bot', 
                text: "Gracias por tu pregunta. Mis respuestas automáticas se limitan a las opciones predefinidas. Por favor, selecciona una de ellas. Si requieres atención personalizada, usa la opción 'Tengo otra pregunta / Necesito contactar a alguien'."
            }]);
            // Después de la respuesta genérica, mostrar las opciones nuevamente
            setOptionsVisible(true); 
        }, 800);
    };

    // Si la modal está cerrada Y no está controlada por el prop externo, renderizar el botón de apertura
    if (!isOpen && propIsOpen === undefined) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center font-[Inter]">
                <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg text-center">
                    <p className="text-gray-600 mb-4">
                        Haz clic en el botón de ayuda para iniciar el chat con Josué.
                    </p>
                    <button
                        onClick={handleOpen}
                        className="flex items-center justify-center px-6 py-3 bg-[#F39C12] text-white font-semibold rounded-full shadow-md hover:bg-[#E67E22] transition transform hover:scale-105"
                    >
                        <HelpCircle className="w-5 h-5 mr-2" />
                        Abrir Asistente Josué
                    </button>
                </div>
            </div>
        );
    }
    
    // Si el prop isOpen es false, retorna null (si está controlado externamente)
    if (!isOpen) return null;
    
    // Determinar si el último mensaje fue del bot (para mostrar opciones)
    const isBotLastMessage = messages.length > 0 && messages[messages.length - 1].type === 'bot';
    
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none p-4 sm:p-0 font-[Inter] backdrop-blur-sm">
            {/* Contenedor del Chat con tamaño limitado y responsive */}
            <div className="w-full max-w-sm h-full sm:h-3/4 bg-white rounded-t-2xl shadow-2xl flex flex-col pointer-events-auto">
                
                {/* Encabezado del Chat */}
                <header className="flex items-center justify-between p-4 bg-[#1ABC9C] text-white rounded-t-2xl">
                    <div className="flex items-center">
                        <Bot className="w-6 h-6 mr-2" />
                        <h2 className="text-lg font-bold">Josué, Asistente de Workly</h2>
                    </div>
                    <button onClick={handleClose} aria-label="Cerrar chat" className="hover:text-gray-200 transition p-1 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white">
                        <X className="w-6 h-6" />
                    </button>
                </header>

                {/* Cuerpo del Chat (Mensajes y Opciones) */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <ChatMessage 
                            key={index} 
                            message={msg.text} 
                            isUser={msg.type === 'user'} 
                        />
                    ))}
                    
                    {/* Botones de Opciones: Muestra si el último mensaje es del bot Y si las opciones están visibles */}
                    {isBotLastMessage && optionsVisible && (
                        <div className="flex justify-start pt-2 flex-col space-y-2">
                            {initialOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    // Estilo condicional: resalta la opción de contacto
                                    className={`text-left max-w-[85%] p-3 rounded-lg hover:bg-opacity-80 transition shadow-sm border text-sm font-medium 
                                        ${option.id === 'other_contact' 
                                            ? 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200' // Opción de contacto/soporte
                                            : 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200' // Opciones estándar
                                        }`}
                                >
                                    {option.question}
                                </button>
                            ))}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Barra de Entrada de Texto */}
                <footer className="p-3 border-t bg-white">
                    <form onSubmit={handleFreeTextSend} className="flex items-center space-x-2">
                        <input 
                            name="messageInput"
                            type="text" 
                            placeholder="Escribe tu pregunta o contacta a soporte..."
                            className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition" 
                        />
                        <button 
                            type="submit"
                            className="p-3 bg-[#1ABC9C] text-white rounded-full shadow-md hover:bg-[#17202A] transition"
                            aria-label="Enviar mensaje"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
                
            </div>
        </div>
    );
};

export default AssistantChatModal;
