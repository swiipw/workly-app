import React from 'react';
import { Send, X, Bot } from 'lucide-react';

const AssistantChatModal = ({ isOpen, onClose, userName }) => {
  
  if (!isOpen) return null;
  
  const initialMessage = `Hola, ${userName}. Soy Josué. ¿Tienes alguna consulta o duda? ¡Estoy aquí para ayudarte!😁`;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      
      {/* Contenedor del Modal con tamaño limitado */}
      <div className="w-full max-w-sm h-3/4 bg-white rounded-t-2xl shadow-2xl flex flex-col pointer-events-auto">
        
        {/* Encabezado del Chat */}
        <header className="flex items-center justify-between p-4 bg-[#1ABC9C] text-white rounded-t-2xl">
          <div className="flex items-center">
            <Bot className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Josué, Asistente AI</h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar chat" className="hover:text-gray-200 transition">
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Cuerpo del Chat (Mensajes) */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          
          {/* Mensaje de Bienvenida de Josué */}
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
        
      </div>
    </div>
  );
};

export default AssistantChatModal;
