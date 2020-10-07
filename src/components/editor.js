import React from 'react';
import EditorJs from 'react-editor-js';
import Embed from '@editorjs/embed'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import SimpleImage from '@editorjs/simple-image'
import styled from 'styled-components';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true 
  },
  list: List,
  linkTool: LinkTool,
  image: Image,
  header: Header,
  simpleImage: SimpleImage
}

const Editor = ({holder, onFocus}) => {
  const editorRef = React.useRef();
  return (
    <div onClick={onFocus}>
      <EditorJs
        autofocus
        tools={EDITOR_JS_TOOLS}
        holder={holder}
        ref={editorRef}
      >
        <div id={holder} />
      </EditorJs>
    </div>
  )
}

export default Editor;
