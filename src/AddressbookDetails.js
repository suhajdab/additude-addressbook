import React, { Component } from 'react';
import FormatName from './FormatName';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '@material/card/dist/mdc.card.css';

import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faMobile from '@fortawesome/fontawesome-free-solid/faMobileAlt';


class AddressbookDetails extends Component {

  constructor(props) {
    super(props);

    this.deselectUser = props.deselectUser;

    this.state = {
      user: props.user
    }
  }

  /**
   * Function return href value for clickable email address
   * @param {String} email email address
   */
  getEmailLink(email) {
    return `mailto:${email}`;
  }

  /**
   * Function return href value for clickable phone number
   * @param {String} num phone number
   */
  getCallLink(num) {
    return `tel:${num}`;
  }

  /**
   * Function deselects current selected user, closing details view when 'esc' is pressed
   * @param {Event} e keyboard event
   */
  onKeyUp(e){
    if(e.keyCode === 27) {
      e.preventDefault();
      this.deselectUser();
    }
  }

  componentDidMount(){
    document.addEventListener("keyup", this.onKeyUp.bind(this), false);
  }
  componentWillUnmount(){
    document.removeEventListener("keyup", this.onKeyUp, false);
  }

  render() {
    console.log()
    return <div className="addressbook-details" onClick={this.deselectUser}>
      <div className="mdc-card">
        <div className="my-card__media mdc-card__media mdc-card__media--16-9" style={{backgroundImage:'url('+this.state.user.picture.large+')'}}></div>
        <div className="">
          <h2 className="mdc-typography--headline6">{FormatName(this.state.user.name)}</h2>
          <h3 className="mdc-typography--subtitle2">
            <FontAwesomeIcon icon={faEnvelope} /> <a href={this.getEmailLink(this.state.user.email)}>{this.state.user.email}</a><br/>
            <FontAwesomeIcon icon={faMobile} /> <a href={this.getCallLink(this.state.user.cell)}>{this.state.user.cell}</a><br/>
            <FontAwesomeIcon icon={faPhone} /> <a href={this.getCallLink(this.state.user.phone)}>{this.state.user.phone}</a><br/>
          </h3>
        </div>
      </div>
    </div>;
  }
}

export default AddressbookDetails;
