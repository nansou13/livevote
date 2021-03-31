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

// Exemple : /create?theme=Tu%20pr%C3%A9f%C3%A8res%20%3F&values=Porter%20des%20chaussettes%20mouill%C3%A9%20toute%20l%E2%80%99ann%C3%A9e%20OU%20ne%20pas%20te%20laver%20tes%20cheveux%20toute%20l%E2%80%99ann%C3%A9e%20%3F%7CL%C3%A9cher%20la%20barre%20pour%20se%20tenir%20dans%20le%20m%C3%A9tro%20OU%20m%C3%A2cher%20un%20chewing-gum%20trouv%C3%A9%20par%20terre%20%3F%7CAvoir%20tes%20parents%20de%20surprendre%20en%20train%20de%20faire%20l%E2%80%99amour%20OU%20surprendre%20tes%20parents%20faire%20l%E2%80%99amour%20%3F%7C%C3%8Atre%20l%E2%80%99homme%20le%20plus%20dr%C3%B4le%20du%20monde%20OU%20%C3%AAtre%20l%E2%80%99homme%20le%20plus%20intelligent%20du%20monde%20%3F

const Create = () => {
  let redirect = '/';
  const params = new URLSearchParams(useLocation().search);
  const room = `${makeid(3)}-${makeid(3)}-${makeid(3)}`;

  const theme = params.get('theme') || false;
  const values = params.get('values') ? params.get('values').split('|') : false;

  sendMessage('addNewGame', { theme, values, room });

  redirect = `/${room}`;

  setTimeout(() => { window.location.replace(window.location.origin + redirect) }, 1500);
  // similar behavior as an HTTP redirect``
  // window.location.replace(window.location.origin + redirect);
  return (
      <div>en cours...</div>
  );
};

export default Create;
