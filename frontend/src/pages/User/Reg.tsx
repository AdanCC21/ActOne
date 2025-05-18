import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BackendRoute } from '../../context/AppContext';
import ParticlesBg from '../../components/ParticlesBg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

type RegData = {
    userData: {
        email: string,
        type_authentication: string,
        authentication: string
    },
    user_name: string,
    description: string
}

export default function Reg({ }) {

    const navigate = useNavigate();
    const backRoute = useContext(BackendRoute);

    const [currentForm, setForm] = useState(1);
    const [confirmPass, setConf] = useState('');

    useEffect(() => {
        setForm(1);
    }, [])

    const [inputs, setInput] = useState<RegData>({
        userData: {
            email: '',
            type_authentication: '',
            authentication: '',
        },
        user_name: '',
        description: '',
    });

    const [alert, setAlert] = useState("");

    const handleChanges = (e: any) => {
        const { name, value } = e.target;

        const userDataFields = ["email", "type_authentication", "authentication"];

        if (name === 'confirmPass') setConf(value);

        setInput(prev => {
            if (userDataFields.includes(name)) {
                return {
                    ...prev,
                    userData: {
                        ...prev.userData,
                        [name]: value,
                    },
                };
            } else {
                return {
                    ...prev,
                    [name]: value,
                };
            }
        });
    };


    const handleSubmit = async (typeAuth: string, email?: string, name?: string) => {
        try {
            const data = {
                ...inputs,
                userData: {
                    ...inputs.userData,
                    authentication: typeAuth === 'google' ? '' : inputs.userData.authentication,
                    type_authentication: typeAuth,
                    email: email || inputs.userData.email
                },
                user_name: name || inputs.user_name
            };

            const res = await fetch(`${backRoute}api/reg-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error("Something is wrong with the backend " + res.status);
            }

            const dataRes = await res.json();
            // console.log(dataRes);
            if (!dataRes.data) { throw new Error(dataRes.message) }

            sessionStorage.setItem('user', dataRes.user_profile_id);
            navigate('/');

        } catch (error) {
            console.error(error)
            setAlert(error.message);
        }
    }

    const fase1 = () => {
        return (<form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-400) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
            <fieldset className="flex flex-col justify-around h-[40%] mt-[10%]">
                <span className="text-center mx-auto">Register</span>
                <span className='text-(--red-800) text-center'>{alert}</span>
                <div>
                    <label htmlFor="emailLog" >Email</label>
                    <input name="email" value={inputs.userData.email} onChange={(e) => { handleChanges(e) }} id="emailReg" type="email" placeholder="user@gmail.com"></input>
                </div>

                <div>
                    <label htmlFor="passwordReg">Password</label>
                    <input name="authentication" value={inputs.userData.authentication} onChange={(e) => { handleChanges(e) }} id="passwordReg" type="password" placeholder="example_$37"></input>
                </div>

                <div>
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input name="confirmPass" value={confirmPass} onChange={(e) => { handleChanges(e) }} id="confirmPass" type="password" placeholder="example_$37"></input>
                </div>
            </fieldset>

            <div className="flex flex-col items-center w-full h-[20%] ">
                <GoogleLogin
                    onSuccess={(credentialResult) => {
                        const data: any = jwtDecode(credentialResult.credential || '');
                        // console.log(data);
                        handleSubmit('google', data.email, data.name);
                    }}
                />
                {/* <button className="p-2 btn " type="button" aria-label="Continue with google">
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
                    Continue with Google</button> */}
                <a className="m-4" href="/login">Log In</a>
            </div>
            <button className="btn ml-auto" type="submit" onClick={() => {
                confirmPass === inputs.userData.authentication ?
                    setForm(prev => { setAlert(''); return (prev + 1) }) :
                    setAlert('Password and confirmation are different')
            }}>Next</button>
        </form>)
    }

    const fase2 = () => {
        return (
            <form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-400) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
                <legend className="text-center mt-5 text-(--red-100)">
                    {alert == null ? (<span>{alert}</span>) : (<span>Hi, what is your name?</span>)}
                </legend>
                <fieldset className="flex flex-col  h-[70%] max-h-[80%] mt-[10%]">
                    <div className='mb-5'>
                        <label htmlFor="text" >Name</label>
                        <input name="userName" value={inputs.user_name} onChange={(e) => { handleChanges(e) }} id="nameReg" type="text" placeholder="adan_gcm"></input>
                    </div>

                    <div className='max-h-[60%] h-fit'>
                        <label htmlFor="text" >Description</label>
                        <textarea name="description" value={inputs.description} onChange={(e) => { handleChanges(e) }} id="nameReg" placeholder="adan_gcm"></textarea>
                    </div>
                </fieldset>

                <div className="flex w-full justify-between">
                    <button className="btn " type="button" onClick={() => { setForm(prev => (prev - 1)) }} >Return</button>
                    <button className="btn " type="submit" onClick={(e) => { handleSubmit('email'); }} >Next</button>
                </div>
            </form>)
    }

    const getForm = () => {
        switch (currentForm) {
            case 1:
                return fase1();
            case 2:
                return fase2();
            default:
                return fase1();
        }
    }

    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">
            <ParticlesBg></ParticlesBg>
            <header className="mb-[-40px] z-3 flex flex-col">
                <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                <h1 className="text-center font-bold mt-0 text-(--red-500)">ActOne</h1>
            </header>

            {getForm()}
        </div>
    )
}
