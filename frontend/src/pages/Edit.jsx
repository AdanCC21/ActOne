import Header from "../components/Header";

export default function Edit({ title }) {
    return (
        <div>
            <Header></Header>
            <main className="flex h-[80vh] m-2 justify-between">
                <div className="bg-(--dark-400) w-[15%]">
                    <h2>Actos</h2>
                </div>

                <div className="bg-(--dark-400) w-[60%]">
                    <h2>Editor</h2>
                </div>

                <div className="bg-(--dark-400) w-[15%] overflow-hidden">
                    <h2>Suggestions</h2>
                </div>
            </main>
        </div>
    )
}
