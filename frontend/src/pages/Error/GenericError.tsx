import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    errorMessage: string
}

export default function GenericError({ errorMessage }: Props) {
    const navigator = useNavigate();
    return (
        <div className='flex flex-col h-screen'>

            <div className='m-auto'>
                <h1>Error</h1>
                <h2>{errorMessage}</h2>
                <button className='btn void w-fit mx-auto' onClick={() => { navigator('/') }}>Go Home</button>
            </div>
        </div>
    )
}
