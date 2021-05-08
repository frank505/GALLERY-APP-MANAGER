"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGallery = exports.galleryValidationRules = void 0;
var express_validator_1 = require("express-validator");
var galleryValidationRules = function () {
    return [
        // username must be an email
        express_validator_1.body('username').isEmail(),
        // password must be at least 5 chars long
        express_validator_1.body('password').isLength({ min: 5 }),
    ];
};
exports.galleryValidationRules = galleryValidationRules;
var validateGallery = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    var extractedErrors = [];
    errors.array().map(function (err) {
        var _a;
        return extractedErrors.push((_a = {}, _a[err.param] = err.msg, _a));
    });
    return res.status(422).json({
        errors: extractedErrors,
    });
};
exports.validateGallery = validateGallery;
