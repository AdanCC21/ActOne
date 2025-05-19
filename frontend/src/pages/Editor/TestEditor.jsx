import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js';
import RichTextEditor from '../../components/EditorComponent';

export default function TestEditor() {
  

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <div className='mx-[10vw]'>
        {/* <RichText editorState={editorState} setEditorState={setEditorState} /> */}
        <RichTextEditor />
      </div>
    </div>
  )
}
