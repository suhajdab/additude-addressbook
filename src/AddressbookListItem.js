import React from 'react';
import FormatName from './FormatName';
import UserImage from './UserImage';

/**
 * TODO: convert to React Component
 */

/**
 * Handle KeyUp events on focussed list item, 'Enter' key will execute fn, select user
 * @param {Event} e Keyboard event
 * @param {Function} fn Function
 */
function onKeyUp(e, fn) {
  if (e.keyCode === 13) {
    fn();
  }
}

/**
 * Return Addressbook list item
 * @param {Object} props 
 */
function AddressbookListItem(props) {
  return <li className="addressbook-list-item mdc-list-item" tabIndex="0" onClick={(e) => props.onUserSelect(props.user)} onKeyUp={(e) => onKeyUp(e, props.onUserSelect.bind(null, props.user))}>
  <span className="mdc-list-item__graphic">
    <UserImage size="thumbnail" user={props.user} />
  </span>
  <span className="mdc-list-item__text">
    {FormatName(props.user.name)}
  </span>
</li>;
}

export default AddressbookListItem;
