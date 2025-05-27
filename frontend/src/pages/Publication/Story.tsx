import React, { act, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import Header from '../../components/Header'
import { Comments, Like, Mark, Reports } from '../../components/Interactions'
import CommentCard from '../../components/CommentCard'

import { E_Story } from '../../entities/Story.entity'
import { E_Act } from '../../entities/Act.entity'
import { E_UPD } from '../../entities/UPD.entity'

import FocusMode from '../../assets/icons/fullScreen.svg'
import tempUser from '../../assets/tempUser.png'
import '../../css/story.css'

import { GetStory } from '../../Hooks/HandleStory'
import { GetComments, SubmitComment } from '../../Hooks/Comments'
import { PostLike, Report } from '../../Hooks/HandlePD'
import { MarkStory } from '../../Hooks/Marked'
import { Follow } from '../../Hooks/Follow'
import { HandleSession, UpdateSession } from '../../Hooks/HandleSession'


export default function Story() {
  const { id } = useParams();
  const navigator = useNavigate();

  let sessionUpd;
  try {
    sessionUpd = HandleSession(sessionStorage.getItem('user') || 'invitado');
  } catch (e) {
    console.error(e);
  }

  const [userPdState, setPD] = useState({ like: { amount: 0, state: false }, marked: { amount: 0, state: false } })

  const [currentAct, setAct] = useState(0);
  const [story, setStory] = useState({ story: new E_Story(), acts: [new E_Act()], upd: new E_UPD() });

  const [comments, setComments] = useState(Array<any>);
  const [inputVal, setInput] = useState('')

  useEffect(() => {
    const loadStory = async () => {
      const storyFetch = await GetStory(Number(id));
      if (!storyFetch) {
        navigator('/404');
        return
      }

      const commetsFetch = await GetComments(storyFetch.story.id);
      setComments(commetsFetch);

      const acts = storyFetch.acts.filter(current => current.title != 'Sinopsis');
      storyFetch.acts = acts.sort((a: any, b: any) => a.act_number - b.act_number);
      setStory(storyFetch)

      const liked = sessionUpd.stories_liked.includes(Number(id));
      const marked = sessionUpd.marked_stories.includes(Number(id));
      setPD(prev => { return { ...prev, like: { amount: storyFetch.story.likes_count, state: liked }, marked: { amount: storyFetch.story.marked_count, state: marked } } });
    }

    loadStory();
  }, [])

  const handleInput = (e: any) => {
    setInput(e.target.value);
  }

  const handleSubmit = async (e: any) => {
    if (e.key === 'Enter') {
      const fetchData = await SubmitComment(sessionUpd.id, story.story.id, inputVal);

      if (!fetchData) return;
      const newCom = { comment: fetchData.data, upd: sessionUpd };
      setComments(prev => [newCom, ...prev]);
      setInput('');
    }
  }

  const handleFollow = async (action: boolean) => {
    const follow = await Follow(sessionUpd.id, story.upd.id, action);
    sessionUpd = follow.data[0];
    UpdateSession(sessionUpd);
    window.location.reload();
  }

  let displayState = EditorState.createEmpty();

  try {
    const raw = JSON.parse(story.acts[currentAct].content || '{}');
    const content = convertFromRaw(raw);
    displayState = EditorState.createWithContent(content);
  } catch (e) {
    console.error(e);
  }

  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex flex-nowrap w-screen px-5 py-3 h-(--page-h)'>
        {/* Author Info */}
        <section className='flex flex-col bg-(--dark-200) h-full w-[20%] rounded-xl'>
          {/* Profile */}
          <article className='flex flex-col h-[50%] w-[80%] mx-auto my-2'>
            <img src={story.upd.profile_image_url || tempUser}
              className='w-[200px] rounded-full m-auto aspect-square h-fit object-cover' />
            <h3 className='text-center font-semibold cursor-pointer hover:underline' onClick={() => { navigator(`/user/${story.upd.id}`) }}>@{story.upd.user_name}</h3>
            <span className='text-(--gray) text-center '>{story.upd.description}</span>
            {sessionUpd.id != story.upd.id ? (<>
              {sessionUpd.following.includes(story.upd.id) ? (
                <button className='btn yellow w-fit mx-auto my-2' onClick={() => { handleFollow(false) }}>Unfollow</button>
              ) : (
                <button className='btn yellow w-fit mx-auto my-2' onClick={() => { handleFollow(true) }}>Follow</button>
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
                {comments.length > 0 ? (comments.map((current: any, index) => (
                  <div key={index}>
                    <CommentCard userUpd={current.upd} content={current.comment.content} />
                  </div>
                ))) : (<span className='text-(--gray)'>No Comments</span>)}
              </div>

            </article>

            <article className='flex mx-2 mt-auto mb-2 justify-around h-[10%] '>
              <Like
                extraClass='mr-2 my-auto'
                state={userPdState.like.state}
                func={async () => {
                  if (sessionUpd) {
                    const fetchDa = await PostLike(sessionUpd?.id, story.story.id, 'story', sessionUpd)
                    if (fetchDa) {
                      UpdateSession(fetchDa.upd.data);
                      let amount
                      if (userPdState.like.state) { amount = userPdState.like.amount - 1 } else { amount = userPdState.like.amount + 1 }
                      setPD(prev => { return { ...prev, like: { amount: amount, state: !prev.like.state } } });
                    }
                  }
                }}
                amount={userPdState.like.amount} />
              <Comments extraClass='mx-2 my-auto' func={() => { }} amount={story.story.comments_count} />
              <Mark
                extraClass='mx-2 my-auto'
                state={userPdState.marked.state}
                func={async () => {
                  if (sessionUpd) {
                    const fetchData = await MarkStory(story.story.id, sessionUpd.id)
                    if (fetchData) {
                      UpdateSession(fetchData);
                      let amount: number;
                      if (userPdState.marked.state) { amount = userPdState.marked.amount - 1 } else { amount = userPdState.marked.amount + 1 }
                      setPD(prev => { return { ...prev, marked: { amount: amount, state: !prev.marked.state } } });
                    }
                  }
                }}
                amount={userPdState.marked.amount} />
              <Reports extraClass='mx-2 my-auto' state={false} func={() => { Report(story.story.author_id, story.story.id) }} amount={story.story.reports_count} />
            </article>

          </section>

        </section>

        {/* Informacion del acto */}
        <section className='bg-(--dark-200) ml-5 rounded-xl w-[80%] px-10 py-5'>
          <div className='flex h-[15%]'>
            <div className='flex flex-col w-full'>
              <div className='flex w-auto'>
                <h1>{story.story.title}</h1>
                <button className='btn void self-center ml-auto' onClick={() => { navigator(`/story/${id}/focus`) }}>
                  <span className='mr-2'>Focus mode</span>
                  <img src={FocusMode} />
                </button>
              </div>
              <h5 className='font-semibold  text-(--yellow-800)'>{story.acts[currentAct].title}</h5>
            </div>
          </div>

          <div className='flex flex-col my-2 h-[80%] story-content'>
            <div className='pr-[4%] overflow-auto '>
              <Editor editorState={displayState} readOnly={true} onChange={function (editorState: EditorState): void {
                throw new Error('Function not implemented.')
              }} />
            </div>

            <div className='ml-auto flex mt-auto'>
              {story.acts[currentAct - 1] ? (
                <button className='btn yellow mr-5'
                  onClick={() => { setAct(prev => (prev - 1)) }}>
                  {`< ${story.acts[currentAct - 1].title}`}
                </button>
              ) : (<></>)}

              {story.acts[currentAct + 1] ? (
                <button className='btn yellow mr-5'
                  onClick={() => { setAct(prev => (prev + 1)) }}>
                  {`${story.acts[currentAct + 1].title} >`}
                </button>
              ) : (
                <button className='btn yellow mr-5'
                  onClick={() => { setAct(0) }}>
                  {`Volver al inicio`}
                </button>)
              }
            </div>
          </div>

        </section>
      </div>
    </div >
  )
}
