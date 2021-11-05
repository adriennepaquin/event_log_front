import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function NewLogForm( setNewLog, user ){

    const [log, setLog] = useState("")

    function handleChange(e){
        setLog(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`http://localhost:3000/logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(log)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={5} placeholder="Paste event log here" value={log} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default NewLogForm