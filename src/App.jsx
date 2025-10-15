import { useState } from 'react'
import LandingPage from '../pages/LandingPage.jsx'

import SquadPage from './pages/SquadPage.jsx'

function App() {
  const [showSquad, setShowSquad] = useState(false)

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {!showSquad ? (
        <LandingPage onEnter={() => setShowSquad(true)} />
      ) : (
        <SquadPage />
      )}
    </div>
  )
}

export default App
