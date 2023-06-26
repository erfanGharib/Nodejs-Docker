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
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
require('dotenv').config();
var ManageDBDoc = /** @class */ (function () {
    function ManageDBDoc(_a) {
        var req = _a.req, res = _a.res, dbCollection = _a.dbCollection;
        this.dbo = null;
        this.db = null;
        this.req = req;
        this.res = res;
        this.dbCollection = dbCollection;
    }
    ManageDBDoc.prototype.throwErr = function (error, cb) {
        console.log(error);
        if (error) {
            this.res.status(417).send(error.message);
            console.error(new Error(error.message));
            return cb();
        }
    };
    ManageDBDoc.prototype.setCookie = function (name, data) {
        var date = new Date();
        date.setDate(date.getDate() + 2);
        this.res.cookie(name, data, {
            httpOnly: true,
            expires: date,
            maxAge: 48 /* hour */ * 60 /* minute */ * 60 /* second */
        });
    };
    ManageDBDoc.prototype.findOne = function (query, sendResponse) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data, resultCpy;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = ((_b = (_a = query === null || query === void 0 ? void 0 : query.schema) === null || _a === void 0 ? void 0 : _a.validate(query === null || query === void 0 ? void 0 : query.fields)) !== null && _b !== void 0 ? _b : { error: null, value: query });
                        resultCpy = {};
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.throwErr(data === null || data === void 0 ? void 0 : data.error, resolve);
                                _this.dbo.findOne(data === null || data === void 0 ? void 0 : data.value, function (err, result) {
                                    if (err)
                                        console.error(new Error(err));
                                    else if (Object.entries(result !== null && result !== void 0 ? result : {}).length !== 0) {
                                        resultCpy = result;
                                        sendResponse && _this.setCookie('User', String(result === null || result === void 0 ? void 0 : result._id));
                                        sendResponse && _this.res.send('Signed In Successfuly');
                                        resolve();
                                    }
                                    else {
                                        sendResponse && _this.res.status(417).send('Invalid Email or Password');
                                        resolve();
                                    }
                                });
                            })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, resultCpy];
                }
            });
        });
    };
    ManageDBDoc.prototype.insertOne = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, value, user;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = data.schema.validate(data.fields), error = _a.error, value = _a.value;
                        return [4 /*yield*/, this.findOne({ email: value.email }, false)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.throwErr(error, resolve);
                                if (Object.entries(user !== null && user !== void 0 ? user : {}).length === 0) {
                                    _this.dbo.insertOne(data.fields, function (err, result) {
                                        if (err)
                                            return console.error(new Error(err));
                                        _this.setCookie('User', String(result.insertedId));
                                        _this.res.send('Signed Up Successfuly!');
                                        resolve();
                                    });
                                }
                                else {
                                    _this.res.status(409).send('User Already Exist With this Email!');
                                    resolve();
                                }
                            })];
                }
            });
        });
    };
    ManageDBDoc.prototype.connectToDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            mongodb_1.MongoClient.connect(process.env.DB_URL, function (err, db) {
                                if (err)
                                    return _this.res.send(err);
                                _this.db = db;
                                _this.dbo = db.db(process.env.DB_NAME).collection(_this.dbCollection);
                                // if (!this.data) {
                                //     throw new Error('No Data Received');
                                // }
                                resolve();
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ManageDBDoc.prototype.closeConnection = function () {
        this.db.close();
    };
    return ManageDBDoc;
}());
exports.default = ManageDBDoc;
//# sourceMappingURL=ManageDBDoc.js.map