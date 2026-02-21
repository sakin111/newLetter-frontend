import { Suspense } from 'react';
import { Outlet } from 'react-router'
import './App.css'
import Common from './components/layout/Common'

function App() {
  return (
    <Common>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <div className="pt-16">
          <Outlet />
        </div>
      </Suspense>
    </Common>
  )
}

export default App
