// RichTextEditor.jsx
import React, { useState } from 'react';
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function RichTextEditor({ initialContent, onSave }) {
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
        onSave(raw); // Puedes guardar esto en una base de datos
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: 10 }}>
            <div style={{ marginBottom: 10 }}>
                <button onClick={() => toggleInlineStyle('BOLD')}>Negrita</button>
                <button onClick={() => toggleInlineStyle('UNDERLINE')}>Subrayado</button>
                <button onClick={() => toggleInlineStyle('ITALIC')}>Cursiva</button>
                <button onClick={saveContent}>Guardar</button>
            </div>
            <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
            />
        </div>
    );
}
