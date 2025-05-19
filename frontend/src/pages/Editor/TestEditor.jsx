import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js';
import RichTextEditor from '../../components/RichEditor';

export default function TestEditor() {
  const [raws, SetRaw] = useState(Array < EditorState.createEmpty() > []);
  const [currentAct, setAct] = useState(0)

  const HandleSave = () => {

  }

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <div className='mx-[10vw]'>
        {/* <RichTextEditor initialContent={raws[currentAct]} onSave={SetRaw(prev => [...prev])}/> */}
      </div>
    </div>
  )
}
