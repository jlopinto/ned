import EventManager from './event-manager';

interface DelegatedEvent {
  eventName: string;
  delegatedTarget: Element;
  handler?: Function;
  targetSelector?: string;
  once?: boolean;
}

export default class NamespacedEventDelegation extends EventManager {
  public on = ({ eventName, targetSelector, handler, delegatedTarget, once = false }: DelegatedEvent) => {
    const delegatedEvent = (event) => {
      let handlerParams = {
        eventName,
        delegatedTarget,
        currentTarget: delegatedTarget,
        originalEvent: event
      };
      if (targetSelector) {
        const target = event.target.closest(targetSelector);
        if (!target) {
          return false;
        }

        handlerParams = {
          ...handlerParams,
          currentTarget: target || handlerParams.delegatedTarget
        };
      }
      return handler(handlerParams);
    };

    delegatedTarget.addEventListener(this.extractEventName(eventName), this.addEvent(eventName, delegatedEvent), {
      once
    });

    return this.getEvents();
  };

  public once = ({ eventName, targetSelector, handler, delegatedTarget }: DelegatedEvent) =>
    this.on({
      eventName,
      targetSelector,
      handler,
      delegatedTarget,
      once: true
    });

  public off = ({ delegatedTarget, eventName }: DelegatedEvent): boolean => {
    this.getEvents(eventName).forEach((event) => {
      delegatedTarget.removeEventListener(this.extractEventName(eventName), event.handler);
    });

    return this.removeEvents(eventName);
  };

  public fire = ({ delegatedTarget, eventName }: DelegatedEvent): boolean => {
    const evt = document.createEvent('Event');
    evt.initEvent(this.extractEventName(eventName), true, true);
    return delegatedTarget.dispatchEvent(evt);
  };

  private extractEventName = (eventName) => eventName.split('.')[0];
}
