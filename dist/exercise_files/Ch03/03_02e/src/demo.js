"use strict";
function toContact(nameOrContact) {
    if (typeof nameOrContact === "string") {
        return {
            id: 0,
            name: nameOrContact,
            status: "active"
        };
    }
    else if (typeof nameOrContact === "object") {
        return {
            id: nameOrContact.id,
            name: nameOrContact.name,
            status: nameOrContact.status
        };
    }
    else {
        return null;
    }
}
