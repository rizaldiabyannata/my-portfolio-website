"use client";

import { useState, useEffect, FormEvent } from 'react';
import type { Photo } from '@prisma/client';
import Image from 'next/image';

const PhotoManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ title: '', description: '' });

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/photos');
      if (!res.ok) throw new Error('Failed to fetch photos');
      const data: Photo[] = await res.json();
      setPhotos(data);
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
    fetchPhotos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a photo to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', form.title);
    formData.append('description', form.description);

    try {
      const res = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Upload failed');
      }
      setForm({ title: '', description: ''});
      setFile(null);
      // Clear the file input visually
      const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
      if(fileInput) fileInput.value = '';

      fetchPhotos(); // Refresh list
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleDelete = async (id:string) => {
      if (!confirm('Are you sure you want to delete this photo?')) return;
      try {
          const res = await fetch(`/api/photos/${id}`, { method: 'DELETE' });
          if (!res.ok) {
              const err = await res.json().catch(() => null); // res might not have a body
              throw new Error(err?.message || 'Failed to delete photo');
          }
          fetchPhotos(); // Refresh list
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg space-y-4">
                <h3 className="text-xl font-bold">Upload New Photo</h3>
                <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="w-full p-2 bg-gray-700 rounded"/>
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 bg-gray-700 rounded h-24"/>
                <input id="photo-upload" type="file" onChange={handleFileChange} required className="w-full p-2 bg-gray-700 rounded file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"/>
                <p className="text-xs text-gray-400">EXIF data will be extracted automatically if available.</p>
                <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded">Upload</button>
            </form>
        </div>
        <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Uploaded Photos</h3>
                {isLoading && <p>Loading photos...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map(p => (
                        <div key={p.id} className="relative group">
                            <Image src={p.imageUrl} alt={p.title} width={200} height={200} className="w-full h-auto object-cover rounded"/>
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PhotoManager;
