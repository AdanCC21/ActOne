import './css/feed-card.css'
import React, { useEffect, useState } from 'react';
import userProfile from '../assets/tempUser.png';

import { useNavigate } from 'react-router-dom';
import { E_Story } from '../entities/Story.entity';
import { Like, Comments, Mark, Reports } from './Interactions';
import { GetUPD } from '../Hooks/GetUPD';
import { PostLike, Report } from '../Hooks/HandlePD'
import { MarkStory } from '../Hooks/Marked';
import { HandleSession, UpdateSession } from '../Hooks/HandleSession';
import { E_UPD } from '../entities/UPD.entity';

import { Editor, EditorState, convertFromRaw } from 'draft-js';

type Props = {
    story: E_Story
    authorName?: string
}

export default function FeedCard({ story, authorName }: Props) {
    if(story.id === 0){
        return (<></>)
    }
    const navigator = useNavigate();
    const [author, setAuthor] = useState(authorName);

    let sessionUpd: any;
    sessionUpd = HandleSession(sessionStorage.getItem('user') || 'invitado');
    if (!sessionUpd) console.error('Invalid session');

    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikesCount] = useState(story.likes_count || 0);

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
                // console.log(updData);
                setAuthor(updData.user_name);
                if (sessionUpd) {
                    if (sessionUpd.stories_liked.includes(story.id)) setLiked(true);
                }
            } catch (e) {
                console.error(e.message);
                setAuthor('undefined');
            }
        }
        if (!authorName) fetchData();
    }, [])

    return (
        <article className="feed-card">
            <div onClick={() => {
                navigator(`/story/${story.id}`);
            }} >
                <header className='flex justify-between h-fit'>
                    <h4 className='font-semibold text-(--yellow-500)'>{story.title}</h4>
                    <div className='flex h-full my-auto'>
                        <span className='my-auto mr-2'>{author}</span>
                        <img src={userProfile} />
                    </div>
                </header>

                <div className='synopsis my-3'>
                    <Editor editorState={synopsisState} readOnly={true} onChange={function (editorState: EditorState): void {
                        throw new Error('Function not implemented.');
                    } } />
                </div>
            </div>

            <section className='interactions ' style={{ zIndex: 2 }}>
                <Like
                    extraClass='mr-2 my-auto'
                    state={isLiked}
                    func={async () => {
                        if (sessionUpd) {
                            const fetchDa = await PostLike(sessionUpd?.id, story.id, 'story', sessionUpd)
                            if (fetchDa) {
                                UpdateSession(fetchDa.upd.data);
                                setLiked(prev => {
                                    prev ? setLikesCount(prev => prev - 1) : setLikesCount(prev => prev + 1)
                                    return !prev;
                                });
                            }
                        }
                    }}
                    amount={likeCount}
                />
                <Comments extraClass='mx-2 my-auto' func={() => { }} amount={story.comments_count} />
                <Mark
                    extraClass='mx-2 my-auto'
                    state={false}
                    func={() => { MarkStory(story.id, sessionUpd.id) }}
                    amount={story.marked_count}
                />
                <Reports
                    extraClass='mx-2 my-auto'
                    state={false}
                    func={() => { Report(story.author_id, story.id) }}
                    amount={story.reports_count}
                />
                <p className='text-(--gray) mx-2'>{story.duration}</p>
                <ul className='mx-2 text-(--gray) max-w-[100px] overflow-x-auto'>
                    {story.labels && story.labels[0] ? story.labels.map((current, index) => (
                        <li key={index}>#{current}</li>
                    )) : null}
                </ul>
            </section>
        </article>
    )
}
