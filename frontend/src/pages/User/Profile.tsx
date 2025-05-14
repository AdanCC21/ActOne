import React, { use, useEffect, useState } from 'react'
import Header from '../../components/Header';
import { GetUPD } from '../../Hooks/GetUPD';
import { GetStory } from '../../Hooks/GetStory';
import { E_UPD } from '../../entities/UPD.entity';
import { E_Story } from '../../entities/Story.entity';

import Like from '../../assets/void_like.png';
import VoidMark from '../../assets/mark.png';
import Comments from '../../assets/comments.svg'
import { FaRegUser } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";

export default function Profile() {
    const userId = sessionStorage.getItem('user');
    const [currentUser, setUser] = useState(new E_UPD());
    const [pubList, setPub] = useState([new E_Story()]);
    // 0 Historias Publicadas, 1 Historias Guardadas
    const [tab, setTab] = useState(0);
    const lista1 = [1, 2, 3, 4, 5, 6];
    const lista2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    useEffect(() => {
        const funcion = async () => {
            if (userId != null) {
                const upd = await GetUPD(Number(userId));
                if (!upd) return null;
                setUser(upd);
                const pubStories = upd.published_stories.map(async (current: number) => {
                    const res = await GetStory(current);
                    if (res != null || res != undefined) {
                        return res;
                    }
                })
                console.log(pubList);
                setPub(pubStories);
            }
        }
        funcion();
    }, [])
    return (
        <>
            <Header />
            <div className='flex h-(--page-h)'>
                <main className='flex m-auto w-[95%] h-[95%] bg-(--dark-200) p-5 rounded-2xl'>
                    <section className='flex flex-col h-full w-[20%] '>
                        <article className='flex flex-col h-[60%] items-center'>
                            <img className='w-[50%] h-fit my-4 aspect-square object-cover  rounded-full mx-auto' src='https://kinsta.com/wp-content/uploads/2022/06/nest-js-logo.png' />
                            <h4 className='font-bold'>@{currentUser.user_name}</h4>
                            <p className='text-(--gray)'>{currentUser.description}</p>
                            <ul className='flex flex-wrap justify-around w-[80%] my-3 text-[#9a9999]'>
                                {/* Me hace falta un fetch para obtener los likes y comentarios  del usuario*/}
                                <li className='flex items-center mx-5'> <img src={Like} className='h-[15px] mr-2' /> 0 </li>
                                <li className='flex items-center mx-5'> <img src={Comments} className='h-[15px] mr-2' /> 0 </li>
                                <li className='flex items-center mx-5'> <img src={VoidMark} className='h-[15px] mr-2' /> 0 </li>
                                <li className='flex items-center mx-5'> <FaRegUser className='h-[15px] mr-2' /> {currentUser.followers} </li>
                                <li className='flex items-center mx-5'> <RiUserFollowLine className='h-[15px] mr-2' /> {currentUser.following} </li>
                            </ul>
                        </article>
                    </section>

                    <section className='w-[80%] h-full'>
                        <nav className='flex h-[6%]'>
                            <div className={`px-4 py-2 ${tab === 0 ? 'bg-(--dark-400) text-(--red-500) font-semibold' : 'bg-(--dark-800) text-(--gray)'} cursor-pointer  rounded-t-md transition-all ease-in-out duration-150`}
                                onClick={() => { setTab(0) }}><p>Historias Publicadas</p></div>
                            <div className={`px-4 py-2 ${tab === 1 ? 'bg-(--dark-400) text-(--red-500) font-semibold' : 'bg-(--dark-600) text-(--gray)'} cursor-pointer rounded-t-md`}
                                onClick={() => { setTab(1) }}><p>Historias Guardadas</p></div>
                        </nav>
                        <article className='grid grid-cols-2 gap-5 p-2 bg-(--dark-400) w-full h-[90%]'>
                            {tab === 0 ? pubList.map((current, index) => {
                                console.log("Acutalaaaaaa" + current); return (
                                    <div className='bg-(--dark-200) rounded-2xl p-2 transition-all ease-in-out duration-150'><h2>{ }</h2></div>
                                )
                            }) : lista2.map((current, index) => (
                                <div className='bg-(--dark-200) rounded-2xl p-2 transition-all ease-in-out duration-150'>Contenido {index}</div>
                            ))}
                        </article>
                    </section>
                </main>
            </div>
        </>
    )
}
