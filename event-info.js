
import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString from './event-info.html';
import '@spriteful/app-icons/app-icons.js';
import '@polymer/iron-icon/iron-icon.js';


class AsgEventInfo extends SpritefulElement {
  static get is() { return 'asg-event-info'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {
   
      eventItem: Object,

      _feeHidden: {
        type: Boolean,
        computed: '__computeFeeHidden(eventItem.fee)'
      },

      _seatsHidden: {
        type: Boolean,
        computed: '__computeSeatsHidden(eventItem)'
      }

    };
  }

 
  __computeFeeHidden(fee) {
    return !fee || fee === '0' || fee === '0.00';
  }


  __computeSeatsHidden(eventItem) {
    if (!eventItem) { return true; }
    const {preRegister, seats} = eventItem;
    return !preRegister || seats === undefined || seats === null;
  }

}

window.customElements.define(AsgEventInfo.is, AsgEventInfo);
