import React, { useEffect, useState } from 'react';
import Graph from '../../Components/graph'
import {startGame, getTheme, refreshStat, sendMessage} from '../../socket'



const Game = ({isAdmin}) => {
    const [theme, setTheme] = useState(false)
    const [values, setValues] = useState([])
    const [selected, setSelected] = useState(false)
    const [data, setData] = useState([])

    const updateGame = ({theme, values})=> {
        console.log('startGame')
        setTheme(theme)
        setValues(values)
        setSelected(false)
        setData([])
    }
    const getGame = ({theme, values, results})=> {
        console.log('getGame')
        setTheme(theme)
        setValues(values)
        if(isAdmin){
            setData(formatResult(results))
        }
    }

    const voted = (vote) => {
        if(!selected){
            sendMessage('vote', vote)
            setSelected(vote)
        }
        
    }

    const formatResult = (results) => (
        results.reduce((acc, current) => {
            return {
                ...acc, 
                [current.choice]: [
                    ...(acc[current.choice] || []),
                    current.id,
                  ],
                }
            }, {})
    )


    const refreshGame = (results) => {
        const formatdata = formatResult(results)
        console.log('formatData...',results, formatdata)
        setData(formatdata)
    }

    useEffect(() => {
        startGame(updateGame) //Nouveau vote
        getTheme(getGame) //New connexion
        refreshStat(refreshGame) //New vote Externe
    }, []); // N’exécute l’effet que si count a changé
    
    console.log('result.....', data)

    return (
        <>
            {theme && (<h1>{theme}</h1>)}
            {(selected || isAdmin) && (
                <Graph data={data} />
            )}
            <div>
                {
                    values && values.map(val => (
                        <div 
                        key={val}
                        className="voteSelection"
                        style={{
                            background: selected && selected !== val ? '#EEE' : '#FFF'
                        }}
                        onClick={() => voted(val)}
                        >{val}</div>
                    ))
                }
            </div>
        </>
        

    )
}

export default Game;