import React from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigator = useNavigate();
    return (
        <div className='flex flex-col h-screen'>
            
            <div className='m-auto'>
                <h1>Page or Story not Found - Error 404</h1>
                <button className='btn void w-fit mx-auto' onClick={()=>{navigator('/home')}}>Go Home</button>
            </div>
        </div>
    )
}
