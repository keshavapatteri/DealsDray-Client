import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout";
import AdminHomePage from "../Pages/AdminHomePage";
import AdminLoginPage from "../Pages/AdminLoginPage";
import AdminEmployeeAdd from "../Pages/AdminEmployeeAdd";
import AdminEmployeeGet from "../Pages/AdminEmployeeGet";
import AdminEmployeeEdit from "../Pages/AdminEmployeeEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout/>,
    children: [
        {
            path: "/", 
            element: <AdminHomePage/>, 
          },
      
      {
        path: "addEmployee", 
        element: <AdminEmployeeAdd/>, 
      },
      {
        path: "getAllEmployee", 
        element: <AdminEmployeeGet/>, 
      },
    
      {
        path: "AdminEmployeeEdit/:id", 
        element: <AdminEmployeeEdit/>, 
      },

      
    ],
  },
  {
    path: "login", 
    element: <AdminLoginPage />, 
  },            
]);

export default router;
