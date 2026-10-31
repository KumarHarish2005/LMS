
import Navbar from "./components/ui/navbar"
import Login from "./pages/login"
function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main>
        <Navbar/>
        <Login/>
      </main>
      
    </div>
  )
}

export default App