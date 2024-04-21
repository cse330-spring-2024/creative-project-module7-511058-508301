import React from 'react'
import { signOut } from 'next-auth/react'

function Sidebar() {
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
        <h1>
            I am a sidebar.
        </h1>
        <div className="space-y-4">
          <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
            <p> Log out</p>
          </button>
        </div>
    </div>
  )
}

export default Sidebar