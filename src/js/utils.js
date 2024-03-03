'use strict';



const addEventOnElement = function ($elements, eventType, callback) {
    $elements.forEach($element => $element.addEventListener(eventType, callback));
}


export {
    addEventOnElement
}