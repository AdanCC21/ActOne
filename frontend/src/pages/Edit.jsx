import { useParams } from "react-router-dom";
import Header from "../components/Header";
import titleFormat from '../assets/editorIcons/title.svg';
import boldFormat from '../assets/editorIcons/bold.svg';
import italicFormat from '../assets/editorIcons/italic.svg';
import underlineFormat from '../assets/editorIcons/underline.svg';
import '../css/edit.css'
import { act, useState } from "react";

class Act {
    constructor(id) {
        this.id = id;
        this.title = "";
        this.content = "";
    }
}



export default function Edit({ }) {
    const { title } = useParams();
    const [act, setAct] = useState([new Act(0), new Act(1)]);
    const [currentAct, setCurrent] = useState(0);

    const handleChanges = (e) => {
        const { name, value } = e.target;

        setAct(prev => prev.map((current, index) => (index === currentAct ? (
            { ...prev, [name]: value }
        ) : (
            { ...prev }
        ))))
    }

    const move = (index) => {
        setCurrent(index)
    }

    return (
        <div className="overflow-hidden">
            <Header></Header>
            <main className="edit-main">
                <div className="e-acts">
                    <h4>Actos</h4>
                    <ul>
                        {act.forEach((current, index) => (
                            <li>{current.title}</li>
                        ))}
                    </ul>
                </div>

                <div className="e-editor">
                    <div className="e-editor-header">
                        <h2>{title}</h2>
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

                <div className="e-sug">
                    <h4>Suggestions</h4>
                </div>
            </main>
        </div>
    )
}
