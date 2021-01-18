import React, { useEffect, useState } from 'react';
import {startGame, sendMessage} from '../../socket'



const Game = () => {
    const [theme, setTheme] = useState(false)
    const [values, setValues] = useState([])
    const [selected, setSelected] = useState(false)

    const updateGame = ({theme, values})=> {
        setTheme(theme)
        setValues(values)
        setSelected(false)
    }

    const voted = (vote) => {
        if(!selected){
            sendMessage('vote', vote)
            setSelected(vote)
        }
        
    }
    useEffect(() => {
        startGame(updateGame)
    }, []); // N’exécute l’effet que si count a changé
    
    return (
        <div style={{width: '100%'}}>
            {theme && (<div>{theme}</div>)}
            <div style={{width: 600, margin: 'auto'}} >
                {
                    values && values.map(val => (
                        <div 
                        key={val}
                        style={{
                            width: '100%', 
                            border: '1px solid black',
                            padding: 15,
                            cursor: 'pointer',
                            margin: 10,
                            background: selected && selected !== val ? '#EEE' : '#FFF'
                        }}
                        onClick={() => voted(val)}
                        >{val}</div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default Game;