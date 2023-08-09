import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/homepage";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { setValue } from "./redux/userSlice";
import { useEffect } from "react";
import { LoginPage } from "./pages/login";
import { ModalAddWorker } from "./components/modal/modalAddWorker";
import { RegisterPage } from "./pages/register";
import { Navbar } from "./components/navbar";
import { Admin } from "./pages/admin";
import { Salary } from "./pages/salary";
import { Attendance } from "./pages/attendance";

const router = createBrowserRouter([
  { path: "/", 
    element: <Navbar/>,
    children: [
      { path: "/", element: <HomePage/> },
      { path: "/admin", element: <Admin/> },
      { path: "/salary", element: <Salary/> },
      { path: "/attendance", element: <Attendance/> },

    ]
  },
  { path: "/login", element: <LoginPage/> },
  { path: "/add", element: <ModalAddWorker/> },
  { path: "/api/auth/register/:token", element: <RegisterPage/> },
])

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const keepLogin = async() => {
    try{
      const response =  await Axios.get("http://localhost:8000/api/auth/", 
      { 
        headers: { 
          Authorization: `Bearer ${token}`
        },
      }
      )
      const { fullname, email, birthdate, imgProfile, isAdmin } = response.data
      dispatch(setValue({ fullname,email,birthdate,imgProfile, isAdmin }))
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
      token ? keepLogin() : console.log('Sign in first');
  },[])
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
