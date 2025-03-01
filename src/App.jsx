import { Routes, Route } from "react-router";
import Login from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';

function App() {

  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
  )
}

export default App
