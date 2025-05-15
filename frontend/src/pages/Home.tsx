import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import FeedCard from "../components/FeedCard"
import SideBar from "../components/SideBar"
import { GetStories } from "../Hooks/GetStory"
import { E_Story } from "../entities/Story.entity"

const dataTest = {
  id: 1,
  story_id: 1,
  title: 'Storie no.1',
  desc: 'Evento 1',
  author: 'Oscar',
  likeCount: 1,
  comCount: 2,
  markCount: 0,
  repCount: 0
}


export default function Home({ }) {
  const [storiesList, setStories] = useState([new E_Story()]);

  useEffect(() => {
    const funcion = async () => {
      const stories = await GetStories();
      if (!stories.data) {
        console.error(stories.message);
        return null;
      }
      console.log("Home")
      console.log(stories.data)
      setStories(stories.data);
    }
    funcion();
  }, [])

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-row">
        <SideBar />
        <section className="flex flex-col w-[50vw] mx-auto my-10">
          {storiesList.map((current, index) => (
            <div key={index}>
              <FeedCard story={current}></FeedCard>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
