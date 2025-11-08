import React from 'react';

const WorklyLogo = ({ size = 32, className = '' }) => (
    <div className={`flex items-center space-x-1 ${className}`}>
        <span style={{ fontSize: size }} className="font-extrabold text-[#1ABC9C]">W</span>
        <span className="text-lg font-bold text-[#17202A]">Workly</span>
    </div>
);

export default WorklyLogo;
