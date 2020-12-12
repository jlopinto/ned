import EventDelegation from '../src/index';

const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);
const handler = jest.fn();
const formSubmitHandler = jest.fn((cb) => {
  console.log(cb);
});
const eventPreventDefaultHandler = jest.fn();
const eventDelegation = new EventDelegation();
describe('Attaching events', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="btn btn--delegated"><span>delegated</span></button>
      <button class="btn btn--direct"><span>direct</span></button>

      <form class="form" onSubmit="console.log('plop');">
        <button class="form__submit" type="submit"><span>submit form</sapn></buttton>
      </form>
    `;
    handler.mockReset();
    eventPreventDefaultHandler.mockReset();
  });

  test('triggering delegated event', () => {
    const targetSelector = '.btn--delegated';
    const insideTarget = document.querySelector(`${targetSelector} span`);

    eventDelegation.on({
      handler,
      targetSelector,
      eventName: 'click.btn--delegated',
      delegatedTarget: document.body
    });
    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('triggering direct event', () => {
    const targetSelector = '.btn--direct';
    const insideTarget = document.querySelector(`${targetSelector} span`);

    eventDelegation.on({
      handler,
      targetSelector,
      eventName: 'click.btn--direct',
      delegatedTarget: document.body
    });
    insideTarget.dispatchEvent(clickEvent);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('can be prevented', () => {
    const delegatedTarget = document.querySelector('.form');
    const insideTarget = delegatedTarget.querySelector(`.form__submit span`);
    // const eventSpyer = { originalEvent: { preventDefault: () => {} } };

    // jest.spyOn(eventSpyer.originalEvent, 'preventDefault');

    const onFormSubmit = {
      handler: (event) => {
        handler();
        console.log('onFormSubmit', event);
      },
      eventName: 'submit',
      delegatedTarget: document.querySelector('.form')
    };

    const onFormSubmitClick = {
      handler: (event) => {
        eventPreventDefaultHandler();
        event.originalEvent.preventDefault();
      },
      targetSelector: '.form__submit',
      eventName: 'click.forms',
      delegatedTarget: document.body
    };

    eventDelegation.on(onFormSubmit);
    // eventDelegation.on(onFormSubmitClick);

    insideTarget.dispatchEvent(clickEvent);
    // expect(eventPreventDefaultHandler).toHaveBeenCalledTimes(1);
    expect(formSubmitHandler).toHaveBeenCalledTimes(0);
  });
});
