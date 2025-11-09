import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, Search, ArrowLeft, Send } from 'lucide-react';

// --- DATOS DE CHATS SIMULADOS ---

// Datos del Asesor Humano (Acceso dedicado, NO en la lista principal de contactos)
const ADVISOR_CHAT = { 
    id: 1, 
    name: "Ariadna Rosales", 
    type: "Advisor", // Se mantiene 'Advisor' para la lógica de visualización de la tarjeta dedicada.
    icon: User, 
    lastMessage: "Revisa tu plan de acción para esta semana.", 
    time: "Hoy", 
    messages: [
        { type: 'advisor', text: "¡Hola! Soy Ariadna, tu asesora de carrera en Workly. Estoy aquí para guiarte en tu camino profesional. Revisa tu plan de acción para esta semana.", time: "10:30 AM" },
    ]
};

// Chats de la lista principal (Contactos: Reclutadores, Profesores, Colegas)
const initialChatList = [
    { id: 2, name: "Contratista XYZ Corp.", type: "Recruiter", icon: Briefcase, lastMessage: "¿Podemos agendar la entrevista?", time: "Ayer", messages: [
        { type: 'recruiter', text: "Hola, soy Laura de XYZ Corp. Estamos muy interesados en tu postulación. ¿Podemos agendar una entrevista el próximo miércoles?", time: "Ayer" },
    ]},
    { id: 3, name: "Prof. Ana Torres", type: "Professor", icon: User, lastMessage: "Tu tarea final fue excelente. ¡Felicidades!", time: "05/Nov", messages: [
        { type: 'professor', text: "Tu tarea final fue excelente. ¡Felicidades! ¿Planeas seguir una especialización?", time: "05/Nov" },
    ]},
    { id: 4, name: "Gerente RRHH (Beta S.A.)", type: "Recruiter", icon: Briefcase, lastMessage: "Revisa los detalles de la oferta adjuntos.", time: "11:00 AM", messages: [
        { type: 'recruiter', text: "Hemos revisado tu perfil y nos gustaría hacerte una oferta. ¿Estás disponible para hablar mañana?", time: "11:00 AM" },
    ]},
    { id: 5, name: "Dr. Roberto Pardo", type: "Professor", icon: User, lastMessage: "Necesito tu feedback sobre el proyecto de tesis.", time: "10/Oct", messages: [
        { type: 'professor', text: "Hola, ¿podrías enviarme la versión 3 de tu anteproyecto de tesis? Necesito tu feedback.", time: "10/Oct" },
    ]},
    { id: 6, name: "Javier Castro (Colega)", type: "User", icon: User, lastMessage: "¿Me pasas el link de la reunión de hoy?", time: "09:45 AM", messages: [
        { type: 'user', text: "Oye, ¿ya tienes el link para la reunión de equipo de las 11? Gracias.", time: "09:45 AM" },
    ]},
    { id: 7, name: "Global Talent Head Hunting", type: "Recruiter", icon: Briefcase, lastMessage: "Estamos buscando perfiles como el tuyo en Europa.", time: "01/Nov", messages: [
        { type: 'recruiter', text: "Saludos. Somos una empresa de head hunting y tenemos una oportunidad en Ámsterdam que podría interesarte.", time: "01/Nov" },
    ]},
    { id: 8, name: "Marta Gómez (Mentora)", type: "User", icon: User, lastMessage: "Recuerda enviar el reporte trimestral.", time: "Hoy", messages: [
        { type: 'user', text: "¡Hola! ¿Cómo va ese reporte? No olvides que la fecha límite es mañana.", time: "Hoy" },
    ]},
];

