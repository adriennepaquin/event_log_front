import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function NewLogForm({ newLog, setNewLog, handleSubmit }){

    function handleChange(e){
        setNewLog(e.target.value)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={5} placeholder="Paste event log here" value={newLog} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

export default NewLogForm