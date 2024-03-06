'use strict';


import { generateID } from "./utils.js";

// DB Object

let notekeeperDB = {};

const initDB = function () {
    const db = localStorage.getItem("notekeeperDB");

    if (db) {
        notekeeperDB = JSON.parse(db);
    } else {
        notekeeperDB.notebooks = [];
        localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
    }
}

initDB();


/**
 * Reads and loads the loacalStorage dara in to the global variable `notekeeperDB`
 */

const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
}

const writeDB = function () {
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
}


export const db = {
    post: {
        notebook(name) {
            readDB();

            const notebookData = {
                id: generateID(),
                name,
                notes: []
            }

            notekeeperDB.notebooks.push(notebookData);
            writeDB();
        }
    }
};