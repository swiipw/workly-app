import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
// 1. IMPORTAR RegistroScreen
import RegistroScreen from './screens/RegistroScreen';
import MainAppScreen from './MainAppScreen.js'; 
import { AppProvider } from './context/AppContext'; 

function AppContent() {
  // Eliminamos el estado 'user' y lo reemplazamos por el estado 'view'
  const [user, setUser] = useState(null); // Mantenemos 'user' para el estado de autenticación
  // 2. NUEVO ESTADO: Controla la vista actual ('login', 'register', 'home')
  const [currentView, setCurrentView] = useState('login'); 

  // FUNCIÓN CENTRAL DE NAVEGACIÓN: Se pasa como prop 'onNavigate'
  const navigateTo = (viewName) => {
    setCurrentView(viewName);
    // Aseguramos que si navegamos a login o register, el usuario se desloguee.
    if (viewName !== 'home') {
        setUser(null); 
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('home'); // Navegar a 'home' después del login exitoso
  };

  // --- LÓGICA DE RENDERIZADO CONDICIONAL ---
  if (user && currentView === 'home') {
    // Caso 1: Usuario autenticado y en la vista principal
    return (
      <MainAppScreen user={user} onLogout={() => { setUser(null); setCurrentView('login'); }} />
    );
  } 
  
  if (currentView === 'register') {
    // Caso 2: Mostrar la pantalla de Registro
    return (
      <RegistroScreen 
        onNavigate={navigateTo} // Permite volver al login o ir a otra vista
        onRegistrationSuccess={handleLogin} // Opcional: para loguear inmediatamente después de registrar
      />
    );
  }

// --- Configuración de Tailwind (Necesaria para los estilos) ---
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        'workly-primary': '#17202A', 
        'workly-secondary': '#1ABC9C', 
        'workly-accent': '#F39C12', 
        'workly-light-bg': '#85C1E9', 
        'workly-orange': '#E67E22' 
      },
      fontFamily: { 
        sans: ['Inter', 'sans-serif'], 
      },
      keyframes: {
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }, },
        'bounce': { '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' }, '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }, }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards', 'bounce': 'bounce 1s infinite',
      },
    },
  },
};

  // Caso 3: Vista por defecto (Login)
  return (
    <LoginScreen 
      onLogin={handleLogin} // Maneja el login y cambia la vista a 'home'
      onNavigate={navigateTo} // ¡Esta es la clave para ir a 'register'!
    />
  );
}

export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

// ... (Resto de la configuración de Tailwind)
