import React, { use, useState } from 'react'
import Header from '../../components/Header';
import FeedCard from '../../components/FeedCard';

export default function Profile() {
    const userId = sessionStorage.getItem('user');
    const [tab, setTab] = useState(0);
    const lista1 = [1, 2, 3, 4, 5, 6];
    const lista2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <>
            <Header />
            <div className='flex h-(--page-h)'>
                <main className='flex m-auto w-[95%] h-[95%] bg-(--dark-200) p-5 rounded-2xl'>
                    <section className='flex flex-col h-full w-[20%] '>
                        <article className='flex flex-col h-[60%] items-center'>
                            <img className='w-[50%] h-fit my-4 aspect-square object-cover  rounded-full mx-auto' src='https://kinsta.com/wp-content/uploads/2022/06/nest-js-logo.png' />
                            <h4 className='font-bold'>@{}</h4>
                            <p className='text-(--gray)'>Descripcion bien makabra</p>
                            <div>Items</div>
                        </article>
                    </section>

                    <section className='w-[80%] h-full'>
                        <nav className='flex h-[6%]'>
                            <div className={`px-4 py-2 ${tab === 0 ? 'bg-(--dark-400) text-(--red-500) font-semibold' : 'bg-(--dark-800) text-(--gray)'} cursor-pointer  rounded-t-md transition-all ease-in-out duration-150`}
                                onClick={() => { setTab(0) }}><p>Historias Guardadas</p></div>
                            <div className={`px-4 py-2 ${tab === 1 ? 'bg-(--dark-400) text-(--red-500) font-semibold' : 'bg-(--dark-600) text-(--gray)'} cursor-pointer rounded-t-md`}
                                onClick={() => { setTab(1) }}><p>Historias Publicadas</p></div>
                        </nav>
                        <article className='grid grid-cols-2 gap-5 p-2 bg-(--dark-400) w-full h-[90%]'>
                            {tab === 0 ? lista1.map((current, index) => (
                                <div className='bg-(--dark-200) rounded-2xl p-2 transition-all ease-in-out duration-150'>Contenido {index}</div>
                            )) : lista2.map((current, index) => (
                                <div className='bg-(--dark-200) rounded-2xl p-2 transition-all ease-in-out duration-150'>Contenido {index}</div>
                            ))}
                        </article>

                    </section>
                </main>
            </div>
        </>
    )
}
