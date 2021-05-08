"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGallery = exports.galleryValidationRules = void 0;
var express_validator_1 = require("express-validator");
// import { isValidImage } from './CustomFileValidation';
var galleryValidationRules = function () {
    return [
        express_validator_1.body('userId').isNumeric(),
        express_validator_1.body('title').isString(),
        express_validator_1.body('hello').isString()
        //   body('file').isValidImage()
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
