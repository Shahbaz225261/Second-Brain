import Dashboard from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { BrowserRouter } from "react-router-dom";
import { Routes,Route } from "react-router-dom";

function App() {
  return <div>
        <BrowserRouter>
          <Routes>
              <Route element={<Signin/>} path="/signin" />
              <Route element={<Signup/>} path="/" />
              <Route element={<Dashboard/>} path="/dashboard" />
              {/* <Route element={<Dash/>} path="/brain/:share" /> */}
          </Routes>        
        </BrowserRouter>
    </div>

}

export default App;
