import React from 'react';
import { Send, X, Bot } from 'lucide-react';

const AssistantChatModal = ({ isOpen, onClose, userName }) => {
  
  if (!isOpen) return null;
  
  const initialMessage = `Hola, ${userName}. Soy Josue. ¿Tienes alguna consulta o duda? ¡Estoy aquí para ayudarte!😁`;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      
      {/* Contenedor del Modal con tamaño limitado */}
      <div className="w-full max-w-sm h-3/4 bg-white rounded-t-2xl shadow-2xl flex flex-col pointer-events-auto">
        
        {/* Encabezado del Chat */}
        <header className="flex items-center justify-between p-4 bg-[#1ABC9C] text-white rounded-t-2xl">
          <div className="flex items-center">
            <Bot className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Josue, Asistente Workly</h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar chat" className="hover:text-gray-200 transition">
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Cuerpo del Chat (Mensajes) */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          
          {/* Mensaje de Bienvenida de Josue */}
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-white p-3 rounded-t-xl rounded-br-xl shadow-md border-b-2 border-[#1ABC9C] text-gray-700">
              <p>{initialMessage}</p>
            </div>
          </div>
          
          {/* Placeholder de Respuesta del Usuario */}
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-[#1ABC9C] text-white p-3 rounded-t-xl rounded-bl-xl shadow-md">
              <p>¿Qué empleos hay para diseñadores UX en remoto?</p>
            </div>
          </div>
          
        </div>

        {/* Barra de Entrada de Texto */}
        <footer className="p-3 border-t bg-white">
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Escribe tu mensaje..." 
              className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent" 
            />
            <button 
              className="p-3 bg-[#1ABC9C] text-white rounded-full hover:bg-[#17202A] transition"
              aria-label="Enviar mensaje"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </footer>
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
        // ¡MENSAJE MODIFICADO AQUÍ!
        answer: "Entendido. No te preocupes. Estoy enviando un aviso a nuestro equipo. **Josué se comunicará contigo en breve** para ayudarte personalmente con tu consulta. Por favor, mantente atento a tu correo o notificaciones. ¡Gracias! 🤝" 
    },
];

// --- COMPONENTE MENSAJE ---
const ChatMessage = ({ message, isUser }) => {
    const bubbleClass = isUser 
        ? "bg-[#1ABC9C] text-white rounded-t-xl rounded-bl-xl"
        : "bg-white shadow-md border-b-2 border-[#1ABC9C] text-gray-700";
    
    const alignClass = isUser ? "justify-end" : "justify-start";
    
    return (
        <div className={`flex ${alignClass}`}>
            <div className={`max-w-[85%] ${bubbleClass} p-3 rounded-xl whitespace-pre-wrap`}>
                <p className="text-sm">{message}</p>
            </div>
        </div>
    );
};

// --- COMPONENTE MODAL DE CHAT ---
const AssistantChatModal = ({ isOpen, onClose, userName = "Usuario" }) => {
    const [messages, setMessages] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(true); 
    const messagesEndRef = useRef(null);
    const initialMessage = `Hola, ${userName}. Soy Josué, tu asistente de Workly. ¿Tienes alguna de estas consultas sobre cómo usar la app?`;
    
    // Inicializar el mensaje de Josué
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ type: 'bot', text: initialMessage }]);
        }
    }, [isOpen, initialMessage, messages.length]);

    // Scroll automático al final
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Manejar el clic en una opción
    const handleOptionClick = (option) => {
        // 1. Añadir pregunta del usuario
        setMessages(prev => [...prev, { type: 'user', text: option.question }]);
        
        // 2. Añadir respuesta automática de Josué
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: option.answer }]);
            
            // Si elige contactar, oculta las opciones
            if (option.id === 'other_contact') {
                setOptionsVisible(false);
            } else {
                // Si elige una pregunta estándar, deja las opciones visibles para que pueda hacer otra
                setOptionsVisible(true); 
            }
        }, 500); 
    };

    // Placeholder para el envío de texto libre
    const handleFreeTextSend = (e) => {
        e.preventDefault();
        const input = e.target.elements.messageInput.value.trim();
        if (!input) return;

        setMessages(prev => [...prev, { type: 'user', text: input }]);
        e.target.elements.messageInput.value = '';

        // Ocultar opciones al escribir texto libre
        setOptionsVisible(false);

        // Respuesta genérica para texto libre 
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                type: 'bot', 
                text: "Gracias por tu pregunta. Para una respuesta automática, por favor usa las opciones predefinidas. Si necesitas contacto humano, selecciona la opción 'Tengo otra pregunta / Necesito contactar a alguien'."
            }]);
        }, 800);
    };


    if (!isOpen) return null;
    
    // Verifica si el último mensaje fue del bot y si las opciones deben estar visibles
    const isBotLastMessage = messages.length > 0 && messages[messages.length - 1].type === 'bot';
    
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none p-4 sm:p-0">
            {/* Contenedor del Chat con tamaño limitado */}
            <div className="w-full max-w-sm h-full sm:h-3/4 bg-white rounded-t-2xl shadow-2xl flex flex-col pointer-events-auto">
                
                {/* Encabezado del Chat */}
                <header className="flex items-center justify-between p-4 bg-[#1ABC9C] text-white rounded-t-2xl">
                    <div className="flex items-center">
                        <Bot className="w-6 h-6 mr-2" />
                        <h2 className="text-xl font-bold">Josué, Asistente de Workly</h2>
                    </div>
                    <button onClick={onClose} aria-label="Cerrar chat" className="hover:text-gray-200 transition p-1 rounded-full hover:bg-[#17202A] focus:outline-none focus:ring-2 focus:ring-white">
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
                            {initialOptions.map((option, index) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    // Cambia el estilo del botón 'Otros'
                                    className={`text-left max-w-[85%] p-3 rounded-lg hover:bg-opacity-80 transition shadow-sm border text-sm font-medium 
                                        ${option.id === 'other_contact' 
                                            ? 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200' 
                                            : 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200'
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

// --- COMPONENTE DE APLICACIÓN PRINCIPAL (Para mostrar el modal) ---
const App = () => {
    const [isChatOpen, setIsChatOpen] = useState(true); // Abrir por defecto para el preview

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center font-[Inter]">
            {/* ELIMINADO: <script src="https://cdn.tailwindcss.com"></script> */}

            <h1 className="text-3xl font-bold text-[#1ABC9C] mb-8">
                Panel de Control de Workly
            </h1>

            <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg text-center">
                <p className="text-gray-600 mb-4">
                    Haz clic en el botón de ayuda para iniciar el chat con Josué.
                </p>
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="flex items-center justify-center px-6 py-3 bg-[#F39C12] text-white font-semibold rounded-full shadow-md hover:bg-[#E67E22] transition transform hover:scale-105"
                >
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Abrir Asistente Josué
                </button>
            </div>
            
            {/* El Modal Asistente Josué */}
            <AssistantChatModal 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
                userName="Andrés" 
            />
  </div>
    </div>
  );
};

export default AssistantChatModal;
