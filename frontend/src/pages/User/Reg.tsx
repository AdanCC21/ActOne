import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ParticlesBg from '../../components/ParticlesBg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { NameAlreadyUsed } from '../../Hooks/ValidateName';
import { EmailInUse } from '../../Hooks/ValidateEmail';
import { RegNewUser } from '../../Hooks/Register';
import { HandleKey } from '../../Hooks/Handles';

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
    const [currentForm, setForm] = useState(1);
    const [confirmPass, setConf] = useState('');
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

    useEffect(() => {
        setForm(1);
        sessionStorage.removeItem('user');
    }, [])

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

    const HandleSubmit = async () => {
        const NameUsed = await NameAlreadyUsed(inputs.user_name);
        if (!NameUsed) {
            const data = { ...inputs };
            const backendResult = await RegNewUser(data, 'email', inputs.userData.email, inputs.user_name);
            backendResult.data ? navigate('/') : setAlert(backendResult.message);
        } else {
            setAlert('Name already used');
        }
    }


    const fase1 = () => {
        return (<form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-400) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
            <fieldset className="flex flex-col justify-around h-[40%] mt-[10%]">
                <span className="text-center mx-auto">Register</span>
                <span className='text-(--yellow-800) text-center'>{alert}</span>
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
                    onSuccess={async (credentialResult) => {
                        const data: any = jwtDecode(credentialResult.credential || '');
                        const emialInUse = await EmailInUse(data.email);
                        if (emialInUse) { setAlert('Email in use'); return }

                        setInput(prev => {
                            return {
                                ...prev,
                                userData: {
                                    ...prev.userData,
                                    type_authentication: 'google',
                                    email: data.email,
                                },
                            }
                        })
                        setForm(prev => { setAlert(''); return (prev + 1) })
                    }}
                />
                <a className="m-4" href="/login">I have account</a>
            </div>
            <button className="btn ml-auto" type="submit" onClick={async () => {
                const emialInUse = await EmailInUse(inputs.userData.email);
                if (emialInUse) { setAlert('Email in use'); return }

                confirmPass === inputs.userData.authentication ?
                    setForm(prev => { setAlert(''); return (prev + 1) }) :
                    setAlert('Password and confirmation are different')
            }}>Next</button>
        </form>)
    }

    const fase2 = () => {
        return (
            <form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-400) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
                <legend className="text-center mt-5 text-(--yellow-100)">
                    <span>Hi, what is your name?</span>
                </legend>
                <span className='text-center text-(--yellow-800)'>{alert}</span>
                <fieldset className="flex flex-col  h-[70%] max-h-[80%] mt-[10%]">
                    <div className='mb-5'>
                        <label htmlFor="text" >Name</label>
                        <input name="user_name" value={inputs.user_name} onChange={(e) => { handleChanges(e) }} id="nameReg" type="text" placeholder="adan_gcm"></input>
                    </div>

                    <div className='max-h-[60%] h-fit'>
                        <label htmlFor="text" >Description</label>
                        <textarea name="description" value={inputs.description} onChange={(e) => { handleChanges(e) }} onKeyDown={(e) => { HandleKey(e, HandleSubmit) }} id="nameReg" placeholder="adan_gcm"></textarea>
                    </div>
                </fieldset>


                <button className="btn w-fit ml-auto" type="submit" onClick={() => { HandleSubmit(); }} >Next</button>
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
            <header className="z-3 flex flex-col">
                <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                <h1 className="text-center font-bold mt-0 text-(--yellow-500)">ActOne</h1>
            </header>

            {getForm()}
        </div>
    )
}
