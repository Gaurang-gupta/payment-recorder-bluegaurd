import { useEffect, useState } from 'react';
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import getAuth from "../../firebase"
import { signOut } from 'firebase/auth';
function Navbar() {
  const navigate = useNavigate()
  useEffect(() => {
    if(sessionStorage.getItem("email") == null) {
      navigate("/login")
    }
  },[])

  const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/login")
      sessionStorage.removeItem("email")
    }).catch((error) => {
      // An error happened.
    });
  }
  
  return (
    <nav className='py-3 bg-slate-700'>
        <nav className="flex justify-between xs:w-full xs:px-2 sm:w-4/5 sm-px-0 mx-auto items-center">
            <div className='flex justify-start xs:w-1/2 md:w-1/3'>
                <DropdownMenu name={"Orders"} links={[["Order List", "/order-list"], ["New Order", "/"]]}/>
                <DropdownMenu name={"Customer"} links={[["Customer List", "/cust-list"], ["Add Customer", "/"]]}/>
            </div>
            <div className='text-white flex'>
                <div className='pr-5'>{sessionStorage.getItem("email")?.split("@")[0]?.toUpperCase()}</div>
                <div onClick={signout} className='cursor-pointer'>Logout</div>
            </div>
        </nav>
    </nav>
  );
}

function DropdownMenu({name, links}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="xs:w-[20px] md:w-[300px] relative flex flex-col items-start text-white xs:mr-[3rem] sm:mr-[4rem] xl:mr-[6rem]" onClick={toggleDropdown}>
      <button className="xs:text-lg sm:text-md w-full flex items-center justify-between rounded-lg lg:text-2xl">
        {name} {isOpen ? <MdArrowDropUp/> : <MdArrowDropDown/>}
      </button>
      {isOpen && 
      (
        <div className="absolute text-sm bg-slate-700 top-10 xs:w-[100px] md:w-[140px] lg:w-[150px] xl:w-[180px] pt-4 pb-3 px-4 rounded-lg xs:mt-1 lg:mt-2 text-slate-300">
            {links.map(link => (
                <div className='hover:text-white mb-2 lg:text-md'>
                    <Link to={link[1]}>{link[0]}</Link>
                </div>
            ))}
        </div>
      )
      }
    </div>
  );
}

export default Navbar;
