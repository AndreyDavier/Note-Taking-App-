'use strict';


import {
    addEventOnElement,
    getGreetingMsg,
    activeNotebook,
    makeElemEditable
} from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";

/**
 * Toogle sidebar in small screen
 */

const sidebar = document.querySelector("[data-sidebar]");
const sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]");
const overlay = document.querySelector("[data-sidebar-overlay]");

addEventOnElement(sidebarTogglers, "click", function () {
    sidebar.classList.toggle("active");
    overlay.classList.toString("active");
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

const sidebarList = document.querySelector("[data-sidebar-list]");
const addNotebookBtn = document.querySelector("[data-add-notebook]");

const showNotebookField = function () {
    const navItem = document.createElement("div");

    navItem.classList.add("nav-item");

    navItem.innerHTML = `
        <span class="text text-label-large" data-notebook-field></span>

        <div class="state-layer"></div>
    `;

    sidebarList.appendChild(navItem);

    const navItemField = navItem.querySelector("[data-notebook-field]");

    activeNotebook.call(navItem);

    makeElemEditable(navItemField);

    navItemField.addEventListener("keydown", createNotebook);
}

addNotebookBtn.addEventListener("click", showNotebookField);

const createNotebook = function (e) {

    if (e.key === "Enter") {

        //Store new created notebook in database

        const notebookData = db.post.notebook(this.textContent || "Untitled");
     
        this.parentElement.remove();

        //Render navItem
        client.notebook.create(notebookData);

    }

}
/**
 * Renders the existing notebook list
 */
const rednerExistedNoteBook = function () {
    const notebookList = db.get.notebook();

    client.notebook.read(notebookList);
}

rednerExistedNoteBook()