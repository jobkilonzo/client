import Home from './pages/Home'

import Customize from './pages/Customize'
import CanvasModel from './canvas/CanvasModel'
function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasModel />
      <Customize />
    </main>
  )
}

export default App
