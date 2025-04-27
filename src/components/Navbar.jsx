import React from 'react'

const Navbar = () => {
return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white p-4 shadow-lg">
            <div className="logo">
                    <span className="font-extrabold text-2xl mx-9 tracking-wide">iTask</span>
            </div>
            <ul className="flex gap-9 mx-9">
                    <li className="cursor-pointer hover:font-bold hover:text-purple-300 transition-all duration-300">Home</li>
                    <li className="cursor-pointer hover:font-bold hover:text-purple-300 transition-all duration-300">Your Tasks</li>
            </ul>
    </nav>
)
}

export default Navbar
