"use client";
import React from 'react';

interface ParallaxSectionProps {
  imageUrl: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ imageUrl }) => {
  const parallaxStyle: React.CSSProperties = {
    backgroundImage: `url(${imageUrl})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '400px', // Adjust height as needed
    position: 'relative',
  };

  return (
    <div style={parallaxStyle}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(10, 25, 47, 0.7)', // Overlay to darken the image
        }}
      />
    </div>
  );
};

export default ParallaxSection;
