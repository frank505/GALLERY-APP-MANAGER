"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var routes_1 = __importDefault(require("./routes"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.configuration();
        this.routes = new routes_1.default(this.app);
    }
    Server.prototype.configuration = function () {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express_1.default.json());
    };
    Server.prototype.start = function () {
        this.app.listen(this.app.get('port'), function () {
            console.log('Server is listening');
        });
    };
    return Server;
}());
var server = new Server();
server.start();
