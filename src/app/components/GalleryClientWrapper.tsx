"use client";

import { useState } from 'react';
import type { Photo } from '@prisma/client';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import './masonry.css'; // We will create this file next

// Placeholder for the Lightbox component
const Lightbox = ({ photo, onClose }: { photo: Photo, onClose: () => void }) => {
    if (!photo) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 p-4 rounded-lg max-w-4xl max-h-full overflow-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image/info
            >
                <Image src={photo.imageUrl} alt={photo.title} width={1200} height={800} className="w-auto h-auto max-h-[80vh] rounded" />
                <div className="text-white mt-4">
                    <h3 className="text-2xl font-bold">{photo.title}</h3>
                    {photo.description && <p className="mt-2 text-gray-300">{photo.description}</p>}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono">
                        {photo.iso && <div><span className="font-bold text-gray-400">ISO:</span> {photo.iso}</div>}
                        {photo.shutterSpeed && <div><span className="font-bold text-gray-400">Shutter:</span> {photo.shutterSpeed}s</div>}
                        {photo.aperture && <div><span className="font-bold text-gray-400">Aperture:</span> f/{photo.aperture}</div>}
                        {photo.focalLength && <div><span className="font-bold text-gray-400">Focal Length:</span> {photo.focalLength}mm</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};


const GalleryClientWrapper = ({ photos }: { photos: Photo[] }) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {photos.map(photo => (
                    <div key={photo.id} onClick={() => setSelectedPhoto(photo)} className="cursor-pointer">
                        <Image
                            src={photo.imageUrl}
                            alt={photo.title}
                            width={500}
                            height={500}
                            className="w-full h-auto object-cover rounded-lg hover:opacity-80 transition-opacity"
                        />
                    </div>
                ))}
            </Masonry>

            {selectedPhoto && (
                <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
            )}
        </div>
    );
};

export default GalleryClientWrapper;
