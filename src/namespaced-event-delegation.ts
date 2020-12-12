import EventManager from './event-manager';

interface EventLabel {
  eventName: string;
  element;
}

interface DelegatedEvent {
  handler: Function;
  elements;
  events: string;
  targets?;
  once?: boolean;
}
export default class NamespacedEventDelegation extends EventManager {

  public on = ({ events, elements, targets, handler, once = false }: DelegatedEvent) => {
    let _elements;

    if (typeof elements === 'string') {
      _elements = document.querySelectorAll(elements);
    } else {
      _elements = [..._elements];
    }

    const _eventsNames = events.split(' ');
    console.log(_elements);
    _elements.forEach(element => {
      _eventsNames.forEach((eventName) => {

        element.addEventListener(
          this.extractEventName(eventName),
          this.addEvent(element, eventName, (event) => {
            let handlerParams = {
              event: eventName,
              delegatedTarget: element,
              currentTarget: element,
              originalEvent: event
            };

            if (targets) {
              const target = event.target.closest(targets);
              if (!target) {
                return false;
              }

              handlerParams = {
                ...handlerParams,
                currentTarget: target || handlerParams.delegatedTarget
              };
            }
            return handler(handlerParams);
          }),
          { once }
        );
      });
    });
  };

  public once = ({ events, elements, targets, handler }: DelegatedEvent) => this.on({ events, elements, targets, handler, once: true });

  public off = ({ element, eventName }: EventLabel): boolean => {
    this.getEvents(eventName).forEach((event) => {
      element.removeEventListener(this.extractEventName(eventName), event.handler);
    });

    return this.removeEvents(element, eventName);
  };

  public fire = ({ element, eventName }: EventLabel): boolean => {
    const evt = document.createEvent('Event');
    evt.initEvent(this.extractEventName(eventName), true, true);
    return element.dispatchEvent(evt);
  };

  private extractEventName = (eventName) => eventName.split('.')[0];
}
