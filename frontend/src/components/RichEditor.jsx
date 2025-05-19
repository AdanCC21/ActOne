import React, { useState } from 'react';
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Bold from '../assets/editorIcons/bold.svg'
import UnderLine from '../assets/editorIcons/underline.svg'
import Italic from '../assets/editorIcons/italic.svg'

export default function RichTextEditor({ initialContent, onSave }) {
    console.log(initialContent);
    const [editorState, setEditorState] = useState(
        initialContent
            ? EditorState.createWithContent(convertFromRaw(initialContent))
            : EditorState.createEmpty()
    );

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

    const saveContent = () => {
        const content = editorState.getCurrentContent();
        const raw = convertToRaw(content);
        onSave(raw);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: 10 }}>
            <div className='flex'>
                <button className='btn interaction' onClick={() => toggleInlineStyle('BOLD')}>
                    <img src={Bold} alt='Bold' />
                </button>
                <button className='btn interaction' onClick={() => toggleInlineStyle('UNDERLINE')}>
                    <img src={UnderLine} alt='UnderLine' />
                </button>
                <button className='btn interaction' onClick={() => toggleInlineStyle('ITALIC')}>
                    <img src={Italic} alt='Italic' />
                </button>
                <button className='btn interaction' onClick={saveContent}>Save</button>
            </div>
            <hr className='my-5' />
            <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
            />
        </div>
    );
}
