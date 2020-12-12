import EventManager from './event-manager';

interface EventLabels {
  events: string;
  elements: string;
}

interface DelegatedEvent extends EventLabels {
  handler: Function;
  targets?: string;
  once?: boolean;
}

export default class NamespacedEventDelegation extends EventManager {
  public on = ({ events, elements, targets, handler, once = false }: DelegatedEvent) => {
    this.candidates(elements, events, (element, eventNamespace) => {
      element.addEventListener(
        this.extractEventName(eventNamespace),
        this.addEvent(element, eventNamespace, (originalEvent) => {
          let handlerParams = {
            event: eventNamespace,
            delegatedTarget: element,
            currentTarget: element,
            originalEvent
          };

          if (targets) {
            const target = originalEvent.target.closest(targets);
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
  };

  public once = ({ events, elements, targets, handler }: DelegatedEvent) =>
    this.on({ events, elements, targets, handler, once: true });

  public off = ({ elements, events }: EventLabels): boolean[] => {
    const removed = [];
    this.getEvents().forEach((storedEvent) => {
      this.candidates(elements, events, (element, event) => {
        element.removeEventListener(this.extractEventName(event), storedEvent.handler);
        removed.push(this.removeEvents(element, event));
      });
    });

    return removed;
  };

  public fire = ({ elements, events }: EventLabels): boolean[] => {
    const fired = [];
    const evt = document.createEvent('Event');

    this.candidates(elements, events, (element, event) => {
      evt.initEvent(this.extractEventName(event), true, true);
      fired.push(element.dispatchEvent(evt));
    });

    return fired;
  };

  private candidates = (elements, events, fn) => {
    const elementsArr = typeof elements === 'string' ? document.querySelectorAll(elements) : [elements];
    const eventsArr = events.split(' ');
    elementsArr.forEach((element) => eventsArr.forEach((event) => fn(element, event)));
  };

  private extractEventName = (eventName) => eventName.split('.')[0];
}
