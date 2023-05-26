import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Paths } from '../paths/paths';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register';
import { Employees } from '../pages/employees/Employees';
import { AddEmployee } from '../pages/add-employee/AddEmployee';
import { Status } from '../pages/status/Status';
import { Employee } from '../pages/employee/Employee';
import EditEmployee from "../pages/edit-employee/EditEmployee";

export const router = createBrowserRouter([
    {
      path: Paths.home,
      element: <Employees />
    },
    {
      path: Paths.login, 
      element: <Login/>
    },
    { 
      path: Paths.register, 
      element: <Register />
    },
    { 
      path: Paths.employeeAdd, 
      element: <AddEmployee />
    },
    { 
      path: `${Paths.status}/:status`, 
      element: <Status />
    },
    {
      path: `${Paths.employee}/:id`,
      element: <Employee />
    },
    {
      path: `${Paths.employeeEdit}/:id`,
      element: <EditEmployee />
    },
  ])