import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react'; 
import PrimaryButton from '../components/PrimaryButton'; 

// Asegúrate de que tu logo esté en public/ con este nombre.

const LoginScreen = ({ onLogin }) => { 
  // Valores iniciales para facilitar la prueba
  const [email, setEmail] = useState('nombre@workly.com'); 
  const [password, setPassword] = useState('123456'); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); 
    
  // --- FUNCIONES FALTANTES AÑADIDAS PARA RESOLVER 'no-undef' ---
  const handleForgotPassword = () => {
    console.log("Acción: Olvidé mi contraseña");
    // Lógica real: aquí pondrías la navegación o el modal de recuperación
  };

  const handleRegister = () => {
    console.log("Acción: Registrarse");
    // Lógica real: aquí pondrías la navegación a la página de registro
  };
  // ------------------------------------------------------------

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); 
    
    // --- LÓGICA DE EXTRACCIÓN DEL NOMBRE ---
    let userName = 'Usuario';
    if (email) {
      userName = email.substring(0, email.indexOf('@'));
      // Capitalizar la primera letra
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    }
    // ---------------------------------------

    setTimeout(() => {
        setIsLoading(false);
        if (password === '123456' && email.endsWith('@workly.com')) {
            // Enviamos el nombre extraído a la app principal
            onLogin({ name: userName, email: email }); 
        } else {
            setError('Credenciales incorrectas. Usa nombre@workly.com y 123456.');
        }
    }, 1000);
  };
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-2xl">
        
        {/* LOGO OFICIAL Y ESLOGAN */}
        <div className="flex flex-col items-center mb-10">
          <img 
            src="/workly_logo.png" // RUTA DEL LOGO EN PUBLIC/
            alt="Workly Logo" 
            className="w-32 h-auto mb-4" 
          />
          <h1 className="text-3xl font-extrabold text-[#17202A] mb-2">Workly</h1>
          {/* ESLOGAN CON TAMAÑO CORREGIDO (text-base) */}
          <p className="text-gray-500 text-center text-base font-medium">Conectamos talento joven con oportunidades del futuro</p> 
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* CAMPO DE CORREO */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent" 
              required
            />
          </div>
          
          {/* CAMPO DE CONTRASEÑA */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent" 
              required
            />
          </div>

          {error && <div className="text-sm text-red-600 font-medium">{error}</div>}

          {/* BOTÓN DE INICIO DE SESIÓN */}
          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⚙️</span>
                    Iniciando Sesión...
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Iniciar Sesión
                </div>
            )}
          </PrimaryButton>
          
          <div className="text-center text-sm mt-4 space-y-2">
            {/* CORRECCIÓN para 'jsx-a11y/anchor-is-valid' */}
            <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-[#1ABC9C] hover:text-[#17202A] block transition font-medium focus:outline-none focus:ring-2 focus:ring-[#1ABC9C]"
            >
                ¿Olvidaste tu contraseña?
            </button>
            <p className="text-gray-500">
                ¿No tienes cuenta? 
                {/* CORRECCIÓN para 'jsx-a11y/anchor-is-valid' */}
                <span 
                    onClick={handleRegister}
                    className="text-[#F39C12] hover:text-[#E67E22] font-semibold transition cursor-pointer ml-1 focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    role="link" 
                    tabIndex="0" 
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRegister(); }} 
                >
                    Regístrate
                </span>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
