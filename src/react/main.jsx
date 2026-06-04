import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';

const reactRoot = document.getElementById('react-root');

if (reactRoot) {
    createRoot(reactRoot).render(<App />);
}
