"use client";

import { useState, useEffect, FormEvent } from 'react';
import type { Skill } from '@prisma/client';

const SkillManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({ id: '', name: '', category: '', icon: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/skills');
      if (!res.ok) throw new Error('Failed to fetch skills');
      const data: Skill[] = await res.json();
      setSkills(data);
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
    fetchSkills();
  }, []);

  const resetForm = () => {
    setForm({ id: '', name: '', category: '', icon: '' });
    setIsEditing(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `/api/skills/${form.id}` : '/api/skills';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save skill');
      }
      resetForm();
      fetchSkills();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleEdit = (skill: Skill) => {
    setForm({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        icon: skill.icon || '',
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
      if (!confirm('Are you sure you want to delete this skill?')) return;
      try {
          const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Failed to delete skill');
          fetchSkills();
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      }
  };

  if (isLoading) return <p>Loading skills...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg space-y-4">
                <h3 className="text-xl font-bold">{isEditing ? 'Edit Skill' : 'Add New Skill'}</h3>
                <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full p-2 bg-gray-700 rounded"/>
                <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required className="w-full p-2 bg-gray-700 rounded"/>
                <input type="text" placeholder="Icon Component Name" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full p-2 bg-gray-700 rounded"/>
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
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map(s => (
                            <tr key={s.id} className="border-b border-gray-700">
                                <td className="p-4">{s.name}</td>
                                <td className="p-4">{s.category}</td>
                                <td className="p-4 flex space-x-2">
                                    <button onClick={() => handleEdit(s)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">Edit</button>
                                    <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">Delete</button>
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

export default SkillManager;
