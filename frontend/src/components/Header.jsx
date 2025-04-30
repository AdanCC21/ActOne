import appIocon from '../assets/appIcon.svg'
import update from '../assets/update.svg'
import notification from '../assets/notification.svg'
import searcher from '../assets/buscador.png'
import tempUser from '../assets/tempUser.png'
import './css/header.css'
import Modal from './Modal'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Header({ }) {
    let [modalAnimation, setAnimation] = useState("hidden");
    let [title, setTitle] = useState("");
    let [actTitle, setAct] = useState("");
    let [alert, setAlert] = useState("");
    let [currentMod, setModal] = useState(0);
    const navigate = useNavigate();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleAct = (e) => {
        setAct(e.target.value);
    }

    const handleKey = (e) => {
        if (e.key === "Enter") {
            handleStorie();
        }
    }

    const handleStorie = (e) => {
        if (title.length == 0) {
            setAlert("empty title");
            return;
        } else {
            navigate(`/edit/${title}`);
        }

    }

    return (
        <header className='header'>

            <Modal extraClass={modalAnimation}  >
                <form className='flex flex-col px-2' onSubmit={(e) => { handleStorie(e); e.preventDefault(); }}>
                    <label htmlFor='title'><h3 className='text-(--red-500) font-semibold my-2'>Titulo</h3></label>
                    <div className='flex flex-col my-2'>
                        <input id='title' placeholder='Titulo' className='my-auto'
                            name='title' value={title} onChange={(e) => { handleTitle(e) }} onKeyDown={(e) => { handleKey(e) }} />
                            {alert===''?(
                                <span className='none text-(--red-600) '>{alert}</span>
                            ):(
                                <span className='text-(--red-600) '>{alert}</span>
                            )}
                    </div>
                    <div className='flex w-full ml-auto mt-auto'>
                        <button type='button' className='btn void w-fit ml-auto ' onClick={() => { setAnimation("fadeOut"); setAlert('') }}>Cancelar</button>
                        <button type='submit' className='btn red w-fit ml-3'>Subir</button>
                    </div>
                </form>
            </Modal>


            <div onClick={()=>{navigate('/home')}} className='flex flex-row items-center h-full ml-3 cursor-pointer'>
                <img className='h-[50%] my-auto mr-3' src={appIocon} alt='actOneIcon' />
                <h3 className='my-auto font-semibold text-(--red-500)'>ActOne</h3>
            </div>

            <div className='h-nav'>
                <form className='flex flex-row bg-(--dark-500)' onSubmit={(e) => { e.preventDefault(); }}>
                    <input className='rounded-2xl' id='searcher' type='text' ></input>
                    <button className="btn m-auto " type="button" aria-label="search something">
                        <img src={searcher} alt='searcher' />
                    </button>
                </form>
                <div>
                    <img className='cursor-pointer' src={update} alt='update storie' onClick={() => { setAnimation("show fadeIn") }} />
                    <img src={notification} alt='notification' />
                    <img className='user-icon' src={tempUser} alt='user' />
                </div>
            </div>
        </header>
    )
}
