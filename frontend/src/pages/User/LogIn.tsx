import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ParticlesBg from "../../components/ParticlesBg";
import { logIn } from "../../Hooks/LogIn";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { GetUPD } from "../../Hooks/GetUPD";


export default function LogIn({ }) {
    const [inputs, setInput] = useState({
        email: "",
        password: ""
    });

    const [alert, setAlert] = useState("");

    const navigate = useNavigate();

    const handleChanges = (e) => {
        switch (e.target.name) {
            case "email":
                setInput(preventDefault => ({
                    ...preventDefault,
                    email: e.target.value
                }))
                break;
            case "password":
                setInput(preventDefault => ({
                    ...preventDefault,
                    password: e.target.value
                }))
                break;
        }
    }

    const handleSubmit = async (email: string, authType: string, pass?: string) => {
        try {
            const loginfetch = await logIn(email, authType, pass);
            const upd = await GetUPD(loginfetch.user_profile_id);
            if (upd) sessionStorage.setItem('user', JSON.stringify(upd));
            navigate('/')
        } catch (e) {
            setAlert(e.message);
        }
    }

    useEffect(() => { sessionStorage.removeItem('user'); }, [])

    return (
        <div className="flex flex-col min-h-screen min-w-screen  items-center justify-center overflow-hidden">
            <ParticlesBg></ParticlesBg>
            <div className="absolute z-[-2] bg-black opacity-80 h-screen w-screen"></div>
            <header className=" z-3 flex flex-col">
                <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                <h1 className="text-center font-bold mt-0 text-(--yellow-500)">ActOne</h1>
            </header>


            <form className="flex flex-col min-h-[60vh] h-fit min-w-[25vw] max-w-[80vw] justify-between p-4 bg-(--dark-300) rounded-2xl"
                onSubmit={(e) => { handleSubmit(inputs.email, 'email', inputs.password); e.preventDefault(); }}>
                <fieldset className="flex flex-col justify-around h-3/4">
                    <div className="h-1/4 my-5">
                        {alert == "Login" ? (
                            <div className="max-h-[50px] w-fit mx-auto">
                                <DotLottieReact
                                    src="https://lottie.host/d0314f19-be77-48f1-8299-44406cef8edc/ldhSr6NV2l.lottie"
                                    loop
                                    autoplay
                                />
                            </div>
                        ) : (
                            <>{alert === '' ? (
                                <h3 className="text-center mb-auto font-medium">Log In</h3>
                            ) : (
                                <span className="text-(--yellow-600) text-center">{alert}</span>)}</>
                        )}
                    </div>
                    <section className="h-3/4 mt-auto">
                        <div className="my-5">
                            <label htmlFor="emailLog" >Email</label>
                            <input className="inp" id="emailLog" name="email" value={inputs.email} onChange={(e) => { handleChanges(e) }}
                                type="email" placeholder="user@gmail.com"></input>
                        </div>

                        <div className="my-5">
                            <label htmlFor="passwordLog">Password</label>
                            <input className="inp" id="passwordLog" name="password" value={inputs.password} onChange={(e) => { handleChanges(e) }}
                                type="password" placeholder="example_$37"></input>
                        </div>
                    </section>
                </fieldset>

                <div className="flex flex-col items-center w-full h-1/4">
                    <GoogleLogin onSuccess={(credentialResponse) => {
                        const data: any = jwtDecode(credentialResponse.credential || '');
                        handleSubmit(data.email, 'google');
                    }} onError={() => { setAlert('Error, try again') }} />
                    <a className="m-4" href="/register">I don't have account</a>
                </div>
                <button className="btn yellow ml-auto" type="submit" >Continue</button>
            </form>
        </div>
    )
}
