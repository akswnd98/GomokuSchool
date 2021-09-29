import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import icon512x512 from '@/icons/GomokuSchoolIcon_512x512.png';
import icon192x192 from '@/icons/GomokuSchoolIcon_192x192.png';
import { addAppleIcon } from './AppleIcon';

ReactDOM.render(
  (
    <App />
  ),
  document.getElementById('top')
);

addAppleIcon(icon512x512, '512x512', 'image/png');
addAppleIcon(icon192x192, '192x192', 'image/png');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
