"use client";

import { useState, useEffect, FormEvent } from 'react';
import type { Project } from '@prisma/client';

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    tags: '',
    repoUrl: '',
    liveUrl: '',
    imageUrl: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data: Project[] = await res.json();
      setProjects(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setForm({ id: '', title: '', description: '', tags: '', repoUrl: '', liveUrl: '', imageUrl: '' });
    setIsEditing(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `/api/projects/${form.id}` : '/api/projects';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save project');
      }
      resetForm();
      fetchProjects(); // Refresh list
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
        id: project.id,
        title: project.title,
        description: project.description,
        tags: project.tags || '',
        repoUrl: project.repoUrl || '',
        liveUrl: project.liveUrl || '',
        imageUrl: project.imageUrl || ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
      if (!confirm('Are you sure you want to delete this project?')) return;
      try {
          const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Failed to delete project');
          fetchProjects(); // Refresh list
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      }
  };

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg space-y-4">
                <h3 className="text-xl font-bold">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="w-full p-2 bg-gray-700 rounded"/>
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className="w-full p-2 bg-gray-700 rounded h-32"/>
                <input type="text" placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
                <input type="text" placeholder="Repo URL" value={form.repoUrl} onChange={e => setForm({...form, repoUrl: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
                <input type="text" placeholder="Live URL" value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
                <input type="text" placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
                <div className="flex space-x-4">
                    <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded">{isEditing ? 'Update' : 'Create'}</button>
                    {isEditing && <button type="button" onClick={resetForm} className="w-full py-2 bg-gray-600 hover:bg-gray-700 rounded">Cancel</button>}
                </div>
            </form>
        </div>
        <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(p => (
                            <tr key={p.id} className="border-b border-gray-700">
                                <td className="p-4">{p.title}</td>
                                <td className="p-4 flex space-x-2">
                                    <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">Edit</button>
                                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default ProjectManager;
