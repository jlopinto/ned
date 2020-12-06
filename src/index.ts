declare global {
  interface Element {
    msMatchesSelector(selectors: string): boolean;
  }
  interface HTMLElement {
    [key: string]: Function;
  }
  interface Window {
    [index: string]: any;
  }
}

/**
 * Extend HTMLElement.prototype.
 *
 * @param eventsPrefix - provide a way to customize methods names
 * @param eventsMapPrefix - provide a way to customize the events array, names.
 * @returns void
 *
 * @alpha
 */

const enableEventDelegation = (
  eventsPrefix = "",
  eventsMapPrefix = "_"
): void => {
  window[`${eventsMapPrefix}eventsMap`] = [];

  HTMLElement.prototype[`${eventsPrefix}on`] = function (
    eventNamespace: string,
    targetSelector: string,
    handler: Function,
    options: { once: boolean }
  ): HTMLElement {
    const [eventName] = eventNamespace.split(".");
    const eventsMap = window[`${eventsMapPrefix}eventsMap`];

    if (typeof targetSelector === "function" && handler === undefined) {
      const newHandler:Function = targetSelector;

      eventsMap[eventNamespace] = function (event: any) {
        newHandler.call(this, {
          eventNamespace,
          options,
          delegatedTarget: this,
          originalEvent: event,
        });
      };
    } else {
      eventsMap[eventNamespace] = function (event: any) {
        for (
          let { target } = event;
          target && target !== this;
          target = target.parentNode
        ) {
          if (target.matches !== undefined && target.matches(targetSelector)) {
            handler.call(this, {
              eventNamespace,
              options,
              delegatedTarget: this,
              originalEvent: event,
            });
            break;
          }
        }
      };
    }

    this.addEventListener(eventName, eventsMap[eventNamespace], options);
    return this;
  };

  HTMLElement.prototype[`${eventsPrefix}off`] = function (
    eventNamespace: string
  ): HTMLElement {
    const [eventName] = eventNamespace.split(".");
    const targetedEvent = window[`${eventsMapPrefix}eventsMap`];
    this.removeEventListener(eventName, targetedEvent[eventNamespace]);
    delete targetedEvent[eventNamespace];
    return this;
  };

  HTMLElement.prototype[`${eventsPrefix}once`] = function (
    eventNamespace: string,
    targetSelector: string,
    handler: Function
  ): HTMLElement {
    this.on(eventNamespace, targetSelector, handler, { once: true });
    return this;
  };
};

export default enableEventDelegation;
