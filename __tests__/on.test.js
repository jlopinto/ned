const enableEventDelegation = require('../src/index.ts').default;

enableEventDelegation();
const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);

describe('Attaching events', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="btn"></button>';
  });
  test('triggering delegated event', () => {
    const delegatedTarget = document.body;
    const target = document.querySelector('.btn');
    const mockFn = jest.fn();

    delegatedTarget.on('click.allBtn', '.btn', mockFn);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('triggering delegated event with fat arrow', () => {
    const delegatedTarget = document.body;
    const target = document.querySelector('.btn');
    const mockFn = jest.fn();

    delegatedTarget.on('click.allBtn', '.btn', () => mockFn());
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('triggering direct event', () => {
    const delegatedTarget = document.body;
    const target = document.querySelector('.btn');
    const mockFn = jest.fn();

    delegatedTarget.on('click.allBtn', mockFn);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
