import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

import titleFormat from '../assets/editorIcons/title.svg';
import boldFormat from '../assets/editorIcons/bold.svg';
import italicFormat from '../assets/editorIcons/italic.svg';
import underlineFormat from '../assets/editorIcons/underline.svg';
import { FaRegTrashAlt } from "react-icons/fa";
import { Act } from '../Objects/Act'

import '../css/edit.css'


export default function Edit({ }) {
    const { title } = useParams();
    const [act, setAct] = useState([new Act(0), new Act(1)]);
    const [currentAct, setCurrent] = useState(0);

    const handleChanges = (e: any) => {
        const { name, value } = e.target;

        setAct(prev => prev.map((current, index) =>
            index === currentAct ? { ...current, [name]: value } : current
        ));
        
    }

    const move = (index:number) => {
        setCurrent(index)
    }

    return (
        <div className="overflow-hidden">
            <Header></Header>
            <main className="edit-main">
                <div className="e-editor">
                    <div className="e-editor-header">
                        <h2 className="font-semibold">{title}</h2>
                        <div className="flex ml-auto mt-auto">
                            <img className="mr-2" src={titleFormat} />
                            <img className="mx-2" src={boldFormat} />
                            <img className="mx-2" src={italicFormat} />
                            <img className="ml-2" src={underlineFormat} />
                        </div>
                    </div>

                    <section className="e-editor-st-area">
                        <input
                            name="title"
                            value={act[currentAct].title}
                            placeholder="Titulo para tu acto"
                            onChange={(e) => { handleChanges(e) }}
                            className="text-(--red-500)" />
                        <textarea
                            name="content"
                            value={act[currentAct].content}
                            placeholder="Write your act"
                            onChange={(e) => { handleChanges(e) }}
                            className="w-full" />
                    </section>
                </div>

                <div className="flex flex-col mr-[1em]">
                    <div className="e-acts">
                        <h4 className="text-(--red-500)">Actos</h4>
                        <ul>
                            {act.map((current, index) => (
                                <li className="flex items-center">{current.id}.- {current.title}
                                    <div className="ml-auto cursor-pointer opacity-50 hover:opacity-100 duration-200 ease-in-out" >
                                        <FaRegTrashAlt />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="bg-(--red-800) px-2 rounded-xl my-2 cursor-pointer hover:bg-(--red-600) duration-200">+</button>
                    </div>

                    <div className="e-sug">
                        <h4 className="text-(--red-500)">Suggestions</h4>

                    </div>
                </div>
            </main>
        </div>
    )
}
