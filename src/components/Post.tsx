import React from 'react';
import {useState} from 'react'
import { styled } from 'styled-components'

type Post = {
  content: string;
}

const PostWrapper = styled.div<{ $long?: boolean; }>`
  margin: 1em;
  width: fit-content;
  block-size: fit-content;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  display:block;
  transition: 0.3s;
  padding: 1em;
  border-radius: 10px;
  background: #E9F6FF;
  user-select:none;
  &:hover{
    cursor: pointer;
    background: #FE7A36;
    box-shadow: 0 10px 18px 0 rgba(0,0,0,0.2);
  } 
  &:active{
    cursor: pointer;
    background: #bd4f24;
    box-shadow: 0 10px 18px 0 rgba(0,0,0,0.2);
  }
  ${ (props) => !props.$long && `
    &:hover{
    cursor: default;
    background: #FE7A36;
    box-shadow: 0 10px 18px 0 rgba(0,0,0,0.2);
  }`}
`

const PostContent = styled.text`
  font-size: 1rem;
`


const Post = ({ content }:Post) => {
  const [expand, toggle] = useState(false)
  let long = false;
  let condensed = content;

  const handlePostClick = () => {
    toggle(!expand)
  }
  if (content.length>70)
  {
    long = true;
    condensed = condensed.slice(0, condensed.indexOf('.', 140)) + ' ...'
  }
  return (
    <PostWrapper $long={long} onClick={handlePostClick}>
      <PostContent>
        {expand ? content : condensed}
      </PostContent>
    </PostWrapper>
  )
  
}

export default Post
