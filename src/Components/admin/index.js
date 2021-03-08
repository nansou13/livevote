import React, { useEffect, useState } from 'react';
import { updateUserList, sendMessage } from '../../socket';

const Admin = () => {
  const [theme, setTheme] = useState('');
  const [values, setValues] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentValue, setCurrentValue] = useState('');

  const addNewValue = (value) => {
    if(value){
      setValues([...values, value]);
      setCurrentValue('');
    }
  };

  const handleTheme = ({ target: { value } }) => {
    setTheme(value);
  };

  const clickSendMessage = () => {
    sendMessage('addNewGame', { theme, values });
    setTheme('');
    setValues([]);
  };

  const updateUser = (players) => {
    setUsers(players);
  };

  useEffect(() => {
    updateUserList(updateUser);
  }, []); // N’exécute l’effet que si count a changé

  return (
    <div className="adminForm" style={{ width: '400px' }}>
      <h2>admin</h2>
      <div>Utilisateurs connectés : {users.length}</div>
      <div>
        <input placeholder="Ajouter une question" value={theme} type="text" onChange={handleTheme} />
      </div>
      {values.map((val) => (
        <div>{val}</div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Ajouter une réponse"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={({ key }) => key === 'Enter' && addNewValue(currentValue)}
        />
      </div>

      <div>
        <button className="adminButton" onClick={clickSendMessage}>Valider</button>
      </div>
    </div>
  );
};

export default Admin;
