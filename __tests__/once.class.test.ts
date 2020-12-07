import eventDelegation from '../src/index';

const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);

const mockFn = jest.fn();
let eventParams, target;

describe('Attaching events once', () => {

  beforeEach(() => {
    document.body.innerHTML = '<button class="btn"></button>';

    eventParams = {
      target: '.btn',
      delegatedTarget: document.body,
      eventName: 'click.allBtn',
      handler: mockFn
    }

    target = document.querySelector('.btn');
    mockFn.mockReset();
  });

  test('triggering delegated event once', () => {
    eventDelegation.once(eventParams);
    target.dispatchEvent(clickEvent);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  test('triggering direct event once', () => {
    const { target: targetSelector, ...onceEventParams } = eventParams;

    eventDelegation.once(onceEventParams);
    target.dispatchEvent(clickEvent);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
