"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schema = /** @class */ (function () {
    function Schema(schema) {
        this.schema = schema;
    }
    Schema.prototype.validate = function (data) {
        try {
            return Object.entries(this.schema).every(function (_a) {
                var key = _a[0], val = _a[1];
                return data[key] !== undefined && val === typeof data[key];
            });
        }
        catch (err) {
            throw err;
        }
    };
    return Schema;
}());
exports.default = Schema;
//# sourceMappingURL=validateSchema.js.map