"use strict";
let x = { name: "Wruce Bayne" };
x.number = 1234;
x.active = true;
x.log = () => console.log("awesome!");
function searchContacts(contacts, query) {
    return contacts.filter(contact => {
        for (const property of Object.keys(contact)) {
            // get the query object for this property
            const propertyQuery = query[property];
            // check to see if it matches
            if (propertyQuery && propertyQuery.matches(contact[property])) {
                return true;
            }
        }
        return false;
    });
}
const filteredContacts = searchContacts([ /* contacts */], {
    id: { matches: (id) => id === 123 },
    name: { matches: (name) => name === "Carol Weaver" },
});
