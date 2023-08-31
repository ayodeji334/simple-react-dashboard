// import React from 'react'
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function Navbar() {
  const location = useLocation()
  const router = useNavigate()
  const locationName = useMemo(() => {
    return location.pathname.split("/")[1].charAt(0).toUpperCase() + location.pathname.split("/")[1].slice(1) ?? "Dashboard"
  }, [location])


  return (
    <div className='fixed px-4 z-10 py-3 w-full bg-white border-b-2'>
      <div className='ml-52 flex justify-between items-center'>
        <h1 className="font-black text-lg">Simple Dashboard</h1>
      </div>
    </div>
  )
}

export default Navbar