"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Handlebars = require("handlebars");
var links = function (userData, signedIn) {
    var signedInLinks = [
        { link: 'signout' },
        { text: userData === null || userData === void 0 ? void 0 : userData['email'] },
    ];
    var notSignedInLinks = [
        { link: 'signin' },
        { link: 'signup' },
    ];
    var staticsLinks = [
        { link: 'aboutUs' },
        { link: 'contactUs' },
    ];
    return __spreadArray(__spreadArray([], (signedIn ? signedInLinks : notSignedInLinks), true), staticsLinks, true);
};
var navbarLinks = function (userData, signedIn) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        /** pass all navbar links to handlebars layout based on @routes */
        Handlebars.registerHelper('navbarLinks', function (_a) {
            var data = _a.data;
            var result = '';
            links(userData, signedIn)
                .forEach(function (_a) {
                var _b, _c;
                var _d = _a.link, link = _d === void 0 ? '' : _d, text = _a.text;
                if (text)
                    return result += ("\n                <div class=\"-order-1 flex space-x-2 md:ml-3 mb-3 md:mb-0 items-center\">\n                    <i class=\"ico ico-user\"></i>\n                    <span class=\"text-blue-100\">".concat(text, "</span>\n                </div>\n            "));
                result += ("\n                <a \n                    href='/".concat(link, "'\n                    class=\"").concat(((_c = (_b = data === null || data === void 0 ? void 0 : data.exphbs) === null || _b === void 0 ? void 0 : _b.view) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(link.toLowerCase())) && 'bg-blue-700', " capitalize md:ml-3 mb-3 md:mb-0 !bg-opacity-40 !border-opacity-60 border border-blue-600 hover:bg-blue-700 text-blue-100 py-2 px-3 text-sm transition-all\"\n                >\n                    ").concat(text !== null && text !== void 0 ? text : link, "\n                </a>\n            "));
            });
            return result;
        });
        return [2 /*return*/];
    });
}); };
exports.default = navbarLinks;
//# sourceMappingURL=navbarLinks.js.map