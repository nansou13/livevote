import React, { useEffect, useState } from 'react';
import {updateUserList, sendMessage} from '../../socket'



const Admin = () => {
    // let messageListing = []
    const [messageListing, setMessage] = useState([]);
    const [messagesend, setmessagesend] = useState('')

    const [theme, setTheme] = useState('...')
    const [values, setValues] = useState([])
    const [users, setUsers] = useState([])
    const [currentValue, setCurrentValue] = useState('')
   
    const addNewValue = (value) => {
        setValues([...values, value])
        setCurrentValue('')
    }

    const handleTheme = ({target: {value}}) => {
        setTheme(value)
      }

    const clickSendMessage = () => {

          sendMessage('addNewGame', {theme, values})
          setTheme('')
          setValues([])
      }

      const updateUser = (players) => {
        setUsers(players)
      }

      useEffect(() => {
        updateUserList(updateUser)
    }, []); // N’exécute l’effet que si count a changé
    

    return (
        <div style={{width: '100%'}}>
            <div>admin ({users.length})</div>
            <div>
                Theme : 
                <input value={theme} type="text" onChange={handleTheme} />
            </div>
            {
                values.map((val) => (
                    <div>{val}</div>
                ))
            }
            <div>
                
                <input type="text" value={currentValue} 
                    onChange={(e => setCurrentValue(e.target.value))} 
                    onKeyDown={({key}) => key === 'Enter' && addNewValue(currentValue)}
                />

            </div>
            
            <div>
                <button onClick={clickSendMessage}>Valider</button>
            </div>
        </div>
    )
}


export default Admin;