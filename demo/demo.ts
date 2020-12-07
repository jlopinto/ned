import eventManager from '../src/index';
console.log(eventManager);

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
      originalEvent: `${
        event.originalEvent.type
      } => .${event.originalEvent.target.classList
        .toString()
        .replace(' ', '.')}`,
      target: `${currentTarget.tagName.toLocaleLowerCase()}.${currentTarget.classList
        .toString()
        .replace(' ', '.')}`
    });
    output();
  };
})();

window.addEventListener('DOMContentLoaded', function () {
  const delegatedTarget = document.querySelector('.content');

  const myDelegatedEvent = {
    target: '.btn--ned',
    delegatedTarget,
    handler: (event) => {
      logEvent(event);
    },
    eventName: 'click.btnNed'
  };

  const myDirectEvent = {
    delegatedTarget: document.querySelector('.btn--direct'),
    handler: (event) => {
      const removed = eventManager.off({
        delegatedTarget: document.querySelector('.btn--direct'),
        eventName: 'click.btnDirect'
      });
      event.currentTarget.classList.remove('btn--direct');
      console.log(removed);
      logEvent(event);
    },
    eventName: 'click.btnDirect'
  };

  const allBtnMousedown = {
    target: '.btn',
    delegatedTarget,
    handler: (event) => {
      const { currentTarget } = event;
      currentTarget.classList.add('click');
      logEvent(event);
    },
    eventName: 'mousedown.AllBtn'
  };

  const allBtnMouseup = {
    target: '.btn',
    delegatedTarget,
    handler: (event) => {
      const { currentTarget } = event;
      currentTarget.classList.remove('click');
      logEvent(event);
    },
    eventName: 'mouseup.AllBtn'
  };

  console.log([
    eventManager.on(myDelegatedEvent),
    eventManager.on(myDirectEvent),
    eventManager.on(allBtnMousedown),
    eventManager.on(allBtnMouseup),
    eventManager.on({
      eventName: 'submit.myForm',
      delegatedTarget: document.body,
      target: '.myForm',
      handler: (event) => {
        logEvent(event);
        event.originalEvent.preventDefault();
        // event.originalEvent.stopPropagation();
      }
    })
  ]);

  eventManager.fire({
    delegatedTarget: document.querySelector('.btn--ned'),
    eventName: 'click'
  });
});
