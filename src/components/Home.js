import { useState, useEffect } from 'react'
import DisplayLog from './DisplayLog'
import NewLogForm from './NewLogForm'
import Button from 'react-bootstrap/Button'

function Home(){

    const [logs, setLogs] = useState([])
    const [newLog, setNewLog] = useState("")
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    console.log(user)

    // fetch all logs
    useEffect(() => {
        fetch(`http://localhost:3000/logs`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setLogs(data)
        })
    }, [])

    // fetch all users
    useEffect(() => {
        fetch(`http://localhost:3000/users`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUsers(data)
        })
    }, [])

    // set User state
    function handleUser(e) {
        console.log("click")
        setUser(e.target.value)
        console.log(user)
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
        return <DisplayLog handleDeleteLog={handleDeleteLog} key={log.id} log={log} user={user}/>
    })

    const displayUsers = users.map(user => {
        return <Button key={user.id} value={user.id} onClick={handleUser}>{user.id}: {user.name}</Button>
    })

    return (
        <div>
            Homepage
            <div>
                <h4>Current user:</h4>
                {/* {user ? {user} : "Please select a user"} */}
                <p>Current User Id: {!user ? "Please select a user" : {user}}</p>
            </div>
            <div>
                <h3>Select user:</h3>
                {displayUsers}
            </div>
            <div>
                <h3>Add Event Log</h3>
                <NewLogForm setNewLog={setNewLog} user={user}/>
            </div>
            <div>
                <h3>All Event Logs:</h3>
                {displayLogs}
            </div>
            
        </div>
    )
}

export default Home