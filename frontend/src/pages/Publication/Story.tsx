import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Comments, Like, Mark, Reports } from '../../components/Interactions'
import CommentCard from '../../components/CommentCard'
import { E_Story } from '../../entities/Story.entity'
import { E_Act } from '../../entities/Act.entity'
import { E_UPD } from '../../entities/UPD.entity'
import { E_Comment } from '../../entities/PD.entity'

import '../../css/story.css'

import { GetStory } from '../../Hooks/GetStory'
import { useNavigate, useParams } from 'react-router-dom'
import { GetComments, SubmitComment } from '../../Hooks/Comments'
import { PostLike, Report } from '../../Hooks/HandlePD'
import { MarkStory } from '../../Hooks/Marked'
import tempUser from '../../assets/tempUser.png'
import { GetUPD } from '../../Hooks/GetUPD'
import { Follow } from '../../Hooks/Follow'


export default function Story() {
  const { id } = useParams();
  const navigator = useNavigate();

  const userId = sessionStorage.getItem('user');
  const [currentUser, setCurrent] = useState(new E_UPD());
  const [currentAct, setAct] = useState(0);
  const [story, setStory] = useState({ story: new E_Story(), acts: [new E_Act()], upd: new E_UPD() });
  const [comments, setComments] = useState(Array<E_Comment>);
  const [inputVal, setInput] = useState('')

  useEffect(() => {
    const loadStory = async () => {
      const storyFetch = await GetStory(Number(id));
      if (!storyFetch) {
        navigator('/404');
        return
      }
      // Commentario
      const commetsFetch = await GetComments(storyFetch.story.id);
      // Current user
      const updCU = await GetUPD(Number(userId));
      setCurrent(updCU)

      setComments(commetsFetch.data);
      setStory(storyFetch)
    }

    loadStory();
  }, [])

  const handleInput = (e: any) => {
    setInput(e.target.value);
  }

  const handleSubmit = async (e: any) => {
    if (e.key === 'Enter') {
      const fetchData = await SubmitComment(Number(userId), story.story.id, inputVal);
      if (!fetchData) return
      console.log(fetchData);
      setInput('');
      window.location.reload();
    }
  }

  const handleFollow = async (action: boolean) => {
    const follow = await Follow(currentUser.id, story.upd.id, action);
    console.log(follow);
    window.location.reload();
  }

  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex flex-nowrap w-screen px-5 py-3 h-(--page-h)'>
        {/* Author Info */}
        <section className='flex flex-col bg-(--dark-400) h-full w-[20%] rounded-xl'>
          {/* Profile */}
          <article className='flex flex-col h-[50%] w-[80%] mx-auto my-2'>
            <img src={tempUser}
              className='w-[200px] rounded-full m-auto ' />
            {/* <img src={story.upd.profile_image_url ? (story.upd.profile_image_url) : ('')}
              className='w-[200px] rounded-full m-auto ' /> */}
            <h3 className='text-center font-semibold'>@{story.upd.user_name}</h3>
            <span className='text-(--gray) text-center '>{story.upd.description}</span>
            {currentUser.id != story.upd.id ? (<>
              {currentUser.following.includes(story.upd.id) ? (
                <button className='btn red w-fit mx-auto my-2' onClick={() => { handleFollow(false) }}>Unfollow</button>
              ) : (
                <button className='btn red w-fit mx-auto my-2' onClick={() => { handleFollow(true) }}>Follow</button>
              )
              } </>
            ) : (<></>)}


          </article>


          <section className='flex flex-col h-[50%]'>
            <article className='comments my-auto'>
              <h5 className='font-semibold mb-2'>Comments</h5>
              <input className='inp-contraste'
                placeholder='comenta aqui'
                value={inputVal}
                onChange={(e) => { handleInput(e) }}
                onKeyDown={(e) => { handleSubmit(e) }}
              />
              <div className='flex flex-col'>
                {comments.length > 0 ? (comments.map((current, index) => (
                  <div key={index}>
                    <CommentCard user_id={current.id} content={current.content} />
                  </div>
                ))) : (<span className='text-(--gray)'>No Comments</span>)}
              </div>

            </article>

            <article className='flex mx-2 mt-auto mb-2 justify-around h-[10%] '>
              <Like extraClass='mr-2 my-auto' state={false} func={() => { PostLike(story.story.author_id, story.story.id, 'story'); window.location.reload(); }} amount={story.story.likes_count} />
              <Comments extraClass='mx-2 my-auto' func={() => { }} amount={story.story.comments_count} />
              <Mark
                extraClass='mx-2 my-auto' state={false}
                func={() => { MarkStory(story.story.id, Number(userId)) }}
                amount={story.story.marked_count} />
              <Reports extraClass='mx-2 my-auto' state={false} func={() => { Report(story.story.author_id, story.story.id) }} amount={story.story.reports_count} />
            </article>

          </section>

        </section>

        {/* Informacion del acto */}
        <section className='bg-(--dark-400) ml-5 rounded-xl w-[80%] px-10 py-5'>
          <div className='flex h-[15%]'>
            <div>
              <div className='flex'>
                <h1>{story.story.title}</h1>
                <button className='btn void self-center ml-2' onClick={() => { navigator(`/story/${id}/focus`) }}>
                  <img src='https://openclipart.org/image/2000px/247319' />
                </button>
              </div>
              <h5 className='font-semibold  text-(--yellow-800)'>{story.acts[currentAct].title}</h5>
            </div>

            <div className='ml-auto flex mt-2'>
              {story.acts[currentAct - 1] ? (
                <button className='btn void mr-5'
                  onClick={() => { setAct(prev => (prev - 1)) }}>
                  {`< ${story.acts[currentAct - 1].title}`}
                </button>
              ) : (<></>)}

              {story.acts[currentAct + 1] ? (
                <button className='btn void mr-5'
                  onClick={() => { setAct(prev => (prev + 1)) }}>
                  {`${story.acts[currentAct + 1].title} >`}
                </button>
              ) : (
                <button className='btn void mr-5'
                  onClick={() => { setAct(0) }}>
                  {`Volver al inicio`}
                </button>)
              }
            </div>
          </div>

          <div className='my-2 overflow-auto pr-[4%] h-[80%]'>
            <p style={{ fontSize: '1.2em' }}>{story.acts[currentAct].content}</p>
          </div>
        </section>
      </div>
    </div >
  )
}
