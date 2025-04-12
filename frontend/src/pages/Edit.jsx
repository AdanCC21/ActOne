import Header from "../components/Header";
import '../css/edit.css'

export default function Edit({ title }) {
    return (
        <div className="overflow-hidden">
            <Header></Header>
            <main className="edit-main">
                <div className="e-acts">
                    <h2>Actos</h2>
                    <ul>
                        <li>Acto 1</li>
                        <li>Acto 2</li>
                        <li>Acto 3</li>
                        <li>Acto 4</li>
                    </ul>
                </div>

                <div className="e-editor">
                    <h2></h2>
                    
                </div>

                <div className="e-sug">
                    <h2>Suggestions</h2>
                </div>
            </main>
        </div>
    )
}
