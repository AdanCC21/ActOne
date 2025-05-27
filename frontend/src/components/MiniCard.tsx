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
import FeedCard from './FeedCard';

type Props = {
    story: E_Story
    authorName?: string
    extraClass?: string
    isTheAuthor?: boolean
    session?: any
}

export default function MiniCard({ story, authorName, extraClass, isTheAuthor, session }: Props) {
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
        const hook = await UpdateStory(storyId, { visibility: newVisibility });
    }

    return (
        <section className={`feed-card mini ${extraClass}`}>
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

        </section>

    )
}
