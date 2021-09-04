import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  ContentState,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { handleNewLine, insertNewUnstyledBlock } from "draftjs-utils";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import Select from "react-select";
import {
  options_notes,
  customStylesnotes,
  customStyles_error,
} from "../../../../utils/global";

export default function addnotes() {
  const target = useRef(null);
  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focusEditor();
  }
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorStateDefault, setEditorStateDefault] = useState(() =>
    EditorState.createEmpty()
  );

  function myKeyBindingFn(e) {
    if (e.keyCode === 83 && event.ctrlKey) {
      return goSave();
    }
    return getDefaultKeyBinding(e);
  }
  return (
    <>
      <Container className="conTexteditorWrapper" onClick={focusEditor}>
        <Editor
          spellCheck
          ref={editor}
          editorState={editorState}
          toolbarClassName="notesToolbar"
          wrapperClassName="wrapperClassName"
          editorClassName="notesEditor"
          onEditorStateChange={setEditorState}
          toolbar={{
            options: ["fontFamily", "fontSize", "inline", "list"],
            inline: {
              options: ["bold", "italic", "underline", "strikethrough"],
            },
          }}
          keyBindingFn={myKeyBindingFn}
          handleReturn={(event) => {
            var newEditorState = null;
            if (event.keyCode === 13 && event.shiftKey) {
              newEditorState = insertNewUnstyledBlock(editorState);
            } else if (event.keyCode === 13 && !event.shiftKey) {
              newEditorState = RichUtils.insertSoftNewline(editorState);
            }
            if (newEditorState) {
              setEditorState(newEditorState);
              return true;
            }
            return false;
          }}
        />
      </Container>
    </>
  );
}
