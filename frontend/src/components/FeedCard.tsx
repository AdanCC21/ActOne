import './css/feed-card.css'
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { E_Story } from '../entities/Story.entity';
import { Like, Comments, Mark, Reports } from './Interactions';
import { GetUPD } from '../Hooks/GetUPD';
import { PostLike, Report } from '../Hooks/HandlePD'
import { MarkStory } from '../Hooks/Marked';
import { HandleSession, UpdateSession } from '../Hooks/HandleSession';

import tempUser from '../assets/tempUser.png'
import { FaRegTrashAlt } from "react-icons/fa";
import edit from '../assets/icons/pencil.svg'
import warning from '../assets/icons/warning.svg'

import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { E_UPD } from '../entities/UPD.entity';
import { DeleteStory, UpdateStory } from '../Hooks/HandleStory';
import Modal2 from './Modal2';

type Props = {
    story: E_Story
    authorName?: string
    extraClass?: string
    isTheAuthor?: boolean
    session?: any
}

export default function FeedCard({ story, authorName, extraClass, isTheAuthor, session }: Props) {
    if (story.id === 0) {
        return (<></>)
    }
    const navigator = useNavigate();
    const [authorUpd, setAuthor] = useState(new E_UPD());

    let sessionUpd: any;
    sessionUpd = HandleSession(sessionStorage.getItem('user') || 'invitado');
    if (!sessionUpd) console.error('Invalid session');

    const [userPdState, setPD] = useState({
        like: { amount: story.likes_count, state: false },
        marked: { amount: story.marked_count, state: false },
        reported: { amount: story.reports_count, state: false }
    })

    // Crear estado para mostrar la sinopsis con Draft.js
    let synopsisState = EditorState.createEmpty();
    try {
        const raw = JSON.parse(story.synopsis || '{}');
        const content = convertFromRaw(raw);
        synopsisState = EditorState.createWithContent(content);
    } catch (e) {
        console.error('Error parsing synopsis DraftJS content:', e);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const updData = await GetUPD(story.author_id)
                console.log(updData);
                setAuthor(updData);

                const liked = sessionUpd.stories_liked.includes(story.id);
                const marked = sessionUpd.marked_stories.includes(story.id);
                setPD(prev => ({
                    ...prev,
                    like: { amount: story.likes_count, state: liked },
                    marked: { amount: story.marked_count, state: marked },
                    reported: { amount: story.reports_count, state: false }
                }));
            } catch (e) {
                console.error(e.message);
            }
        }
        if (!authorName) fetchData();
    }, [])

    const [modalVis, setVisModal] = useState(false);
    const [deleteModal, setDelete] = useState(false);
    const [vis, setVis] = useState(false);

    const handleDetails = (e: any) => {
        const { value } = e.target;
        value === 'true' ? setVis(true) : setVis(false)
    }

    const updateVisibility = async (storyId: number, newVisibility: boolean) => {
        UpdateStory(storyId, { visibility: newVisibility });
    }

    return (
        <section className={`feed-card ${extraClass}`}>
            <Modal2 isOpen={modalVis} onClose={() => { setVisModal(!modalVis) }}>
                <form className='flex flex-col' onSubmit={(e) => { e.preventDefault() }}>
                    <h2>Change Visibility</h2>

                    <FeedCard story={story} extraClass='w-full' />

                    <fieldset className="mb-5 flex flex-col">
                        <h5 className="text-(--yellow-500)">Visibility</h5>
                        <select className="bg-black px-3 py-2" name="visibility" onChange={(e) => { handleDetails(e) }}>
                            <option value={'false'}>Private</option>
                            <option value={'true'}>Public</option>
                        </select>
                    </fieldset>

                    <div className='flex w-full'>
                        <button className='btn ml-auto mr-2' onClick={() => { setVisModal(!modalVis) }}>Cancelar</button>
                        <button className='btn yellow' onClick={() => { updateVisibility(story.id, vis); setVisModal(!modalVis) }}>Continuar</button>
                    </div>
                </form>
            </Modal2>

            <Modal2 isOpen={deleteModal} onClose={() => { setDelete(!deleteModal) }}>
                <form className='flex flex-col items-center justify-center w-full h-full' onSubmit={(e) => { e.preventDefault() }}>
                    <h2 className='font-semibold text-center'>Estas seguro de eliminar la historia?</h2>
                    <FeedCard story={story} extraClass='w-full' />

                    <div className='flex mt-5 ml-auto items-center '>
                        <button className='mr-5 btn' onClick={() => { setDelete(!deleteModal) }}>Cancelar</button>
                        <button className='btn yellow' onClick={() => { DeleteStory(story.id, session) }}>
                            Continuar <img src={warning} alt='delete' />
                        </button>
                    </div>
                </form>
            </Modal2>
            <div onClick={() => {
                navigator(`/story/${story.id}`);
            }} >
                <header className='flex justify-between h-fit'>
                    <h4 className='font-semibold text-(--yellow-500)'>{story.title}</h4>
                    <div className='flex h-full my-auto'>
                        <span className='my-auto mr-2'>{authorUpd.user_name}</span>
                        <img src={authorUpd.profile_image_url || tempUser} className='rounded-full aspect-square object-cover' />
                    </div>
                </header>

                <data className='synopsis my-3'>
                    <Editor editorState={synopsisState} readOnly={true} onChange={function (editorState: EditorState): void {
                        throw new Error('Function not implemented.');
                    }} />
                </data>
            </div>

            <section className='interactions ' style={{ zIndex: 2 }}>
                <Like
                    extraClass='mr-2 my-auto'
                    state={userPdState.like.state}
                    func={async () => {
                        if (sessionUpd) {
                            const fetchDa = await PostLike(sessionUpd?.id, story.id, 'story', sessionUpd)
                            if (fetchDa) {
                                UpdateSession(fetchDa.upd.data);
                                let amount
                                if (userPdState.like.state) { amount = userPdState.like.amount - 1 } else { amount = userPdState.like.amount + 1 }
                                setPD(prev => { return { ...prev, like: { amount: amount, state: !prev.like.state } } });
                            }
                        }
                    }}
                    amount={userPdState.like.amount}
                />
                <Comments extraClass='mx-2 my-auto' func={() => { }} amount={story.comments_count} />
                <Mark
                    extraClass='mx-2 my-auto'
                    state={userPdState.marked.state}
                    func={async () => {
                        if (sessionUpd) {
                            const fetchData = await MarkStory(story.id, sessionUpd.id)
                            if (fetchData) {
                                UpdateSession(fetchData);
                                let amount: number;
                                if (userPdState.marked.state) { amount = userPdState.marked.amount - 1 } else { amount = userPdState.marked.amount + 1 }
                                setPD(prev => { return { ...prev, marked: { amount: amount, state: !prev.marked.state } } });
                            }
                        }
                    }}
                    amount={userPdState.marked.amount}
                />
                <Reports
                    extraClass='mx-2 my-auto'
                    func={async () => {
                        if (sessionUpd) {
                            const fetchData = await Report(story.author_id, story.id);
                            if (fetchData) {
                                if (!userPdState.reported.state) {
                                    setPD(prev => ({
                                        ...prev,
                                        reported: {
                                            amount: prev.reported.amount + 1,
                                            state: !prev.reported.state
                                        }
                                    }));
                                } else {
                                    setPD(prev => ({
                                        ...prev,
                                        reported: {
                                            amount: prev.reported.amount - 1,
                                            state: !prev.reported.state
                                        }
                                    }));
                                }
                            }
                        }
                    }}
                    amount={userPdState.reported.amount}
                />

                <p className='text-(--gray) mx-2'>{story.duration}</p>
                <ul className='flex mx-2 text-(--gray) overflow-x-auto'>
                    {story.labels && story.labels[0] ? story.labels.map((current, index) => (
                        <li className='mr-2' key={index}>#{current}</li>
                    )) : null}
                </ul>
            </section>
            {isTheAuthor ? (
                <div className='flex w-full'>
                    <button className='ml-auto btn' onClick={() => { setVisModal(!modalVis) }}>
                        <img className='w-[20px]' src={edit} alt='Edit' />
                    </button>
                    <button className='ml-2 btn yellow' onClick={() => { setDelete(!deleteModal) }}>
                        <FaRegTrashAlt />
                    </button>

                </div>
            ) : (<></>)}
        </section>

    )
}
