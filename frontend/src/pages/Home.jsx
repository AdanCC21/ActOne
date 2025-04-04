import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

export default function Home({}) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
        <Header/>
    </div>
  )
}
