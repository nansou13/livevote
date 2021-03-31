import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import './style.css';


const getMax = (data) => data && data.length>0 ? Math.max.apply(Math, data.map(function(o) { return o.data; })) : 0

const Graph = ({ data }) => {
  const formattedData = Object.keys(data).map((val) => ({ name: val, data: data[val].length }));
  const totalVote = formattedData.reduce((acc, value) => acc + value.data, 0)
  const ref = useRef(null);

  const max = getMax(formattedData)
  const cssCalc = (current) => {
    return current * 100 / max
  }
  return (
    <div ref={ref} className="mainGraph">
      {formattedData && formattedData.map(({name, data:value}) => {
            const cssWidth = cssCalc(value)
            return(
            <div className="mainBar">
              <div className="barLabel" style={{fontWeight: `${value===max ? 'bold' : 'normal'}`}}>{name}</div>
              <div className="barChart" style={{width: `${cssWidth}%`}}>{value}</div>
            </div>
          )})
        }
        <div>nombre de vote : {totalVote}</div>
    </div>
  );
};

Graph.propTypes = {
  data: PropTypes.object,
};

Graph.defaultProps = {
  data: {},
};

export default Graph;
