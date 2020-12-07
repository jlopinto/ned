interface DelegatedEvent {
  eventName: string;
  delegatedTarget: Element;
  handler?: Function;
  target?: string;
  once?: boolean;
}

class EventDelegation {
  private eventsMap = [];

  extractEventName = (eventName) => eventName.split('.')[0];

  on = ({ eventName, target = undefined, handler, delegatedTarget, once = false }: DelegatedEvent) => {
    let newEvent;
    let currentTarget = delegatedTarget;
    const handlerParams = {
      eventName,
      currentTarget,
      delegatedTarget
    };

    if (!target) {
      newEvent = (event) => {
        handler({ ...handlerParams, originalEvent: event });
      };
    } else {
      newEvent = (event) => {
        currentTarget = event.target;
        for (
          currentTarget;
          currentTarget && currentTarget !== delegatedTarget;
          currentTarget = currentTarget.parentNode as Element
        ) {
          if (currentTarget.matches !== undefined && currentTarget.matches(target)) {
            handler({ ...handlerParams, currentTarget, originalEvent: event });
            break;
          }
        }
      };
    }

    this.eventsMap[eventName] = newEvent;

    delegatedTarget.addEventListener(this.extractEventName(eventName), this.eventsMap[eventName], { once });

    return currentTarget;
  };

  once = ({ eventName, target, handler, delegatedTarget }: DelegatedEvent) =>
    this.on({
      eventName,
      target,
      handler,
      delegatedTarget,
      once: true
    });

  off = ({ delegatedTarget, eventName }: DelegatedEvent): boolean => {
    delegatedTarget.removeEventListener(this.extractEventName(eventName), this.eventsMap[eventName]);
    return delete this.eventsMap[eventName];
  };

  fire = ({ delegatedTarget, eventName }: DelegatedEvent): boolean => {
    const evt = document.createEvent('Event');
    evt.initEvent(this.extractEventName(eventName), true, true);
    return delegatedTarget.dispatchEvent(evt);
  };
}

const EventDelegationSingleton = new EventDelegation();
Object.freeze(EventDelegationSingleton);

export default EventDelegationSingleton;
