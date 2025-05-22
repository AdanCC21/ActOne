import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WelcomeBack({ }) {
    const { name } = useParams();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">

            <div className='flex flex-col m-auto text-center'>
                <h3>Bienvenido</h3>
                <h1 className='text-(--yellow-500) font-bold uppercase mx-2'>{name}</h1>
            </div>
        </div>
    )
}


