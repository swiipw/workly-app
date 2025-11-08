import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
// --- LÍNEA CORREGIDA: Se añade la extensión .js para que Vercel lo encuentre ---
import MainAppScreen from './MainAppScreen.js'; 
// -----------------------------------------------------------------------------
import { AppProvider } from './context/AppContext'; 

function AppContent() {
  const [user, setUser] = useState(null);

  if (user) {
    return (
      <MainAppScreen user={user} onLogout={() => setUser(null)} />
    );
  } else {
    return (
      <LoginScreen onLogin={(userData) => setUser(userData)} />
    );
  }
}

export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
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
