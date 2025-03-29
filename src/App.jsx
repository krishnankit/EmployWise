import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import UsersScreen from "./screens/UsersScreen.jsx"
import LoginScreen from './screens/LoginScreen.jsx'
import UserEditScreen from "./screens/UserEditScreen.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<UsersScreen />} />
          <Route path="users/edit/:id" element={<UserEditScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
