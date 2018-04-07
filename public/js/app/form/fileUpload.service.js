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
const core_1 = require("@angular/core");
const step_service_1 = require("../Engine/step.service");
const Observable_1 = require("rxjs/Observable");
const http_1 = require("@angular/http");
const global_1 = require("../global");
let FileUploadService = class FileUploadService {
    constructor(_http, _stepService) {
        this._http = _http;
        this._stepService = _stepService;
    }
    storeFile(fileUploaded) {
        console.log(fileUploaded);
        let body = fileUploaded;
        console.log(body);
        const headers = new http_1.Headers({ 'Content-Type': 'multipart/form-data' });
        var completeUrl = global_1.GlobalVariable.BASE_URL + 'store_file';
        return this._http.post(completeUrl, body, { headers: headers })
            .map(response => response)
            .catch(error => Observable_1.Observable.throw(error.json()));
    }
};
FileUploadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, step_service_1.StepService])
], FileUploadService);
exports.FileUploadService = FileUploadService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0vZmlsZVVwbG9hZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUEsd0NBQTJDO0FBQzNDLHlEQUFtRDtBQUNuRCxnREFBNkM7QUFDN0Msd0NBQTREO0FBQzVELHNDQUF5QztBQUV6QyxJQUFhLGlCQUFpQixHQUE5QjtJQUVJLFlBQXFCLEtBQVcsRUFBVSxZQUF5QjtRQUE5QyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7SUFBRyxDQUFDO0lBRXZFLFNBQVMsQ0FBQyxZQUFZO1FBRWxCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFHMUIsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUscUJBQXFCLEVBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksV0FBVyxHQUFHLHVCQUFjLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQzthQUN4RCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUl4RCxDQUFDO0NBQ0osQ0FBQTtBQXBCWSxpQkFBaUI7SUFEN0IsaUJBQVUsRUFBRTtxQ0FHbUIsV0FBSSxFQUF3QiwwQkFBVztHQUYxRCxpQkFBaUIsQ0FvQjdCO0FBcEJZLDhDQUFpQiIsImZpbGUiOiJmb3JtL2ZpbGVVcGxvYWQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiBUaGlzIGZpbGUgd2lsbCBzZW5kIHRoZSBmaWxlIHVwbG9hZGVkIHRoZSB0aGUgZmlsZXN0YWNrIFJlc3QgQVBJXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7U3RlcFNlcnZpY2V9IGZyb20gXCIuLi9FbmdpbmUvc3RlcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7SHR0cCwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnN9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7R2xvYmFsVmFyaWFibGV9IGZyb20gXCIuLi9nbG9iYWxcIjtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZFNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChwcml2YXRlIF9odHRwOiBIdHRwLCBwcml2YXRlIF9zdGVwU2VydmljZTogU3RlcFNlcnZpY2UpIHt9XHJcblxyXG4gICAgc3RvcmVGaWxlKGZpbGVVcGxvYWRlZCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhmaWxlVXBsb2FkZWQpO1xyXG4gICAgICAgIC8vbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICBsZXQgYm9keSA9IGZpbGVVcGxvYWRlZDtcclxuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSd9KTtcclxuICAgICAgICB2YXIgY29tcGxldGVVcmwgPSBHbG9iYWxWYXJpYWJsZS5CQVNFX1VSTCArICdzdG9yZV9maWxlJztcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KGNvbXBsZXRlVXJsLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
