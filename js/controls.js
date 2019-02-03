const controls = (function() {
  "use strict";

  const WRAPPER_ID = "wrapper";
  const NAVBAR_ID = "navbar--main";

  const Config = {
    buffer: 12, // px
    defaultThrottleDelay: 200 // milliseconds
  };

  function BEMBlock(blockName, elementNameList, modifierNameList) {
    this.block = blockName;
    this.elements = elementNameList.reduce(
      function(elements, name) {
        elements[name] = `${this.block}__${name}`;
        return elements;
      }.bind(this),
      {}
    );
    this.modifiers = modifierNameList.reduce(
      function(modifiers, name) {
        modifiers[name] = `${this.block}--${name}`;
        return modifiers;
      }.bind(this),
      {}
    );
  }

  const ClassNames = {};
  ClassNames.navBar = new BEMBlock("navbar", [], ["stuck"]);
  ClassNames.wrapper = new BEMBlock("wrapper", [], []);
  ClassNames.ctaForm = new BEMBlock(
    "cta-form",
    ["collapse-toggler", "collapse"],
    []
  );

  const elById = id => document.getElementById(id);

  const beyondThreshold = targetElement =>
    Number.parseInt(targetElement.scrollTop) > Config.buffer;

  const throttle = (func, delay, ...args) => {
    let fired = false;
    return function() {
      if (!fired) {
        fired = true;
        window.setTimeout(() => {
          fired = false;
          func.apply(this, args);
        }, delay || Config.defaultThrottleDelay);
      }
    };
  };

  const toggleStuck = (targetElement, watchedElement) => {
    if (beyondThreshold(watchedElement)) {
      targetElement.classList.add(ClassNames.navBar.modifiers.stuck);
    } else {
      targetElement.classList.remove(ClassNames.navBar.modifiers.stuck);
    }
  };

  return {
    init: () => {
      document.addEventListener("DOMContentLoaded", () => {
        yall();
        elById(WRAPPER_ID).addEventListener(
          "scroll",
          throttle(toggleStuck, 400, elById(NAVBAR_ID), elById(WRAPPER_ID))
        );
      });
    }
  };

})();

controls.init();

