'use strict';


import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const sidebarList = document.querySelector("[data-sidebar-list]");

const notePanelTitle = document.querySelector("[data-note-panel-title]");

const notePanel = document.querySelector("[data-note-panel]")

const emptyNotesTemplate = `
    <div class="empty-notes">
        <span class="material-symbols-rounded" aria-hidden="true">
            note_stack
        </span>

        <div class="text-headline-small">No notes</div>
    </div>
`;


export const client = {

    notebook: {
        create(notebookData) {
            const navItem = NavItem(notebookData.id, notebookData.name);
            sidebarList.appendChild(navItem);
            activeNotebook.call(navItem);
            notePanelTitle.textContent = notebookData.name;
            notePanel.innerHTML = emptyNotesTemplate;
        },

        read(notebookList) {
            notebookList.forEach((notebookData, index) => {
                const navItem = NavItem(notebookData.id, notebookData.name);

                if (index === 0) {
                    activeNotebook.call(navItem);
                    notePanelTitle.textContent = notebookData.name;
                }

                sidebarList.appendChild(navItem);
            });
        },

        update(notebookId, notebookData) {
            const oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const newNotebook = NavItem(notebookData.id, notebookData.name);

            notePanelTitle.textContent = notebookData.name;
            sidebarList.replaceChild(newNotebook, oldNotebook);

            activeNotebook.call(newNotebook)
        },

        delete(notebookId) {
            const deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);

            const activeNavitem = deletedNotebook.nextElementSibling ?? deletedNotebook.previousElementSibling;

            if (activeNavitem) {
                activeNavitem.click()
            } else {
                notePanelTitle.innerHTML = "";
                notePanel.innerHTML = "";
            }

            deletedNotebook.remove();
        }
    },

    note: {
        create(noteData) {
            // Append card in notePanel
            const card = Card(noteData);

            notePanel.appendChild(card);
        },

        read(noteList) {

            if (noteList.length) {
                notePanel.innerHTML = "";

                noteList.forEach(noteData => {
                    const card = Card(noteData);
                    notePanel.appendChild(card);
                });
            } else {
                notePanel.innerHTML = emptyNotesTemplate;
            }

        }
    }

}