import './css/feed-card.css'
import React, { useEffect, useState } from 'react';
import userProfile from '../assets/tempUser.png';

import { useNavigate } from 'react-router-dom';
import { E_Story } from '../entities/Story.entity';
import { Like, Comments, Mark, Reports } from './Interactions';
import { GetUPD } from '../Hooks/GetUPD';
import { PostLike } from '../Hooks/HandlePD';

type Props = {
    story: E_Story
}


export default function FeedCard({ story }: Props) {
    const navigator = useNavigate();
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const updData = await GetUPD(story.author_id)

                setAuthor(updData.user_name);
            } catch (e) {
                console.error(e.message);
                setAuthor('undefined');
            }
        }
        fetchData();
    }, [])

    const HanldeLike = async () => {
        const fetchData = await PostLike(story.author_id, story.id, 'story');
        console.log(fetchData);
    }

    return (
        <article className="feed-card">
            <div onClick={() => {
                const temp = 1
                navigator(`/story/${temp}`);
            }} >
                <header className='flex justify-between h-fit'>
                    <h4 className='font-semibold text-(--red-500)'>{story.title}</h4>
                    <div className='flex h-full my-auto'>
                        <span className='my-auto mr-2'>{author}</span>
                        <img src={userProfile} />
                    </div>
                </header>

                <div className='synopsis my-3'>
                    <p>{story.synopsis}</p>
                </div>
            </div>

            <section className='interactions ' style={{ zIndex: 2 }}>
                <Like extraClass='mr-2 my-auto' state={false} func={() => { HanldeLike(); }} amount={story.likes_count} />
                <Comments extraClass='mx-2 my-auto' func={() => { }} amount={story.comments_count} />
                <Mark extraClass='mx-2 my-auto' state={false} func={() => { }} amount={story.marked_count} />
                <Reports extraClass='mx-2 my-auto' state={false} func={() => { }} amount={story.reports_count} />
            </section>
        </article>
    )
}
