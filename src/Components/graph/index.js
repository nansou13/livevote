import React, { useEffect, useState } from 'react';
import { sendMessage } from '../../socket'
import {
    BarChart, Bar, XAxis, YAxis,
  } from 'recharts';


const Graph = ({data}) => {
    const formattedData = Object.keys(data).map((val) => ({name : val, data: data[val].length}))
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            { 
                data && (
                    <BarChart width={320} height={300} data={formattedData}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis/>
                        <Bar dataKey="data" fill="#8884d8" />
                    </BarChart>
                )}
        </div>

    )
}

export default Graph;