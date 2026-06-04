import { createRoot } from 'react-dom/client'
import { App } from '@/react/App.tsx'

const reactRoot = document.getElementById('react-root')

if (reactRoot) {
  createRoot(reactRoot).render(<App />)
}
