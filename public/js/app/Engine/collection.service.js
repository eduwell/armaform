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
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
require("rxjs/Rx");
const Observable_1 = require("rxjs/Observable");
const global_1 = require("../global");
const step_service_1 = require("./step.service");
const form_service_1 = require("../components/form.service");
let CollectionService = class CollectionService {
    constructor(_http, _formService, _stepService) {
        this._http = _http;
        this._formService = _formService;
        this._stepService = _stepService;
    }
    getFormData(_id, collName, filters, select) {
        let filtersNameToString = [];
        let filtersValueToString = [];
        for (let i = 0; i < filters.length; i++) {
            filtersNameToString.push(filters[i].field);
            filtersValueToString.push(this.getValueSelected(filters[i].step_id));
        }
        var query = '_id=' + _id + '&collName=' + collName + '&filters_name=' + filtersNameToString + '&filters_value=' + filtersValueToString;
        let completeUrl = global_1.GlobalVariable.BASE_URL + 'getFormData?' + query;
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(completeUrl)
            .map((response) => response.json())
            .catch((error) => Observable_1.Observable.throw(error.json()));
    }
    getDatas(collName, filters, select, type) {
        var filtersNameToString = [];
        var filtersValueToString = [];
        console.log(filters);
        console.log("FIELD FILTER SIZE");
        console.log(filters);
        console.log(select);
        let query = 'col_name=' + collName + '&return_type=' + type;
        if (filters.length > 0) {
            for (var i = 0; i < filters.length; i++) {
                filtersNameToString.push(filters[i].field);
                filtersValueToString.push(encodeURIComponent(this.getValueSelected(filters[i].step_id)));
                console.log(filtersValueToString);
            }
            query = query + '&filters_name=' + filtersNameToString + '&filters_value=' + filtersValueToString;
        }
        else {
            query = query + '&filters_name=&filters_value=';
        }
        if (select != '') {
            query = query + '&select=' + select;
        }
        let completeUrl = global_1.GlobalVariable.BASE_URL + 'custom_collection?' + query;
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        console.log('before GET');
        return this._http.get(completeUrl)
            .toPromise()
            .then(response => response.json())
            .catch(error => Observable_1.Observable.throw(error));
    }
    getValueSelected(stepId) {
        console.log(this._formService);
        console.log(this._stepService);
        for (var item of this._stepService.steps) {
            if (item.step_id == stepId) {
                var valueForFormService = item.configuration.form_value.name;
            }
        }
        console.log(valueForFormService);
        for (let item of this._formService.arraySteps) {
            if (typeof eval('item.' + valueForFormService) != 'undefined') {
                return eval('item.' + valueForFormService);
            }
        }
    }
    extractData(res) {
        let body = res.json();
        return body.data || {};
    }
};
CollectionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, form_service_1.FormService, step_service_1.StepService])
], CollectionService);
exports.CollectionService = CollectionService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVuZ2luZS9jb2xsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBc0U7QUFDdEUsd0NBQTJDO0FBQzNDLG1CQUFpQjtBQUNqQixnREFBNkM7QUFJN0Msc0NBQTJDO0FBQzNDLGlEQUEyQztBQUMzQyw2REFBdUQ7QUFHdkQsSUFBYSxpQkFBaUIsR0FBOUI7SUFFSyxZQUFxQixLQUFXLEVBQVUsWUFBeUIsRUFBVSxZQUF5QjtRQUFqRixVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtJQUFHLENBQUM7SUFNM0csV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU07UUFDdEMsSUFBSSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRSxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbEMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFRCxJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUUsR0FBRyxHQUFHLFlBQVksR0FBRyxRQUFRLEdBQUcsZ0JBQWdCLEdBQUcsbUJBQW1CLEdBQUcsaUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7UUFFdEksSUFBSSxXQUFXLEdBQUksdUJBQWMsQ0FBQyxRQUFRLEdBQUMsY0FBYyxHQUFDLEtBQUssQ0FBQztRQUdoRSxJQUFJLE9B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IkVuZ2luZS9jb2xsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHAsIFJlcXVlc3RPcHRpb25zLCBIZWFkZXJzLCBSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAncnhqcy9SeCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcblxyXG5cclxuLy8gaW1wb3J0IHsgTWFycXVlIH0gZnJvbSBcIi4vbWFycXVlXCI7XHJcbmltcG9ydCB7IEdsb2JhbFZhcmlhYmxlIH0gZnJvbSBcIi4uL2dsb2JhbFwiO1xyXG5pbXBvcnQge1N0ZXBTZXJ2aWNlfSBmcm9tIFwiLi9zdGVwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtGb3JtU2VydmljZX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZm9ybS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U3RlcE1vZGVsfSBmcm9tIFwiLi9zdGVwTW9kZWxcIjtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvblNlcnZpY2UgeyBcclxuXHJcbiAgICAgY29uc3RydWN0b3IgKHByaXZhdGUgX2h0dHA6IEh0dHAsIHByaXZhdGUgX2Zvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSwgcHJpdmF0ZSBfc3RlcFNlcnZpY2U6IFN0ZXBTZXJ2aWNlKSB7fVxyXG4gICAgLypcclxuICAgICAgICBQQVJBTVM6IGNvbGxOYW1lIC0tPiBOYW1lIG9mIHRoZSBjb2xsZWN0aW9uIHdoZXJlIGFyZSBzdG9yZWQgdGhlIGRhdGFcclxuICAgICAgICAgICAgICAgIGZpbHRlcnMgIC0tPiBPYmplY3Qgd2l0aCB0aGUgZmlsdGVyIG5hbWUgYW5kIHRoZSBzdGVwX2lkIHdoZXJlIGlzIHN0b3JlZCB0aGUgdmFsdWUgb2YgdGhlIGZpbHRlclxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ICAgLS0+IFRoZSB2YWx1ZSB0aGF0IHdpbGwgYmUgcmV0cmlldmVkIGluIHRoZSBjb2xsZWN0aW9uIGFuZCBkaXNwbGF5ZWQgb24gdGhlIHNjcmVlblxyXG4gICAgICovXHJcbiAgICBnZXRGb3JtRGF0YShfaWQsIGNvbGxOYW1lLCBmaWx0ZXJzLCBzZWxlY3Qpe1xyXG4gICAgICAgIGxldCBmaWx0ZXJzTmFtZVRvU3RyaW5nID0gW107XHJcbiAgICAgICAgbGV0IGZpbHRlcnNWYWx1ZVRvU3RyaW5nID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPCBmaWx0ZXJzLmxlbmd0aDtpKyspIHtcclxuICAgICAgICAgICAgZmlsdGVyc05hbWVUb1N0cmluZy5wdXNoKGZpbHRlcnNbaV0uZmllbGQpO1xyXG4gICAgICAgICAgICBmaWx0ZXJzVmFsdWVUb1N0cmluZy5wdXNoKHRoaXMuZ2V0VmFsdWVTZWxlY3RlZChmaWx0ZXJzW2ldLnN0ZXBfaWQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBxdWVyeSA9ICdfaWQ9JyArX2lkICsgJyZjb2xsTmFtZT0nICsgY29sbE5hbWUgKyAnJmZpbHRlcnNfbmFtZT0nICsgZmlsdGVyc05hbWVUb1N0cmluZyArICcmZmlsdGVyc192YWx1ZT0nICsgZmlsdGVyc1ZhbHVlVG9TdHJpbmc7XHJcblxyXG4gICAgICAgIGxldCBjb21wbGV0ZVVybCA9ICBHbG9iYWxWYXJpYWJsZS5CQVNFX1VSTCsnZ2V0Rm9ybURhdGE/JytxdWVyeTtcclxuICAgICAgICAvL3JldHVybiBQcm9taXNlLnJlc29sdmUgKHRoaXMuX2h0dHAuZ2V0KGNvbXBsZXRlVXJsKVxyXG4gICAgICAgIC8vICBsZXQgYm9keSA9IHsgXCJmaWx0ZXJzXCI6IGZpbHRlcnMsIFwiY29sbE5hbWVcIiA6IGNvbGxOYW1lfTtcclxuICAgICAgICBsZXQgaGVhZGVycz0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGNvbXBsZXRlVXJsKVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZSA6IFJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3I6IFJlc3BvbnNlKSA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vIHJldHVybiB0aGlzLl9odHRwLmdldChjb21wbGV0ZVVybClcclxuICAgICAgICAvLyAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgLy8gICAgIC50aGVuKHJlc3BvbnNlID0+cmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC8vICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcikpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGFzKGNvbGxOYW1lLCBmaWx0ZXJzLCBzZWxlY3QsIHR5cGUpIHtcclxuICAgICAgICB2YXIgZmlsdGVyc05hbWVUb1N0cmluZyA9IFtdXHJcbiAgICAgICAgdmFyIGZpbHRlcnNWYWx1ZVRvU3RyaW5nID0gW11cclxuICAgICAgICBjb25zb2xlLmxvZyhmaWx0ZXJzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZJRUxEIEZJTFRFUiBTSVpFXCIpXHJcbiAgICAgICAgY29uc29sZS5sb2coZmlsdGVycyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VsZWN0KTtcclxuICAgICAgICBsZXQgcXVlcnkgPSAnY29sX25hbWU9JyArIGNvbGxOYW1lICsgJyZyZXR1cm5fdHlwZT0nICsgdHlwZVxyXG4gICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCA+IDAgKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnNOYW1lVG9TdHJpbmcucHVzaChmaWx0ZXJzW2ldLmZpZWxkKTtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnNWYWx1ZVRvU3RyaW5nLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuZ2V0VmFsdWVTZWxlY3RlZChmaWx0ZXJzW2ldLnN0ZXBfaWQpKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmlsdGVyc1ZhbHVlVG9TdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgLy8gZmlsdGVyc1ZhbHVlVG9TdHJpbmcucHVzaCgnQVVESScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBmb3IgKHZhciBpPTA7IGk8IGZpbHRlcnMubGVuZ3RoO2krKykge1xyXG4gICAgICAgICAgICAvLyAgICAgZm9yICh2YXIgaj0wOyBpPCBmaWx0ZXJzW2pdLmZpZWxkLmxlbmd0aDtqKyspIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBmaWx0ZXJzTmFtZVRvU3RyaW5nLnB1c2goZmlsdGVyc1tpXS5maWVsZFtqXSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZmlsdGVyc1ZhbHVlVG9TdHJpbmcucHVzaCh0aGlzLmdldFZhbHVlU2VsZWN0ZWQoZmlsdGVyc1tpXS5zdGVwX2lkW2pdKSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeSArICcmZmlsdGVyc19uYW1lPScgKyBmaWx0ZXJzTmFtZVRvU3RyaW5nICsgJyZmaWx0ZXJzX3ZhbHVlPScgKyBmaWx0ZXJzVmFsdWVUb1N0cmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeSArICcmZmlsdGVyc19uYW1lPSZmaWx0ZXJzX3ZhbHVlPSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ICE9ICcnKXtcclxuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeSArICcmc2VsZWN0PScgKyBzZWxlY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgLy8gY29uc29sZS5sb2coZmlsdGVyc1RvU3RyaW5nKTtcclxuICAgICAgICBsZXQgY29tcGxldGVVcmwgPSAgR2xvYmFsVmFyaWFibGUuQkFTRV9VUkwrJ2N1c3RvbV9jb2xsZWN0aW9uPycrcXVlcnk7XHJcbiAgICAgICAgLy9yZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2h0dHAuZ2V0KGNvbXBsZXRlVXJsKVxyXG4gICAgICAvLyAgbGV0IGJvZHkgPSB7IFwiZmlsdGVyc1wiOiBmaWx0ZXJzLCBcImNvbGxOYW1lXCIgOiBjb2xsTmFtZX07XHJcbiAgICAgICAgbGV0IGhlYWRlcnM9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdiZWZvcmUgR0VUJylcclxuICAgICAgICAvLyBsZXQgbXlQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoY29tcGxldGVVcmwpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PnJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IpKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFZhbHVlU2VsZWN0ZWQoc3RlcElkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fZm9ybVNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3N0ZXBTZXJ2aWNlKTtcclxuICAgICAgICAvL1JFVFJJRVZFIElOIFNURVAgQ09ORklHIEZJTEUgVEhFIE5BTUUgT0YgU0FWRUQgVkFMVUUgRk9SIFRIRSBTUEVDSUZJRUQgU1RFUFxyXG4gICAgICAgIGZvciAodmFyIGl0ZW0gb2YgdGhpcy5fc3RlcFNlcnZpY2Uuc3RlcHMpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uc3RlcF9pZCA9PSBzdGVwSWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUZvckZvcm1TZXJ2aWNlID0gaXRlbS5jb25maWd1cmF0aW9uLmZvcm1fdmFsdWUubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZUZvckZvcm1TZXJ2aWNlKTtcclxuICAgICAgICAvLyBSRVRVUk4gVEhFIENPTlRFTlQgT0YgVkFSSUFCTEUgUElDS0VEIFVQIElOIFNURVAgU0VSVklDRVxyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5fZm9ybVNlcnZpY2UuYXJyYXlTdGVwcyBhcyBBcnJheTxTdGVwTW9kZWw+KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZhbCgnaXRlbS4nICsgdmFsdWVGb3JGb3JtU2VydmljZSkgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmFsKCdpdGVtLicgKyB2YWx1ZUZvckZvcm1TZXJ2aWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gdmFsdWVTZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGJvZHkuZGF0YSB8fCB7IH07XHJcbiAgICB9XHJcbiAgICB9XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
