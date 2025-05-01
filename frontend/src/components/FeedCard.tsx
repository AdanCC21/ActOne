import './css/feed-card.css'
import React from 'react';
import userProfile from '../assets/tempUSer.png';

import { useNavigate } from 'react-router-dom';
import { Synopsis } from '../Objects/synopsis';
import { Like, Comments, Mark, Reports } from './Interactions';

type Props = {
    story: Synopsis
}

export default function FeedCard({ story }: Props) {
    const navigator = useNavigate();
    const { title = "Title", desc = "Description...", author = "Author", likeCount = 0, comCount = 0, markCount = 0, repCount = 0 } = story;

    return (
        <article className="feed-card" onClick={() => {
            navigator('/story')
        }}>
            <header className='flex justify-between h-fit'>
                <h2>{title}</h2>
                <div className='flex h-full my-auto'>
                    <span className='my-auto mr-2'>{author}</span>
                    <img src={userProfile} />
                </div>
            </header>

            <div className='synopsis'>
                <p>{desc}</p>
            </div>

            <section className='interactions '>
                <Like extraClass='mr-2 my-auto' state={false} func={() => { }} amount={2500000} />
                <Comments extraClass='mx-2 my-auto' func={() => { }} amount={2205} />
                <Mark extraClass='mx-2 my-auto' state={false} func={() => { }} amount={250000} />
                <Reports extraClass='mx-2 my-auto' func={() => { }} amount={15} />
            </section>
        </article>
    )
}
