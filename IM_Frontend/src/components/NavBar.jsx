// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//react icons
// eslint-disable-next-line no-unused-vars
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
// eslint-disable-next-line no-unused-vars
import { FaUser } from "react-icons/fa6";

const NavBar = () => {
    // eslint-disable-next-line no-unused-vars
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isSticky,setIsSticky] = useState(false);


    //toggle menu
    // eslint-disable-next-line no-unused-vars
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const handleScroll = () => {
            if(window.scrollY > 100){
                setIsSticky(true);
            }
            else{
                setIsSticky(false);
            }
        }

        window.addEventListener("scroll",handleScroll);

        return () => {
            window.addEventListener("scroll",handleScroll);
        }
    } ,[])

    //navItems here
    // eslint-disable-next-line no-unused-vars
    const navItems = [
        {link:"Dashboard",path:"/"},
        {link:"Add Product",path:"/addProductPage"},
        {link:"Manage Products",path:"/ManageProductPage"},
        {link:"All Products",path:"/AllProductsPage"},
        {link:"SignIn",path:"/SignInPage"},
    ]
  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 bg-green-500'>
      <nav className={`py-4 bg-green-500 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0  " : ""}`}>
        <div className='flex justify-between items-center text-base gap-8 '>
            {/*logo*/}
            <Link to="/" className='text-2xl font-bold text-black flex items-center gap-2'>Vino IceCream</Link>

            {/*nav item for large device */}
            <ul className='md:flex space-x-12 hidden'>
                {
                  // eslint-disable-next-line no-unused-vars
                  navItems.map(({link,path}) => <Link key={path} to={path} className='block text-base text-black  cursor-pointer hover:text-white'>{link}</Link>)  
                } 
                <Link to="/profile"><FaUser className='inline-block cursor-pointer'/></Link>
            </ul>

                {/*btn for lg devices */}
                <div className='space-x-12 hidden lg:flex items-center'>
                    <button><FaBarsStaggered className='w-5 hover:text-white'/></button>
                </div>
            
                {/*menu btn for the mobile devices*/}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {
                            isMenuOpen ? <FaXmark className='h-5 w-5 text-black'/> : <FaBarsStaggered/>
                        }
                    </button>
                </div>

        </div>

        {/*nav items for sm devices*/}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-green-400 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
            {
                    // eslint-disable-next-line no-unused-vars
                    navItems.map(({link,path}) => <Link key={path} to={path} className='block text-base text-white  cursor-pointer hover:text-black'>{link}</Link>)  
                } 
                  <Link to="/profile"><FaUser className='inline-block cursor-pointer'/></Link>
            
        </div>

      </nav>
    </header>
  )
}

export default NavBar
