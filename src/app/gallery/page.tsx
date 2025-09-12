import Header from '../components/Header';
import SocialLinks from '../components/SocialLinks';
import type { Photo } from '@prisma/client';
import GalleryClientWrapper from '../components/GalleryClientWrapper';

async function getPhotos(): Promise<Photo[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/photos`, { cache: 'no-store' });
  if (!res.ok) {
    console.error("Failed to fetch photos");
    return [];
  }
  return res.json();
}

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <div className="bg-navy text-slate font-sans leading-relaxed antialiased">
      <Header />
      <SocialLinks />
      <main>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-24">
            <h1 className="text-4xl font-bold text-lightest-slate mb-12">Photo Gallery</h1>
            <GalleryClientWrapper photos={photos} />
        </div>
      </main>
      <footer className="text-center py-6">
        <p className="text-slate text-sm font-mono">
          Designed & Built by Rizaldi Abyannata
        </p>
      </footer>
    </div>
  );
}
