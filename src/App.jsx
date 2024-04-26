import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./pages/PrivateRoute";


function App() {
  return (
    <BrowserRouter>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
