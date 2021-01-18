import React, { useEffect, useState } from 'react';
import Graph from '../../Components/graph'
import {startGame, sendMessage} from '../../socket'



const Game = ({username}) => {
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
            {theme && (<div style={{fontWeight: 'bold',
    fontSize: '30px'}}>{theme}</div>)}
            {(selected || username === 'nans') && (
                <Graph />
            )}
            <div style={{width: '80%', margin: 'auto'}} >
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