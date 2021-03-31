import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { formatResultData, displayResultData } from 'Functions';
import Graph from 'Components/graph';
import { startGame, getTheme, refreshStat, sendMessage } from 'socket';

const Game = ({ isAdmin }) => {
  const [currentTheme, setCurrentTheme] = useState(false);
  const [currentValues, setCurrentValues] = useState([]);
  const [oldValues, setOldValue] = useState([]);
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState({});
  const [displayed, setDisplayed] = useState(false);

  const updateGame = ({ theme, values, old }) => {
    setCurrentTheme(theme);
    setCurrentValues(values);
    setSelected(false);
    setData({});
    setOldValue(old);
  };

  const getGame = useCallback(
    ({ theme, values, results, old }) => {
      setCurrentTheme(theme);
      setCurrentValues(values);
      if (isAdmin) {
        setData(formatResultData(results));
        setOldValue(old);
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

  const refreshGame = useCallback((results) => {
    const formatdata = formatResultData(results);
    setData(formatdata);
  }, []);

  useEffect(() => {
    startGame(updateGame); // Nouveau vote
    getTheme(getGame); // New connexion
    refreshStat(refreshGame); // New vote Externe
  }, [getGame, refreshGame]); // N’exécute l’effet que si count a changé
  // console.log('old', oldValues, oldValues[0].results && Object.keys(oldValues[0].results).map((val) => ({ name: val, data: oldValues[0].results[val].length })))
  return (
    <div className="blockGame">
      {isAdmin && oldValues?.length > 0 && (
        <div onClick={() => setDisplayed(true)}>Anciens resultats</div>
      )}
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
      {displayed && (
        <div className="overlay" onClick={() => setDisplayed(false)}>
          <div className="displayOlds">
            {oldValues &&
              oldValues.map((oldResult) => (
                <div className="oldContent">
                  <div>{oldResult.theme}</div>
                  <div className="oldResults">
                    {displayResultData(oldResult.results).map(({ name, data : currentOld }) => (
                      <div>
                        {name} : {currentOld}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

Game.propTypes = {
  isAdmin: PropTypes.bool,
};

Game.defaultProps = {
  isAdmin: false,
};

export default Game;
