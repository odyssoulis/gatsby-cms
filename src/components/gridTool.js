import React from 'react';
import { navigate } from "gatsby";
import axios from 'axios';
import {WidthProvider, Responsive} from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';
import Editor from './editor';
import styled from 'styled-components';
import window from '../utils/window';
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const initialLayouts = {
  lg: [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, static: true},
    {i: 'c', x: 4, y: 0, w: 1, h: 2, static: true},
    {i: 'd', x: 11, y: 0, w: 1, h: 2, static: true}
  ],
  md: [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, static: true},
    {i: 'c', x: 4, y: 0, w: 1, h: 2, static: true},
    {i: 'd', x: 11, y: 0, w: 1, h: 2, static: true}
  ],
  sm: [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, static: true},
    {i: 'c', x: 4, y: 0, w: 1, h: 2, static: true},
    {i: 'd', x: 11, y: 0, w: 1, h: 2, static: true}
  ],
  xs: [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, static: true},
    {i: 'c', x: 4, y: 0, w: 1, h: 2, static: true},
    {i: 'd', x: 11, y: 0, w: 1, h: 2, static: true}
  ],
  xxs: [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, static: true},
    {i: 'c', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'd', x: 1, y: 0, w: 3, h: 2, static: true}
  ],
};

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridItemContainer = styled.div`
  padding: 20px;
  &.react-grid-item > .react-resizable-handle {
    z-index: 1;
  }
`;

