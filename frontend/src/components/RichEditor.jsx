import 'draft-js/dist/Draft.css';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

export default function RichTextEditor({ editorState, setEditorState, onSave, extraClass, synopsis }) {
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const toggleInlineStyle = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const saveContent = () => {
        const content = editorState.getCurrentContent();
        const raw = convertToRaw(content);
        onSave(raw);
    };

    return (
        <div className={`${extraClass} rounded-2xl bg-(--dark-800) p-5`}>
            <div className='flex'>
                {!synopsis ? (
                    <section className='flex mr-5'>
                        <button className='btn void font-semibold' onClick={() => toggleBlockType('header-one')}>
                            H1
                        </button>
                        <button className='btn void font-semibold' onClick={() => toggleBlockType('header-two')}>
                            H2
                        </button>
                        <button className='btn void font-semibold' onClick={() => toggleBlockType('header-three')}>
                            H3
                        </button>
                        <button className='btn void font-semibold' onClick={() => toggleBlockType('header-six')}>
                            P
                        </button>
                    </section>
                ) : (<></>)}
                <section className='flex'>
                    <button className='btn void font-semibold' onClick={() => toggleInlineStyle('BOLD')}>
                        <b>B</b>
                    </button>
                    <button className='btn void font-semibold' onClick={() => toggleInlineStyle('UNDERLINE')}>
                        <u>U</u>
                    </button>
                    <button className='btn void font-semibold' onClick={() => toggleInlineStyle('ITALIC')}>
                        <i>I</i>
                    </button>
                </section>
            </div>
            <hr className='my-5' />
            <Editor
                className="overflow-y-auto"
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
            />
        </div>
    );
}
