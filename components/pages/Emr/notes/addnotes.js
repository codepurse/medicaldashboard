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

  return <>
    <p>asdasd</p>
  </>;
}
