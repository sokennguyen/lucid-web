import './index.css'
import {styled} from 'styled-components'
import { useState, useEffect } from 'react'
import dreamService from './services/dreams'
import Post from './components/Post'

const Root = styled.div`
  height:100%;
  background: #280274;
  overflow-y: scroll;
`
const Title = styled.h1`
  font-size: 5.5em;
  text-align: center;
  color: #BF4F74;
`;

const Wrapper = styled.section`
  padding: 4em;
`;

const Input = styled.textarea`
  width: 300px;
  height: 150px;
`;

const Form = styled.form`
  display:flex;
  justify-content:center;
  align-items:center;
  margin: 50px 0 50px 0;
`;

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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {otherDreams.map((dream,index)=>
            <Post key={index} content={dream}/>
          )}
          {}
        </div>
      </Wrapper>
    </Root>
  )
}


export default App
