import appIocon from '../assets/appIcon.svg'
import update from '../assets/update.svg'
import notification from '../assets/notification.svg'
import searcher from '../assets/buscador.png'
import tempUser from '../assets/tempUser.png'
import './css/header.css'
import Modal from './Modal'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { SearchStory } from '../Hooks/GetStory'

export default function Header({ }) {
    const userId = sessionStorage.getItem('user');

    const [modalAnimation, setAnimation] = useState("hidden");
    const [title, setTitle] = useState("");
    const [alert, setAlert] = useState("");
    const [inputSearch, setSearch] = useState("");
    const [searchRes, setResults] = useState([]);

    const navigate = useNavigate();

    const handleTitle = (e) => {
        setTitle(e.target.value);
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

    const handleSearch = async (e) => {
        const { value } = e.target;
        setSearch(value);

        if (!value || value.length <= 1) return;

        let fetchBack;


        switch (value[0]) {
            case '@':
                fetchBack = await SearchStory(value.slice(1), 'author');
                break;
            case '~':
                fetchBack = await SearchStory(value.slice(1), 'duration');
                break;
            case '#':
                fetchBack = await SearchStory(value.slice(1), 'labels');
                break;
            case '-':
                fetchBack = await SearchStory(value.slice(1), 'acts');
                break;
            default:
                fetchBack = await SearchStory(value, 'title');
                break;
        }

        if (fetchBack) {
            fetchBack.data ? setResults(fetchBack.data) : setResults([]);
        }
    };


    return (
        <header className='header'>
            <Modal extraClass={modalAnimation}  >
                <form className='flex flex-col px-2' onSubmit={(e) => { handleStorie(e); e.preventDefault(); }}>
                    <label htmlFor='title'><h3 className='text-(--red-500) font-semibold my-2'>Titulo</h3></label>
                    <div className='flex flex-col my-2'>
                        <input id='title' placeholder='Titulo' className='my-auto'
                            name='title' value={title} onChange={(e) => { handleTitle(e) }} onKeyDown={(e) => { handleKey(e) }} />
                        {alert === '' ? (
                            <span className='none text-(--red-600) '>{alert}</span>
                        ) : (
                            <span className='text-(--red-600) '>{alert}</span>
                        )}
                    </div>
                    <div className='flex w-full ml-auto mt-auto'>
                        <button type='button' className='btn void w-fit ml-auto ' onClick={() => { setAnimation("fadeOut"); setAlert('') }}>Cancelar</button>
                        <button type='submit' className='btn red w-fit ml-3'>Subir</button>
                    </div>
                </form>
            </Modal>

            <div onClick={() => { navigate('/') }} className='flex flex-row items-center h-full ml-3 cursor-pointer'>
                <img className='h-[50%] my-auto mr-3' src={appIocon} alt='actOneIcon' />
                <h3 className='my-auto font-semibold text-(--red-500)'>ActOne</h3>
            </div>

            <div className='h-nav'>
                <form className='h-nav-search' onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset className='h-nav-input '>
                        <input className='h-nav-input-search-box' id='searcher'
                            type='text' value={inputSearch} onChange={(e) => { handleSearch(e) }} />
                        {searchRes[0] && inputSearch ? (<section className='h-nav-input-box'>
                            <ul>
                                {searchRes.map((current, index) => (
                                    <li className='mb-2 hover:outline-1' onClick={() => { navigate(`/story/${current.id}`) }}>{current.title}</li>
                                ))}
                            </ul>
                        </section>) : (<></>)}

                    </fieldset>
                    <button className="btn red my-auto h-nav-search-btn" type="button" aria-label="search something">
                        <img src={searcher} alt='searcher' />
                    </button>
                </form>

                <div className='h-nav-items'>
                    <div className='h-nav-add' onClick={() => {
                        !userId ? navigate('/login') : setAnimation("show fadeIn")
                    }} >
                        <span className='mr-2'>+</span>Add
                    </div>
                    <img className='user-icon' src={tempUser} alt='user' onClick={() => { !userId ? navigate('/login') : navigate('/profile/pub') }} />
                </div>
            </div>
        </header>
    )
}
