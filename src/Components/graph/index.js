import React, { useEffect, useState } from 'react';
import {refreshStat, sendMessage} from '../../socket'
import {
    BarChart, Bar, XAxis, YAxis,
  } from 'recharts';


const Graph = () => {
    const [data, setData] = useState(false)
    console.log('formatData...',data)
    const updateGame = (results)=> {
        const formatdata = results.reduce((acc, current) => {
            return {
                ...acc, 
                [current.choice]: [
                    ...(acc[current.choice] || []),
                    current.id,
                  ],
                }
            }, {})
        console.log('formatData...',formatdata)
        setData(formatdata)
    }

    useEffect(() => {
        refreshStat(updateGame)
    }, []); // N’exécute l’effet que si count a changé
    
    return (
        <div style={{width: '100%'}}>
            {/* {
                data && Object.keys(data).map((val) => (
                    <div>{val} : {data[val].length}</div>

                ))
            } */}
            {
                data && (
            <BarChart width={600} height={300} data={Object.keys(data).map((val) => ({name : val, data: data[val].length}))}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis/>
                <Bar dataKey="data" fill="#8884d8" />
                
            </BarChart>
                )}
        </div>

    )
}

export default Graph;