import eventDelegation from '../src/index';

const clickEvent = document.createEvent('HTMLEvents');
clickEvent.initEvent('click', true, true);
const mockFn = jest.fn();
describe('Attaching events', () => {
    beforeEach(() => {
        document.body.innerHTML = '<button class="btn"></button>';
        mockFn.mockReset();
    });

    test('triggering delegated event', () => {
        const delegatedTarget = document.body;
        const target = document.querySelector('.btn');
        const mockFn = jest.fn();

        eventDelegation.on({ delegatedTarget, eventName: 'click.allBtn', target: '.btn', handler: mockFn });
        target.dispatchEvent(clickEvent);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('triggering delegated event with fat arrow', () => {
        const delegatedTarget = document.body;
        const target = document.querySelector('.btn');
        eventDelegation.on({ delegatedTarget, eventName: 'click.allBtn', target: '.btn', handler: mockFn });
        target.dispatchEvent(clickEvent);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('triggering direct event', () => {
        const delegatedTarget = document.body;
        const target = document.querySelector('.btn');
        const mockFn = jest.fn();

        eventDelegation.on({ delegatedTarget, eventName: 'click.allBtn', handler: mockFn });
        target.dispatchEvent(clickEvent);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});