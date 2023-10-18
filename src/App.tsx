
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { EventDetails } from './components/EventDetails'
import { EventsList } from './components/EventsList'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { NavbarSimple } from './components/Navbar'
import { PageDetails } from './components/PageDetails'
import { PagesList } from './components/PagesList'



function App() {
  // const [count, setCount] = useState(0)


  return (
    <>
    <NavbarSimple/>
    <div>
    <Routes>
    <Route path="/home" element={<Home />}/>
    <Route path="/pages" element={<PagesList />}/>
    <Route path="/pages/:pageId" element={<PageDetails />}/>
    <Route path="/events" element={<EventsList />}/>
    <Route path="/events/:eventId" element={<EventDetails />}/>
    <Route path="/login" element={<Login />}/>

    <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>
    </div>
    </>
  )
}

export default App
