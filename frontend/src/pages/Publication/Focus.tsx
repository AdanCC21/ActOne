import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { E_Story } from '../../entities/Story.entity';
import { E_Act } from '../../entities/Act.entity';
import { GetStory } from '../../Hooks/GetStory';
import { TbLogout2 } from "react-icons/tb";

export default function Focus() {
    const { id } = useParams();
    const navigator = useNavigate();

    const [currentAct, setAct] = useState(0);
    const [story, setStory] = useState({ story: new E_Story(), acts: [new E_Act()] });
    const [parrafos, setParrafos] = useState('');

    const separarPorParrafos = (texto: string) => {
        return texto
            .split(/\n\s*\n/) // Divide por saltos de línea dobles (pueden tener espacios)
            .map(parrafo => parrafo.trim()) // Elimina espacios extra al inicio y al final
            .filter(parrafo => parrafo.length > 0); // Elimina párrafos vacíos
    }

    useEffect(() => {
        const loadStory = async () => {
            const result = await GetStory(Number(id));

            if (!result) {
                navigator('/404');
                return
            }

            const acts = result.acts.filter(current => current.title != 'Sinopsis');
            result.acts = acts.sort((a, b) => a.act_number - b.act_number);
            setStory(result)
        }
        loadStory();
    }, [])

    return (
        <div className='flex flex-col h-screen w-screen'>
            <nav className='flex w-screen '>
                {story.acts[currentAct - 1] ? (
                    <button className='btn void ml-2' onClick={() => { setAct(prev => prev - 1) }}>
                        <span>
                            {`< ${story.acts[currentAct - 1].title} `}
                        </span>
                    </button>
                ) : (<></>)}

                {story.acts[currentAct + 1] ? (
                    <button className='btn void ml-auto mr-2' onClick={() => { setAct(prev => prev + 1) }}>
                        <span>
                            {`${story.acts[currentAct + 1].title} >`}
                        </span>
                    </button>
                ) : (<></>)}
            </nav>
            <main className='m-auto'>
                {story.acts[currentAct - 1] ? (
                    <button className='btn alone text-(--gray) hover:text-white opacity-20 hover:opacity-100 mx-auto rotate-270' style={{ fontSize: '2em' }}>{`>`}</button>
                ) : (<></>)}

                <div className='flex flex-col justify-center my-5 min-h-[40vh]'>
                    {currentAct === 0 ? (
                        <h1>{story.story.title}</h1>
                    ) : (<></>)}
                    <h5 className='text-(--yellow-800)'>{story.acts[currentAct].title}</h5>
                    <p>{story.acts[currentAct].content}</p>
                </div>

                {story.acts[currentAct + 1] ? (
                    <button className='btn alone text-(--gray) hover:text-white opacity-20 hover:opacity-100 mx-auto rotate-90 ' style={{ fontSize: '2em' }}>{`>`}</button>
                ) : (<></>)}
            </main>
            <button className='btn interaction my-2 ml-1 absolute flex items-center bottom-0 left-0 text-(--gray)'
                onClick={() => { navigator(`/story/${id}`) }}>
                <TbLogout2 />
                Salir</button>
        </div>
    )
}
