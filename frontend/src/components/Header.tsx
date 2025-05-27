import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { SearchStory } from '../Hooks/HandleStory'
import { HandleSession } from '../Hooks/HandleSession'
import { ThemeContext } from '../context/AppContext'

import Modal2 from './Modal2'

import searcher from '../assets/icons/searchBlack.svg'
import tempUser from '../assets/tempUser.png'
import sun from '../assets/icons/sun.svg'
import './css/header.css'


export default function Header({ }) {
    let sessionUser;
    sessionUser = HandleSession(sessionStorage.getItem('user') || 'invitado');

    const context = useContext(ThemeContext);

    const [modalState, setModal] = useState(false);
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
            handleStorie(e);
        }
    }

    const handleStorie = (e) => {
        if (title.length == 0) {
            setAlert("empty title");
            return;
        } else {
            setModal(false);
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
        <header className={`header ${context?.isLightMode ? 'bg-[#e0e0e0] text-black' : 'bg-(--dark-primary) text-white'}`}>
            <Modal2 isOpen={modalState} onClose={() => { setModal(false) }} extraClass='max-w-[25vw]'>
                <form className='flex flex-col px-2' onSubmit={(e) => { handleStorie(e); e.preventDefault(); }}>

                    <label htmlFor='title'><h3 className='text-(--yellow-500) font-semibold my-2'>Titulo</h3></label>
                    {alert ? (
                        <span className='text-red-600'>{alert}</span>
                    ) : (
                        <span className='text-(--gray)'>Use a short title for your story</span>
                    )}
                    <div className='flex flex-col my-2'>
                        <input id='title' placeholder='Titulo' maxLength={25} className='inp'
                            name='title' value={title} onChange={(e) => { handleTitle(e) }} onKeyDown={(e) => { handleKey(e) }} />
                        <small className='ml-auto mt-2 mr-2 text-(--gray)'>{title.length} / 25</small>

                    </div>

                    <div className='flex w-full ml-auto mt-5'>
                        <button type='button' className='btn void w-fit ml-auto ' onClick={() => { setModal(false); setAlert('') }}>Cancelar</button>
                        <button type='submit' className='btn yellow w-fit ml-3'>Subir</button>
                    </div>
                </form>
            </Modal2>

            <div className='flex flex-row items-center h-full ml-3 cursor-pointer'>
                <h3 className='my-auto font-semibold text-(--yellow-500)' onClick={() => { navigate('/') }}>ActOne</h3>
                {/* <button className='btn void ml-2' onClick={() => { context?.setIsLightMode(!context.isLightMode) }}>
                    <img src={sun} alt='Change Theme' />
                </button> */}
            </div>

            <div className='h-nav'>
                <form className='h-nav-search' onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset className='w-[40vw] items-center justify-center'>
                        <input autoComplete='off' className='inp w-full h-full' id='searcher' placeholder='Search Here'
                            type='text' value={inputSearch} onChange={(e) => { handleSearch(e) }} />

                        <section className={`${searchRes[0] && inputSearch ? 'fadeIn' : 'fadeOut'} h-nav-input-box px-[10px] py-2 `}>
                            <ul>
                                {searchRes.map((current: any, index) => (
                                    <li className='mb-1 py-1 px-2 rounded-xl hover:bg-(--dark-800)' onClick={() => { navigate(`/story/${current.id}`) }}>{current.title}</li>
                                ))}
                            </ul>
                        </section>

                    </fieldset>
                    <button className="btn yellow" type="button" aria-label="search something">
                        <img src={searcher} alt='searcher' />
                    </button>
                </form>

                <div className='h-nav-items'>
                    <div className='h-nav-add' onClick={() => {
                        !sessionUser.id ? navigate('/login') : setModal(true)
                    }} >
                        <span className='mr-2'>+</span>Add
                    </div>
                    <img className='user-icon rounded-full h-fit object-cover aspect-square' src={sessionUser.profile_image_url || tempUser} alt='user' onClick={() => { !sessionUser.id ? navigate('/login') : navigate('/profile/pub') }} />
                </div>
            </div>
        </header>
    )
}
