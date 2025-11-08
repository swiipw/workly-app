import React from 'react';

const JobCard = ({ title }) => (
    <div className="p-4 bg-white shadow rounded-lg border-l-4 border-[#1ABC9C] animate-fade-in-up">
        <h4 className="font-bold text-[#17202A]">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">Ubicación: Remoto</p>
    </div>
);

const JobsScreen = () => {
    const jobList = [{ title: "Desarrollador React Mid" }, { title: "Diseñador UX/UI Senior" }, { title: "Especialista en SEO" }];
    
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold text-[#17202A]">Ofertas de Empleo</h2>
            {jobList.map((job, index) => (
                <JobCard key={index} {...job} />
            ))}
        </div>
    );
};

export default JobsScreen;
