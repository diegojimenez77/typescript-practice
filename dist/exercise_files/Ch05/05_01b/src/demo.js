"use strict";
const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isInRole(role) {
        return this.roles.contains(role);
    }
};
class ContactRepository {
    constructor() {
        this.contacts = [];
    }
    getContactById(id) {
        console.trace(`ContactRepository.getContactById: BEGIN`);
        if (!currentUser.isInRole("ContactViewer")) {
            throw Error("User not authorized to execute this action");
        }
        const contact = this.contacts.find(x => x.id === id);
        console.debug(`ContactRepository.getContactById: END`);
        return contact;
    }
    save(contact) {
        console.trace(`ContactRepository.save: BEGIN`);
        if (!currentUser.isInRole("ContactEditor")) {
            throw Error("User not authorized to execute this action");
        }
        const existing = this.getContactById(contact.id);
        if (existing) {
            Object.assign(existing, contact);
        }
        else {
            this.contacts.push(contact);
        }
        console.debug(`ContactRepository.save: END`);
    }
}
