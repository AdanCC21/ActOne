import React, { useState, useRef, useCallback } from "react";
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from "draft-js";
import './css/RichEditor.css'

const styleMap = {
    CODE: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

const getBlockStyle = (block) => {
    switch (block.getType()) {
        case "blockquote":
            return "RichEditor-blockquote";
        default:
            return null;
    }
};

const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "P", style: "header-six" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
];

const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
];

const StyleButton = ({ label, style, onToggle, active }) => {
    const className = active
        ? "RichEditor-styleButton RichEditor-activeButton"
        : "RichEditor-styleButton";

    const handleMouseDown = (e) => {
        e.preventDefault();
        onToggle(style);
    };

    return <span className={className} onMouseDown={handleMouseDown}>{label}</span>;
};

const BlockStyleControls = ({ editorState, onToggle }) => {
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

const InlineStyleControls = ({ editorState, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

const RichText = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const editorRef = useRef(null);

    const focus = () => editorRef.current?.focus();

    const handleKeyCommand = useCallback((command, state) => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    }, []);

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
            const newState = RichUtils.onTab(e, editorState, 4);
            if (newState !== editorState) {
                setEditorState(newState);
            }
            return null;
        }
        return getDefaultKeyBinding(e);
    };

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const contentState = editorState.getCurrentContent();
    let className = "RichEditor-editor";
    if (!contentState.hasText() && contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
    }

    return (
        <div className="RichEditor-root ">
            <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
            <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
            <div className={className} onClick={focus}>
                <Editor
                    ref={editorRef}
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={setEditorState}
                    placeholder="Tell a story..."
                    spellCheck={true}
                />
            </div>
        </div>
    );
};

export default RichText;
