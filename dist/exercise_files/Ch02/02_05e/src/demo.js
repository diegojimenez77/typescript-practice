"use strict";
function clone(source) {
    return Object.apply({}, source);
}
const a = { id: 123, name: "Homer Simpson" };
const b = clone(a);
