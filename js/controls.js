
const controls = (function() {
'use strict'

const WRAPPER_ID = 'wrapper';
const NAVBAR_ID = 'navbar--main';

const Config = {
    buffer: 12, // px
    defaultThrottleDelay: 200,  // milliseconds
};

const BEMBlock = {
    init: function(blockName, elementNameList, modifierNameList) {
        this.block = blockName;
        this.elements = elementNameList.reduce(function (elements, name) {
            elements[name] = `${this.block}__${name}`
            return elements
        }.bind(this), {});
        this.modifiers = modifierNameList.reduce(function (modifiers, name) {
            modifiers[name] = `${this.block}--${name}`
            return modifiers
        }.bind(this), {});
    },
};

const ClassNames = {};
ClassNames.ctaForm = Object.create(BEMBlock);
ClassNames.ctaForm.init('cta-form', ['collapse-toggler', 'collapse'], []);

ClassNames.navBar = Object.create(BEMBlock);
ClassNames.navBar.init('navbar', [], ['stuck']);

ClassNames.wrapper = Object.create(BEMBlock);
ClassNames.wrapper.init('wrapper', [], []);

let $ = (id) => document.getElementById(id);

let beyondThreshold = (targetElement) => 
    Number.parseInt(targetElement.scrollTop) > Config.buffer;

let ret = {};

ret.throttle = (func, delay, ...args) => {
    let fired = false;
    return function () {
        if (!fired) {
            fired = true
            window.setTimeout(()=>{
                fired = false
                func.apply(this, args)
            }, delay || Options.defaultThrottleDelay)
        }
    }
}

ret.toggleStuck = (targetElement, watchedElement) => {
    if (beyondThreshold(watchedElement)) {
        targetElement.classList.add(ClassNames.navBar.modifiers.stuck);
    } else {
        targetElement.classList.remove(ClassNames.navBar.modifiers.stuck);
    }
}

ret.init = () => {
    document.addEventListener("DOMContentLoaded", ()=> {
        yall()
        $(WRAPPER_ID).addEventListener("scroll", 
            ret.throttle(ret.toggleStuck, 1000, $(NAVBAR_ID), $(WRAPPER_ID)))
    });
}

return ret;

})();

controls.init();
