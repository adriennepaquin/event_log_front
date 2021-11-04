import { useState, useEffect } from 'react'
import DisplayLog from './DisplayLog'
import NewLogForm from './NewLogForm'
import Dropdown from 'react-bootstrap/Dropdown'

function Home(){

    const [logs, setLogs] = useState([])
    const [newLog, setNewLog] = useState("")
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])

    // fetch all logs
    // useEffect(() => {
    //     fetch(`http://localhost:3000/logs`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         setLogs(data)
    //     })
    // }, [])

    // fetch all users
    // useEffect(() => {
    //     fetch(`http://localhost:3000/users`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         setUsers(data)
    //     })
    // }, [])

    // set User state
    function handleUser(e) {
        setUser(e.target.value)
    }

    // delete log
    function handleDeleteLog(e){
        fetch (`http://localhost:3000/logs/${e.target.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const updatedLogs = logs.filter(log => log.id !== data.id)
            setLogs(updatedLogs)
        })
    }

    const displayLogs = logs.map(log => {
        return <DisplayLog handleDeleteLog={handleDeleteLog} key={log.src} log={log}/>
    })

    const displayUsers = users.map(user => {
        return <Dropdown.Item key={user.id} value={user.id} onChange={handleUser}>{user.name}</Dropdown.Item>
    })

    return (
        <div>
            Homepage
            <div>
                Select user:
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select A User
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {displayUsers}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                <h3>Add Event Log</h3>
                <NewLogForm setNewLog={setNewLog}/>
            </div>
            {displayLogs}
        </div>
    )
}

export default Home