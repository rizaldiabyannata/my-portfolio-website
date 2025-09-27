import React from "react";
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
  SiGin,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";
import { FaMoon, FaSun } from "react-icons/fa";
import { IconBaseProps } from "react-icons";

type IconProps = Omit<IconBaseProps, "ref"> & { className?: string };

// helper untuk merge className
const merge = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;

export const NodejsIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiNodedotjs className={merge("w-full h-full", className)} {...rest} />
);
export const ExpressIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiExpress className={merge("w-full h-full", className)} {...rest} />
);
export const DockerIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiDocker className={merge("w-full h-full", className)} {...rest} />
);
export const ReactIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiReact className={merge("w-full h-full", className)} {...rest} />
);
export const MongoIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiMongodb className={merge("w-full h-full", className)} {...rest} />
);
export const VuejsIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiVuedotjs className={merge("w-full h-full", className)} {...rest} />
);
export const NextjsIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiNextdotjs className={merge("w-full h-full", className)} {...rest} />
);
export const NuxtjsIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiNuxtdotjs className={merge("w-full h-full", className)} {...rest} />
);
export const TailwindIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiTailwindcss className={merge("w-full h-full", className)} {...rest} />
);
export const JavaScriptIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiJavascript className={merge("w-full h-full", className)} {...rest} />
);
export const HtmlIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiHtml5 className={merge("w-full h-full", className)} {...rest} />
);
export const CssIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiCss3 className={merge("w-full h-full", className)} {...rest} />
);
export const BunIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiBun className={merge("w-full h-full", className)} {...rest} />
);
export const MysqlIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiMysql className={merge("w-full h-full", className)} {...rest} />
);
export const GitIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiGit className={merge("w-full h-full", className)} {...rest} />
);
export const GinIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiGin className={merge("w-full h-full", className)} {...rest} />
);
export const PostgresqlIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiPostgresql className={merge("w-full h-full", className)} {...rest} />
);
export const RedisIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <SiRedis className={merge("w-full h-full", className)} {...rest} />
);
export const SunIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <FaSun className={merge("w-full h-full", className)} {...rest} />
);
export const MoonIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <FaMoon className={merge("w-full h-full", className)} {...rest} />
);

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
  GinIcon,
  PostgresqlIcon,
  RedisIcon,
  SunIcon,
  MoonIcon,
};

export default icons;
