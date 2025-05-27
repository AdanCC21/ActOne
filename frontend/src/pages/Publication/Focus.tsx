import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { E_Story } from '../../entities/Story.entity';
import { E_Act } from '../../entities/Act.entity';
import { GetStory } from '../../Hooks/HandleStory';
import { TbLogout2 } from "react-icons/tb";

import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { E_UPD } from '../../entities/UPD.entity';
import { GetUPD } from '../../Hooks/GetUPD';

export default function Focus() {
    const { id } = useParams();
    const navigator = useNavigate();

    const [currentAct, setAct] = useState(0);
    const [currentBlock, setBlock] = useState(0);
    const [final, setFinal] = useState(false);
    const [authorUpd, setUpd] = useState(new E_UPD())


    const [story, setStory] = useState({ story: new E_Story(), acts: [new E_Act()] });
    const [editorState, setEditor] = useState(() => EditorState.createEmpty());


    const handleActs = (goRight) => {
        if (goRight) {
            const temp = currentAct
            const raw = JSON.parse(story.acts[temp + 1].content);
            console.log(raw);
            setAct(prev => prev + 1)
        } else {
            const temp = currentAct
            const raw = JSON.parse(story.acts[temp - 1].content);
            console.log(raw);
            setAct(prev => prev - 1)
        }
    }

    const handleBlocks = (move: number) => {
        const raw = JSON.parse(story.acts[currentAct].content);
        // Si hay otro bloque
        if (currentBlock + move < raw.blocks.length && currentBlock + move >= 0) {
            // Si ese bloque tiene contenido
            if (raw.blocks[currentBlock + move].text) {
                const firstBlock = [raw.blocks[currentBlock + move]];
                raw.blocks = firstBlock;

                const content = convertFromRaw(raw);

                setEditor(EditorState.createWithContent(content));
                setBlock(currentBlock + move)
                setFinal(false)
            } else {
                setBlock(currentBlock + move)
                handleBlocks(move * 2)
                setFinal(false)
            }
        } else {
            // Si hay otro acto
            if (story.acts[currentAct + move]) {
                const raw = JSON.parse(story.acts[currentAct + move].content);
                setAct(prev => prev + move);
                

                let firstBlock;
                if (move > 0) {
                    firstBlock = [raw.blocks[0]]
                    setBlock(0);
                } else {
                    firstBlock = [raw.blocks[raw.blocks.length - 1]]
                    setBlock(raw.blocks.length-1);
                }
                raw.blocks = firstBlock;
                

                const content = convertFromRaw(raw);
                setEditor(EditorState.createWithContent(content));
                setFinal(false)
            }
            else {
                setFinal(true);
            }
        }
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

            try {
                const raw = JSON.parse(result.acts[currentAct].content);
                raw.blocks = [raw.blocks[0]];
                const content = convertFromRaw(raw);
                setEditor(EditorState.createWithContent(content));
            } catch (err) {
                console.error('Error parsing content:', err);
                setEditor(EditorState.createEmpty());
            }
            setStory(result)
            const authorUpd = await GetUPD(result.story.author_id);
            setUpd(authorUpd);
        }
        if (!story.story.id) {
            loadStory();
        }

        const handleTeclta = (e) => {
            if (e.key === 'ArrowRight') {
                handleBlocks(1);
            }
            if (e.key === 'ArrowLeft') {
                handleBlocks(-1);
            }
        }

        window.addEventListener('keydown', handleTeclta);
        return () => {
            window.removeEventListener('keydown', handleTeclta);
        };
    }, [handleBlocks])

    return (
        <div className='flex flex-col h-screen w-screen'>
            <nav className='flex w-screen mt-2'>
                {story.acts[currentAct - 1] ? (
                    <button className='btn void ml-2' onClick={() => { handleActs(false); setFinal(false) }}>
                        <span>
                            {`< ${story.acts[currentAct - 1].title} `}
                        </span>
                    </button>
                ) : (<></>)}

                {story.acts[currentAct + 1] ? (
                    <button className='btn void ml-auto mr-2' onClick={() => { handleActs(true); setFinal(false); }}>
                        <span>
                            {`${story.acts[currentAct + 1].title} >`}
                        </span>
                    </button>
                ) : (<></>)}
            </nav>
            <main className='m-auto'>
                {!final ? (
                    <>
                        {currentAct > 0 ? (
                            <>
                                {true ? (
                                    <button
                                        className='btn alone text-(--gray) hover:text-white opacity-20 hover:opacity-100 mx-auto rotate-270'
                                        style={{ fontSize: '2em' }}
                                        onClick={() => { handleBlocks(-1); }}>{`>`}</button>
                                ) : (<></>)}
                            </>
                        ) : (
                            <>
                                {currentBlock > 0 ? (
                                    <button
                                        className='btn alone text-(--gray) hover:text-white opacity-20 hover:opacity-100 mx-auto rotate-270'
                                        style={{ fontSize: '2em' }}
                                        onClick={() => { handleBlocks(-1); }}>{`>`}</button>
                                ) : (<></>)}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <button
                            className='btn alone text-(--gray) hover:text-white opacity-20 hover:opacity-100 mx-auto rotate-270'
                            style={{ fontSize: '2em' }}
                            onClick={() => { setFinal(false) }}>{`>`}</button>
                    </>
                )}

                {!final ? (
                    <div className='flex flex-col justify-center my-5 min-h-[40vh]'>
                        {currentAct === 0 ? (
                            <h1>{story.story.title}</h1>
                        ) : (<></>)}
                        <h5 className='text-(--yellow-800)'>{story.acts[currentAct].title}</h5>
                        <div className='max-w-[80vw]'>
                            <Editor editorState={editorState} readOnly={true} onChange={() => { }}></Editor>
                        </div>
                        {/* <p>{story.acts[currentAct].content}</p> */}
                    </div>

                ) : (
                    <div className='flex flex-col items-center'>
                        <h5 className='font-medium mb-3'>Historia hecha por</h5>
                        <img src={authorUpd.profile_image_url} className='rounded-full object-cover h-[20vh] aspect-square mb-3 mr-4' />
                        <h2 className='font-bold'>@{authorUpd.user_name}</h2>
                        <button className='btn void' onClick={() => { navigator(`/story/${id}`) }}>Finalizar</button>
                    </div>
                )}
                {final ? (<></>) : (<button className='btn alone text-(--gray) hover:text-white opacity-20 hover:opacity-100 mx-auto rotate-90 '
                    style={{ fontSize: '2em' }}
                    onClick={() => { handleBlocks(1) }}>{`>`}</button>)}

            </main>
            <button className='btn interaction my-2 ml-1 absolute flex items-center bottom-0 left-0 text-(--gray)'
                onClick={() => { navigator(`/story/${id}`) }}>
                <TbLogout2 />
                Salir</button>
        </div >
    )
}
