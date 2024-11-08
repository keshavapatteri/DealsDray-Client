
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout";
import AdminHomePage from "../Pages/AdminHomePage";
import AdminLoginPage from "../Pages/AdminLoginPage";
import AdminEmployeeAdd from "../Pages/AdminEmployeeAdd";
import AdminEmployeeGet from "../Pages/AdminEmployeeGet";
import AdminEmployeeEdit from "../Pages/AdminEmployeeEdit";



import { UserAuth } from "./auth";
import Layouts from "../../Layout/Layouts";


export const router = createBrowserRouter([
  {
    path: "/user",
    element: <Layouts/>,
   
    children: [
      { path: "login", element: <AdminLoginPage/> },
   
    ],
  },
  {
    path: "/",
    element: <UserAuth><AdminLayout /></UserAuth>,
    children: [
      { path: "/", element: <AdminHomePage /> },
      { path: "addEmployee", element: <AdminEmployeeAdd /> },
      { path: "getAllEmployee", element: <AdminEmployeeGet /> },
      { path: "AdminEmployeeEdit/:id", element: <AdminEmployeeEdit /> },
    ],
  },
]);

export default router;
