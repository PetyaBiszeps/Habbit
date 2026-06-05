import { createRoot } from 'react-dom/client'
import { App } from '@/renderer/App.tsx'

const reactRoot = document.getElementById('react-root')

if (reactRoot) {
  createRoot(reactRoot).render(<App />)
}
