// import React, { useState } from 'react';
// import {
//     Editor,
//     EditorState,
//     RichUtils,
//     convertToRaw,
//     convertFromRaw
// } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Bold from '../assets/editorIcons/bold.svg'
import UnderLine from '../assets/editorIcons/underline.svg'
import Italic from '../assets/editorIcons/italic.svg'

import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';


export default function RichTextEditor({ editorState, setEditorState, onSave }) {
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
        <div className='rounded-2xl bg-(--dark-800) p-5 h-[100%] overflow-y-auto'>
            <div className='flex'>
                <button className='btn interaction' onClick={() => toggleInlineStyle('BOLD')}>
                    <b>B</b>
                </button>
                <button className='btn interaction' onClick={() => toggleInlineStyle('UNDERLINE')}>
                    <u>U</u>
                </button>
                <button className='btn interaction' onClick={() => toggleInlineStyle('ITALIC')}>
                    <i>I</i>
                </button>
            </div>
            <hr className='my-5' />
            <Editor className="overflow-y-auto"
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
            />
        </div>
    );
}