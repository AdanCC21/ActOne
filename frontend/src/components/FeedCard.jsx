import './css/feed-card.css'
import userProfile from '../assets/tempUSer.png';
import save from '../assets/save.png';
import comments from '../assets/comments.svg';
import report from '../assets/report.png';
import like from '../assets/like.png';

export default function FeedCard({ title="Title", desc="Description...", author="Author", LikCount=0, ComCount=0, SavCount=0, RepCount=0 }) {
    return (
        <article className="feed-card">
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

            <section className='interactions'>
                <div>
                    <img src={like} alt='like'/>
                    <span>{LikCount}</span>
                </div>
                <div>
                    <img src={comments} alt='comments'/>
                    <span>{ComCount}</span>
                </div>
                <div>
                    <img src={save} alt='save'/>
                    <span>{SavCount}</span>
                </div>
                <div>
                    <img src={report} alt='save'/>
                    <span>{RepCount}</span>
                </div>

            </section>
        </article>
    )
}
