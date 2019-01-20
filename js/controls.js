
let CONST = {
    CLASSES: {
        CTA_FORM_TOGGLER: "cta-form__collapse-toggler",
        CTA_FORM_OPTIONS_PANEL_ID: "cta-form__collapse",
    },
}

let $ = (id) => document.getElementById(id);

let toggleQuoteOptions = (optionsNode, option) => {
    jQuery(optionsNode).collapse("show");
}

let init = () => {
    $(CONST.CLASSES.CTA_FORM_TOGGLER).addEventListener("change",
        () => toggleQuoteOptions(
            $(CONST.CLASSES.CTA_FORM_OPTIONS_PANEL_ID), ""), false);
}

init();
