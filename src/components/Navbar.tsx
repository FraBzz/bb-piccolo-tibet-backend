import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
 
function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/home" className="flex items-center hover:text-blue-500 transition-colors">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/pages" className="flex items-center hover:text-blue-500 transition-colors">
          Pagine
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/events" className="flex items-center hover:text-blue-500 transition-colors">
          Eventi
        </Link>
      </Typography>
    </ul>
  );
}
 
export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          PICCOLO TIBET
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

















// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function NavBar() {
//     const [navbar, setNavbar] = useState(false);

//     return (
//         <nav className="w-full border-b border-black shadow">
//             <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8">
//                 <div>
//                     <div className="flex items-center justify-between py-3 md:py-5 md:block">
//                         <a href="javascript:void(0)">
//                             <h2 className="text-2xl font-bold text-black">Piccolo<br/> Tibet</h2>
//                         </a>
//                         <div className="md:hidden">
//                             <button
//                                 className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
//                                 onClick={() => setNavbar(!navbar)}
//                             >
//                                 {navbar ? (
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6 text-black"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                     >
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                             clipRule="evenodd"
//                                         />
//                                     </svg>
//                                 ) : (
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6 text-black"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         strokeWidth={2}
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M4 6h16M4 12h16M4 18h16"
//                                         />
//                                     </svg>
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div
//                         className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//                             navbar ? "block" : "hidden"
//                         }`}
//                     >
//                         <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
//                             <li className="text-black hover:text-indigo-200">
//                                 <Link to="/home">Home</Link>
//                             </li>
//                             <li className="text-black hover:text-indigo-200">
//                             <Link to="/pages">Pagine</Link>
//                             </li>
//                             <li className="text-black hover:text-indigo-200">
//                             <Link to="/events">Eventi</Link>
//                             </li>
//                         </ul>

//                         <div className="mt-3 space-y-2 lg:hidden md:inline-block">
//                     <a
//                         href="javascript:void(0)"
//                         className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
//                     >
//                         Sign in
//                     </a>
//                     <a
//                         href="javascript:void(0)"
//                         className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
//                     >
//                         Sign up
//                     </a>
//                 </div>
//                     </div>
//                 </div>
//                 <div className="hidden space-x-2 md:inline-block">
//                     <Link
//                         to="/login"
//                         className="px-6 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
//                     >
//                         Esci
//                     </Link>
//                     {/* <a
//                         href="javascript:void(0)"
//                         className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
//                     >
//                         Sign up
//                     </a> */}
//                 </div>
//             </div>
//         </nav>
//     );
// }