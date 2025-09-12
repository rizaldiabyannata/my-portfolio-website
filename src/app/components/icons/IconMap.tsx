import React from 'react';
import {
  NodejsIcon, DockerIcon, ReactIcon, MongoIcon, VuejsIcon, NextjsIcon,
  NuxtjsIcon, TailwindIcon, JavaScriptIcon, HtmlIcon, CssIcon, BunIcon,
  MysqlIcon, GitIcon, ExpressIcon
} from './TechIcons';

const iconMap: { [key: string]: React.FC } = {
    NodejsIcon,
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
    ExpressIcon
};

export const getIconByName = (name: string): React.ReactElement | null => {
    const IconComponent = iconMap[name];
    return IconComponent ? React.createElement(IconComponent) : null;
};
