import React from 'react';
import './Logo.css';

export function Logo({ small = false, onClick }) {
  return <button className={`brand ${small ? 'brand-small' : ''}`} onClick={onClick} aria-label="TheMR Academy home">
    <svg className="brand-mark" viewBox="0 0 46 54" fill="none" aria-hidden="true">
      <path d="M22.7 1 43 7.7 22.7 14 2 7.7 22.7 1Z" fill="#149C76"/>
      <circle cx="23" cy="12.3" r="6.8" fill="#F6F5EE"/>
      <path d="M5 21h36v31H5z" fill="#F6F5EE"/>
      <path d="m13 20 10 13 10-13" stroke="#159A77" strokeWidth="2.4" strokeLinejoin="round"/>
      <path d="M23 32v20" stroke="#17201E" strokeWidth="2"/>
      <path d="M2 8 23 14 43 8" stroke="#0B1210" strokeWidth="1.3"/>
    </svg>
    <span className="brand-word"><strong>The</strong><b>MR</b> <i>Academy</i></span>
  </button>;
}
