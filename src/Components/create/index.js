import React from 'react';
import { useLocation } from 'react-router-dom';
import { sendMessage } from 'socket';

const makeid = (length) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Exemple : /create?theme=qui%20a%20vol%C3%A9%20l%27orange%20du%20marchant&values=c%27est%20pas%20moi|la%20r%C3%A9ponse%20D|je%20m%27en%20ficheuh

const Create = () => {
  let redirect = '/';
  const params = new URLSearchParams(useLocation().search);
  if (params.get('theme') && params.get('values')) {
    const theme = params.get('theme');
    const values = params.get('values').split('|');
    const room = `${makeid(3)}-${makeid(3)}-${makeid(3)}`;
console.log('yes debug ==>', theme, values, room)
    sendMessage('addNewGame', { theme, values, room });
    redirect = `/${room}`;
  }

  setTimeout(() => { window.location.replace(window.location.origin + redirect) }, 1500);
  // similar behavior as an HTTP redirect``
  // window.location.replace(window.location.origin + redirect);
  return (
      <div>en cours...</div>
  );
};

export default Create;
