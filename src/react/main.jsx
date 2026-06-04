import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';

export function mountReactShell() {
    const reactRoot = document.getElementById('react-root');

    if (reactRoot) {
        flushSync(() => {
            createRoot(reactRoot).render(<App />);
        });
    }
}
