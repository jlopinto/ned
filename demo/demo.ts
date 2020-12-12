import EventDelegation from '../src/index';
const eventDelegation = new EventDelegation();

const logEvent = (() => {
  const logs = [];

  function output() {
    const consoleOuput = document.querySelector('#console');
    const logMarkup = (output) =>
      `<tr><td>${output.eventName}</td><td>${output.delegatedTarget}</td><td>${output.originalEvent}</td><td>${output.target}</td></tr>`;
    let revertlogs = logs;

    consoleOuput.innerHTML = revertlogs.map((log) => logMarkup(log)).join('');
  }

  return function (event) {
    const { currentTarget } = event;
    logs.push({
      eventName: event.eventName,
      delegatedTarget: [
        event.delegatedTarget.tagName.toLocaleLowerCase(),
        event.delegatedTarget.classList.toString().trim().replace(' ', '.')
      ].join('.'),
      originalEvent: `${event.originalEvent.type} => .${event.originalEvent.target.classList
        .toString()
        .replace(' ', '.')}`,
      target: `${currentTarget.tagName.toLocaleLowerCase()}.${currentTarget.classList.toString().replace(' ', '.')}`
    });
    output();
  };
})();

window.addEventListener('DOMContentLoaded', function () {

  const myDelegatedEvent = {
    targets: '.btn--ned',
    elements: '.container',
    handler: (event) => {
      logEvent(event);
    },
    events: 'click.btnNed'
  };

  const myDirectEvent = {
    elements: '.btn--direct',
    handler: (event) => {
      console.log(event);
      const removed = eventDelegation.off({
        delegatedTarget: event.delegatedTarget,
        eventName: 'click.btnDirect'
      });
      event.currentTarget.classList.remove('btn--direct');
      console.log({ removed });
      event.originalEvent.stopImmediatePropagation();
      logEvent(event);
    },
    events: 'click.btnDirect'
  };

  const myDirectEventOnce = {
    elements: '.btn--direct',
    handler: (event) => {
      logEvent(event);
    },
    events: 'click.btnDirectOnce'
  };

  const allBtnMousedown = {
    targets: '.btn',
    elements: '.container',
    handler: (event) => {
      console.log(event);
      const { currentTarget } = event;
      currentTarget.classList.add('click');
      logEvent(event);
    },
    events: 'mousedown.AllBtn'
  };

  const allBtnMouseup = {
    targets: '.btn',
    elements: '.container',
    handler: (event) => {
      const { currentTarget } = event;
      currentTarget.classList.remove('click');
      logEvent(event);
    },
    events: 'mouseup.AllBtn'
  };

  const complexEvent = {
    events: 'click.myClick mouseover.myClick',
    targets: '.btn__label, h2',
    elements: '.container, .nav',
    handler: (event) => {
      logEvent(event);
    }
  }
  eventDelegation.on(complexEvent);
  eventDelegation.on(myDelegatedEvent);
  eventDelegation.on(myDirectEvent);
  eventDelegation.once(myDirectEventOnce);
  eventDelegation.on(allBtnMousedown);
  eventDelegation.on(allBtnMouseup);

  eventDelegation.on({
    events: 'submit.myForm',
    elements: document.body,
    targets: '.myForm',
    handler: (event) => {
      logEvent(event);
      event.originalEvent.preventDefault();
      event.originalEvent.stopPropagation();
    }
  });

  // eventDelegation.fire({
  //   element: '.btn--ned',
  //   eventName: 'click'
  // });
});
