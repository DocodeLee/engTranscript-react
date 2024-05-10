import React from 'react'

export default function Header() {
  return (
    <header className= "flex items-center justify-between gap-4 p-4">
    <a href = "/"><h1 className="font-medium">Free<span className="text-green-400 bold">Translate</span>
    </h1> </a>
    <a href="/" className = 
    "specialBtn text-green-400 flex gap-2 items-center text-sm p-2 rounded-md">
      <p>New
      
      </p>
      <i className="fa-regular fa-square-plus"></i>
    </a>
      </header>
  )
}
