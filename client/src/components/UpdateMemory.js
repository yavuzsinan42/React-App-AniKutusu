import React, { useEffect, useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import ReactFileBase64 from 'react-file-base64'
import {updateMemory, fetchMemory} from '../axios/index.js'
import { useNavigate } from 'react-router-dom'

const UpdateMemory = ({id}) => {
    const [memoryData, setMemoryData] = useState({
        title:'',
        content: '',
        creator: '',
        image: '',
    })
    useEffect(()=>{
        const getMemo = async () => {
            const {data} = await fetchMemory(id)
            setMemoryData(data)
        }
        getMemo()
    },[id])
    const navigate = useNavigate()
  return (
    <Form onSubmit={(e)=>{
        e.preventDefault()
        updateMemory(id,memoryData)
        navigate('/')
    }}>
        <Form.Group>
            <h1 className='pt-4'>Bir Anıdan Bahset</h1>
        </Form.Group>
        <Form.Group>
            <Form.Label>Başlık</Form.Label>
            <Form.Control name='title' type='text' onChange={(e)=> setMemoryData({...memoryData,title:e.target.value})} value={memoryData.title}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Yazar</Form.Label>
            <Form.Control name='creator' type='text' onChange={(e)=> setMemoryData({...memoryData,creator:e.target.value})} value={memoryData.creator}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Anınız</Form.Label>
            <Form.Control name='content' type='text' as='textarea' rows={4} style={{ marginBottom: '10px' }} onChange={(e)=> setMemoryData({...memoryData,content:e.target.value})} value={memoryData.content}></Form.Control>
        </Form.Group>
        <Form.Group >
            <ReactFileBase64 type='file' multiple={false} onDone={({base64})=>{setMemoryData({...memoryData,image:base64})} } value={memoryData.image} />
        </Form.Group>
        <Button type='submit' style={{width: '100%', marginTop: '10px' }} >Gönder</Button>
    </Form>
  )
}

export default UpdateMemory