import React from 'react';
import { Home, Briefcase, BookOpen, User, MessageSquare } from 'lucide-react';

const BottomNavBar = ({ activeTab, onTabChange }) => {
  
  const navItems = [
    { name: 'home', icon: Home, label: 'Inicio' },
    { name: 'jobs', icon: Briefcase, label: 'Empleos' },
    { name: 'courses', icon: BookOpen, label: 'Cursos' },
    // --- NUEVO ÍCONO DE CHAT ---
    { name: 'chat', icon: MessageSquare, label: 'Chat' }, 
    // ---------------------------
    { name: 'profile', icon: User, label: 'Perfil' },
  ];

  const renderNavItem = (item) => {
    const isActive = activeTab === item.name;
    const Icon = item.icon;
    
    // Define los colores según el estado
    const baseClass = "flex flex-col items-center p-2 transition-colors duration-200";
    const activeClass = "text-[#1ABC9C] font-bold"; // Verde principal
    const inactiveClass = "text-gray-500 hover:text-[#17202A]"; // Gris inactivo

    return (
      <button
        key={item.name}
        onClick={() => onTabChange(item.name)}
        className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        <Icon className="w-6 h-6" />
        <span className={`text-xs mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto bg-white shadow-2xl border-t border-gray-100 z-30">
      <div className="flex justify-around h-16">
        {navItems.map(renderNavItem)}
      </div>
    </nav>
  );
};

export default BottomNavBar;
