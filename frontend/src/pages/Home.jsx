import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import FeedCard from "../components/FeedCard"
import ParticlesBg from "../components/ParticlesBg"
import SideBar from "../components/SideBar"



export default function Home({ }) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <div className="flex flex-row">
        <SideBar />
        <section className="flex flex-col w-[50vw] mx-auto my-10">
          <FeedCard></FeedCard>
          <FeedCard></FeedCard>

        </section>
      </div>
    </div>
  )
}
