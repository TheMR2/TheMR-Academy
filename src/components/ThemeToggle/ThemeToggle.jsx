import React from 'react';
import { Moon, Sun } from 'lucide-react';
import './ThemeToggle.css';

export function ThemeToggle({ isDarkMode, onToggle }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={isDarkMode?'Switch to light mode':'Switch to dark mode'} title={isDarkMode?'Switch to light mode':'Switch to dark mode'}>{isDarkMode?<Sun size={16}/>:<Moon size={16}/>}</button>;
}
