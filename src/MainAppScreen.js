import React, { useState } from 'react';
import BottomNavBar from './components/BottomNavBar';
import WorklyLogo from './components/WorklyLogo';
import FloatingAssistantButton from './components/FloatingAssistantButton';
import AssistantChatModal from './components/AssistantChatModal';
// 1. IMPORTAR NotificationBar
import NotificationBar from './components/NotificationBar';
// Importación de Screens
import HomeScreen from './screens/HomeScreen';
import JobsScreen from './screens/JobsScreen';
import CoursesScreen from './screens/CoursesScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';

const MainAppScreen = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 2. CREAR ESTADO PARA LA NOTIFICACIÓN
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false,
  });

  // 3. FUNCIÓN PARA MOSTRAR LA NOTIFICACIÓN
  const showNotification = (msg) => {
    // Asegurar que solo haya una notificación visible a la vez
    if (notification.isVisible) {
      setNotification({ message: msg, isVisible: false });
      // Permitir un pequeño retraso para la transición de cierre antes de abrir la nueva
      setTimeout(() => {
        setNotification({ message: msg, isVisible: true });
      }, 500);
    } else {
      setNotification({ message: msg, isVisible: true });
    }

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

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
        // 4. PASAR LA FUNCIÓN showNotification A LAS PANTALLAS QUE LA NECESITEN
        return (<CoursesScreen showNotification={showNotification} />);
      case 'chat':
        return (<ChatScreen />);
      case 'profile':
        return (<ProfileScreen user={user} onLogout={onLogout} />);
      default:
        return (<HomeScreen user={user} />);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 5. AÑADIR EL COMPONENTE NotificationBar AL INICIO DEL RENDER */}
      <NotificationBar
        message={notification.message}
        isVisible={notification.isVisible}
      />
      
      <header className="sticky top-0 bg-white shadow-sm p-4 border-b border-gray-100 z-10 max-w-xl mx-auto">
        <WorklyLogo />
      </header>
      
      <main className="max-w-xl mx-auto overflow-y-auto" style={{ minHeight: 'calc(100vh - 128px)' }}>
        {renderContent()}
      </main>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <FloatingAssistantButton onAssistantClick={handleAssistantClick} />
      
      <AssistantChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userName={user.name}
      />
      
    </div>
  );
};

export default MainAppScreen;
