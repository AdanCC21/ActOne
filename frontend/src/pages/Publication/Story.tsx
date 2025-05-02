import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Comments, Like, Mark } from '../../components/Interactions'
import CommentCard from '../../components/CommentCard'
import { StoryDTO, ActsDTO } from '../../DTO/Story.dto'

import focus from '../../assets/focus.png'
import '../../css/story.css'

import { GetStory } from '../../Hooks/GetStory'
import { useNavigate, useParams } from 'react-router-dom'


export default function Story() {
  const { id } = useParams();
  const navigator = useNavigate();

  const [currentAct, setAct] = useState(0);
  const [story, setStory] = useState({ story: new StoryDTO(), acts: [new ActsDTO()] });

  useEffect(() => {
    const loadStory = async () => {
      const result = await GetStory(Number(id));

      if (!result) {
        navigator('/404');
        return
      }

      setStory(result)
    }

    loadStory();
  }, [])

  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex flex-nowrap w-screen px-5 py-3 h-(--page-h)'>
        {/* Author Info */}
        <section className='flex flex-col bg-(--dark-400) h-full w-[20%] rounded-xl'>
          {/* Profile */}
          <article className='flex flex-col h-[50%] w-[80%] mx-auto my-2'>
            <img src='https://cdn.discordapp.com/attachments/1088654568218443926/1332548598600171572/6ea8eb171444c0e2cca44fe40c301f91.jpg?ex=6814e0d7&is=68138f57&hm=bdf92dac55a757cad650e0d875247dc99840eca97adcb677edb4993120ba378a&'
              className='w-[200px] rounded-full m-auto ' />
            <h3 className='text-center font-semibold'>Author</h3>
            <span className='text-(--gray) text-center '>Descripcion</span>
            <button className='btn red w-fit mx-auto my-2'>Seguir</button>
          </article>


          <section className='flex flex-col h-[50%]'>
            <article className='comments'>
              <h5 className='font-semibold mb-2'>Comments</h5>
              <div className='flex flex-col'>
                <CommentCard id={1} />
                <CommentCard id={1} />
                <CommentCard id={1} />
                <CommentCard id={1} />
                <CommentCard id={1} />
              </div>
            </article>

            <article className='flex mx-2 justify-around h-[10%] '>
              <Like extraClass='mr-2 my-auto' state={false} func={() => { }} amount={2500000} />
              <Comments extraClass='mx-2 my-auto' func={() => { }} amount={2205} />
              <Mark extraClass='mx-2 my-auto' state={false} func={() => { }} amount={250000} />
            </article>

          </section>

        </section>

        {/* Informacion del acto */}
        <section className='bg-(--dark-400) ml-5 rounded-xl w-[80%] px-10 py-5'>
          <div className='flex h-[15%]'>
            <div>
              <div className='flex'>
                <h1>{story.story.title}</h1>
                <button className='btn void self-center ml-2'><img src={focus} /></button>
              </div>
              <h5 className='font-semibold  text-(--red-800)'>{story.acts[currentAct].title}</h5>
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
