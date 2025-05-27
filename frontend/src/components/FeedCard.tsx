import './css/feed-card.css'
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { E_Story } from '../entities/Story.entity';
import { Like, Comments, Mark, Reports } from './Interactions';
import { GetUPD } from '../Hooks/GetUPD';
import { PostLike, Report } from '../Hooks/HandlePD'
import { MarkStory } from '../Hooks/Marked';
import { HandleSession, UpdateSession } from '../Hooks/HandleSession';

import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { E_UPD } from '../entities/UPD.entity';

type Props = {
    story: E_Story
    authorName?: string
    extraClass?:string
}

export default function FeedCard({ story, authorName, extraClass }: Props) {
    if (story.id === 0) {
        return (<></>)
    }
    const navigator = useNavigate();
    const [authorUpd, setAuthor] = useState(new E_UPD());

    let sessionUpd: any;
    sessionUpd = HandleSession(sessionStorage.getItem('user') || 'invitado');
    if (!sessionUpd) console.error('Invalid session');

    const [userPdState, setPD] = useState({ like: { amount: story.likes_count, state: false }, marked: { amount: story.marked_count, state: false } })

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
                setAuthor(updData);
                
                const liked = sessionUpd.stories_liked.includes(story.id);
                const marked = sessionUpd.marked_stories.includes(story.id);
                setPD(prev => { return { ...prev, like: { amount: story.likes_count, state: liked }, marked: { amount: story.marked_count, state: marked } } });
            } catch (e) {
                console.error(e.message);
            }
        }
        if (!authorName) fetchData();
    }, [])

    return (
        <article className={`feed-card ${extraClass}`}>
            <div>
                <button></button>
            </div>
            <div onClick={() => {
                navigator(`/story/${story.id}`);
            }} >
                <header className='flex justify-between h-fit'>
                    <h4 className='font-semibold text-(--yellow-500)'>{story.title}</h4>
                    <div className='flex h-full my-auto'>
                        <span className='my-auto mr-2'>{authorUpd.user_name}</span>
                        <img src={authorUpd.profile_image_url} className='rounded-full aspect-square object-cover' />
                    </div>
                </header>

                <div className='synopsis my-3'>
                    <Editor editorState={synopsisState} readOnly={true} onChange={function (editorState: EditorState): void {
                        throw new Error('Function not implemented.');
                    }} />
                </div>
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
                    state={false}
                    func={() => { Report(story.author_id, story.id) }}
                    amount={story.reports_count}
                />
                <p className='text-(--gray) mx-2'>{story.duration}</p>
                <ul className='flex mx-2 text-(--gray) overflow-x-auto'>
                    {story.labels && story.labels[0] ? story.labels.map((current, index) => (
                        <li className='mr-2' key={index}>#{current}</li>
                    )) : null}
                </ul>
            </section>
        </article>
    )
}
