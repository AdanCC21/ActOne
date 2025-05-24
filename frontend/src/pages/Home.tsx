import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import FeedCard from "../components/FeedCard"
import SideBar from "../components/SideBar"
import { GetStories } from "../Hooks/GetStory"


export default function Home({ }) {
  const [storiesList, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stories = await GetStories();

      if (!stories.data) {
        console.error(stories.message);
        return;
      }
      console.log(stories);
      setStories(stories.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-row">
        <SideBar />
        <section className="flex flex-col w-[50vw] mx-auto my-10">
          {storiesList.length > 0 ? (

            storiesList.map((current: any, index) => {
              if (current.visibility) {
                return (<div key={index}>
                  <FeedCard story={current}></FeedCard>
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
