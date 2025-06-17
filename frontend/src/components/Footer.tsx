import React from 'react'

export default function Footer() {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-3xl text-white font-bold tracking-tight">
          MernEats.com
        </span>
        <div className="text-white font-bold tracking-tight flex gap-4">
          <span >
            Privacy Policy
          </span>
          <span >
            Terms Of Service
          </span>
        </div>
      </div>
    </div>
  )
}
