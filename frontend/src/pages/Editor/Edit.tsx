import React from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";

import { ImFontSize } from "react-icons/im";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { E_Act } from '../../entities/Act.entity'

import '../../css/edit.css'
import '../../css/inputs.css'
import Modal from "../../components/Modal";


export default function Edit({ }) {
    const { title } = useParams();
    const userId = sessionStorage.getItem('user');
    const [act, setAct] = useState([new E_Act(0, 'Sinopsis', 'Escribe aqui el texto de que se mostrara en la página del Feed'), new E_Act(1)]);
    const [currentAct, setCurrent] = useState(0);
    const [modal, setModal] = useState(true);
    const navigate = useNavigate();

    const handleChanges = (e: any) => {
        const { name, value } = e.target;

        setAct(prev => prev.map((current, index) =>
            index === currentAct ? { ...current, [name]: value } : current
        ));

    }

    const addAct = () => {
        setAct(prev => {
            const newAct = [...prev, new E_Act(prev.length)];
            setCurrent(newAct.length - 1);
            return newAct;
        });
    }

    const deleteAct = (index: number) => {
        if (act.length > 1) {
            setAct(prev => {
                if (currentAct === index) {
                    setCurrent(0)
                } else if (currentAct > index) {
                    setCurrent(index);
                }
                const newAct = prev.filter((_, i) => i !== index);
                return newAct;
            });
        }
    };

    const hanldeSubmit = async (e: any) => {
        try {
            const story = {
                title: title,
                author_id: Number(userId),
                visibility: true,
            }
            const acts = act.map((current) => { return { title: current.title, content: current.content } })
            const data = {
                story: story,
                acts: acts
            }

            const res = await fetch('http://localhost:3000/api/story/publish', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                throw new Error('Something is wrong with the backend');
            }
            const result = await res.json();
            if (result.data !== undefined) navigate('/')


        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="overflow-hidden">
            <Header></Header>
            <main className="edit-main">
                <div className="e-editor">
                    <div className="e-editor-header">
                        <h2 className="font-semibold">{title}</h2>
                    </div>
                    <section className="e-editor-st-area">
                        <div className="flex justify-between">
                            <input
                                name="title"
                                value={act[currentAct].title}
                                placeholder="Titulo para tu acto"
                                onChange={(e) => { handleChanges(e) }}
                                className=" text-(--red-500) w-fit mb-2" />
                            <div className="flex my-auto">
                                <ImFontSize className="mr-2" />
                                <FaBold className="mr-2" />
                                <FaItalic className="mr-2" />
                                <FaUnderline />
                            </div>
                        </div>
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
                                <li key={index} className="flex items-center">
                                    <span className={`truncate max-w-[250px] overflow-hidden whitespace-nowrap ${index === currentAct ? 'text-(--red-600)' : ''} cursor-pointer`}
                                        onClick={() => { setCurrent(index); }}>{current.title}</span>
                                    {index > 0 ? (
                                        <div className="ml-auto cursor-pointer opacity-20 hover:opacity-100 duration-200 ease-in-out"
                                            onClick={() => { deleteAct(index); }} >
                                            <FaRegTrashAlt />
                                        </div>
                                    ) : (<></>)}
                                </li>
                            ))}
                        </ul>
                        <button className="bg-(--red-800) px-2 rounded-xl my-2 cursor-pointer hover:bg-(--red-600) duration-200"
                            onClick={() => { addAct() }}>+</button>
                    </div>

                    <div className="e-sug">
                        <h4 className="text-(--red-500)">Suggestions</h4>

                    </div>
                    <button className="btn red w-fit mt-2" onClick={(e) => { hanldeSubmit(e); }}>Publish</button>
                </div>
            </main>
        </div>
    )
}
