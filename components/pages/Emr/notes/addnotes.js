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
import { AiOutlineDelete } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
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

export default function addnotes(props) {
  const target = useRef(null);
  const editor = React.useRef(null);
  const [title, setTitle] = useState();
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

  useEffect(() => {
    console.log(props.notesinfo.title);
    if (props.action) {
      console.log("ghahahah")
      setTitle(props.notesinfo.title);
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.notesinfo.text))
        )
      );
    }
  }, []);
  return (
    <>
      <Container className="conTexteditorWrapper">
        <Row>
          <Col lg={10} className="colWrapper">
            <div style={{ zIndex: "1000" }}>
              <i onClick={props.goback}>
                <TiArrowBack />
              </i>
              <label>Title : </label>
              <Select
                className="react-select--inline"
                value={options_notes.filter((option) => option.label === title)}
                onChange={(e) => {
                  setTitle(e.value);
                }}
                options={options_notes}
                styles={customStylesnotes}
                placeholder="Select title.."
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Editor
              spellCheck
              ref={editor}
              editorState={editorState}
              toolbarClassName="notesToolbar"
              wrapperClassName="wrapperClassName"
              editorClassName="notesEditor"
              onEditorStateChange={setEditorState}
              toolbar={{
                options: ["fontSize", "inline", "list"],
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
          </Col>
        </Row>
        <Row className="rowFooter">
          <Col lg={12}>
            <button className="btnSave">
              <i>
                {" "}
                <FaSave />
              </i>
              Save
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
