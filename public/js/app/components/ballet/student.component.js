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
var router_1 = require('@angular/router');
var http_1 = require("@angular/http");
var group_service_1 = require("./group.service");
var grid_service_1 = require("../grid.service");
var balletDetails_service_1 = require("./balletDetails.service");
var student_1 = require("./student");
var student_service_1 = require("./student.service");
var StudentComponent = (function () {
    function StudentComponent(router, _gridService, _groupService, _balletDetailsService, _studentService, route, _http) {
        this.router = router;
        this._gridService = _gridService;
        this._groupService = _groupService;
        this._balletDetailsService = _balletDetailsService;
        this._studentService = _studentService;
        this.route = route;
        this._http = _http;
        this.display_edit = false;
        this.student = {};
        this.becas = ['15%', '20%',
            '25%', '50%', '75%', '100%'];
        this.submitted = false;
    }
    StudentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.obj_id = params['record'];
            _this.course_type = params['course_type'];
            _this.stage = params['stage'];
        });
        console.log(this.obj_id);
        console.log(this._gridService.dataGrid);
        this._balletDetailsService.getDatas(this.obj_id)
            .subscribe(function (data) {
            console.log(data);
            _this.student_info = data;
            _this.model = new student_1.Student(data._id, data.DNI, data.BECA, data.father, data.intolerencia, data.email2, data.phone2, data.notes);
            console.log(_this.model);
            _this.display_edit = true;
        }, function (error) { return console.log(error); });
    };
    StudentComponent.prototype.onSubmit = function () {
        this._studentService.updateStudent(this.model)
            .subscribe(function (data) {
            console.log(data);
            $("#myModal").modal('show');
        }, function (error) { return console.log(error); });
        this.submitted = true;
        console.log(this.model);
    };
    StudentComponent = __decorate([
        core_1.Component({
            selector: 'group',
            template: "\n    <div  *ngIf=\"display_edit\"> \n          \n          <div class=\"panel-heading panel-heading-custom\">\n            <div  class=\"row\" align=\"left\">\n                <div class=\"col-md-2\">\n                    <nav class=\"form-navArrow\" *ngIf=\"display_edit\">\n                        <a [routerLink]=\"['/grid']\" [queryParams]=\"{'grid_name': course_type, 'master': stage, 'app_name':'ballet'}\">\n                        <button class=\"btn btn-warning\"><i class=\"glyphicon glyphicon-triangle-left\" ></i>BACK</button></a>\n                    </nav>\n                </div>\n                <div class=\"col-md-10\" align=\"center\">\n                    <h2>{{student_info.profile[1].firstname}}  {{student_info.profile[0].nom}}</h2>\n                </div>\n            </div>\n           </div>\n          <!--<h2>{{student_info.age}} years old</h2>-->\n    \n        <div class=\"panel-body\">\n            <form class=\"form-horizontal\" #studentForm=\"ngForm\" (ngSubmit)=\"onSubmit()\"  >\n                <div class=\"form-group\">\n                     <label for=\"DNI\" class=\"col-sm-2 control-label\" >DNI</label>\n                     <div class=\"col-sm-10\">\n                         <input \n                            myAutofocus\n                            class=\"form-control\"\n                            type=\"text\"\n                            id=\"DNI\"\n                            name=\"DNI\"\n                            value=\"{{student_info.DNI}}\"\n                              [(ngModel)]=\"model.DNI\" name=\"DNI\"\n                                #DNI=\"ngModel\">\n                     </div>\n                </div>\n                \n                <div class=\"form-group\">\n                    <label for=\"BECA\" class=\"col-sm-2 control-label\" >BECA</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" id=\"BECA\"\n                            [(ngModel)]=\"model.BECA\" name=\"BECA\"\n                            #BECA=\"ngModel\" >\n                            <option *ngFor=\"let beca of becas\" [value]=\"beca\">{{beca}}</option>\n                        </select>\n                    </div>\n                </div>\n                \n                <div class=\"form-group\">\n                    <label for=\"Father\" class=\"col-sm-2 control-label\" >Father</label>\n                    <div class=\"col-sm-10\">\n                        <input \n                            class=\"form-control\"\n                            type=\"text\"\n                            id=\"father\"\n                            name=\"father\"\n                            value=\"{{student_info.father}}\"\n                            [(ngModel)]=\"model.father\" \n                            name=\"father\"\n                            #father=\"ngModel\">\n                    </div>\n                </div>\n                \n                <div class=\"form-group\">\n                    <label for=\"Intolerance\" class=\"col-sm-2 control-label\" >Intolerance</label>\n                    <div class=\"col-sm-10\">\n                        <input \n                            class=\"form-control\"\n                            type=\"text\"\n                            id=\"intolerencia\"\n                            name=\"intolerencia\"\n                            value=\"{{student_info.intolerencia}}\"\n                            [(ngModel)]=\"model.intolerencia\" \n                            name=\"intolerencia\"\n                            #intolerencia=\"ngModel\">\n                    </div>\n                </div>\n                 <div class=\"form-group\">\n                    <label for=\"phone2\" class=\"col-sm-2 control-label\" >Phone 2</label>\n                    <div class=\"col-sm-10\">\n                        <input \n                            class=\"form-control\"\n                            type=\"text\"\n                            id=\"phone2\"\n                            name=\"phone2\"\n                            value=\"{{student_info.phone2}}\"\n                            [(ngModel)]=\"model.phone2\" \n                            name=\"phone2\"\n                            #phone2=\"ngModel\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email2\" class=\"col-sm-2 control-label\" >Email 2</label>\n                    <div class=\"col-sm-10\">\n                        <input \n                            class=\"form-control\"\n                            type=\"text\"\n                            id=\"email2\"\n                            name=\"email2\"\n                            value=\"{{student_info.email2}}\"\n                            [(ngModel)]=\"model.email2\" \n                            name=\"email2\"\n                            #email2=\"ngModel\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"notes\" class=\"col-sm-2 control-label\" >Notes</label>\n                    <div class=\"col-sm-10\">\n                        \n                          <textarea \n                                    rows=\"15\" \n                                    cols=\"100\"\n                                    id=\"notes\"\n                                    name=\"notes\"\n                                    [(ngModel)]=\"model.notes\" \n                                    #notes=\"ngModel\"\n                                    >\n                                {{student_info.notes }}\n                            </textarea>        \n                        <!--<input -->\n                            <!--class=\"form-control\"-->\n                            <!--type=\"text\"-->\n                            <!--id=\"notes\"-->\n                            <!--name=\"notes\"-->\n                            <!--value=\"{{student_info.notes}}\"-->\n                            <!--[(ngModel)]=\"model.notes\" -->\n                            <!--name=\"notes\"-->\n                            <!--#notes=\"ngModel\">-->\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"col-sm-offset-2 col-sm-10\">\n                        <button type=\"submit\" data-target=\"#myModal\" class=\"btn btn-primary\" [disabled]=\"!studentForm.form.valid\">SAVE CHANGES</button>\n                    </div>\n                </div>\n            </form>    \n        </div>  \n          <div  id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n          <div class=\"modal-dialog\">\n        \n            <!-- Modal content-->\n            <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                <h4 class=\"modal-title\">Done</h4>\n              </div>\n              <div class=\"modal-body\">\n                <p>Student updated</p>\n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n              </div>\n            </div>\n          </div>  </div>\n    </div>"
        }), 
        __metadata('design:paramtypes', [router_1.Router, grid_service_1.GridPanelService, group_service_1.GroupService, balletDetails_service_1.BalletDetailsService, student_service_1.StudentService, router_1.ActivatedRoute, http_1.Http])
    ], StudentComponent);
    return StudentComponent;
}());
exports.StudentComponent = StudentComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFsbGV0L3N0dWRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFDckQsQ0FBQyxDQURtRTtBQUNwRSx1QkFBdUQsaUJBQWlCLENBQUMsQ0FBQTtBQUV6RSxxQkFBbUIsZUFBZSxDQUFDLENBQUE7QUFDbkMsOEJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFFN0MsNkJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFDakQsc0NBQW1DLHlCQUF5QixDQUFDLENBQUE7QUFHN0Qsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLGdDQUE2QixtQkFBbUIsQ0FBQyxDQUFBO0FBOEpqRDtJQUVJLDBCQUNZLE1BQWMsRUFBVSxZQUErQixFQUN2RCxhQUEyQixFQUFXLHFCQUEyQyxFQUNqRixlQUErQixFQUMvQixLQUFxQixFQUFVLEtBQVc7UUFIMUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtRQUN2RCxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFXLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7UUFDakYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQU10RCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBT2IsVUFBSyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUs7WUFDakIsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUF3QmpDLGNBQVMsR0FBRyxLQUFLLENBQUM7SUF2Q3NDLENBQUM7SUFpQnpELG1DQUFRLEdBQVI7UUFBQSxpQkFvQkM7UUFqQkcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ3hDLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUMzQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1SCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDLEVBQ0QsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUM5QixDQUFBO0lBQ1QsQ0FBQztJQUlELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3pDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsQ0FBQyxFQUNELFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsQ0FDOUIsQ0FBQTtRQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUF0Tkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLG10T0F3Skg7U0FDVixDQUFDOzt3QkFBQTtJQTRERix1QkFBQztBQUFELENBMURBLEFBMERDLElBQUE7QUExRFksd0JBQWdCLG1CQTBENUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2JhbGxldC9zdHVkZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXHJcbmltcG9ydCB7Um91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzLCBBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuLy8gaW1wb3J0IHtTdGVwU2VydmljZX0gZnJvbSBcIi4uL0VuZ2luZS9zdGVwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtIdHRwfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQge0dyb3VwU2VydmljZX0gZnJvbSBcIi4vZ3JvdXAuc2VydmljZVwiO1xyXG5pbXBvcnQge2ZvckVhY2h9IGZyb20gXCIuLi8uLi8uLi8uLi9wdWJsaWMvanMvdmVuZG9yL0Bhbmd1bGFyL3JvdXRlci9zcmMvdXRpbHMvY29sbGVjdGlvblwiO1xyXG5pbXBvcnQge0dyaWRQYW5lbFNlcnZpY2V9IGZyb20gXCIuLi9ncmlkLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtCYWxsZXREZXRhaWxzU2VydmljZX0gZnJvbSBcIi4vYmFsbGV0RGV0YWlscy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIEZvcm1Hcm91cH0gZnJvbSBcIi4uLy4uLy4uLy4uL3B1YmxpYy9qcy92ZW5kb3IvQGFuZ3VsYXIvZm9ybXMvc3JjL21vZGVsXCI7XHJcbmltcG9ydCB7VmFsaWRhdG9yc30gZnJvbSBcIi4uLy4uLy4uLy4uL3B1YmxpYy9qcy92ZW5kb3IvQGFuZ3VsYXIvZm9ybXMvc3JjL3ZhbGlkYXRvcnNcIjtcclxuaW1wb3J0IHtTdHVkZW50fSBmcm9tIFwiLi9zdHVkZW50XCI7XHJcbmltcG9ydCB7U3R1ZGVudFNlcnZpY2V9IGZyb20gXCIuL3N0dWRlbnQuc2VydmljZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZ3JvdXAnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgICpuZ0lmPVwiZGlzcGxheV9lZGl0XCI+IFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZyBwYW5lbC1oZWFkaW5nLWN1c3RvbVwiPlxyXG4gICAgICAgICAgICA8ZGl2ICBjbGFzcz1cInJvd1wiIGFsaWduPVwibGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5hdiBjbGFzcz1cImZvcm0tbmF2QXJyb3dcIiAqbmdJZj1cImRpc3BsYXlfZWRpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJy9ncmlkJ11cIiBbcXVlcnlQYXJhbXNdPVwieydncmlkX25hbWUnOiBjb3Vyc2VfdHlwZSwgJ21hc3Rlcic6IHN0YWdlLCAnYXBwX25hbWUnOidiYWxsZXQnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCI+PGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyaWFuZ2xlLWxlZnRcIiA+PC9pPkJBQ0s8L2J1dHRvbj48L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTBcIiBhbGlnbj1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj57e3N0dWRlbnRfaW5mby5wcm9maWxlWzFdLmZpcnN0bmFtZX19ICB7e3N0dWRlbnRfaW5mby5wcm9maWxlWzBdLm5vbX19PC9oMj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwhLS08aDI+e3tzdHVkZW50X2luZm8uYWdlfX0geWVhcnMgb2xkPC9oMj4tLT5cclxuICAgIFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybS1ob3Jpem9udGFsXCIgI3N0dWRlbnRGb3JtPVwibmdGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIiAgPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIkROSVwiIGNsYXNzPVwiY29sLXNtLTIgY29udHJvbC1sYWJlbFwiID5ETkk8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUF1dG9mb2N1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJETklcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cIkROSVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cInt7c3R1ZGVudF9pbmZvLkROSX19XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5ETklcIiBuYW1lPVwiRE5JXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjRE5JPVwibmdNb2RlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJCRUNBXCIgY2xhc3M9XCJjb2wtc20tMiBjb250cm9sLWxhYmVsXCIgPkJFQ0E8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiQkVDQVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLkJFQ0FcIiBuYW1lPVwiQkVDQVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjQkVDQT1cIm5nTW9kZWxcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBiZWNhIG9mIGJlY2FzXCIgW3ZhbHVlXT1cImJlY2FcIj57e2JlY2F9fTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJGYXRoZXJcIiBjbGFzcz1cImNvbC1zbS0yIGNvbnRyb2wtbGFiZWxcIiA+RmF0aGVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZmF0aGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmYXRoZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7e3N0dWRlbnRfaW5mby5mYXRoZXJ9fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLmZhdGhlclwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImZhdGhlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZmF0aGVyPVwibmdNb2RlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIkludG9sZXJhbmNlXCIgY2xhc3M9XCJjb2wtc20tMiBjb250cm9sLWxhYmVsXCIgPkludG9sZXJhbmNlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiaW50b2xlcmVuY2lhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJpbnRvbGVyZW5jaWFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7e3N0dWRlbnRfaW5mby5pbnRvbGVyZW5jaWF9fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLmludG9sZXJlbmNpYVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImludG9sZXJlbmNpYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjaW50b2xlcmVuY2lhPVwibmdNb2RlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGhvbmUyXCIgY2xhc3M9XCJjb2wtc20tMiBjb250cm9sLWxhYmVsXCIgPlBob25lIDI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJwaG9uZTJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInBob25lMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cInt7c3R1ZGVudF9pbmZvLnBob25lMn19XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwucGhvbmUyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGhvbmUyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICNwaG9uZTI9XCJuZ01vZGVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsMlwiIGNsYXNzPVwiY29sLXNtLTIgY29udHJvbC1sYWJlbFwiID5FbWFpbCAyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZW1haWwyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbDJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7e3N0dWRlbnRfaW5mby5lbWFpbDJ9fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLmVtYWlsMlwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImVtYWlsMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZW1haWwyPVwibmdNb2RlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJub3Rlc1wiIGNsYXNzPVwiY29sLXNtLTIgY29udHJvbC1sYWJlbFwiID5Ob3RlczwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9XCIxNVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPVwiMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJub3Rlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJub3Rlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibW9kZWwubm90ZXNcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI25vdGVzPVwibmdNb2RlbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e3N0dWRlbnRfaW5mby5ub3RlcyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZXh0YXJlYT4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGlucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLWNsYXNzPVwiZm9ybS1jb250cm9sXCItLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS10eXBlPVwidGV4dFwiLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0taWQ9XCJub3Rlc1wiLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tbmFtZT1cIm5vdGVzXCItLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS12YWx1ZT1cInt7c3R1ZGVudF9pbmZvLm5vdGVzfX1cIi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLVsobmdNb2RlbCldPVwibW9kZWwubm90ZXNcIiAtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1uYW1lPVwibm90ZXNcIi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSNub3Rlcz1cIm5nTW9kZWxcIj4tLT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLW9mZnNldC0yIGNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBkYXRhLXRhcmdldD1cIiNteU1vZGFsXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIXN0dWRlbnRGb3JtLmZvcm0udmFsaWRcIj5TQVZFIENIQU5HRVM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Zvcm0+ICAgIFxyXG4gICAgICAgIDwvZGl2PiAgXHJcbiAgICAgICAgICA8ZGl2ICBpZD1cIm15TW9kYWxcIiBjbGFzcz1cIm1vZGFsIGZhZGVcIiByb2xlPVwiZGlhbG9nXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIDwhLS0gTW9kYWwgY29udGVudC0tPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+RG9uZTwvaDQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxwPlN0dWRlbnQgdXBkYXRlZDwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj4gIDwvZGl2PlxyXG4gICAgPC9kaXY+YFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRDb21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX2dyaWRTZXJ2aWNlIDogR3JpZFBhbmVsU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9ncm91cFNlcnZpY2U6IEdyb3VwU2VydmljZSwgIHByaXZhdGUgX2JhbGxldERldGFpbHNTZXJ2aWNlOiBCYWxsZXREZXRhaWxzU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9zdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX2h0dHA6IEh0dHApe31cclxuXHJcbiAgICBwcml2YXRlIHN1YjogYW55O1xyXG5cclxuICAgIG9ial9pZDtcclxuICAgIHZhbHVlcztcclxuICAgIGRpc3BsYXlfZWRpdCA9IGZhbHNlO1xyXG4gICAgc3R1ZGVudCA9IHt9O1xyXG4gICAgc3R1ZGVudF9pbmZvO1xyXG4gICAgc3R1ZGVudEdyb3VwO1xyXG4gICAgbW9kZWw7XHJcbiAgICBjb3Vyc2VfdHlwZTtcclxuICAgIHN0YWdlO1xyXG5cclxuICAgIGJlY2FzID0gWycxNSUnLCAnMjAlJyxcclxuICAgICAgICAnMjUlJywgJzUwJScsICc3NSUnLCAnMTAwJSddO1xyXG5cclxuICAgIG5nT25Jbml0KClcclxuICAgIHtcclxuXHJcbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vYmpfaWQgPSBwYXJhbXNbJ3JlY29yZCddOyAvLyAoKykgY29udmVydHMgc3RyaW5nICdpZCcgdG8gYSBudW1iZXJcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2VfdHlwZSA9IHBhcmFtc1snY291cnNlX3R5cGUnXVxyXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gcGFyYW1zWydzdGFnZSddXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5vYmpfaWQpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fZ3JpZFNlcnZpY2UuZGF0YUdyaWQpO1xyXG4gICAgICAgIHRoaXMuX2JhbGxldERldGFpbHNTZXJ2aWNlLmdldERhdGFzKHRoaXMub2JqX2lkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50X2luZm8gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwgPSBuZXcgU3R1ZGVudChkYXRhLl9pZCxkYXRhLkROSSxkYXRhLkJFQ0EsIGRhdGEuZmF0aGVyLCBkYXRhLmludG9sZXJlbmNpYSwgZGF0YS5lbWFpbDIsIGRhdGEucGhvbmUyLCBkYXRhLm5vdGVzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlfZWRpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXR0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBvblN1Ym1pdCgpIHtcclxuICAgICAgICB0aGlzLl9zdHVkZW50U2VydmljZS51cGRhdGVTdHVkZW50KHRoaXMubW9kZWwpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI215TW9kYWxcIikubW9kYWwoJ3Nob3cnKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgdGhpcy5zdWJtaXR0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW9kZWwpXHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
