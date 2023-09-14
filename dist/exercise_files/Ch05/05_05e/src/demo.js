"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isAuthenticated() {
        return true;
    },
    isInRole(role) {
        return this.roles.contains(role);
    }
};
function authorize(role) {
    return function authorizeDecorator(target, property, descriptor) {
        const wrapped = descriptor.value;
        descriptor.value = function () {
            if (!currentUser.isAuthenticated()) {
                throw Error("User is not authenticated");
            }
            if (!currentUser.isInRole(role)) {
                throw Error(`User not in role ${role}`);
            }
            return wrapped.apply(this, arguments);
        };
    };
}
function freeze(constructor) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}
function singleton(constructor) {
    var _a;
    return _a = class Singleton extends constructor {
            constructor(...args) {
                super(...args);
                if (_a._instance) {
                    throw Error("Duplicate instance");
                }
                _a._instance = this;
            }
        },
        _a._instance = null,
        _a;
}
function auditable(target, key) {
    // get the initial value, before the decorator is applied
    let val = target[key];
    // then overwrite the property with a custom getter and setter
    Object.defineProperty(target, key, {
        get: () => val,
        set: (newVal) => {
            console.log(`${key.toString()} changed: `, newVal);
            val = newVal;
        },
        enumerable: true,
        configurable: true
    });
}
let ContactRepository = (() => {
    let _classDecorators = [freeze, singleton];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _contacts_decorators;
    let _contacts_initializers = [];
    let _getContactById_decorators;
    let _save_decorators;
    var ContactRepository = _classThis = class {
        constructor() {
            this.contacts = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _contacts_initializers, []));
        }
        getContactById(id) {
            const contact = this.contacts.find(x => x.id === id);
            return contact;
        }
        save(contact) {
            const existing = this.getContactById(contact.id);
            if (existing) {
                Object.assign(existing, contact);
            }
            else {
                this.contacts.push(contact);
            }
        }
    };
    __setFunctionName(_classThis, "ContactRepository");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _contacts_decorators = [auditable];
        _getContactById_decorators = [authorize("ContactViewer")];
        _save_decorators = [authorize("ContactEditor")];
        __esDecorate(_classThis, null, _getContactById_decorators, { kind: "method", name: "getContactById", static: false, private: false, access: { has: obj => "getContactById" in obj, get: obj => obj.getContactById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _save_decorators, { kind: "method", name: "save", static: false, private: false, access: { has: obj => "save" in obj, get: obj => obj.save }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _contacts_decorators, { kind: "field", name: "contacts", static: false, private: false, access: { has: obj => "contacts" in obj, get: obj => obj.contacts, set: (obj, value) => { obj.contacts = value; } }, metadata: _metadata }, _contacts_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactRepository = _classThis;
})();
