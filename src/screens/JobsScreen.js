import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

// Datos de empleo de ejemplo
const jobData = [
  { id: 1, title: "Diseñador UX/UI Senior", company: "Tech Innovate", location: "Remoto", salary: "$70k", type: "Full-Time" },
  { id: 2, title: "Desarrollador Frontend (React)", company: "Workly Labs", location: "Lima, PE", salary: "$55k", type: "Full-Time" },
  { id: 3, title: "Analista de Datos Jr.", company: "Data Insight", location: "Híbrido", salary: "$40k", type: "Part-Time" },
  { id: 4, title: "Especialista en Marketing Digital", company: "Global Reach", location: "Remoto", salary: "$45k", type: "Contrato" },
  { id: 5, title: "Asistente de Recursos Humanos", company: "People First", location: "Santiago, CL", salary: "$35k", type: "Full-Time" },
];

// Componente para una tarjeta de Empleo
const JobCard = ({ job }) => (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#1ABC9C] cursor-pointer">
        <h3 className="text-xl font-bold text-[#17202A] mb-1">{job.title}</h3>
        <p className="text-gray-600 mb-3">{job.company}</p>
        <div className="flex flex-wrap text-sm text-gray-500 space-x-4">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-[#F39C12]" /> {job.location}</span>
            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1 text-[#1ABC9C]" /> {job.salary}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {job.type}</span>
        </div>
    </div>
);


const JobsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Lógica de filtrado
  const filteredJobs = jobData.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-4 space-y-6">
      
      {/* 1. BARRA DE BÚSQUEDA */}
      <div className="sticky top-0 bg-gray-50 pt-4 pb-3 z-10">
        <div className="relative shadow-md rounded-xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar empleos por título o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F39C12] focus:border-transparent transition"
          />
        </div>
      </div>
      
      {/* 2. RESULTADOS DE LA BÚSQUEDA */}
      <h2 className="text-xl font-bold text-[#17202A] mb-4 flex items-center">
        <Briefcase className="w-6 h-6 mr-2 text-[#1ABC9C]" />
        Resultados ({filteredJobs.length})
      </h2>
      
      <section className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className="text-gray-500 text-center p-6 bg-white rounded-xl shadow-inner">
            No se encontraron empleos que coincidan con "{searchTerm}".
          </p>
        )}
      </section>
      
    </div>
  );
};

export default JobsScreen;
