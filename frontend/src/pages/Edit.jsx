import { useParams } from "react-router-dom";
import Header from "../components/Header";
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
                    <h2>{title}</h2>
                    <h5>Titulo del acto</h5>
                    <div className="bg-(--dark-900)">

                    </div>
                    <textarea className="w-full"/>
                </div>

                <div className="e-sug">
                    <h4>Suggestions</h4>
                </div>
            </main>
        </div>
    )
}
