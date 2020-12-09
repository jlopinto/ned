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
  const delegatedTarget = document.querySelector('.content');

  const myDelegatedEvent = {
    targetSelector: '.btn--ned',
    delegatedTarget,
    handler: (event) => {
      logEvent(event);
    },
    eventName: 'click.btnNed'
  };

  const myDirectEvent = {
    delegatedTarget: document.querySelector('.btn--direct'),
    handler: (event) => {
      const removed = eventDelegation.off({
        delegatedTarget: document.querySelector('.btn--direct'),
        eventName: 'click.btnDirect'
      });
      event.currentTarget.classList.remove('btn--direct');
      console.log({ removed });
      logEvent(event);
    },
    eventName: 'click.btnDirect'
  };

  const allBtnMousedown = {
    targetSelector: '.btn',
    delegatedTarget,
    handler: (event) => {
      console.log(event);
      const { currentTarget } = event;
      currentTarget.classList.add('click');
      logEvent(event);
    },
    eventName: 'mousedown.AllBtn'
  };

  const allBtnMouseup = {
    targetSelector: '.btn',
    delegatedTarget,
    handler: (event) => {
      const { currentTarget } = event;
      currentTarget.classList.remove('click');
      logEvent(event);
    },
    eventName: 'mouseup.AllBtn'
  };

  eventDelegation.on(myDelegatedEvent);
  eventDelegation.on(myDirectEvent);
  eventDelegation.on(allBtnMousedown);
  eventDelegation.on(allBtnMouseup);
  console.log(
    eventDelegation.on({
      eventName: 'submit.myForm',
      delegatedTarget: document.body,
      targetSelector: '.myForm',
      handler: (event) => {
        logEvent(event);
        event.originalEvent.preventDefault();
        event.originalEvent.stopPropagation();
      }
    })
  );

  eventDelegation.fire({
    delegatedTarget: document.querySelector('.btn--ned'),
    eventName: 'click'
  });
});
