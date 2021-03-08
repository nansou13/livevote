import React, { useEffect } from 'react';
import {
  useLocation, Redirect
} from "react-router-dom";
import { sendMessage } from '../../socket';

const makeid = (length) => {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//Exemple : /create?theme=qui%20a%20vol%C3%A9%20l%27orange%20du%20marchant&values=c%27est%20pas%20moi|la%20r%C3%A9ponse%20D|je%20m%27en%20ficheuh

const Create = () => {
  let redirect = '/';
  const params = new URLSearchParams(useLocation().search);
  if(params.get('theme') && params.get('values')){
    const theme = params.get('theme');
    const values = params.get('values').split('|');
    const room = `${makeid(3)}-${makeid(3)}-${makeid(3)}`;
  
    console.log({ theme, values, room })
    sendMessage('addNewGame', { theme, values, room });
    redirect = `/${room}`;
  }

  // similar behavior as an HTTP redirect``
  window.location.replace(window.location.origin+redirect);
  return (
      // <Redirect to={redirect} /> 
      <div>en cours...</div>
  );
};

export default Create;
