import React, { Component } from 'react';
import AddressbookDetails from './AddressbookDetails';
import AddressbookList from './AddressbookList';

import {uid} from 'react-uid';

import {MDCMenu} from '@material/menu';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/typography/dist/mdc.typography.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/button/dist/mdc.button.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faSort from '@fortawesome/fontawesome-free-solid/faSortAlphaDown';

var apiUrl = 'https://randomuser.me/api/?results=100&seed=additude-addressbook&exc=login';


/**
 * TODO: Turn header into its own component
 */
class Addressbook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users : [],
      selectedUser : {},
      sortedBy: 'first',
      searchString: ''
    }

    this.fetchUsersData();
  }

  /**
   * Fetch addressbook data from api url, and update state on success
   */
  fetchUsersData() {
    fetch(apiUrl)
      .then(response => { return response.json(); })
      .then(json => {
        const results = json.results.map(item => {
          item.uid = uid(item);
          return item;
        });
        this.setState({
          users: results,
          displayedUsers: results
        });
      }).catch(ex => {
        console.error('parsing failed', ex);
        alert('An error occured while fetching data. Please reload the application to try again.');
      });
  }

  /**
   * Utility fn returns true if a user is selected
   */
  isUserSelected() {
    return Object.keys(this.state.selectedUser).length !== 0;
  }

  /**
   * Update state when user is selected
   * @param {Object} user Object containing selected user's data
   */
  onUserSelected(user) {
    this.setState({
      selectedUser: user
    });
  }

  /**
   * Deselect selected user by clearing state
   */
  deselectUser() {
    this.setState({
      selectedUser: {}
    });
  }

  /**
   * Handle KeyUp events of document, used to focus search field when pressing '/'
   * @param {Event} e 
   */
  onDocumentKeyUp(e){
    if(e.keyCode === 191) {
      e.preventDefault();
      let searchField = document.getElementById('search-field');
      searchField.focus();
      searchField.select();
    }
  }

  /**
   * Handle typing in search field
   * @param {Event} e Keyboard event
   * 
   * TODO: sanitize input (can contain breaking characters)
   */
  onSearchKeyUp(e) {
    e.stopPropagation();

    this.setState({
      searchString: e.target.value.trim()
    });
  }

  /**
   * Set up Material Design Components menu
   */
  setupMDCMenu() {
    const menuEl = document.querySelector('#sort-menu');
    const menuButtonEl = document.querySelector('#sort-button');
    const menu = new MDCMenu(menuEl);

    menuButtonEl.addEventListener('click', () => {
      menu.open = !menu.open;
    });

    menuEl.addEventListener('MDCMenu:selected', (e) => {
      if (e.detail.index === 0) this.setState({ sortedBy: 'first'});
      else this.setState({ sortedBy:'last'});
    });
  }

  componentDidMount(){
    document.addEventListener("keyup", this.onDocumentKeyUp.bind(this), false);
    this.setupMDCMenu();
  }

  render() {
    return (
      <div className="Addressbook">
        <header className="mdc-top-app-bar mdc-top-app-bar--fixed">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <span className="mdc-top-app-bar__title">Addressbook</span>
            </section>
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
              <div className="mdc-menu-anchor">
                <a href="#sort" id="sort-button" className="material-icons mdc-top-app-bar__action-item" aria-label="Sort" alt="Sort"><FontAwesomeIcon icon={faSort} /></a>
                <div id="sort-menu" className="mdc-menu" tabIndex="-1">
                  <ul className="mdc-menu__items mdc-list" role="menu" aria-hidden="true">
                    <li className="mdc-list-item" role="menuitem" tabIndex="0">
                      First name
                    </li>
                    <li className="mdc-list-item" role="menuitem" tabIndex="0">
                      Last name
                    </li>
                  </ul>
                </div>
              </div>
              <div className="addressbook-search-field mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
                <input type="text" id="search-field" className="mdc-text-field__input" onChange={(e) => this.onSearchKeyUp(e)}/>
                <label htmlFor="search-field" className=" mdc-text-field__icon"><FontAwesomeIcon icon={faSearch}/></label>
              </div>
            </section>
          </div>
        </header>
        <main>
          <div className="main-content">
            <AddressbookList users={this.state.users} sortBy={this.state.sortedBy} searchString={this.state.searchString} onUserSelected={this.onUserSelected.bind(this)} />
            {this.isUserSelected() ? (<AddressbookDetails user={this.state.selectedUser} deselectUser={this.deselectUser.bind(this)} />) : ('')}
          </div>
        </main>
      </div>
    );
  }
}

export default Addressbook;