// --- FUNCIONES DE ALMACENAMIENTO (Simulación) ---
const getChatData = (chatId) => {
    const key = `chat_${chatId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
        return JSON.parse(stored);
    }
    // Si no hay datos, buscar el chat inicial por ID, incluyendo el asesor para persistencia
    const initialChat = initialChatList.find(c => c.id === chatId) || (chatId === ADVISOR_CHAT.id ? ADVISOR_CHAT : null);
    return initialChat ? initialChat.messages : [];
};

const saveChatData = (chatId, messages) => {
    const key = `chat_${chatId}`;
    localStorage.setItem(key, JSON.stringify(messages));
};

const getFormattedTime = (date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};


// --- COMPONENTES DE VISTA ---

// 1. Componente de un solo mensaje
const MessageBubble = ({ message }) => {
    const isUser = message.type === 'user';
    const isAdvisor = message.type === 'advisor'; // Nuevo tipo para la asesora
    const alignClass = isUser ? 'justify-end' : 'justify-start';
    
    let bubbleClass = '';
    let timeClass = 'text-white opacity-70';

    if (isUser) {
        // Mensaje propio (verde Workly)
        bubbleClass = 'bg-[#1ABC9C] text-white rounded-t-xl rounded-bl-xl';
    } else if (isAdvisor) {
        // Estilo especial para la Asesora (azul sutil)
        bubbleClass = 'bg-[#D6EAF8] text-[#17202A] border border-[#3498DB] rounded-t-xl rounded-br-xl';
        timeClass = 'text-[#3498DB] opacity-80';
    } else {
        // Estilo para reclutadores/profesores/contactos (gris neutro)
        bubbleClass = 'bg-gray-200 text-[#17202A] rounded-t-xl rounded-br-xl';
        timeClass = 'text-gray-600 opacity-80';
    }

    return (
        <div className={`flex w-full mb-3 ${alignClass}`}>
            <div className={`max-w-[75%] p-3 shadow-md ${bubbleClass}`}>
                <p className="text-sm">{message.text}</p>
                <span className={`block text-xs mt-1 text-right ${timeClass}`}>{message.time}</span>
            </div>
        </div>
    );
};

// 2. Componente de Conversación (Vista de Chat Abierto)
const ChatConversation = ({ chat, onBack }) => {
    const [messages, setMessages] = useState(() => getChatData(chat.id)); 
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const now = new Date();
        const newMessage = { 
            type: 'user', 
            text: input.trim(), 
            time: getFormattedTime(now)
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        saveChatData(chat.id, newMessages);
        setInput('');

        // Simulación de respuesta del asesor después de un breve retraso
        if (chat.type === 'Advisor') {
            setTimeout(() => {
                const advisorResponse = {
                    type: 'advisor', // Respuesta de la asesora humana
                    text: `Gracias por tu mensaje. Ariadna estará revisando esta consulta y te responderá en breve.`,
                    time: getFormattedTime(new Date())
                };
                const responseMessages = [...newMessages, advisorResponse];
                setMessages(responseMessages);
                saveChatData(chat.id, responseMessages);
            }, 1000);
        }
    };
    
    const Icon = chat.icon;

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Encabezado del Chat */}
            <header className={`flex items-center p-4 bg-white shadow-md sticky top-0 z-20 ${chat.type === 'Advisor' ? 'border-b-4 border-[#3498DB]' : ''}`}>
                <button onClick={onBack} className="text-[#17202A] hover:text-[#F39C12] mr-3">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${chat.type === 'Advisor' ? 'bg-[#3498DB] text-white' : 'bg-gray-200 text-gray-700'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold truncate">{chat.name}</h2>
                    {chat.type === 'Advisor' && (
                         <p className="text-xs text-gray-500">Tu asesora de carrera workly</p>
                    )}
                </div>
            </header>

            {/* Área de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <MessageBubble key={index} message={msg} />
                    ))
                ) : (
                    <div className="text-center p-6 text-gray-500 italic">Comienza tu conversación con {chat.name}.</div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Formulario de Entrada de Texto */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-20">
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#F39C12] focus:border-transparent transition"
                    />
                    <button
                        type="submit"
                        className="p-3 bg-[#F39C12] text-white rounded-full shadow-lg hover:bg-[#E67E22] transition disabled:bg-gray-400"
                        disabled={input.trim() === ''}
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </form>
        </div>
    );
};

// 3. Componente de un solo ítem de chat (Lista de Contactos)
const ChatItem = ({ chat, onClick }) => {
    const Icon = chat.icon;
    const borderColor = chat.type === 'Recruiter' ? 'border-[#F39C12]' : 'border-gray-500'; // No usamos 'Advisor' aquí

    return (
        <div 
            className={`flex items-center p-3 bg-white hover:bg-gray-50 transition border-b border-l-4 cursor-pointer border-l-4 ${borderColor}`}
            onClick={() => onClick(chat)}
        >
            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <Icon className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
        </div>
    );
};


// 4. Componente Principal de Pantalla de Chats
const ChatScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    
    // Obtiene la lista de chats inicial y actualiza el lastMessage
    const updatedChatList = initialChatList.map(chat => {
        const storedMessages = getChatData(chat.id);
        const lastMessage = storedMessages.length > 0 ? storedMessages[storedMessages.length - 1] : null;
        
        return {
            ...chat,
            lastMessage: lastMessage ? lastMessage.text : chat.lastMessage,
            time: lastMessage ? lastMessage.time : chat.time,
        };
    });

    // Lógica de filtrado
    const filteredChats = updatedChatList.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Si hay un chat seleccionado, mostrar la conversación
    if (selectedChat) {
        return (
            <div className="h-full">
                <ChatConversation 
                    chat={selectedChat} 
                    onBack={() => setSelectedChat(null)} 
                />
            </div>
        );
    }
    
    // Vista de lista de chats
    return (
        // Se asegura que la lista tenga suficiente espacio para scroll en móviles
        <div className="p-4 space-y-4 min-h-screen pb-20 bg-gray-50"> 
            
            {/* 1. BARRA DE BÚSQUEDA */}
            <div className="sticky top-0 bg-gray-50 pt-4 pb-3 z-10">
                <div className="relative shadow-sm rounded-xl">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar chats o contactos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition"
                    />
                </div>
            </div>

            {/* 2. TARJETA DEDICADA AL ASESOR HUMANO: Ariadna Rosales */}
            <div 
                className="bg-[#3498DB] text-white p-4 rounded-xl shadow-lg cursor-pointer transform hover:scale-[1.01] transition-transform duration-300 flex items-center justify-between"
                onClick={() => setSelectedChat(ADVISOR_CHAT)}
            >
                <div className="flex items-center">
                    <User className="w-7 h-7 mr-3 text-white" /> 
                    <div>
                        <h2 className="text-lg font-bold">Ariadna Rosales</h2>
                        <p className="text-sm opacity-90">Tu asesora de carrera workly</p>
                    </div>
                </div>
                <ArrowLeft className="w-5 h-5 transform rotate-180" />
            </div>
            
            {/* 3. LISTA DE CHATS DE CONTACTOS */}
            <h2 className="text-xl font-bold text-[#17202A] pt-2">Mensajes de Contactos ({filteredChats.length})</h2>

            <section className="bg-white rounded-xl shadow-md overflow-hidden">
                {filteredChats.length > 0 ? (
                    filteredChats.map(chat => (
                        <ChatItem 
                            key={chat.id} 
                            chat={chat} 
                            onClick={setSelectedChat} // Función para seleccionar el chat
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center p-6">
                        No se encontraron chats que coincidan con la búsqueda.
                    </p>
                )}
            </section>
            
        </div>
    );
};

export default ChatScreen;
