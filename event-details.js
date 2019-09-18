
import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import {
  listen, 
  schedule
}                 from '@spriteful/utils/utils.js'
import htmlString from './event-details.html';
import '@spriteful/app-header-overlay/app-header-overlay.js';
import '@spriteful/app-icons/app-icons.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-fab/paper-fab.js';
import '@spriteful/asg-icons/asg-icons.js';
import './event-info.js';


class AsgEventDetails extends SpritefulElement {
  static get is() { return 'asg-event-details'; }

  static get template() {
    return html([htmlString]);
  }

  static get properties() {
    return {

      _eventItem: Object

    };
  }


  connectedCallback() {
    super.connectedCallback();

    listen(this.$.overlay, 'overlay-exiting', this.__resetFab.bind(this));
  }


  __computeHideLink(link) {
    return link === '';
  }


  __computeFabHidden(eventItem) {
    if (!eventItem) { return true; }
    const {preRegister, seats} = eventItem;
    return !preRegister || Number(seats) < 1;
  }

  
  __resetFab() {
    this.$.fab.classList.remove('fab-entry');
  }


  async __openRegistration() {
    try {
      await this.clicked();
      this.fire('open-overlay', {
        eventItem: this._eventItem, 
        id:       'registrationModal'
      });
     }
    catch (error) { 
      if (error === 'click debounced') { return; }
      console.error('__openRegister error: ', error); 
    } 
  } 


  async open(detail) {
    this._eventItem = detail.eventItem;
    await schedule();
    await this.$.overlay.open();
    this.$.fab.classList.add('fab-entry');
  }

}

window.customElements.define(AsgEventDetails.is, AsgEventDetails);
