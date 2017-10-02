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
var core_1 = require('@angular/core');
var grid_service_1 = require("./grid.service");
var router_1 = require('@angular/router');
var step_service_1 = require("../Engine/step.service");
var http_1 = require("@angular/http");
var export_service_1 = require("./export.service");
var GridPanelComponent = (function () {
    function GridPanelComponent(_stepService, _gridService, router, route, _http, _exportService) {
        this._stepService = _stepService;
        this._gridService = _gridService;
        this.router = router;
        this.route = route;
        this._http = _http;
        this._exportService = _exportService;
        this.display = false;
        this.myListData = [];
        this.keysName = [];
        this.showInput = [];
        this.filterActivated = false;
        this.master = "";
        this.app_name = "";
    }
    GridPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.grid_name = this.route.snapshot.queryParams["grid_name"];
        this.master = this.route.snapshot.queryParams["master"];
        this.app_name = this.route.snapshot.queryParams["app_name"];
        console.log(this.app_name);
        console.log(this.master);
        if (this.master != '') {
            this._gridService.getDatas(this.grid_name, this.master)
                .subscribe(function (data) {
                console.log(data);
                console.log(_this._gridService);
            }, function (error) { return console.log(error); });
        }
        else {
            this._gridService.getDatas(this.grid_name, '')
                .subscribe(function (data) {
                console.log(data);
                console.log(_this._gridService);
            }, function (error) { return console.log(error); });
        }
        for (var i = 0; i < this._gridService.colTitle.length; i++) {
            this.showInput.push(false);
        }
        this.myListData = this._gridService.dataGrid;
        this.keysName = this._gridService.keysName;
        console.log(this._gridService.keysName);
        console.log(this._gridService);
        this.display = true;
    };
    GridPanelComponent.prototype.goToCurrentStep = function (item) {
        console.log(item);
        var navigationExtras = {
            queryParams: { 'current_id': item.step_id, '_id': item._id }
        };
        this.router.navigate(['/step'], navigationExtras);
    };
    GridPanelComponent.prototype.isObject = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    };
    GridPanelComponent.prototype.showFilterInput = function (idx) {
        if (this.showInput[idx] == true) {
            this.showInput[idx] = false;
        }
        else {
            this.showInput[idx] = true;
        }
    };
    GridPanelComponent.prototype.checkUndefined = function (value) {
        console.log(value);
        console.log(typeof value === 'undefined');
        return (typeof value === 'undefined');
    };
    GridPanelComponent.prototype.updateCheckBox = function ($event, item) {
        var value = $event.target.checked;
        console.log(item);
        console.log($event.target);
        var fieldName = $event.target.name;
        console.log(this.master);
        this._gridService.updateCheckbox(value, item._id, this.master, this.app_name, fieldName)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    GridPanelComponent.prototype.changeCourse = function ($event, id) {
        var course_type = $event.target.value;
        this._gridService.changeCourse(course_type, this.obj_id)
            .subscribe(function (data) {
            alert('ok');
        }, function (error) { return console.log(error); });
    };
    GridPanelComponent.prototype.filter = function (event) {
        console.log(event.target);
        console.log("passe par grid cmp");
        console.log(event);
        console.log(this._gridService.dataGrid);
        this._gridService.filterData(event.target.value, event.srcElement.id);
    };
    GridPanelComponent.prototype.exportExcel = function () {
        this.grid_name;
        this.master;
        console.log(this._gridService.dataGrid);
        this._exportService.toExcel(this.grid_name, this.master)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    GridPanelComponent = __decorate([
        core_1.Component({
            selector: 'grid-panel',
            template: "\n             \n               \n               \n               <div class=\"panel-heading panel-heading-custom\" align=\"center\">\n                 <div  class=\"row\" align=\"left\">\n                  <div class=\"col-md-2\">\n                    <nav class=\"form-navArrow\">\n                       <!--<a [routerLink]=\"['/menu']\" [queryParams]=\"{'firstLoad': false}\">-->\n                       <a [routerLink]=\"['/home']\" [queryParams]=\"{'app': 'ballet', 'master': master, 'premenu': 1}\" >\n                           <button class=\"btn btn-warning\"><i class=\"glyphicon glyphicon-triangle-left\" ></i>BACK</button></a>\n                    </nav>\n                  </div>\n                 <div class=\"col-md-10\" align=\"center\">\n                     <h2 *ngIf=\"master != ''\">{{master}}</h2>\n                     <h3>{{grid_name}}</h3>\n                 </div>\n               </div>\n               <div><button (click)=\"exportExcel()\">Export excel</button></div>\n               </div>\n                <div class=\"panel-body\">\n               <div class=\"table-responsive\" *ngIf=\"display\">\n                    <table class=\"table table-hover table-condensed\"  >\n                        <tr>\n                            <th *ngFor=\"let obj of _gridService.colTitle;let i = index\">\n                                <div >{{obj.title}}&nbsp; \n                                    <button *ngIf=\"obj.filterable\" \n                                        class=\"glyphicon glyphicon-filter\" \n                                        type=\"button\" \n                                        (click)=\"showFilterInput(i)\">\n                                    </button>\n                                    <br>\n                                    <input   \n                                        *ngIf=\"obj.filterable && showInput[i]\"\n                                        myAutofocus=\"true\"\n                                        type=\"text\" \n                                        id=\"{{obj.key}}\"\n                                        name=\"{{obj.key}}\"\n                                        (keyup)=\"filter($event)\"\n                                     >\n                                     <br>\n                                     \n                                </div>\n\n                            </th>\n                            \n                        </tr>\n                        <tr *ngFor=\"let item of _gridService.dataGrid;let j = index\">\n                            <td *ngFor=\"let key of _gridService.keysName;let i = index\" align=\"center\">\n                                                     \n                                \n                                <!-- TYPE CHECK BOX -->\n                                <span *ngIf=\"this._gridService.colTitle[i].type == 'checkbox' \"> \n                                    <input *ngIf=\"item[key]\" name=\"{{key}}\" type=\"checkbox\" value=\"{{item[key]}}\" checked (change)=updateCheckBox($event,item) /> \n                                    <input *ngIf=\"item[key] == false\" name=\"{{key}}\" type=\"checkbox\" value=\"{{item[key]}}\" (change)=updateCheckBox($event,item) /> \n                                </span>\n                                \n                                <!-- TYPE COMBO MORE THAN 1 VALUE IN LIST COMBO-->\n                                <span *ngIf=\"this._gridService.colTitle[i].type == 'combo' &&  _gridService.dataGrid[0].course_list.length > 1\" >\n                                       <select id=\"groups\" (change)=\"changeCourse($event, item._id)\"   >\n                                            <option selected value=\"item[key]\">{{item[key]}}</option>\n                                            <option *ngFor=\"let course of _gridService.dataGrid[0].course_list\">{{course}}</option>\n                                       </select>\n                                </span>\n                                <!-- TYPE COMBO LESS THAN 1 VALUE IN LIST COMBO-->\n                                <span *ngIf=\"this._gridService.colTitle[i].type == 'combo' && _gridService.dataGrid[0].course_list.length < 2\">\n                                        {{item[key]}}  \n                                </span>\n                                \n                                <!-- NORMAL TYPE -->\n                                <span *ngIf=\"!filterActivated && _gridService.colTitle[i].type == 'standard'\">\n                                    {{item[key]}}  \n                                </span>\n                                \n                                <!-- FIELD PANEL TYPE -->\n                                <span *ngIf=\"!filterActivated && _gridService.colTitle[i].type == 'field_panel'\">\n                                    {{item[key]}}  \n                                </span>\n                                \n                                \n                            </td>\n                            \n                            <!-- EDIT BUTTON -->\n                            <td *ngIf=\"_stepService.steps[0].master_name == 'ballet'\">\n                                <a [routerLink]=\"['/editStudent', item._id, grid_name, master] \"> \n                                    <button class=\"btn btn-primary\" type=\"button\" > \n                                        <i class=\"glyphicon glyphicon-edit\"> </i>\n                                    </button>\n                                </a> \n                            </td>\n\n                            <!--- GROUP MANAGEMENT BUTTON --->\n                            <!--*ngIf=\"item.group_mgt\"-->\n                            <td *ngIf=\"_stepService.steps[0].master_name == 'ballet'\" >\n                                <a [routerLink]=\"['/groupManagement', item._id, grid_name, master] \">\n                                    <button class=\"btn btn-primary\" type=\"button\"> Group </button>\n                                </a> \n                            </td>\n                            <!-- IF DETAILS IS ACTIVATED IN GRID CONFIG COLLECTION -->\n                            <td *ngIf=\"item.details.activated\">\n                                <a [routerLink]=\"['/details', item._id] \">\n                                    <button class=\"btn btn-primary\" type=\"button\"> Detail </button>\n                                </a> \n                            </td>\n                            <!-- MODAL <td *ngIf=\"item.details.activated\"><button class=\"btn btn-success\" type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\">DETAIL </button></td>-->\n                            \n                            <!--IF WORKFLOW TYPE BTN TO GO BACK TO CURRENT STEP -->\n                            <td *ngIf=\"this._stepService.steps[0].master_type == 'workflow'\"> <button class=\"btn btn-success\" type=\"button\" (click)=\"goToCurrentStep(item)\" value=\"{{item.step_id}} \">Current step </button></td>\n                        \n                            <!--<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">-->\n  <!---->\n                          <!--<div *ngIf=\"item.details.activated\" class=\"modal-dialog\" role=\"document\">-->\n                            <!--<div class=\"modal-content\">-->\n                              <!--<div class=\"modal-header\">-->\n                                <!--<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>-->\n                                <!--<h4 class=\"modal-title\" id=\"myModalLabel\"></h4>-->\n                              <!--</div>-->\n                              <!--<div class=\"modal-body\">-->\n                                <!--BODY ICI {{item.detail[0].power}}-->\n                                <!--<br> {{key}} <br>{{_gridService.keysName_details[0]}}-->\n                                <!--<div *ngFor=\"let fields of _gridService.keysName_details\">-->\n                                    <!--{{fields}}-->\n                                    <!--&lt;!&ndash;l&ndash;&gt;-->\n                                    <!--&lt;!&ndash;{{fields[0].power}}&ndash;&gt;-->\n                                <!--&lt;!&ndash;&ndash;&gt;-->\n                                <!--</div>-->\n                                <!---->\n                              <!--</div>-->\n                              <!--<div class=\"modal-footer\">-->\n                                <!--<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>-->\n                                <!--<button type=\"button\" class=\"btn btn-primary\">Save changes</button>-->\n                              <!--</div>-->\n                            <!--</div>-->\n                          <!--</div>-->\n                        <!--</div>-->\n                        </tr>\n                        \n                    </table>\n                </div>\n               \n            </div>\n            <!-- Modal -->\n\n    "
        }), 
        __metadata('design:paramtypes', [step_service_1.StepService, grid_service_1.GridPanelService, router_1.Router, router_1.ActivatedRoute, http_1.Http, export_service_1.ExportService])
    ], GridPanelComponent);
    return GridPanelComponent;
}());
exports.GridPanelComponent = GridPanelComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFxRCxlQUNyRCxDQUFDLENBRG1FO0FBQ3BFLDZCQUErQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2hELHVCQUF1RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pFLDZCQUEwQix3QkFBd0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUFtQixlQUFlLENBQUMsQ0FBQTtBQUNuQywrQkFBNEIsa0JBQWtCLENBQUMsQ0FBQTtBQXFKOUM7SUFHRyw0QkFBb0IsWUFBeUIsRUFBVSxZQUE4QixFQUFVLE1BQWMsRUFDekYsS0FBcUIsRUFBVSxLQUFXLEVBQVUsY0FBNkI7UUFEakYsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ3pGLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBRXJHLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVoQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBVHlGLENBQUM7SUFXeEcscUNBQVEsR0FBUjtRQUFBLGlCQXFDSDtRQW5DTyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMs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RUFBakIsQ0FBaUIsRUFDekIsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUM5QixDQUFBO0lBRVQsQ0FBQztJQXhSTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsOCtSQStJVDtTQUNKLENBQUM7OzBCQUFBO0lBd0lGLHlCQUFDO0FBQUQsQ0F0SUMsQUFzSUEsSUFBQTtBQXRJYSwwQkFBa0IscUJBc0kvQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtHcmlkUGFuZWxTZXJ2aWNlfSBmcm9tIFwiLi9ncmlkLnNlcnZpY2VcIjtcbmltcG9ydCB7Um91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzLCBBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7U3RlcFNlcnZpY2V9IGZyb20gXCIuLi9FbmdpbmUvc3RlcC5zZXJ2aWNlXCI7XG5pbXBvcnQge0h0dHB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQge0V4cG9ydFNlcnZpY2V9IGZyb20gXCIuL2V4cG9ydC5zZXJ2aWNlXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2dyaWQtcGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmcgcGFuZWwtaGVhZGluZy1jdXN0b21cIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzcz1cInJvd1wiIGFsaWduPVwibGVmdFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuYXYgY2xhc3M9XCJmb3JtLW5hdkFycm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgIDwhLS08YSBbcm91dGVyTGlua109XCJbJy9tZW51J11cIiBbcXVlcnlQYXJhbXNdPVwieydmaXJzdExvYWQnOiBmYWxzZX1cIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWycvaG9tZSddXCIgW3F1ZXJ5UGFyYW1zXT1cInsnYXBwJzogJ2JhbGxldCcsICdtYXN0ZXInOiBtYXN0ZXIsICdwcmVtZW51JzogMX1cIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCI+PGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyaWFuZ2xlLWxlZnRcIiA+PC9pPkJBQ0s8L2J1dHRvbj48L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTBcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgPGgyICpuZ0lmPVwibWFzdGVyICE9ICcnXCI+e3ttYXN0ZXJ9fTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICA8aDM+e3tncmlkX25hbWV9fTwvaDM+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICA8ZGl2PjxidXR0b24gKGNsaWNrKT1cImV4cG9ydEV4Y2VsKClcIj5FeHBvcnQgZXhjZWw8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtcmVzcG9uc2l2ZVwiICpuZ0lmPVwiZGlzcGxheVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlciB0YWJsZS1jb25kZW5zZWRcIiAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgb2JqIG9mIF9ncmlkU2VydmljZS5jb2xUaXRsZTtsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgPnt7b2JqLnRpdGxlfX0mbmJzcDsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwib2JqLmZpbHRlcmFibGVcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZmlsdGVyXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzaG93RmlsdGVySW5wdXQoaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJvYmouZmlsdGVyYWJsZSAmJiBzaG93SW5wdXRbaV1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15QXV0b2ZvY3VzPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cInt7b2JqLmtleX19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwie3tvYmoua2V5fX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJmaWx0ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfZ3JpZFNlcnZpY2UuZGF0YUdyaWQ7bGV0IGogPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQga2V5IG9mIF9ncmlkU2VydmljZS5rZXlzTmFtZTtsZXQgaSA9IGluZGV4XCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIFRZUEUgQ0hFQ0sgQk9YIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRoaXMuX2dyaWRTZXJ2aWNlLmNvbFRpdGxlW2ldLnR5cGUgPT0gJ2NoZWNrYm94JyBcIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpdGVtW2tleV1cIiBuYW1lPVwie3trZXl9fVwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwie3tpdGVtW2tleV19fVwiIGNoZWNrZWQgKGNoYW5nZSk9dXBkYXRlQ2hlY2tCb3goJGV2ZW50LGl0ZW0pIC8+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiaXRlbVtrZXldID09IGZhbHNlXCIgbmFtZT1cInt7a2V5fX1cIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cInt7aXRlbVtrZXldfX1cIiAoY2hhbmdlKT11cGRhdGVDaGVja0JveCgkZXZlbnQsaXRlbSkgLz4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gVFlQRSBDT01CTyBNT1JFIFRIQU4gMSBWQUxVRSBJTiBMSVNUIENPTUJPLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidGhpcy5fZ3JpZFNlcnZpY2UuY29sVGl0bGVbaV0udHlwZSA9PSAnY29tYm8nICYmICBfZ3JpZFNlcnZpY2UuZGF0YUdyaWRbMF0uY291cnNlX2xpc3QubGVuZ3RoID4gMVwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJncm91cHNcIiAoY2hhbmdlKT1cImNoYW5nZUNvdXJzZSgkZXZlbnQsIGl0ZW0uX2lkKVwiICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkIHZhbHVlPVwiaXRlbVtrZXldXCI+e3tpdGVtW2tleV19fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBjb3Vyc2Ugb2YgX2dyaWRTZXJ2aWNlLmRhdGFHcmlkWzBdLmNvdXJzZV9saXN0XCI+e3tjb3Vyc2V9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBUWVBFIENPTUJPIExFU1MgVEhBTiAxIFZBTFVFIElOIExJU1QgQ09NQk8tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0aGlzLl9ncmlkU2VydmljZS5jb2xUaXRsZVtpXS50eXBlID09ICdjb21ibycgJiYgX2dyaWRTZXJ2aWNlLmRhdGFHcmlkWzBdLmNvdXJzZV9saXN0Lmxlbmd0aCA8IDJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW1ba2V5XX19ICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBOT1JNQUwgVFlQRSAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZmlsdGVyQWN0aXZhdGVkICYmIF9ncmlkU2VydmljZS5jb2xUaXRsZVtpXS50eXBlID09ICdzdGFuZGFyZCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbVtrZXldfX0gIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEZJRUxEIFBBTkVMIFRZUEUgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWZpbHRlckFjdGl2YXRlZCAmJiBfZ3JpZFNlcnZpY2UuY29sVGl0bGVbaV0udHlwZSA9PSAnZmllbGRfcGFuZWwnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW1ba2V5XX19ICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEVESVQgQlVUVE9OIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cIl9zdGVwU2VydmljZS5zdGVwc1swXS5tYXN0ZXJfbmFtZSA9PSAnYmFsbGV0J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJy9lZGl0U3R1ZGVudCcsIGl0ZW0uX2lkLCBncmlkX25hbWUsIG1hc3Rlcl0gXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiA+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1lZGl0XCI+IDwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tLSBHUk9VUCBNQU5BR0VNRU5UIEJVVFRPTiAtLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSpuZ0lmPVwiaXRlbS5ncm91cF9tZ3RcIi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cIl9zdGVwU2VydmljZS5zdGVwc1swXS5tYXN0ZXJfbmFtZSA9PSAnYmFsbGV0J1wiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWycvZ3JvdXBNYW5hZ2VtZW50JywgaXRlbS5faWQsIGdyaWRfbmFtZSwgbWFzdGVyXSBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCI+IEdyb3VwIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBJRiBERVRBSUxTIElTIEFDVElWQVRFRCBJTiBHUklEIENPTkZJRyBDT0xMRUNUSU9OIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cIml0ZW0uZGV0YWlscy5hY3RpdmF0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWycvZGV0YWlscycsIGl0ZW0uX2lkXSBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCI+IERldGFpbCA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gTU9EQUwgPHRkICpuZ0lmPVwiaXRlbS5kZXRhaWxzLmFjdGl2YXRlZFwiPjxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI215TW9kYWxcIj5ERVRBSUwgPC9idXR0b24+PC90ZD4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tSUYgV09SS0ZMT1cgVFlQRSBCVE4gVE8gR08gQkFDSyBUTyBDVVJSRU5UIFNURVAgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0lmPVwidGhpcy5fc3RlcFNlcnZpY2Uuc3RlcHNbMF0ubWFzdGVyX3R5cGUgPT0gJ3dvcmtmbG93J1wiPiA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJnb1RvQ3VycmVudFN0ZXAoaXRlbSlcIiB2YWx1ZT1cInt7aXRlbS5zdGVwX2lkfX0gXCI+Q3VycmVudCBzdGVwIDwvYnV0dG9uPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cIm1vZGFsIGZhZGVcIiBpZD1cIm15TW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIm15TW9kYWxMYWJlbFwiPi0tPlxuICA8IS0tLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2ICpuZ0lmPVwiaXRlbS5kZXRhaWxzLmFjdGl2YXRlZFwiIGNsYXNzPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJteU1vZGFsTGFiZWxcIj48L2g0Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1CT0RZIElDSSB7e2l0ZW0uZGV0YWlsWzBdLnBvd2VyfX0tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxicj4ge3trZXl9fSA8YnI+e3tfZ3JpZFNlcnZpY2Uua2V5c05hbWVfZGV0YWlsc1swXX19LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2ICpuZ0Zvcj1cImxldCBmaWVsZHMgb2YgX2dyaWRTZXJ2aWNlLmtleXNOYW1lX2RldGFpbHNcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS17e2ZpZWxkc319LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tJmx0OyEmbmRhc2g7bCZuZGFzaDsmZ3Q7LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tJmx0OyEmbmRhc2g7e3tmaWVsZHNbMF0ucG93ZXJ9fSZuZGFzaDsmZ3Q7LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0mbHQ7ISZuZGFzaDsmbmRhc2g7Jmd0Oy0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+U2F2ZSBjaGFuZ2VzPC9idXR0b24+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tPC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSBNb2RhbCAtLT5cblxuICAgIGBcbn0pXG5cbiBleHBvcnQgY2xhc3MgR3JpZFBhbmVsQ29tcG9uZW50IHtcblxuICAgLy8gcm91dGVyID0gbmV3IFJvdXRlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdGVwU2VydmljZTogU3RlcFNlcnZpY2UsIHByaXZhdGUgX2dyaWRTZXJ2aWNlOiBHcmlkUGFuZWxTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIF9odHRwOiBIdHRwLCBwcml2YXRlIF9leHBvcnRTZXJ2aWNlOiBFeHBvcnRTZXJ2aWNlKXt9XG5cbiAgICBkaXNwbGF5ID0gZmFsc2U7XG4gICAgbXlMaXN0RGF0YSA9IFtdOy8vID0gIHRoaXMuX2dyaWRTZXJ2aWNlLmRhdGFHcmlkO1xuICAgIGdyaWRfbmFtZTtcbiAgICBrZXlzTmFtZSA9IFtdO1xuICAgIHNob3dJbnB1dCA9IFtdO1xuICAgIGZpbHRlckFjdGl2YXRlZCA9IGZhbHNlO1xuICAgIG1hc3RlciA9IFwiXCI7XG4gICAgYXBwX25hbWUgPSBcIlwiO1xuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5ncmlkX25hbWUgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zW1wiZ3JpZF9uYW1lXCJdO1xuICAgICAgICB0aGlzLm1hc3RlciA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbXCJtYXN0ZXJcIl07XG4gICAgICAgIHRoaXMuYXBwX25hbWUgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zW1wiYXBwX25hbWVcIl07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXBwX25hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1hc3RlcilcbiAgICAgICAgaWYodGhpcy5tYXN0ZXIgIT0gJycpe1xuICAgICAgICAgICAgdGhpcy5fZ3JpZFNlcnZpY2UuZ2V0RGF0YXModGhpcy5ncmlkX25hbWUsIHRoaXMubWFzdGVyKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fZ3JpZFNlcnZpY2UpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dyaWRTZXJ2aWNlLmdldERhdGFzKHRoaXMuZ3JpZF9uYW1lLCAnJylcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9ncmlkU2VydmljZSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2dyaWRTZXJ2aWNlLmNvbFRpdGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dJbnB1dC5wdXNoKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubXlMaXN0RGF0YSA9IHRoaXMuX2dyaWRTZXJ2aWNlLmRhdGFHcmlkO1xuICAgICAgICB0aGlzLmtleXNOYW1lID0gdGhpcy5fZ3JpZFNlcnZpY2Uua2V5c05hbWU7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fZ3JpZFNlcnZpY2Uua2V5c05hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9ncmlkU2VydmljZSk7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG5cbn1cbiAgICBnb1RvQ3VycmVudFN0ZXAoaXRlbSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7ICdjdXJyZW50X2lkJzogaXRlbS5zdGVwX2lkLCAnX2lkJzogaXRlbS5faWQgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RlcCddLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICB9XG5cbiAgICBpc09iamVjdChpdGVtKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIGl0ZW0gPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoaXRlbSkgJiYgaXRlbSAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgc2hvd0ZpbHRlcklucHV0KGlkeCl7XG4gICAgICAgIGlmICh0aGlzLnNob3dJbnB1dFtpZHhdID09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0lucHV0W2lkeF0gPSBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnNob3dJbnB1dFtpZHhdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrVW5kZWZpbmVkKHZhbHVlKXtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpO1xuICAgIH1cblxuXG4gICAgdXBkYXRlQ2hlY2tCb3goJGV2ZW50LCBpdGVtKXtcbiAgICAgICAvLyBsZXQgdmFsdWUgPSAkZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgbGV0IHZhbHVlID0kZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICAgIGNvbnNvbGUubG9nKCRldmVudC50YXJnZXQpXG4gICAgICAgIGxldCBmaWVsZE5hbWUgPSAkZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFzdGVyKVxuICAgICAgICB0aGlzLl9ncmlkU2VydmljZS51cGRhdGVDaGVja2JveCh2YWx1ZSxpdGVtLl9pZCx0aGlzLm1hc3RlciwgdGhpcy5hcHBfbmFtZSwgZmllbGROYW1lKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgKVxuICAgICAgLy8gY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgLy8gIGNvbnNvbGUubG9nKHZhbDIpO1xuXG4gICAgfVxuXG4gICAgY2hhbmdlQ291cnNlKCRldmVudCwgaWQpe1xuICAgICAgICBsZXQgY291cnNlX3R5cGUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgIHRoaXMuX2dyaWRTZXJ2aWNlLmNoYW5nZUNvdXJzZShjb3Vyc2VfdHlwZSx0aGlzLm9ial9pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdvaycpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcblxuICAgICAgICAgICAgKVxuICAgIH1cbiAgICBmaWx0ZXIoZXZlbnQ6IGFueSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIC8vaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PScnKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJwYXNzZSBwYXIgZ3JpZCBjbXBcIik7XG4gICAgICAgICAgICAvL31lbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiBfZ3JpZFNlcnZpY2UuZGF0YUdyaWQpO1xuICAgICAgICB0aGlzLl9ncmlkU2VydmljZS5maWx0ZXJEYXRhKGV2ZW50LnRhcmdldC52YWx1ZSwgZXZlbnQuc3JjRWxlbWVudC5pZCk7fVxuICAgICAgICAvLyAgdGhpcy5maWx0ZXJBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIC8vfVxuXG4gICAgZXhwb3J0RXhjZWwoKXtcbiAgICAgICAgdGhpcy5ncmlkX25hbWVcbiAgICAgICAgdGhpcy5tYXN0ZXJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fZ3JpZFNlcnZpY2UuZGF0YUdyaWQpXG4gICAgICAgIHRoaXMuX2V4cG9ydFNlcnZpY2UudG9FeGNlbCh0aGlzLmdyaWRfbmFtZSx0aGlzLm1hc3RlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIClcblxuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
