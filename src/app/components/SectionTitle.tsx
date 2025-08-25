
import React from 'react';

interface SectionTitleProps {
  number: string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ number, title }) => {
  return (
    <h2 className="flex items-center text-2xl md:text-3xl font-bold text-lightest-slate mb-12 w-full">
      <span className="text-brand font-mono mr-4 text-xl md:text-2xl">0{number}.</span>
      {title}
      <span className="block h-px bg-lightest-navy/50 flex-grow ml-6"></span>
    </h2>
  );
};

export default SectionTitle;
