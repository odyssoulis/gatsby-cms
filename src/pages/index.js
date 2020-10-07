import React from "react"
import {graphql} from "gatsby"
import axios from 'axios'
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Layout from "../components/layout"
import SEO from "../components/seo";
import Map from "../components/map";
import useResize from "../hooks/useResize";
import {version} from "react-dom";
import remarkSubSuper from 'remark-sub-super';
import ReactHtmlParser from 'react-html-parser';
import YouTube from 'react-youtube';

const FullScreenVideo = styled.video`
	position: fixed;
	z-index: -100;
`;

const videoAspectRatio = 2880/1800;

const BlogIndex = ({ data }) => {
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(1);
  const [videoWidth, setVideoWidth] = React.useState(0);
  const [videoHeight, setVideoHeight] = React.useState(0);
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const resizeTrigger = useResize();
  const videoRef = React.useRef();
  
  React.useEffect(() => {
    if (!window) return;
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, [resizeTrigger])
  
  const windowAspectRatio = React.useMemo(() => windowWidth/windowHeight, [windowWidth, windowHeight]);
  
  React.useEffect(() => {
    if (windowAspectRatio > videoAspectRatio) {
      setVideoWidth(windowWidth)
      setVideoHeight(windowWidth / videoAspectRatio)
    } else {
      setVideoHeight(windowHeight)
      setVideoWidth(windowHeight * videoAspectRatio)
    }
  }, [windowAspectRatio])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/', {
      firstName,
      lastName
    })
    .then(function (response) {
      setFirstName('')
      setLastName('')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div>
      {/* {console.log(data.strapiHomePage.text)} */}
      <div style={{width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden'}}>
        <FullScreenVideo autoPlay muted loop ref={videoRef}
          style={{
            width: videoWidth,
            height: videoHeight,
            left: windowAspectRatio < videoAspectRatio ? (windowWidth - videoWidth)/2 : 0,
            top: windowAspectRatio > videoAspectRatio ? (windowHeight - videoHeight)/2 : 0
          }}
        >
          <source src={`${data.strapiHomePage.backgroundVideo.publicURL}`} type="video/mp4" />
        </FullScreenVideo >
        <div style={{position: 'absolute', bottom: 0, right: 0, color: 'white', padding: 40}}>
          <div>{ReactHtmlParser(data.strapiHomePage.text)}</div>
          <button
            style={{
              borderRadius: 8,
              border: 'none',
              padding: '4px 8px',
              backgroundColor: data.strapiHomePage.buttonColor,
            }}
          >
            {data.strapiHomePage.buttonText}
          </button>
        </div>
      </div>
      <SEO title="Home" />
      <div style={{height: 500, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit}>
          <label>
            First name
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last name
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div style={{height: 1000, width: '100%'}}>
          <Map />
      </div>
      <YouTube videoId="2g811Eo7K8U" opts={opts} /* onReady={this._onReady} */ />
    </div>
  )
}

export default BlogIndex

export const homePageQuery = graphql`
  query {
    strapiHomePage {
      buttonColor
      buttonText
      text
      slug
      backgroundVideo {
        publicURL
      }
    }
  }
`
