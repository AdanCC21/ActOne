import './css/feed-card.css'
import React, { useEffect } from 'react';
import userProfile from '../assets/tempUser.png';

import { useNavigate } from 'react-router-dom';
import { E_Story } from '../entities/Story.entity';
import { Like, Comments, Mark, Reports } from './Interactions';

type Props = {
    story: E_Story
    author:string
}

export default function FeedCard({ story, author="Autor" }: Props) {
    const navigator = useNavigate();
    const { title, synopsis, acts, likesCount, commentsCount, reportsCount } = story;

    return (
        <article className="feed-card" onClick={() => {
            const temp = 1
            navigator(`/story/${temp}`);
        }}>
            <header className='flex justify-between h-fit'>
                <h4 className='font-semibold text-(--red-500)'>{title}</h4>
                <div className='flex h-full my-auto'>
                    <span className='my-auto mr-2'>{author}</span>
                    <img src={userProfile} />
                </div>
            </header>

            <div className='synopsis'>
                <p>{synopsis}</p>
            </div>

            <section className='interactions '>
                <Like extraClass='mr-2 my-auto' state={false} func={() => { }} amount={likesCount} />
                <Comments extraClass='mx-2 my-auto' func={() => { }} amount={commentsCount} />
                <Mark extraClass='mx-2 my-auto' state={false} func={() => { }} amount={250000} />
                <Reports extraClass='mx-2 my-auto' func={() => { }} amount={reportsCount} />
            </section>
        </article>
    )
}
