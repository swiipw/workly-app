import React from 'react';
import { useAppContext } from '../context/AppContext';

const CourseCard = ({ title, description, color }) => (
    <div className={`p-4 ${color} text-white rounded-lg shadow-md animate-fade-in-up`}>
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-sm mt-1 opacity-90">{description}</p>
    </div>
);

const CoursesScreen = () => {
    const { courses } = useAppContext();
    
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold text-[#17202A]">Nuestros Cursos</h2>
            {courses.map((course) => (
                <CourseCard 
                    key={course.id} 
                    title={course.title} 
                    description={course.description} 
                    color={course.color} 
                />
            ))}
        </div>
    );
};

export default CoursesScreen;
