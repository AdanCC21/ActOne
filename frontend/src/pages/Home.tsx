import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import FeedCard from "../components/FeedCard"
import SideBar from "../components/SideBar"
import { GetStories } from "../Hooks/GetStory"
import { GetUPD } from "../Hooks/GetUPD"
import { E_Story } from "../entities/Story.entity"


export default function Home({ }) {
  const [storiesList, setStories] = useState([]);
  const [updList, setUpd] = useState(); // Comment if not used yet

  useEffect(() => {
    const fetchData = async () => {
      const stories = await GetStories();

      if (!stories.data) {
        console.error(stories.message);
        return;
      }

      const upd = await Promise.all(
        stories.data.map(async (current) => {
          const res = await GetUPD(current.author_id);
          return res;
        })
      );

      console.log(upd);
      setStories(stories.data);
      setUpd(upd);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-row">
        <SideBar />
        <section className="flex flex-col w-[50vw] mx-auto my-10">
          {storiesList.map((current, index) => (
            <div key={index}>
              <FeedCard story={current} ></FeedCard>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
