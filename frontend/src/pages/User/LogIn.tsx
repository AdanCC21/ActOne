import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ParticlesBg from "../../components/ParticlesBg";
import { logIn } from "../../Hooks/LogIn";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';


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

    const validateInputs = () => {
        if (inputs.email != "") {
            if (inputs.password != "" && inputs.password.length > 6) {
                return { message: 'ok', status: true };
            }
            return { message: "Contraseña muy corta", status: false };
        }
        return { message: "Correo vacio o invalido", status: false };
    }

    const handleSubmit = async (email: string, authType: string, pass?: string) => {
        try {
            // const validate = validateInputs();
            // if (!validate.status) setAlert(validate.message); throw;
            const fetchLogin = await logIn(email, authType, pass);
            sessionStorage.setItem('user', String(fetchLogin.user_profile_id))
            navigate('/')
        } catch (e) {
            setAlert(e.message);
        }
    }

    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">
            <ParticlesBg></ParticlesBg>
            <header className="mb-[-40px] z-3 flex flex-col">
                <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                <h1 className="text-center font-bold mt-0 text-(--red-500)">ActOne</h1>
                <span className="text-center mx-auto">LogIn</span>
            </header>


            <form className="flex flex-col h-[70vh] min-w-[25vw] max-w-[80vw] justify-between p-4 bg-(--dark-400) rounded-2xl"
                onSubmit={(e) => { handleSubmit(inputs.email, 'email', inputs.password); e.preventDefault(); }}>
                <fieldset className="flex flex-col justify-around h-[40%] mt-[10%]">
                    {alert == "Login" ? (<div className="max-h-[50px] w-fit mx-auto">
                        <DotLottieReact
                            src="https://lottie.host/d0314f19-be77-48f1-8299-44406cef8edc/ldhSr6NV2l.lottie"
                            loop
                            autoplay
                        />
                    </div>) : (<div className="text-(--red-700) text-center">{alert}</div>)}
                    <div>
                        <label htmlFor="emailLog" >Email</label>
                        <input id="emailLog" name="email" value={inputs.email} onChange={(e) => { handleChanges(e) }}
                            type="email" placeholder="user@gmail.com"></input>
                    </div>

                    <div>
                        <label htmlFor="passwordLog">Password</label>
                        <input id="passwordLog" name="password" value={inputs.password} onChange={(e) => { handleChanges(e) }}
                            type="password" placeholder="example_$37"></input>
                    </div>
                </fieldset>

                <div className="flex flex-col items-center w-full h-[20%] ">
                    <GoogleLogin onSuccess={(credentialResponse) => {
                        const data: any = jwtDecode(credentialResponse.credential || '');
                        console.log(data.email);
                        handleSubmit(data.email, 'google');
                    }} onError={() => { setAlert('Error, try again') }} />
                    {/* <button className="p-2 btn" type="button" aria-label="Continue with google">
                        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
                        Continue with Google</button> */}
                    <a className="m-4" href="/register">I don't have account</a>
                </div>
                <button className="btn red ml-auto" type="submit" >Continue</button>
            </form>
        </div>
    )
}
