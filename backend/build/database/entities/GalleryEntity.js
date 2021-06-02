"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryEntity = void 0;
var typeorm_1 = require("typeorm");
var UserEntity_1 = require("./UserEntity");
var GalleryEntity = /** @class */ (function () {
    function GalleryEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], GalleryEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return UserEntity_1.UserEntity; }),
        typeorm_1.JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
        ,
        __metadata("design:type", UserEntity_1.UserEntity)
    ], GalleryEntity.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column('varchar', { nullable: false }),
        __metadata("design:type", String)
    ], GalleryEntity.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column('varchar', { nullable: false }),
        __metadata("design:type", String)
    ], GalleryEntity.prototype, "image", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP(6)"; } }),
        __metadata("design:type", Date)
    ], GalleryEntity.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP(6)"; }, onUpdate: "CURRENT_TIMESTAMP(6)" }),
        __metadata("design:type", Date)
    ], GalleryEntity.prototype, "updated_at", void 0);
    GalleryEntity = __decorate([
        typeorm_1.Entity('gallery')
    ], GalleryEntity);
    return GalleryEntity;
}());
exports.GalleryEntity = GalleryEntity;
