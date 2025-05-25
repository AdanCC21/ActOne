import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { E_Story } from '../../entities/Story.entity';
import { E_Act } from '../../entities/Act.entity';
import { GetStory } from '../../Hooks/HandleStory';
import { TbLogout2 } from "react-icons/tb";

import { Editor, EditorState, convertFromRaw } from 'draft-js';

export default function Focus() {
    const { id } = useParams();
    const navigator = useNavigate();

    const [currentAct, setAct] = useState(0);
    const [currentBlock, setBlock] = useState(0);

    const [story, setStory] = useState({ story: new E_Story(), acts: [new E_Act()] });
    const [editorState, setEditor] = useState(() => EditorState.createEmpty());


    const handleActs = (goRight) => {
        goRight ? setAct(prev => prev + 1) : setAct(prev => prev - 1)
    }

    const handleBlocks = (move:number) => {
        const raw = JSON.parse(story.acts[currentAct].content);
        // Si hay otro bloque
        if (currentBlock + move < raw.blocks.length && currentBlock + move >= 0) {
            // Si ese bloque tiene contenido
            if (raw.blocks[currentBlock + move].text) {
                console.log('punto 1');
                console.log(currentBlock, move)
                const firstBlock = [raw.blocks[currentBlock + move]];
                raw.blocks = firstBlock;

                const content = convertFromRaw(raw);

                setEditor(EditorState.createWithContent(content));
                setBlock(currentBlock + move)
            } else {
                console.log('punto 2');
                console.log(currentBlock, move)
                setBlock(currentBlock + move)
                handleBlocks(move * 2)
            }
        } else {
            // Si hay otro acto
            if (story.acts[currentAct + move]) {
                console.log('sigueinte acto')

                const raw = JSON.parse(story.acts[currentAct + move].content);
                setAct(prev => prev + move);
                setBlock(0);

                const firstBlock = [raw.blocks[0]];
                raw.blocks = firstBlock;

                const content = convertFromRaw(raw);
                setEditor(EditorState.createWithContent(content));
            }
            else {
                console.log('Final')
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
        }
        loadStory();
    }, [])

    return (
        <div className='flex flex-col h-screen w-screen'>
            <nav className='flex w-screen '>
                {story.acts[currentAct - 1] ? (
                    <button className='btn void ml-2' onClick={() => { handleActs(false) }}>
                        <span>
                            {`< ${story.acts[currentAct - 1].title} `}
                        </span>
                    </button>
                ) : (<></>)}

                {story.acts[currentAct + 1] ? (
                    <button className='btn void ml-auto mr-2' onClick={() => { handleActs(true) }}>
                        <span>
                            {`${story.acts[currentAct + 1].title} >`}
                        </span>
                    </button>
                ) : (<></>)}
            </nav>
            <main className='m-auto'>
                {true ? (
                    <button
                        className='btn alone text-(--gray) hover:text-white opacity-20 hover:opacity-100 mx-auto rotate-270'
                        style={{ fontSize: '2em' }}
                        onClick={() => { handleBlocks(-1) }}>{`>`}</button>
                ) : (<></>)}

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

                {true ? (
                    <button className='btn alone text-(--gray) hover:text-white opacity-20 hover:opacity-100 mx-auto rotate-90 '
                        style={{ fontSize: '2em' }}
                        onClick={() => { handleBlocks(1) }}>{`>`}</button>
                ) : (<></>)}
            </main>
            <button className='btn interaction my-2 ml-1 absolute flex items-center bottom-0 left-0 text-(--gray)'
                onClick={() => { navigator(`/story/${id}`) }}>
                <TbLogout2 />
                Salir</button>
        </div>
    )
}
