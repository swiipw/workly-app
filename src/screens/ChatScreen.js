import React, { useState } from 'react';
import { User, Briefcase, Bot, Search } from 'lucide-react';

// Datos de chats simulados
const chatList = [
    { id: 1, name: "Asistente Josué", type: "Advisor", icon: Bot, lastMessage: "Estoy aquí para ayudarte con tus dudas.", time: "10:30 AM" },
    { id: 2, name: "Contratista XYZ Corp.", type: "Recruiter", icon: Briefcase, lastMessage: "¿Podemos agendar la entrevista?", time: "Ayer" },
    { id: 3, name: "Prof. Ana Torres", type: "Professor", icon: User, lastMessage: "Tu tarea final fue excelente. ¡Felicidades!", time: "05/Nov" },
    { id: 4, name: "Asesor Luis Peña", type: "Advisor", icon: User, lastMessage: "Revisemos tu CV la próxima semana.", time: "25/Oct" },
];

// Componente para una lista de ítems de chat
const ChatItem = ({ chat }) => {
    const Icon = chat.icon;
    const borderColor = chat.type === 'Advisor' ? 'border-[#1ABC9C]' : chat.type === 'Recruiter' ? 'border-[#F39C12]' : 'border-gray-500';

    return (
        <div className={`flex items-center p-3 bg-white hover:bg-gray-50 transition border-b ${borderColor} border-l-4 cursor-pointer`}>
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


const ChatScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = chatList.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 space-y-4">
            
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
            
            {/* 2. LISTA DE CHATS */}
            <h2 className="text-xl font-bold text-[#17202A]">Tus Mensajes ({filteredChats.length})</h2>

            <section className="bg-white rounded-xl shadow-md overflow-hidden">
                {filteredChats.length > 0 ? (
                    filteredChats.map(chat => (
                        <ChatItem key={chat.id} chat={chat} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center p-6">
                        No se encontraron chats.
                    </p>
                )}
            </section>
            
        </div>
    );
};

export default ChatScreen;
