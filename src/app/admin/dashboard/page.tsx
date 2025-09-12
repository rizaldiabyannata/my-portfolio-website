"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ProjectManager from '../components/ProjectManager';
import SkillManager from '../components/SkillManager';
import PhotoManager from '../components/PhotoManager';

const DashboardPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      // Here you could also add a step to verify the token with the backend
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    // Render a loading state or null while checking auth
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex border-b border-gray-700 mb-8">
            <button onClick={() => setActiveTab('projects')} className={`py-2 px-4 ${activeTab === 'projects' ? 'border-b-2 border-indigo-500' : ''}`}>Projects</button>
            <button onClick={() => setActiveTab('skills')} className={`py-2 px-4 ${activeTab === 'skills' ? 'border-b-2 border-indigo-500' : ''}`}>Skills</button>
            <button onClick={() => setActiveTab('photos')} className={`py-2 px-4 ${activeTab === 'photos' ? 'border-b-2 border-indigo-500' : ''}`}>Photos</button>
        </div>

        <div>
            {activeTab === 'projects' && <ProjectManager />}
            {activeTab === 'skills' && <SkillManager />}
            {activeTab === 'photos' && <PhotoManager />}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
