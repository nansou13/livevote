import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Graph from '../../Components/graph';
import { startGame, getTheme, refreshStat, sendMessage } from '../../socket';

const Game = ({ isAdmin }) => {
  const [currentTheme, setCurrentTheme] = useState(false);
  const [currentValues, setCurrentValues] = useState([]);
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState({});

  const updateGame = ({ theme, values }) => {
    setCurrentTheme(theme);
    setCurrentValues(values);
    setSelected(false);
    setData({});
  };
  const getGame = useCallback(
    ({ theme, values, results }) => {
      setCurrentTheme(theme);
      setCurrentValues(values);
      if (isAdmin) {
        setData(formatResult(results));
      }
    },
    [isAdmin]
  );

  const voted = (vote) => {
    if (!selected) {
      sendMessage('vote', vote);
      setSelected(vote);
    }
  };

  const formatResult = (results) =>
    results.reduce(
      (acc, current) => ({
        ...acc,
        [current.choice]: [...(acc[current.choice] || []), current.id],
      }),
      {}
    );

  const refreshGame = useCallback((results) => {
    const formatdata = formatResult(results);
    setData(formatdata);
  }, []);

  useEffect(() => {
    startGame(updateGame); // Nouveau vote
    getTheme(getGame); // New connexion
    refreshStat(refreshGame); // New vote Externe
  }, [getGame, refreshGame]); // N’exécute l’effet que si count a changé

  console.log('result.....', data);

  return (
    <>
      {currentTheme && <h1>{currentTheme}</h1>}
      {(selected || isAdmin) && <Graph data={data} />}
      <div>
        {currentValues &&
          currentValues.map((val) => (
            <div
              key={val}
              className="voteSelection"
              style={{
                background: selected && selected !== val ? '#EEE' : '#FFF',
              }}
              onClick={() => voted(val)}
            >
              {val}
            </div>
          ))}
      </div>
    </>
  );
};

Game.propTypes = {
  isAdmin: PropTypes.bool,
};

Game.defaultProps = {
  isAdmin: false,
};

export default Game;
