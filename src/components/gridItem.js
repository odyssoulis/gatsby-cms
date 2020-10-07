import React from 'react';
import Editor from './editor';

const GridItem = ({gridKey}) => {
  // console.log(gridKey)
  return (
    <div style={{border: '1px dotted gray'}}>
      {/* <Editor holder={`holder${gridKey}`}>
        <div id={`holder${gridKey}`} />
      </Editor> */}
    </div>
  )
}

export default GridItem;
