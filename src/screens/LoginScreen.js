import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff, Loader2 } from 'lucide-react'; 

// --- Componente de Botón Reutilizable ---
const CustomPrimaryButton = ({ children, disabled, type, className = '' }) => (
    <button
        type={type}
        disabled={disabled}
        className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 shadow-lg 
            ${disabled
                ? 'bg-gray-400 cursor-not-allowed shadow-none'
                : 'bg-[#1ABC9C] hover:bg-[#16A085] active:bg-[#128F76] transform hover:scale-[1.01] shadow-emerald-400/50'
            } ${className}`}
    >
        {children}
    </button>
);
// -----------------------------------------------------------------------------

// Constante para clases reutilizables de inputs
const INPUT_CLASSES = "w-full p-3 pl-10 border border-gray-300 rounded-xl focus:border-[#1ABC9C] focus:ring-[#1ABC9C] focus:ring-1 transition";

const LoginScreen = ({ onLogin, onNavigate }) => { 
    const [email, setEmail] = useState('nombre@workly.com'); 
    const [password, setPassword] = useState('123456'); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);

    const handleForgotPassword = () => {
        console.log("Acción: Olvidé mi contraseña");
    };

    const handleRegister = () => {
        if (onNavigate) {
            onNavigate('register'); 
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true); 
        
        let userName = 'Usuario';
        if (email) {
            userName = email.substring(0, email.indexOf('@'));
            userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        }

        setTimeout(() => {
            setIsLoading(false);
            if (password === '123456' && email.endsWith('@workly.com')) {
                onLogin({ name: userName, email: email }); 
            } else {
                setError('Credenciales incorrectas. Usa nombre@workly.com y 123456.');
            }
        }, 1200); 
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 font-sans">
            <div className="w-full max-w-sm bg-white p-8 pt-10 rounded-2xl shadow-xl border border-gray-100">
                
                <div className="flex flex-col items-center mb-10">
                    {/* CAMBIO CLAVE AQUÍ: Reemplazamos el marcador de posición por el logo */}
                    <img 
                        src="/workly_logo.png" 
                        alt="Workly Logo" 
                        className="w-40 h-40 mb-4" 
                        onError={(e) => {
                            // Fallback si la imagen no se carga (útil para desarrollo)
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/80x80/1ABC9C/ffffff?text=Logo"; 
                        }}
                    />
                    {/* FIN DEL CAMBIO CLAVE */}
                    
                    <h1 className="text-3xl font-extrabold text-[#17202A] mb-2">Workly</h1>
                    <p className="text-gray-500 text-center text-base font-medium">
                        Conectamos talento joven con oportunidades del futuro
                    </p> 
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASSES} required />
                    </div>
                    
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 pl-10 pr-12 border border-gray-300 rounded-xl focus:border-[#1ABC9C] focus:ring-[#1ABC9C] focus:ring-1 transition" required/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-[#17202A] transition" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {error && <div className="text-sm text-center text-red-700 font-medium bg-red-100 p-3 rounded-xl border border-red-300">{error}</div>}

                    <CustomPrimaryButton type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Iniciando Sesión...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <LogIn className="w-5 h-5 mr-2" />
                                Iniciar Sesión
                            </div>
                        )}
                    </CustomPrimaryButton>
                    
                    <div className="text-center text-sm mt-4 space-y-3">
                        <button type="button" onClick={handleForgotPassword} className="text-[#1ABC9C] hover:text-[#16A085] block transition font-medium focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-offset-2">
                                            ¿Olvidaste tu contraseña?
                        </button>
                        
                        <p className="text-gray-500">
                            ¿No tienes cuenta? 
                            <span onClick={handleRegister} className="text-[#F39C12] hover:text-[#E67E22] font-semibold transition cursor-pointer ml-1 focus:outline-none focus:ring-2 focus:ring-[#F39C12] focus:ring-offset-2 inline-block" role="link" tabIndex="0" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRegister(); }}>
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
