import React from "react"
import Header from "../components/Header"
import FeedCard from "../components/FeedCard"
import ParticlesBg from "../components/ParticlesBg"
import SideBar from "../components/SideBar"

const dataTest = {
  id:1,
  title: 'Storie no.1',
  desc: 'Evento 1',
  author: 'Oscar',
  likeCount: 1,
  comCount: 2,
  markCount: 0,
  repCount: 0
}


export default function Home({ }) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-row">
        <SideBar />
        <section className="flex flex-col w-[50vw] mx-auto my-10">
          <FeedCard story={dataTest}></FeedCard>
        </section>
      </div>
    </div>
  )
}
