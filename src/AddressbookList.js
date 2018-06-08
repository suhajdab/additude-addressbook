import React from 'react';
import AddressbookListItem from './AddressbookListItem';
import '@material/list/dist/mdc.list.css';

/**
 * Filter function used to find users whose names begin with search string
 * @param {String} searchString String to find at the beginning of user's first and/or last name
 * @param {Object} user User data object
 */
function searchUsers(searchString, user) {
  const reg = new RegExp('^' + searchString, 'i');
  return reg.test(user.name.first) || reg.test(user.name.last);
}

/**
 * Sort function to put user in ascending alphabetical order by first or last name
 * @param {String} key Object value key to sort by (first|last)
 * @param {Object} a First object used for string comparison
 * @param {Object} b Second object used for string comarison
 */
function sortUsers(key,a,b) {
  if (a.name[key] < b.name[key]) {
    return -1;
  }
  if (a.name[key] > b.name[key]) {
    return 1;
  }
  return 0;
}

/**
 * Returns for Addressbook list
 * @param {Object} props Data passed to component from parent
 */
function AddressbookList(props) {
  const displayedUsers = props.users
    .filter(searchUsers.bind(this, props.searchString))
    .sort(sortUsers.bind(this, props.sortBy));

  const listElements = displayedUsers.map((user) => <AddressbookListItem key={user.uid} user={user} onUserSelect={props.onUserSelected} />);

  return <ul className="addressbook-list mdc-list">
    {listElements}
  </ul>;
}

export default AddressbookList;
