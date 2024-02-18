import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between p-10 bg-slate-400 h-10 items-center'>
        <div className="logo">
            <p className='font-bold text-xl cursor-default'><span className=" text-blue-800">i</span>Todo</p>
        </div>
        <ul className="flex gap-20">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar