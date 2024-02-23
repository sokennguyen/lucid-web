import './index.css'
import {styled} from 'styled-components'
import { useState, useEffect } from 'react'
import dreamService from './services/dreams'
import Post from './components/Post'

const sizes = {
  small: '576',
  laptop: '1025',
  desktop: '2560',
};

const devices = {
  small: `(min-width:${sizes.small}px)`,
  laptop: `(min-width:${sizes.laptop}px)`,
  desktop: `(min-width:${sizes.desktop}px)`
}

const Root = styled.div`
  height:100%;
  background: #280274;
  overflow-y: scroll;
`
const Title = styled.h1`
  font-size: 2.2em;
  color: #FE7A36;
  margin:20px 0 0 0;
  text-align:start;
  padding:0 4rem;
  @media ${devices.small}{
    padding:0;
    text-align:center;
    font-size: 3rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.22rem;
  color: #FE7A36;
  margin:20px 1em;
  text-align:start;
  padding:0 4rem;
  @media ${devices.small}{
    padding:0;
  }
`;

const Wrapper = styled.section`
  padding: 0;
  @media ${devices.laptop}{
    padding: 0 25em;
  }
`;

const Input = styled.textarea`
  width: 300px;
  height: 150px;
  outline:none;
  resize:none;
  border-radius:10px;
  background-color:#E9F6FF;
  caret-color:orange;
`;

const Form = styled.form`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin: 10px 0 80px 0;
`;

const OtherDreams = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function App() {
  const [otherDreams, setOtherDreams] = useState([''])
  const [usrInp, setUsrInp] = useState('')

  useEffect(()=>{
    const fetchDb = async () => {
      let dreams = await dreamService.getAll();
      console.log(dreams)
      dreams = dreams.map(dream => dream.content).reverse()
      setOtherDreams(dreams)
    }
    fetchDb()
  },[])

  const btnOnPress = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (usrInp == '') return
    const newDreamObj = {
      content: usrInp
    }
    await dreamService.post(newDreamObj)
    const refreshedDreams = await dreamService.getAll()
    const refreshedDreamsContent = refreshedDreams.map(dream => dream.content).reverse()
    setOtherDreams(refreshedDreamsContent)
    setUsrInp('')
  }

  const handleTextInp = (e:React.MouseEvent<HTMLElement>) => {
    setUsrInp((e.target as any).value)
  }
  return (
    <Root>
      <Wrapper>
        <Title>
          Lucid
        </Title>
        <Form onSubmit={btnOnPress}>
          <Input value={usrInp} onChange={handleTextInp} placeholder="Last night I dreamed about"/>
          <button type='submit' >Post</button>
        </Form>
        <Subtitle >
          Others have dreamed about...
        </Subtitle>
        <OtherDreams>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {otherDreams.map((dream,index)=>
              <Post key={index} content={dream}/>
            )}
            {}
          </div>
        </OtherDreams>
      </Wrapper>
    </Root>
  )
}


export default App
