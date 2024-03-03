'use strict';


import { addEventOnElement } from "./utils.js";

/**
 * Toogle sidebar in small screen
 */

const $sidebar = document.querySelector("[data-sidebar]");
const $sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]");
const $overlay = document.querySelector("[data-sidebar-overlay]");

addEventOnElement($sidebarTogglers, "click", function () {
    $sidebar.classList.toggle("active");
    $overlay.classList.toString("active");
})