import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import GraphDisplay from 'Components/graphDisplay'

const Graph = ({ data }) => {
  const formattedData = Object.keys(data).map((val) => ({ name: val, data: data[val].length }));
  const ref = useRef(null);
  return (
    <div ref={ref} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {data && (
        <GraphDisplay data={formattedData} />
      )}
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
