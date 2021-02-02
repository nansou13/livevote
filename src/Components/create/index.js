import React, { useEffect } from 'react';

const Create = () => {
  useEffect(() => {
    //Create and redirect on the room
    updateUserList(updateUser);
  }, []); 
  return (
    <div>
      Create room ...
    </div>
  );
};

export default Create;
