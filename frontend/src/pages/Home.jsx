import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import FeedCard from "../components/FeedCard"

export default function Home({ }) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Header />
      <section className="flex flex-col w-[50vw] justify-center mx-auto my-10">
        <FeedCard></FeedCard>
        <FeedCard></FeedCard>
        
      </section>
    </div>
  )
}
