"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GalleryController_1 = require("./controllers/GalleryController");
var GalleryValidator_1 = require("./validators/GalleryValidator");
var Routes = /** @class */ (function () {
    function Routes(app) {
        this.gallery = new GalleryController_1.GalleryController();
        this.routeList(app);
    }
    Routes.prototype.routeList = function (app) {
        app.get('/api/gallery/get', this.gallery.index);
        app.post('/api/gallery/create', GalleryValidator_1.galleryValidationRules, GalleryValidator_1.validateGallery, this.gallery.create);
        app.put('/api/update/:id', this.gallery.update);
        app.delete('/api/delete/:id', this.gallery.delete);
    };
    return Routes;
}());
exports.default = Routes;
