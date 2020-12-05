import enableEventDelegation from "../src/index";

const logEvent = (() => {
  
  const logs = [];
  

  function output() {
    const consoleOuput = document.querySelector('#console');
    const logMarkup = (output) => `<tr><td>${output.eventNamespace}</td><td>${output.delegatedTarget}</td><td>${output.originalEvent}</td><td>${output.target}</td></tr>`;
    let revertlogs = logs;
    
    consoleOuput.innerHTML = revertlogs.map(log => logMarkup(log)).join('');
  }

  return function(event, target) {    
    logs.push({
      eventNamespace: event.eventNamespace,
      delegatedTarget: `${event.delegatedTarget.tagName.toLocaleLowerCase()}.${event.delegatedTarget.classList.toString().replace(" ", ".")}`,
      originalEvent: `${event.originalEvent.type} on .${event.originalEvent.target.classList.toString().replace(" ", ".")}`,target: `${target.tagName.toLocaleLowerCase()}.${target.classList.toString().replace(" ", ".")}`,
    });
    output();
  };  
})();

enableEventDelegation();

window.addEventListener("DOMContentLoaded", function () {
  const rootTarget = document.querySelector(".content");

  rootTarget.once("click.AllBtn", ".btn", function (event) {
    this.classList.add("click");
    logEvent(event, this);
  });

  rootTarget.on("mousedown.AllBtn", ".btn", function (event) {
    this.classList.add("mousedown");
    logEvent(event, this);
  });

  rootTarget.on("mouseup.allBtn", ".btn", function (event) {
    this.classList.remove("mousedown");
    logEvent(event, this);
  });

  rootTarget.on("click", ".js-add-btn", function (event) {
    const newBtn = document.createElement("button");
    newBtn.classList.add("btn");
    newBtn.textContent = "New .btn";
    document.querySelector(".btn-list").append(newBtn);
    logEvent(event, this);
  });
});


