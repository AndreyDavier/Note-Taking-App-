'use strict';


import { addEventOnElement, getGreetingMsg } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";

/**
 * Toogle sidebar in small screen
 */

const $sidebar = document.querySelector("[data-sidebar]");
const $sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]");
const $overlay = document.querySelector("[data-sidebar-overlay]");

addEventOnElement($sidebarTogglers, "click", function () {
    $sidebar.classList.toggle("active");
    $overlay.classList.toString("active");
});


/**
 * Initialize tooltip behavior for all DOM elements with a "data-tooltip" attribute.
 */

const tooltipElems = document.querySelectorAll("[data-tooltip]");

tooltipElems.forEach(elem => Tooltip(elem));



/**
 * Show greeting message on homepage
 */

const $greetElem = document.querySelector("[data-greeting]");
const currentHour = new Date().getHours();
$greetElem.textContent = getGreetingMsg(currentHour);


/**
 * Show current date on homepage
 */

const $currentDataElem = document.querySelector("[data-current-date]");
$currentDataElem.textContent = new Date().toDateString().replace(``, ``);

/**
 * Notebook crate field
 */