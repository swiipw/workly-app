// Componente Tarjeta de Curso - CORREGIDO
const CourseCard = ({ course, onClick, isMyCourse = false }) => (
    <div 
        onClick={() => onClick(course)} 
        // ASEGÚRATE DE QUE LA CADENA DE CLASES ESTÉ CERRADA CORRECTAMENTE CON "
        className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#F39C12] cursor-pointer"
    >
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-[#17202A]">{course.title}</h3>
            
            {!isMyCourse && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${course.price === 'Gratis' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {course.price}
                </span>
            )}
        </div>
        <p className="text-gray-500 mb-3 text-sm italic">{course.category}</p>
        
        {isMyCourse ? (
            <>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                        className="bg-[#1ABC9C] h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                    <p className="text-gray-700">Progreso:</p>
                    {course.progress === 100 ? (
                        <span className="text-[#1ABC9C] flex items-center">
                            Completado <CheckCircle className="w-4 h-4 ml-1" />
                        </span>
                    ) : (
                        <span className="text-[#F39C12]">{course.progress}%</span>
                    )}
                </div>
            </>
        ) : (
            <div className="flex flex-wrap text-sm text-gray-500 space-x-4">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-[#1ABC9C]" /> {course.duration}</span>
                <span className="flex items-center"><BarChart className="w-4 h-4 mr-1 text-[#F39C12]" /> {course.level}</span>
            </div>
        )}
    </div>
);

export default CoursesScreen;
