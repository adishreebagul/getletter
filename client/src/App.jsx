import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import NewLetter from './pages/NewLetter'
import MyLetters from './pages/MyLetters'
import Friends from './pages/Friends'
import Profile from './components/Profile'
import Messages from './pages/Messages'
import Inbox from './pages/PrivateLetters'

function App() {

    const token = localStorage.getItem("token")

    return (
        <Routes>
            <Route
                path='/'
                element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
                path='/login'
                element={<Login />} />
            <Route
                path='/signup'
                element={<Signup />} />
            <Route
                path='/new'
                element={<NewLetter />} />
            <Route
                path='/my-posts'
                element={<MyLetters />} />
            <Route
                path='/friends'
                element={<Friends />} />
            <Route
                path='/users/profile'
                element={<Profile />} />
            <Route
                path='/messages'
                element={<Messages />}
            />
            <Route 
            path='/messages/private' 
            element={<Inbox />} />
        </Routes>
    )
}


export default App