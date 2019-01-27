
let CONST = {
    CLASSES: {
        CTA_FORM_TOGGLER: "cta-form__collapse-toggler",
        CTA_FORM_OPTIONS_PANEL_ID: "cta-form__collapse",
        NAV_STUCK: "navbar--stuck",
    },

    ID: {
        NAVBAR: "navbar--main",
        WRAPPER: "wrapper",
    }
}

let $ = (id) => document.getElementById(id);

let toggleStuck = (targetElement, watchedElement) => {
    if (elementScrolledDown(watchedElement)) {
        addClass(targetElement, CONST.CLASSES.NAV_STUCK);
    } else {
        removeClass(targetElement, CONST.CLASSES.NAV_STUCK);
    }
}

let elementScrolledDown = (targetElement) => {
    if (Number.parseInt(targetElement.scrollTop) > 12) return true;
    return false;
}

let removeClass = (targetElement, className) => {
    if (hasClass(targetElement, className)) {
        let newClassName = targetElement.className
            .split(" ")
            .filter((currentClassName) => currentClassName !== className)
            .join(" ");

        targetElement.className = newClassName;
    }
}

let addClass = (targetElement, className) => {
    if (!hasClass(targetElement, className))
        targetElement.className += " " + className;
}

let hasClass = (targetElement, className) => {
    let classNameRE = new RegExp("(^|.* )" + className + "($| .*)");
    let elementClassName = targetElement.className;
    if (classNameRE.test(elementClassName)) return true;
    return false;
}

let init = () => {
    document.addEventListener("DOMContentLoaded", yall);
    $(CONST.ID.WRAPPER).addEventListener("scroll", 
        () => toggleStuck($(CONST.ID.NAVBAR), $(CONST.ID.WRAPPER)));
}

init();
