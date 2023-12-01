import CanvasModel from "./canvas/index.jsx";
import Customizer from "./pages/Customizer.jsx";
import Home from "./pages/Home.jsx";


function App() {
  return (
    <main className="app transition-all ease-in">
      <Home/> 
      <Customizer/>
      <CanvasModel/>
    </main>
  )
}

export default App
