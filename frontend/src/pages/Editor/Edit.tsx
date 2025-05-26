import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";

import { FaRegTrashAlt } from "react-icons/fa";

import { E_Act } from '../../entities/Act.entity'
import { addAct, deleteAct, HandleSuggestions, SubmitStory } from "../../Hooks/HandleEditor";


import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import RichTextEditor from '../../components/RichEditor';

import '../../css/edit.css'
import '../../css/inputs.css'
import Modal2 from "../../components/Modal2";
import { HandleSession, UpdateSession } from "../../Hooks/HandleSession";

export default function Edit({ }) {
    const { title } = useParams();

    const [act, setAct] = useState([new E_Act(0, 'Sinopsis', 'Escribe aqui el texto de que se mostrara en la página del Feed', 0), new E_Act(1)]);
    const [storyDetails, setDetails] = useState({ visibility: false, labels: [''] });
    const [currentAct, setCurrent] = useState(0);
    const [suggestions, setSuggestions] = useState({ maxWords: '', badWords: [''], wordMostUsed: [''], intWords: [''] });
    const [modalState, setModal] = useState(false);

    // EDITOR
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const navigate = useNavigate();

    let sessionUser;
    try {
        sessionUser = HandleSession(sessionStorage.getItem('user') || '');
    } catch (e) {
        console.log(e);
        navigate('/404');
    }

    useEffect(() => {
        if (!act[currentAct].content) {
            setEditorState(EditorState.createEmpty());
        } else {
            try {
                const content = convertFromRaw(JSON.parse(act[currentAct].content));
                setEditorState(EditorState.createWithContent(content));
            } catch (e) {
                setEditorState(EditorState.createEmpty());
            }
        }
    }, [currentAct]);

    useEffect(() => {
        const rawContent = convertToRaw(editorState.getCurrentContent());
            const fullText = rawContent.blocks.map(block => block.text).join(' ');

        setAct(prev =>
            prev.map((a, i) => i === currentAct ? { ...a, content: JSON.stringify(rawContent) } : a)
        );
        console.log(fullText)
        handleSug(fullText);
    }, [editorState]);

    const handleChanges = (e: any) => {
        const { name, value } = e.target;
        setAct(prev => prev.map((current, index) =>
            index === currentAct ? { ...current, [name]: value } : current
        ));
    }

    const handleDetails = (e: any) => {
        const { name, value } = e.target;
        if (name === 'visibility') {
            value === 'true' ? setDetails(prev => { return { ...prev, visibility: true } }) : setDetails(prev => { return { ...prev, visibility: false } })
        } else {
            const labelsList = value.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
            setDetails(prev => { return { ...prev, labels: labelsList } })
        }
    }

    const handleSubmit = async () => {
        const sub = await SubmitStory(title, sessionUser.id, act, storyDetails.labels, storyDetails.visibility);
        sessionUser.published_stories.push(sub[0].id)
        UpdateSession(sessionUser);
        sub ? navigate('/') : console.error('something is wrong');
    }

    const handlePublish = () => {
        setModal(true);
    }

    const handleSug = async (text: string) => {
        const sugg = await HandleSuggestions(text);
        setSuggestions(sugg);
    }

    const handleSave = (rawContent) => {
        console.log("Contenido guardado:", rawContent);
    };

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
                                <h5 className="mb-4 text-(--yellow-500)">Sinposis</h5>
                            ) : (
                                <input
                                    name="title"
                                    value={act[currentAct].title}
                                    placeholder="Titulo para tu acto"
                                    onChange={(e) => { handleChanges(e) }}
                                    className="inp text-(--yellow-500) w-fit mb-2" />
                            )}
                        </div>
                        <RichTextEditor
                            editorState={editorState}
                            setEditorState={setEditorState}
                            onSave={handleSave}
                        />
                    </section>
                </div>

                <div className="flex max-w-[15vw] w-[15vw] flex-col mr-[1em]">
                    <div className="e-acts max-h-[40%]">
                        <h4 className="text-(--yellow-500)">Actos</h4>
                        <ul>
                            {act.map((current, index) => (
                                <li key={index} className="flex items-center">
                                    <span className={`truncate max-w-[250px] overflow-hidden whitespace-nowrap ${index === currentAct ? 'text-(--yellow-600)' : ''} cursor-pointer`}
                                        onClick={() => {
                                            setCurrent(index);
                                        }}>{current.title}</span>
                                    {index > 0 ? (
                                        <div className="ml-auto cursor-pointer opacity-20 hover:opacity-100 duration-200 ease-in-out"
                                            onClick={() => { deleteAct(act, setAct, index, currentAct, setCurrent); }} >
                                            <FaRegTrashAlt />
                                        </div>
                                    ) : (<></>)}
                                </li>
                            ))}
                        </ul>
                        <button className="bg-(--yellow-800) px-2 rounded-xl my-2 cursor-pointer hover:bg-(--yellow-600) duration-200"
                            onClick={() => { addAct(setAct, setCurrent) }}>+</button>
                    </div>

                    <div className="e-sug max-h-[60%]">
                        <h4 className="text-(--yellow-500)">Suggestions</h4>
                        {suggestions.intWords[0] ? (
                            <>
                                <p>Considera remarcar estas palabras:</p>
                                <ul className="mb-5">
                                    {suggestions.intWords.map((current, index) => (
                                        <li className="ml-5 font-bold text-(--yellow-500)" key={index}>{current}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (<></>)}
                        {suggestions.maxWords ? (<p className="mb-5">- {suggestions.maxWords} <span className="text-(--gray)">Considera usar mas actos</span></p>) : (<></>)}
                        {suggestions.wordMostUsed[0] ? (
                            <p className="mb-5">-
                                {suggestions.wordMostUsed[0]}
                                <span className="font-bold text-(--yellow-500)"> "{suggestions.wordMostUsed[1]}"</span>
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
                    <button className="btn yellow w-fit mt-2" onClick={() => { handlePublish(); }}>Publish</button>
                </div>
            </main >
            <Modal2 isOpen={modalState} onClose={() => { setModal(false) }}>
                <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); }}>
                    <h1 className="mb-10">Last Details</h1>

                    <fieldset className="mb-5 flex flex-col">
                        <h5 className="text-(--yellow-500)">Visibility</h5>
                        <select className="bg-(--dark-700) px-3 py-2" name="visibility" onChange={(e) => { handleDetails(e) }}>
                            <option value={'false'}>Private</option>
                            <option value={'true'}>Public</option>
                        </select>
                    </fieldset>
                    <hr />
                    <fieldset className="mb-5 flex flex-col">
                        <h5 className="mt-5 text-(--yellow-500)">Labels</h5>
                        <input className="inp" placeholder="Lables" type="text" onChange={(e) => { handleDetails(e) }} onKeyDown={(e) => {
                            if (e.key === 'Enter') { handleDetails(e); handleSubmit() }
                        }}></input>
                    </fieldset>

                    <div className="flex mt-5">
                        <button className="ml-auto mr-2 w-fit btn void" onClick={() => { setModal(false) }}>Cancel</button>
                        <button className="w-fit btn yellow" onClick={() => { handleSubmit() }}>Submit</button>
                    </div>
                </form>
            </Modal2>
        </div >
    )
}
