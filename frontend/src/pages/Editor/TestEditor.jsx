import { EditorState, convertToRaw } from "draft-js";
import { useState } from "react";
import RichTextEditor from '../../components/RichEditor';

export default function TestEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSave = (rawContent) => {
    console.log("Contenido guardado:", rawContent);
  };

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <div className='mx-[10vw]'>
        <RichTextEditor
          editorState={editorState}
          setEditorState={setEditorState}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
