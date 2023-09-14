"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
function authorize(target, property, descriptor) {
    const wrapped = descriptor.value;
    descriptor.value = function () {
        if (!currentUser.isAuthenticated()) {
            throw Error("User is not authenticated");
        }
        try {
            return wrapped.apply(this, arguments);
        }
        catch (ex) {
            // TODO: some fancy logging logic here
            throw ex;
        }
    };
}
let ContactRepository = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _getContactById_decorators;
    let _save_decorators;
    return _a = class ContactRepository {
            constructor() {
                this.contacts = (__runInitializers(this, _instanceExtraInitializers), []);
            }
            getContactById(id) {
                if (!currentUser.isInRole("ContactViewer")) {
                    throw Error("User not authorized to execute this action");
                }
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
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getContactById_decorators = [authorize("ContactViewer")];
            _save_decorators = [authorize("ContactEditor")];
            __esDecorate(_a, null, _getContactById_decorators, { kind: "method", name: "getContactById", static: false, private: false, access: { has: obj => "getContactById" in obj, get: obj => obj.getContactById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _save_decorators, { kind: "method", name: "save", static: false, private: false, access: { has: obj => "save" in obj, get: obj => obj.save }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
