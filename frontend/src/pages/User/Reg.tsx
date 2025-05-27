import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ParticlesBg from '../../components/ParticlesBg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { NameAlreadyUsed } from '../../Hooks/ValidateName';
import { EmailInUse } from '../../Hooks/ValidateEmail';
import { RegNewUser } from '../../Hooks/Register';
import { HandleKey } from '../../Hooks/Handles';
import { GetUPD } from '../../Hooks/GetUPD';

import tempUser from '../../assets/tempUser.png'

type RegData = {
    userData: {
        email: string,
        type_authentication: string,
        authentication: string
    },
    user_name: string,
    description: string,
    profile_image_url:string
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
        profile_image_url:'',
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
            const backendResult = await RegNewUser(data, 'email', inputs.userData.email, inputs.user_name, inputs.profile_image_url);
            console.log(backendResult);

            // dataRes.data.user_profile_id
            if (backendResult.data) {
                const upd = await GetUPD(backendResult.data.user_profile_id);
                if (upd) {
                    sessionStorage.setItem('user', JSON.stringify(upd));
                    console.log('session', upd);
                } else {
                    setAlert("Wait, error with the upd");
                }
                setForm(3);
                // navigate('/')
            } else {
                setAlert(backendResult.message)
            };
        } else {
            setAlert('Name already used');
        }
    }

    const validateFase1 = () => {
        if (!inputs.userData.email || !inputs.userData.authentication || !inputs.userData.authentication) {
            setAlert('Please fill in all fields');
            return false;
        }
        if (confirmPass !== inputs.userData.authentication) {
            setAlert('Password and confirmation are different');
            return false;
        }

        if (inputs.userData.authentication.length < 6) {
            setAlert('Password to short');
            return false;
        }

        return true;
    }


    const fase1 = () => {
        return (<form className="flex flex-col h-[60vh] min-w-[25vw] justify-between p-4 bg-(--dark-400) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
            <fieldset className="flex flex-col justify-around h-3/4 mb-5">
                {alert ? (
                    <span className='text-red-600 text-center'>{alert}</span>
                ) : (
                    <h3 className="text-center mx-auto font-medium">Register</h3>
                )}
                <section className='flex flex-col h-3/4'>
                    <div className='my-2'>
                        <label htmlFor="emailLog" >Email</label>
                        <input className="inp" name="email" value={inputs.userData.email} onChange={(e) => { handleChanges(e) }} id="emailReg" type="email" placeholder="user@gmail.com"></input>
                    </div>

                    <div className='my-2'>
                        <label htmlFor="passwordReg">Password</label>
                        <input className="inp" name="authentication" value={inputs.userData.authentication} onChange={(e) => { handleChanges(e) }} id="passwordReg" type="password" placeholder="example_$37"></input>
                    </div>

                    <div className='my-2'>
                        <label htmlFor="confirmPass">Confirm Password</label>
                        <input className="inp" name="confirmPass" value={confirmPass} onChange={(e) => { handleChanges(e) }} id="confirmPass" type="password" placeholder="example_$37"></input>
                    </div>
                </section>
            </fieldset>

            <div className="flex flex-col items-center w-full h-1/4 my-3 ">
                <GoogleLogin onSuccess={async (credentialResult) => {
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
            <button className="btn yellow ml-auto" type="submit" onClick={async () => {
                if (!validateFase1()) return;
                const emialInUse = await EmailInUse(inputs.userData.email);
                if (emialInUse) { setAlert('Email in use'); return }

                setForm(prev => { setAlert(''); return (prev + 1) });
            }}>Next</button>
        </form >)
    }

    const fase2 = () => {
        return (
            <form className="flex flex-col h-[60vh] min-w-[25vw] justify-between p-4 bg-(--dark-400) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
                <legend className="text-center my-5 ">
                    {alert ? (
                        <span className='text-center text-red-600'>{alert}</span>
                    ) : (
                        <h3 className='text-(--yellow-600)'>Hi, what is your name?</h3>
                    )}
                </legend>
                <fieldset className="flex flex-col  h-[70%] max-h-[80%] my-5">
                    <div className='mb-2'>
                        <label htmlFor="text" >Name</label>
                        <input className="inp" name="user_name" value={inputs.user_name} maxLength={10} onChange={(e) => { handleChanges(e) }} id="nameReg" type="text" placeholder="adan_gcm"></input>
                        <small className='ml-auto text-(--gray) mt-2'>{inputs.user_name.length} / 10</small>
                    </div>
                    
                    <div className='mb-2'>
                        <label htmlFor="text" >Image URL</label>
                        <input className="inp" name="profile_image_url" value={inputs.profile_image_url || tempUser} onChange={(e) => { handleChanges(e) }} id="nameReg" type="text" placeholder="URL"></input>
                        <small className='ml-auto text-(--gray) mt-2'>Important, only the URL of a public image</small>
                    </div>

                    <div className='my-2 h-2/3'>
                        <label htmlFor="text" >Description</label>
                        <textarea className="inp h-full" style={{ resize: 'none' }} maxLength={100} name="description" value={inputs.description} onChange={(e) => { handleChanges(e) }} onKeyDown={(e) => { HandleKey(e, HandleSubmit) }} id="nameReg" placeholder="adan_gcm" />
                        <small className='ml-auto text-(--gray) mt-2'>{inputs.description.length} / 100</small>
                    </div>
                </fieldset>

                <button className="btn yellow w-fit ml-auto mt-3" type="submit" onClick={() => { HandleSubmit(); }} >Next</button>
            </form>)
    }

    const fase3 = () => {
        return (
            <div className='flex flex-col bg-(--dark-300) w-fit px-[20px] h-[50vh] rounded-xl'>
                <h2 className='text-center font-semibold mt-5 mb-0'>Profile Preview</h2>
                <section className='flex w-full items-center justify-center px-[10px]'>
                    <article className='flex py-3 justify-center items-center rounded-xl mr-4'>
                        <img className='w-[250px] rounded-full object-cover aspect-square mx-auto' src={inputs.profile_image_url} alt='profile image' />
                    </article>
                    <article>
                        <h4 className='font-bold text-(--yellow-400) mt-4'>@{inputs.user_name}</h4>
                        <p className='text-(--gray)'>{inputs.description}</p>
                    </article>
                </section>

                <div className='flex w-full justify-between  pb-4 mt-auto'>
                    <button className='btn void' onClick={()=>{setForm(2)}}>Return</button>
                    <button className='btn yellow' onClick={()=>{navigate('/')}}>Start</button>
                </div>
            </div>
        )
    }

    const getForm = () => {
        switch (currentForm) {
            case 1:
                return fase1();
            case 2:
                return fase2();
            case 3:
                return fase3();
            default:
                return fase1();
        }
    }

    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">
            <ParticlesBg></ParticlesBg>
            <div className="absolute z-[-2] bg-black opacity-80 h-screen w-screen"></div>
            {currentForm < 3 ? (
                <header className="z-3 flex flex-col">
                    <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                    <h1 className="text-center font-bold mt-0 text-(--yellow-500)">ActOne</h1>
                </header>
            ) : (
                <></>
            )}


            {getForm()}
        </div>
    )
}
