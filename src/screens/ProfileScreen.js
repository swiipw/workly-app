import React from 'react';

const ProfileScreen = ({ user, onLogout }) => {
    return (
        <div className="p-4 text-center">
            <h2 className="text-2xl font-bold">Perfil de {user.name}</h2>
            <button onClick={onLogout} className="mt-4 text-red-500 underline">Cerrar Sesión</button>
        </div>
    );
};

export default ProfileScreen;
