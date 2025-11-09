import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, User, UserPlus } from 'lucide-react'; 

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


const RegistroScreen = ({ onNavigate, onRegistrationSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleGoBack = () => {
        // La clave: Llama a onNavigate('login') para volver al LoginScreen
        onNavigate('login');
    };

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setIsLoading(false);
            return;
        }
        
        // Simulación de API de registro
        setTimeout(() => {
            setIsLoading(false);
            if (email.endsWith('@workly.com') && name.length > 2) {
                // Simulación de éxito: navega al home
                const userName = name.charAt(0).toUpperCase() + name.slice(1);
                onRegistrationSuccess({ name: userName, email: email });
            } else {
                setError('Error en el registro. Asegúrate de usar un correo @workly.com y un nombre válido.');
            }
        }, 1500); 
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 font-sans">
            <div className="w-full max-w-sm bg-white p-8 pt-10 rounded-2xl shadow-xl border border-gray-100 relative">
                
                {/* Botón de Regreso */}
                <button 
                    onClick={handleGoBack} 
                    className="absolute top-4 left-4 p-2 rounded-full text-gray-600 hover:bg-gray-200 transition"
                    aria-label="Volver a la pantalla de inicio de sesión"
                    disabled={isLoading}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center mb-10 mt-6">
                    <h1 className="text-3xl font-extrabold text-[#17202A] mb-2">Crear Cuenta</h1>
                    <p className="text-gray-500 text-center text-base font-medium">
                        Regístrate para encontrar tu próxima oportunidad.
                    </p> 
                </div>

                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    
                    {/* CAMPO NOMBRE */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Nombre completo" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={INPUT_CLASSES} 
                            required 
                            disabled={isLoading}
                        />
                    </div>

                    {/* CAMPO CORREO */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="email" 
                            placeholder="Correo electrónico" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={INPUT_CLASSES} 
                            required 
                            disabled={isLoading}
                        />
                    </div>

                    {/* CAMPO CONTRASEÑA */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Crear contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 pl-10 pr-12 border border-gray-300 rounded-xl focus:border-[#1ABC9C] focus:ring-[#1ABC9C] focus:ring-1 transition" 
                            required 
                            disabled={isLoading}
                        />
                         <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-[#17202A] transition"
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* CAMPO CONFIRMAR CONTRASEÑA */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Confirmar contraseña" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 pl-10 pr-12 border border-gray-300 rounded-xl focus:border-[#1ABC9C] focus:ring-[#1ABC9C] focus:ring-1 transition"
                            required 
                            disabled={isLoading}
                        />
                    </div>

                    {error && <div className="text-sm text-center text-red-700 font-medium bg-red-100 p-3 rounded-xl border border-red-300">{error}</div>}


                    <CustomPrimaryButton type="submit" disabled={isLoading} className="mt-8">
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Creando Cuenta...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <UserPlus className="w-5 h-5 mr-2" />
                                Registrarme Ahora
                            </div>
                        )}
                    </CustomPrimaryButton>
                </form>

                <div className="text-center text-sm mt-6">
                    <p className="text-gray-500">
                        ¿Ya tienes cuenta? 
                        <span 
                            onClick={handleGoBack}
                            className="text-[#1ABC9C] hover:text-[#16A085] font-semibold transition cursor-pointer ml-1"
                            role="link"
                        >
                            Inicia Sesión
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistroScreen;
