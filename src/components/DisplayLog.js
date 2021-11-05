import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function DisplayLog({log, handleDeleteLog, user}){

    const [comment, setComment] = useState("")

    // console.log(log.comments)

    function handleChange(e){
        setComment(e.target.value)
    }

    function handleComment(e){
        e.preventDefault()
        const commentData = {
            comment: comment,
            user_id: parseInt(user),
            log_id: log.id
        }
        // console.log(commentData)
        fetch(`http://localhost:3000/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    
    const displayComments = log.comments.map(comment => {
        return <p>User {comment.user_id} commented: {comment.comment}</p>
    })

    return(
        <div>
            <div>
                <p>Event Log #{log.id}</p>
                <p>Source IP address: {log.src}</p>
                <p>Source valid? {log.src_valid ? "Yes!" : "No"}</p>
                <p>Source private? {log.src_private ? "Yes!" : "No"}</p>
                <p>Destination IP address: {log.dst}</p>
                <p>Destination valid? {log.dst_valid ? "Yes!" : "No"}</p>
                <p>Destination private? {log.dst_private ? "Yes!" : "No"}</p>
                <p>{displayComments}</p>
            </div>
            <Button value={log.id} onClick={handleDeleteLog}>Delete Log</Button>
            <Form onSubmit={handleComment}>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={2} placeholder="Write comment here" value={comment} onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">Add Comment</Button>
            </Form>
        </div>
    )
}

export default DisplayLog