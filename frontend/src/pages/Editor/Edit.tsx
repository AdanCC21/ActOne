import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";

import { ImFontSize } from "react-icons/im";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import { E_Act } from '../../entities/Act.entity'
import { addAct, deleteAct, HandleSuggestions, SubmitStory } from "../../Hooks/HandleEditor";

// import {
//     Editor,
//     EditorState,
//     convertFromRaw,
// } from 'draft-js';
// import RichTextEditor from "../../components/RichEditor";

import '../../css/edit.css'
import '../../css/inputs.css'
import Modal2 from "../../components/Modal2";

export default function Edit({ }) {
    const { title } = useParams();
    const userId = sessionStorage.getItem('user');

    const [act, setAct] = useState([new E_Act(0, 'Sinopsis', 'Escribe aqui el texto de que se mostrara en la página del Feed'), new E_Act(1)]);
    const [storyDetails, setDetails] = useState({ visibility: false, labels: [''] });
    const [currentAct, setCurrent] = useState(0);
    const [suggestions, setSuggestions] = useState({ maxWords: '', badWords: [''], wordMostUsed: [''], intWords: [''] });
    const [modalState, setModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => { handleSug(act[currentAct].content); }, [currentAct, act[currentAct].content])

    const handleChanges = (e: any) => {
        const { name, value } = e.target;

        setAct(prev => prev.map((current, index) =>
            index === currentAct ? { ...current, [name]: value } : current
        ));
        handleSug(act[currentAct].content);
    }

    const handleDetails = (e: any) => {
        const { name, value } = e.target;
        if (name === 'visibility') {
            value === 'true' ? setDetails(prev => { return { ...prev, visibility: true } }) : setDetails(prev => { return { ...prev, visibility: false } })
        } else {
            const labelsList = value.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
            setDetails(prev => { return { ...prev, labels: labelsList } })
        }
        console.log(storyDetails);
    }

    const handleSubmit = async () => {
        const sub = await SubmitStory(title, userId, act, storyDetails.labels, storyDetails.visibility);
        console.log(sub);
        sub ? navigate('/') : console.error('something is wrong');
    }


    const handlePublish = () => {
        setModal(true);
    }

    const handleSug = (text: string) => {
        const sugg = HandleSuggestions(text);
        setSuggestions(sugg);
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
                            {currentAct === 0 ? (
                                <h4 className="mb-4 text-(--red-500)">Sinposis</h4>
                                // <input
                                //     name="title"
                                //     value={act[currentAct].title}
                                //     placeholder="Titulo para tu acto"
                                //     onChange={(e) => { handleChanges(e) }}
                                //     disabled
                                //     className="text-(--red-500) w-fit mb-2" />
                            ) : (
                                <input
                                    name="title"
                                    value={act[currentAct].title}
                                    placeholder="Titulo para tu acto"
                                    onChange={(e) => { handleChanges(e) }}
                                    className=" text-(--red-500) w-fit mb-2" />
                            )}
                            <div className="flex my-auto">
                                <ImFontSize className="mr-2" />
                                <FaBold className="mr-2" />
                                <FaItalic className="mr-2" />
                                <FaUnderline />
                            </div>
                        </div>
                        {/* <RichTextEditor initialContent={editorContent[currentAct]} onSave={onSave} /> */}
                        <textarea
                            name="content"
                            value={act[currentAct].content}
                            placeholder="Write your act"
                            onChange={(e) => { handleChanges(e) }}
                            className="w-full" />
                    </section>
                </div>

                <div className="flex max-w-[15vw] w-[15vw] flex-col mr-[1em]">
                    <div className="e-acts max-h-[40%]">
                        <h4 className="text-(--red-500)">Actos</h4>
                        <ul>
                            {act.map((current, index) => (
                                <li key={index} className="flex items-center">
                                    <span className={`truncate max-w-[250px] overflow-hidden whitespace-nowrap ${index === currentAct ? 'text-(--red-600)' : ''} cursor-pointer`}
                                        onClick={() => { setCurrent(index); handleSug(act[currentAct].content); }}>{current.title}</span>
                                    {index > 0 ? (
                                        <div className="ml-auto cursor-pointer opacity-20 hover:opacity-100 duration-200 ease-in-out"
                                            onClick={() => { deleteAct(act, setAct, index, currentAct, setCurrent); }} >
                                            <FaRegTrashAlt />
                                        </div>
                                    ) : (<></>)}
                                </li>
                            ))}
                        </ul>
                        <button className="bg-(--red-800) px-2 rounded-xl my-2 cursor-pointer hover:bg-(--red-600) duration-200"
                            onClick={() => { addAct(setAct, setCurrent) }}>+</button>
                    </div>

                    <div className="e-sug max-h-[60%]">
                        <h4 className="text-(--red-500)">Suggestions</h4>
                        {suggestions.intWords[0] ? (
                            <>
                                <p>Considera remarcar estas palabras:</p>
                                <ul className="mb-5">
                                    {suggestions.intWords.map((current, index) => (
                                        <li className="ml-5 font-bold text-(--red-500)" key={index}>{current}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (<></>)}
                        {suggestions.maxWords ? (<p className="mb-5">- {suggestions.maxWords} <span className="text-(--gray)">Considera usar mas actos</span></p>) : (<></>)}
                        {suggestions.wordMostUsed[0] ? (
                            <p className="mb-5">-
                                {suggestions.wordMostUsed[0]}
                                <span className="font-bold text-(--red-500)"> "{suggestions.wordMostUsed[1]}"</span>
                                {suggestions.wordMostUsed[2]}
                            </p>
                        ) : (<></>)}
                        {suggestions.badWords[0] ? (
                            <>
                                <p>- Procura no usar malas palabras.</p>
                                <span className="text-(--gray)"> Palabras encontradas :</span>
                                <ul className="mb-5 text-(--gray)">
                                    {suggestions.badWords.map((current, index) => (
                                        <li className="ml-5" key={index}>{current}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <></>
                        )}

                    </div>
                    <button className="btn red w-fit mt-2" onClick={() => { handlePublish(); }}>Publish</button>
                </div>
            </main >
            <Modal2 isOpen={modalState} onClose={() => { setModal(false) }}>
                <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); }}>
                    <h1 className="mb-10">Last Details</h1>

                    <fieldset className="mb-5 flex flex-col">
                        <h5 className="text-(--red-500)">Visibility</h5>
                        <select className="bg-(--dark-700) px-3 py-2" name="visibility" onChange={(e) => { handleDetails(e) }}>
                            <option value={'false'}>Private</option>
                            <option value={'true'}>Public</option>
                        </select>
                    </fieldset>
                    <hr />
                    <fieldset className="mb-5 flex flex-col">
                        <h5 className="mt-5 text-(--red-500)">Labels</h5>
                        <input placeholder="Lables" type="text" onChange={(e) => { handleDetails(e) }}></input>
                    </fieldset>

                    <div className="flex mt-5">
                        <button className="ml-auto mr-2 w-fit btn void" onClick={() => { setModal(false) }}>Cancel</button>
                        <button className="w-fit btn red" onClick={() => { handleSubmit() }}>Submit</button>
                    </div>
                </form>
            </Modal2>
        </div >
    )
}
