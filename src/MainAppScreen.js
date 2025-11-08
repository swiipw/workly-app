import React, { useState } from 'react';
import BottomNavBar from './components/BottomNavBar';
import WorklyLogo from './components/WorklyLogo';
import FloatingAssistantButton from './components/FloatingAssistantButton'; 
import AssistantChatModal from './components/AssistantChatModal'; // <- NUEVA IMPORTACIÓN
import HomeScreen from './screens/HomeScreen';
import JobsScreen from './screens/JobsScreen';
import CoursesScreen from './screens/CoursesScreen';
import ProfileScreen from './screens/ProfileScreen';

const MainAppScreen = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  // Nuevo estado para controlar si el modal de chat está visible
  const [isChatOpen, setIsChatOpen] = useState(false); 
    
  // Función que se ejecuta al presionar el botón de Josué
  const handleAssistantClick = () => {
    setIsChatOpen(true);
  };
    
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (<HomeScreen user={user} />); 
      case 'jobs':
        return (<JobsScreen />); 
      case 'courses':
        return (<CoursesScreen />); 
      case 'profile':
        return (<ProfileScreen user={user} onLogout={onLogout} />); 
      default:
        return (<HomeScreen user={user} />); 
    }
  };
    
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white shadow-sm p-4 border-b border-gray-100 z-10 max-w-xl mx-auto">
        <WorklyLogo />
      </header>
        
      <main className="max-w-xl mx-auto overflow-y-auto" style={{ minHeight: 'calc(100vh - 128px)' }}>
        {renderContent()}
      </main>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* EL ASISTENTE FLOTANTE que ahora solo abre el chat */}
      <FloatingAssistantButton onAssistantClick={handleAssistantClick} />
      
      {/* MODAL DEL CHAT - visible si isChatOpen es true */}
      <AssistantChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        userName={user.name} 
      />
      
    </div>
  );
};

export default MainAppScreen;
