import React from 'react';
import FormatName from './FormatName';

function UserImage(props) {
  return (
    <img className={props.size}
      alt={FormatName(props.user.name)}
      src={props.user.picture[props.size]}
    />
  );
}

export default UserImage;
