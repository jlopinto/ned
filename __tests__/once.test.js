const enableEventDelegation = require("../src/index").default;

enableEventDelegation();
const clickEvent = document.createEvent("HTMLEvents");
clickEvent.initEvent("click", true, true);

describe("Attaching events once", () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="btn"></button>';
  });
  test("triggering delegated event once", () => {
    
    const delegatedTarget = document.body;
    const target = document.querySelector(".btn");
    const mockFn = jest.fn();

    delegatedTarget.once("click.allBtn", ".btn", mockFn);
    target.dispatchEvent(clickEvent);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  test("triggering direct event once", () => {

    const delegatedTarget = document.body;
    const target = document.querySelector(".btn");
    const mockFn = jest.fn();

    delegatedTarget.once("click.allBtn", mockFn);
    target.dispatchEvent(clickEvent);
    target.dispatchEvent(clickEvent);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

return false;
