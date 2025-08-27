import React from 'react';
import {
  SiNodedotjs,
  SiExpress,
  SiDocker,
  SiReact,
  SiMongodb,
  SiVuedotjs,
  SiNextdotjs,
  SiNuxtdotjs,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiBun,
  SiMysql,
  SiGit,
} from 'react-icons/si';

// Properti umum untuk semua ikon, terutama untuk styling ukuran.
const iconProps = {
  className: "w-full h-full",
};

// Setiap komponen sekarang merender ikon dari pustaka react-icons
// dengan properti yang sama untuk konsistensi.
export const NodejsIcon: React.FC = () => <SiNodedotjs {...iconProps} />;
export const ExpressIcon: React.FC = () => <SiExpress {...iconProps} />;
export const DockerIcon: React.FC = () => <SiDocker {...iconProps} />;
export const ReactIcon: React.FC = () => <SiReact {...iconProps} />;
export const MongoIcon: React.FC = () => <SiMongodb {...iconProps} />;
export const VuejsIcon: React.FC = () => <SiVuedotjs {...iconProps} />;
export const NextjsIcon: React.FC = () => <SiNextdotjs {...iconProps} />;
export const NuxtjsIcon: React.FC = () => <SiNuxtdotjs {...iconProps} />;
export const TailwindIcon: React.FC = () => <SiTailwindcss {...iconProps} />;
export const JavaScriptIcon: React.FC = () => <SiJavascript {...iconProps} />;
export const HtmlIcon: React.FC = () => <SiHtml5 {...iconProps} />;
export const CssIcon: React.FC = () => <SiCss3 {...iconProps} />;
export const BunIcon: React.FC = () => <SiBun {...iconProps} />;
export const MysqlIcon: React.FC = () => <SiMysql {...iconProps} />;
export const GitIcon: React.FC = () => <SiGit {...iconProps} />;

// Ekspor default tetap sama agar kompatibel dengan sisa kode Anda.
const icons = {
  NodejsIcon,
  ExpressIcon,
  DockerIcon,
  ReactIcon,
  MongoIcon,
  VuejsIcon,
  NextjsIcon,
  NuxtjsIcon,
  TailwindIcon,
  JavaScriptIcon,
  HtmlIcon,
  CssIcon,
  BunIcon,
  MysqlIcon,
  GitIcon,
};

export default icons;