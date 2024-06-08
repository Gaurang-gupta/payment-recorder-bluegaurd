import Navbar from "./Components/Navbar/Navbar";
import NewCustomerDetails from "./Components/NewCustomerDetails/NewCustomerDetails";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import { useState } from "react";
import { LoginContext } from './Contexts/LoginContext';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import Confirm from "./Components/Confirm/Confirm";
import CustomerList from "./Components/CustomerList/CustomerList";
import OrderList from "./Components/OrderList/OrderList";
import Invoice from "./Components/Invoice/Invoice";

function App() {
  const [customerData, setCustomerData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    addressLine1: '',
    postalCode: '',
    city: '',
    state: '',
    contactNumber: ''
  });

  const [orderData, setOrderData] = useState({
    nextServiceDate: "",
    serviceAvailable: [],
    price: 0,
    taxSlab: 0,
    taxState: "",
  })

  const updateOrderData = (data) => {
    setOrderData({ ...orderData, ...data})
  }
  
  const updateCustomerData = (data) => {
    setCustomerData({ ...customerData, ...data });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Navbar/>
        <NewCustomerDetails/>
      </>
    },
    {
      path: "/login",
      element: <div className="bg-slate-100 w-full h-[100vh]">
        <Login/>
      </div>,
    },
  
    {
      path: "/signup",
      element: <div className="bg-slate-100 w-full xs:h-[100%] md:h-[100vh]">
      <Signup/>
    </div>
    },

    {
      path: "/orderDetails",
      element: <>
        <Navbar/>
        <OrderDetails/>
      </>
    },

    {
      path: "/confirm",
      element: <>
        <Navbar/>
        <Confirm/>
      </>
    },

    {
      path: "/cust-list",
      element: <>
        <Navbar/>
        <CustomerList/>
      </>
    },

    {
      path: "/order-list",
      element: <>
        <Navbar/>
        <OrderList/>
      </>
    }
  ]);
  
  return (
    <div className={`xs:h-[100%] md:h-[100vh]`}>
      <LoginContext.Provider value={{customerData, updateCustomerData, orderData, updateOrderData}}>
        <RouterProvider router={router} />
      </LoginContext.Provider>
    </div>
  );
}

export default App;