const MyFirstGrid = ({onEditorFocus, isEditorFocused}) => {
  const [gridDescription, setGridDescription] = React.useState({});
  const [pageData, setPageData] = React.useState({})
  const [layouts, setLayouts] = React.useState({lg: [], md: [], sm: [], xs: [], xxs: []});
  React.useEffect(() => {
    axios.get(`${process.env.GATSBY_STRAPI_URL}/pages/${testPage}`)
      .then(({data}) => setPageData(data))
  }, [])
  React.useEffect(() => {
    setLayouts({
      lg: layouts.lg.map(item => ({
        ...item,
        static: isEditorFocused
      })),
      md: layouts.md.map(item => ({
        ...item,
        static: isEditorFocused
      })),
      sm: layouts.sm.map(item => ({
        ...item,
        static: isEditorFocused
      })),
      xs: layouts.xs.map(item => ({
        ...item,
        static: isEditorFocused
      })),
      xxs: layouts.xxs.map(item => ({
        ...item,
        static: isEditorFocused
      }))
    })
  }, [isEditorFocused])
  const testPage = 11;
  const updateGridDescription = async (layout) => {
    const {lg} = layout;
    const _gridDescription = lg.map(gridItem => ({
      type: 'text',
      column_start: gridItem.x + 1,
      column_end: gridItem.x + gridItem.w + 1,
      row_start: gridItem.y + 1,
      row_end: gridItem.y + gridItem.h + 1,
      options: {
        text: 'kalinixta'
      }
    }))
    setGridDescription(_gridDescription)
    // console.log(_gridDescription);
    // axios.post(`${process.env.GATSBY_STRAPI_URL}/page/${testPage}`, {
    //   email,
    //   password
    // })
  }
  if (!window.sessionStorage) return null;
  const updatePage = () => {
    axios({
      method: 'PUT',
      url: `${process.env.GATSBY_STRAPI_URL}/pages/${testPage}`,
      data: {
        ...pageData,
        sections: [
          ...pageData.sections,
          {
            "__component": "grid.grid",
            "GridDescription": JSON.stringify(gridDescription),
            // "GridDescription": [],
            "widthPercentage": 100,
            "height": 400,
            "type": "grid",
            "mediaType": null,
            "mediaFile_1": null,
            "mediaFile_2": null,
            "mediaFile_3": null
          }
        ]
      },
      headers: {
        Authorization:
          `Bearer ${sessionStorage.getItem('STRAPI_TOKEN')}`,
      },
    })
  }
  const addGridItem = () => {
    const i = uuidv4();
    setLayouts({
      lg: [
        ...layouts.lg,
        {i, x: 0, y: 0, w: 1, h: 1, static: true},
      ],
      md: [
        ...layouts.md,
        {i, x: 0, y: 0, w: 1, h: 1},
      ],
      sm: [
        ...layouts.sm,
        {i, x: 0, y: 0, w: 1, h: 1},
      ],
      xs: [
        ...layouts.xs,
        {i, x: 0, y: 0, w: 1, h: 1},
      ],
      xxs: [
        ...layouts.xxs,
        {i, x: 0, y: 0, w: 1, h: 1},
      ]
    })
  }
  console.log(layouts);
  return (
    <div style={{width: '100%', display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
      {layouts.lg.length !== 0
        ? (
          <ResponsiveGridLayout
            className="layout"
            layouts={initialLayouts}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            style={{width: '100%', border: '1px dotted gray'}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            onLayoutChange={(_, layout) => updateGridDescription(layout)}
          >
            {layouts.lg.map(layoutItem => (
              <GridItemContainer key={layoutItem.i} style={{border: '1px dotted gray'}}>
                <Editor holder={layoutItem.i} onFocus={onEditorFocus} />
              </GridItemContainer>
            ))}
            {/* <div key="a" />
            <div key="b" />
            {/* <div key="c" /> */}
            {/* <div key="d" /> */}
            {/* <GridItem gridKey="a" key="a"/>
            <GridItem gridKey="b" key="b"/>
            <GridItem gridKey="c" key="c"/>
            <GridItem gridKey="d" key="d"/> */}
          </ResponsiveGridLayout>
        )
        : (
          <div style={{backfround: '#fefefe'}}>
            {/* <Editor holder="test" style={{width: '100%'}}/> */}
            <p>Add grid items to see the grid</p>
          </div>
        )
      }
      <button style={{marginTop: 40}} onClick={addGridItem}>Add grid item</button>  
      <button style={{marginTop: 40}} onClick={updatePage}>Update Page</button>  
    </div>
  )
  
  // return (
  //   <ResponsiveGridLayout
  //     className="layout"
  //     layouts={initialLayouts}
  //     cols={12}
  //     width={1000}
  //     breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
  //     cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
  //     style={{border: '1px dotted gray'}}
  //     onLayoutChange={console.log}
  //   >
  //     <div key="a" style={{background: 'orange'}}>a</div>
  //     <div key="b" style={{background: 'cyan'}}>b</div>
  //     <div key="c" style={{background: 'yellow'}}>c</div>
  //     <div key="d" style={{background: 'red'}}>d</div>
  //   </ResponsiveGridLayout>
  // )
}

const GridTool = () => {
  const isDev = process.env.NODE_ENV === 'development';
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState(window.sessionStorage ? window.sessionStorage.getItem('STRAPI_TOKEN') : null);
  const [isEditorFocused, setEditorFocus] = React.useState(false);
  React.useEffect(() => {
    if (!isDev) {
      navigate('/404')
    }
  }, [])
  const strapiLogin = () => {
    axios.post(`${process.env.GATSBY_STRAPI_URL}/admin/login`, {
      email,
      password
    })
      .then(({data: {data: {token}}}) => {
        setToken(token);
        window.sessionStorage.setItem('STRAPI_TOKEN', token);
      })
      .catch(err => console.error(err))
  }
  if (!isDev) return null;
  return token
    ? (
      <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => setEditorFocus(false)}>
        <MyFirstGrid
          isEditorFocused={isEditorFocused}
          onEditorFocus={(e) => {setEditorFocus(true); e.stopPropagation();}}
        />
      </div>
    )
    : (
      <div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button onClick={strapiLogin}>
          Sign in to CMS
        </button>
      </div>
    )
};

export default GridTool;
