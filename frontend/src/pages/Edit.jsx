import { useParams } from "react-router-dom";
import Header from "../components/Header";
import titleFormat from '../assets/editorIcons/title.svg';
import boldFormat from '../assets/editorIcons/bold.svg';
import italicFormat from '../assets/editorIcons/italic.svg';
import underlineFormat from '../assets/editorIcons/underline.svg';
import '../css/edit.css'

export default function Edit({ }) {
    const { title } = useParams();
    return (
        <div className="overflow-hidden">
            <Header></Header>
            <main className="edit-main">
                <div className="e-acts">
                    <h4>Actos</h4>
                    <ul>
                        <li>Acto 1</li>
                        <li>Acto 2</li>
                        <li>Acto 3</li>
                        <li>Acto 4</li>
                    </ul>
                </div>

                <div className="e-editor">
                    <div className="e-editor-header">
                        <h2>{title}</h2>
                        <div className="flex ml-auto mt-auto">
                            <img className="mr-2" src={titleFormat}/>
                            <img className="mx-2" src={boldFormat}/>
                            <img className="mx-2" src={italicFormat}/>
                            <img className="ml-2" src={underlineFormat}/>
                        </div>
                    </div>

                    <section className="e-editor-st-area">
                        <h4 className="text-(--red-500) ml-2 my-1">Titulo del acto</h4>
                        <textarea className="w-full" />
                    </section>
                </div>

                <div className="e-sug">
                    <h4>Suggestions</h4>
                </div>
            </main>
        </div>
    )
}
