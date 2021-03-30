import React from 'react';
import PropTypes from 'prop-types';

const getMax = (data) => Math.max.apply(Math, data.map(function(o) { return o.data; }))

const GraphDisplay = ({ data }) => {
  const max = getMax(data)
  const cssCalc = (current) => {
    return current * 100 / max
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      
      {
        data && data.map(({name, data:value}) => {
          const cssWidth = cssCalc(value)
          return(
          <div>
            <div className="barLabel" style={{fontWeight: `${value===max ? 'bold' : 'normal'}`}}>{name}</div>
            <div className="barChart" style={{width: `${cssWidth}%`}}>{value}</div>
          </div>
        )})
      }
    </div>
    
  );
};

GraphDisplay.propTypes = {
  data: PropTypes.array,
};

GraphDisplay.defaultProps = {
  data: [],
};

export default GraphDisplay;
