import EventDelegation from './index';

class EventDelegationProtoype extends EventDelegation {
  constructor() {
    super();
    console.log(this);
  }

  install = () => {
    HTMLElement.prototype.on = this.on({});
  };
}

export default EventDelegationProtoype;
