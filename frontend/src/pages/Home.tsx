import React, { useContext, useEffect, useState } from "react"
import Header from "../components/Header"
import FeedCard from "../components/FeedCard"
import SideBar from "../components/SideBar"
import { GetStories } from "../Hooks/HandleStory"
import { ThemeContext } from "../context/AppContext"


export default function Home({ }) {
  const [storiesList, setStories] = useState([]);
  const context = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const stories = await GetStories();

      if (!stories.data) {
        console.error(stories.message);
        return;
      }
      setStories(stories.data);
    };

    fetchData();
  }, []);

  return (
    <div className={`${context?.isLightMode ? 'bg-[#FFFFFF] text-dark':'bg-(--dark-600) text-white'} flex flex-col min-h-screen min-w-screen overflow-hidden`}>
      <Header />
      <div className="flex flex-row">
        <SideBar />
        <section className="flex flex-col w-full h-(--page-h) items-center overflow-y-auto">
          {storiesList.length > 0 ? (
            storiesList.map((current: any, index) => {
              if (current.visibility) {
                return (<div key={index}>
                  <FeedCard story={current} extraClass="w-[60vw]"></FeedCard>
                </div>)
              }
            })
          ) : (
            <span className="text-(--gray) text-center">We don't have stories :(</span>
          )}
        </section>
      </div>
    </div>
  )
}
