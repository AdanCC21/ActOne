import React, { useContext, useEffect, useState } from "react"
import Header from "../components/Header"
import FeedCard from "../components/FeedCard"
import SideBar from "../components/SideBar"
import { GetStories } from "../Hooks/HandleStory"
import { ThemeContext } from "../context/AppContext"
import { E_Story } from "../entities/Story.entity"
import { motion } from "framer-motion"


export default function Home({ }) {
  const [storiesList, setStories] = useState<any>([]);
  const context = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const stories = await GetStories();

      if (!stories.data) {
        console.error(stories.message);
        return;
      }
      const shuffled = [...stories.data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setStories(shuffled);
    };

    fetchData();
  }, []);

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let timer;
    if (visibleCount < storiesList.length) {
      timer = setTimeout(() => {
        setVisibleCount(visibleCount + 1);
      }, 30);
    }
    return () => clearTimeout(timer);
  }, [visibleCount, storiesList.length]);

  return (
    <div className={`${context?.isLightMode ? 'bg-[#FFFFFF] text-dark' : 'bg-(--dark-600) text-white'} flex flex-col min-h-screen min-w-screen overflow-hidden`}>
      <Header />
      <div className="flex flex-row">
        <SideBar />
        <section className="flex flex-col w-full h-(--page-h) items-center overflow-y-auto">
          {storiesList.length > 0 ? (
            storiesList.map((current: any, index) => {
              if (current.visibility) {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{delay:index*0.05, duration:0.5}}>
                    <FeedCard story={current} extraClass="w-[70vw] my-4 fadeIn"></FeedCard>
                  </motion.div>
                )
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
