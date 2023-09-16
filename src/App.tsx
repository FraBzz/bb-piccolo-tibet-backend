import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Pages } from './components/Pages'
import { EventsList } from './components/EventsList'
import NavBar from './components/Navbar'
import { Login } from './components/Login'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <div>
    <Routes>
    <Route path="/home" element={<Home />}/>
    <Route path="/pages" element={<Pages />}/>
    <Route path="/events" element={<EventsList />}/>
    <Route path="/login" element={<Login />}/>

    <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>
    </div>
    </>
  )
}

export default App
