import React from 'react'
import RichText from '../../components/EditorComponent';


export default function TestEditor() {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <div className='mx-[10vw]'>
        <RichText />
      </div>
    </div>
  )
}
