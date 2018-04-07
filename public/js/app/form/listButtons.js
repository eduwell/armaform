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
const form_service_1 = require("../Engine/form.service");
const step_service_1 = require("../Engine/step.service");
let ListButtonsComponent = class ListButtonsComponent {
    constructor(_formService, _stepService) {
        this._formService = _formService;
        this._stepService = _stepService;
        this.change = new core_1.EventEmitter();
        this.display = false;
    }
    ngOnInit() {
        if (this.objStep.conditions.length > 0) {
            let valueCondition = this.objStep.conditions[0][0].value;
            let keyCondition = this.objStep.conditions[0][0].key;
            let tmpStepIdx = this.stepIdx - 1;
            if (typeof this._formService.arraySteps.find(x => x[keyCondition] === valueCondition) != 'undefined') {
                if (typeof this.objStep.conditions[1] != 'undefined') {
                    let valueCondition2 = this.objStep.conditions[0][1].value;
                    let keyCondition2 = this.objStep.conditions[0][1].key;
                    console.log(this._formService.arraySteps.find(x => x[keyCondition2] === valueCondition2));
                    if (typeof this._formService.arraySteps.find(x => x[keyCondition2] === valueCondition2) != 'undefined') {
                        this.display = true;
                    }
                }
                else {
                    this.display = true;
                }
            }
        }
        else {
            this.display = true;
        }
        console.log(this.display);
        for (let datas of this.listOfElements) {
            if (datas.name == this.objStep.name) {
                if (datas.list_es.length > 0)
                    this.currentList_es = datas.list_es;
                else
                    this.currentList_es = datas.list;
                if (datas.list_nl.length > 0)
                    this.currentList_nl = datas.list_nl;
                else
                    this.currentList_nl = datas.list;
                if (datas.list_fr.length > 0)
                    this.currentList_fr = datas.list_fr;
                else
                    this.currentList_fr = datas.list;
                if (datas.list_en.length > 0)
                    this.currentList_en = datas.list_en;
                else
                    this.currentList_en = datas.list;
                break;
            }
        }
    }
    onChooseVal($event) {
        this.change.emit({
            valueName: this.objStep.configuration.form_value.name,
            valueSelected: $event.target.value,
            stepIdx: this.stepIdx
        });
    }
    ;
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListButtonsComponent.prototype, "objStep", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListButtonsComponent.prototype, "listOfElements", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListButtonsComponent.prototype, "stepIdx", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListButtonsComponent.prototype, "valueSelected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ListButtonsComponent.prototype, "change", void 0);
ListButtonsComponent = __decorate([
    core_1.Component({
        selector: 'list-buttons',
        template: `
     <div *ngIf="display">
         <div *ngIf="_stepService.language == 'en'" class="{{_stepService.template.panel_heading}}"><p class="text-uppercase">{{objStep.configuration.labelPanel_en}}</p> </div>
         <div *ngIf="_stepService.language == 'es'" class="{{_stepService.template.panel_heading}}"><p class="text-uppercase">{{objStep.configuration.labelPanel_es}}</p> </div>
         <div *ngIf="_stepService.language == 'fr'" class="{{_stepService.template.panel_heading}}"><p class="text-uppercase">{{objStep.configuration.labelPanel_fr}}</p> </div>
         <div *ngIf="_stepService.language == 'nl'" class="{{_stepService.template.panel_heading}}"><p class="text-uppercase">{{objStep.configuration.labelPanel_nl}}</p> </div>
         <div class="panel-body" >
            <div class="jumbotron" *ngIf="_stepService.language == 'en' && objStep.configuration.header_note_en && objStep.configuration.header_note_en != ''">
                <p [innerHTML] = "objStep.configuration.header_note_en"></p>
            </div>
            <div class="jumbotron" *ngIf="_stepService.language == 'fr' && objStep.configuration.header_note_fr && objStep.configuration.header_note_fr != ''">
                <p [innerHTML] = "objStep.configuration.header_note_fr"></p>
            </div>
            <div class="jumbotron" *ngIf="_stepService.language == 'es' && objStep.configuration.header_note_es && objStep.configuration.header_note_es != ''">
                <p [innerHTML] = "objStep.configuration.header_note_es"></p>
            </div>
            <ul class="items"  *ngIf="_stepService.language == 'fr'" >
                <li  *ngFor="let valeurList of currentList_fr">
                     <!--data-toggle="tooltip" title=" "-->
                    <button *ngIf="valueSelected != valeurList" 
                        class="{{ _stepService.template.list_btn}}"
                        type="button" 
                        (click)="onChooseVal($event)"
                        value="{{valeurList}}">{{valeurList}}
                    </button>
                    <button *ngIf="valueSelected == valeurList" 
                        data-toggle="tooltip" title=" text"
                        class="{{_stepService.template.list_btn}}" 
                        type="button" 
                        (click)="onChooseVal($event)"
                        value="{{valeurList}}">{{valeurList}}
                    </button>
                </li>
            </ul>
            <ul class="items" *ngIf="_stepService.language == 'es'"  >
                <li  *ngFor="let valeurList of currentList_es">
                    <button *ngIf="valueSelected != valeurList" 
                        class="{{ _stepService.template.list_btn}}"
                        type="button" 
                        (click)="onChooseVal($event)"
                        value="{{valeurList}}">{{valeurList}}
                    </button>
                    <button *ngIf="valueSelected == valeurList" 
                        data-toggle="tooltip" title=" text"
                        class="{{_stepService.template.list_btn}}" 
                        type="button" 
                        (click)="onChooseVal($event)"
                        value="{{valeurList}}">{{valeurList}}
                    </button>
                </li>
            </ul>
            <ul class="items" *ngIf="_stepService.language == 'en'"  >
                <li  *ngFor="let valeurList of currentList_en">
                    <button *ngIf="valueSelected != valeurList" 
                        class="{{ _stepService.template.list_btn}}"
                        type="button" 
                        (click)="onChooseVal($event)"
                        value="{{valeurList}}">{{valeurList}}
                    </button>
                    <button *ngIf="valueSelected == valeurList" 
                        data-toggle="tooltip" title=" text"
                        class="{{_stepService.template.list_btn}}" 
                        type="button" 
                        (click)="onChooseVal($event)"
                        value="{{valeurList}}">{{valeurList}}
                    </button>
                </li>
            </ul>
            <ul class="items" *ngIf="_stepService.language == 'nl'"  >
                <li  *ngFor="let valeurList of currentList_nl">
                    <button *ngIf="valueSelected != valeurList" 
                        class="{{ _stepService.template.list_btn}}"
                        type="button" 
                        (click)="onChooseVal($event)"
                        value="{{valeurList}}">{{valeurList}}
                    </button>
                    <button *ngIf="valueSelected == valeurList" 
                        data-toggle="tooltip" title=" text"
                        class="{{_stepService.template.list_btn}}" 
                        type="button" 
                        (click)="onChooseVal($event)"
                        value="{{valeurList}}">{{valeurList}}
                    </button>
                </li>
            </ul>
            </div>
            <div class="{{_stepService.template.panel_heading}}" *ngIf="_stepService.language == 'en' && objStep.configuration.foot_note_en && objStep.configuration.foot_note_en != ''" [innerHTML] = "objStep.configuration.foot_note_en"></div> 
            <div class="{{_stepService.template.panel_heading}}" *ngIf="_stepService.language == 'es' && objStep.configuration.foot_note_es && objStep.configuration.foot_note_es != ''" [innerHTML] = "objStep.configuration.foot_note_es"></div>
            <div class="{{_stepService.template.panel_heading}}" *ngIf="_stepService.language == 'fr' && objStep.configuration.foot_note_fr && objStep.configuration.foot_note_fr != ''" [innerHTML] = "objStep.configuration.foot_note_fr"></div>
            <div class="{{_stepService.template.panel_heading}}" *ngIf="_stepService.language == 'nl' && objStep.configuration.foot_note_fr && objStep.configuration.foot_note_nl != ''" [innerHTML] = "objStep.configuration.foot_note_nl"></div>
         </div>
         
`
    }),
    __metadata("design:paramtypes", [form_service_1.FormService, step_service_1.StepService])
], ListButtonsComponent);
exports.ListButtonsComponent = ListButtonsComponent;

//# sourceMappingURL=data:application/json;base64,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RUFBRTs7cURBQVM7QUFDUjtJQUFSLFlBQUssRUFBRTs7NERBQWdCO0FBQ2Y7SUFBUixZQUFLLEVBQUU7O3FEQUFTO0FBQ1I7SUFBUixZQUFLLEVBQUU7OzJEQUFlO0FBRWI7SUFBVCxhQUFNLEVBQUU7O29EQUE2QjtBQU43QixvQkFBb0I7SUFqR2hDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNEZiO0tBQ0EsQ0FBQztxQ0FpQnFDLDBCQUFXLEVBQXdCLDBCQUFXO0dBZnhFLG9CQUFvQixDQXNGaEM7QUF0Rlksb0RBQW9CIiwiZmlsZSI6ImZvcm0vbGlzdEJ1dHRvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQge0Zvcm1TZXJ2aWNlfSBmcm9tIFwiLi4vRW5naW5lL2Zvcm0uc2VydmljZVwiO1xyXG5pbXBvcnQge1N0ZXBTZXJ2aWNlfSBmcm9tIFwiLi4vRW5naW5lL3N0ZXAuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xpc3QtYnV0dG9ucycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgIDxkaXYgKm5nSWY9XCJkaXNwbGF5XCI+XHJcbiAgICAgICAgIDxkaXYgKm5nSWY9XCJfc3RlcFNlcnZpY2UubGFuZ3VhZ2UgPT0gJ2VuJ1wiIGNsYXNzPVwie3tfc3RlcFNlcnZpY2UudGVtcGxhdGUucGFuZWxfaGVhZGluZ319XCI+PHAgY2xhc3M9XCJ0ZXh0LXVwcGVyY2FzZVwiPnt7b2JqU3RlcC5jb25maWd1cmF0aW9uLmxhYmVsUGFuZWxfZW59fTwvcD4gPC9kaXY+XHJcbiAgICAgICAgIDxkaXYgKm5nSWY9XCJfc3RlcFNlcnZpY2UubGFuZ3VhZ2UgPT0gJ2VzJ1wiIGNsYXNzPVwie3tfc3RlcFNlcnZpY2UudGVtcGxhdGUucGFuZWxfaGVhZGluZ319XCI+PHAgY2xhc3M9XCJ0ZXh0LXVwcGVyY2FzZVwiPnt7b2JqU3RlcC5jb25maWd1cmF0aW9uLmxhYmVsUGFuZWxfZXN9fTwvcD4gPC9kaXY+XHJcbiAgICAgICAgIDxkaXYgKm5nSWY9XCJfc3RlcFNlcnZpY2UubGFuZ3VhZ2UgPT0gJ2ZyJ1wiIGNsYXNzPVwie3tfc3RlcFNlcnZpY2UudGVtcGxhdGUucGFuZWxfaGVhZGluZ319XCI+PHAgY2xhc3M9XCJ0ZXh0LXVwcGVyY2FzZVwiPnt7b2JqU3RlcC5jb25maWd1cmF0aW9uLmxhYmVsUGFuZWxfZnJ9fTwvcD4gPC9kaXY+XHJcbiAgICAgICAgIDxkaXYgKm5nSWY9XCJfc3RlcFNlcnZpY2UubGFuZ3VhZ2UgPT0gJ25sJ1wiIGNsYXNzPVwie3tfc3RlcFNlcnZpY2UudGVtcGxhdGUucGFuZWxfaGVhZGluZ319XCI+PHAgY2xhc3M9XCJ0ZXh0LXVwcGVyY2FzZVwiPnt7b2JqU3RlcC5jb25maWd1cmF0aW9uLmxhYmVsUGFuZWxfbmx9fTwvcD4gPC9kaXY+XHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCIgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwianVtYm90cm9uXCIgKm5nSWY9XCJfc3RlcFNlcnZpY2UubGFuZ3VhZ2UgPT0gJ2VuJyAmJiBvYmpTdGVwLmNvbmZpZ3VyYXRpb24uaGVhZGVyX25vdGVfZW4gJiYgb2JqU3RlcC5jb25maWd1cmF0aW9uLmhlYWRlcl9ub3RlX2VuICE9ICcnXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBbaW5uZXJIVE1MXSA9IFwib2JqU3RlcC5jb25maWd1cmF0aW9uLmhlYWRlcl9ub3RlX2VuXCI+PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImp1bWJvdHJvblwiICpuZ0lmPVwiX3N0ZXBTZXJ2aWNlLmxhbmd1YWdlID09ICdmcicgJiYgb2JqU3RlcC5jb25maWd1cmF0aW9uLmhlYWRlcl9ub3RlX2ZyICYmIG9ialN0ZXAuY29uZmlndXJhdGlvbi5oZWFkZXJfbm90ZV9mciAhPSAnJ1wiPlxyXG4gICAgICAgICAgICAgICAgPHAgW2lubmVySFRNTF0gPSBcIm9ialN0ZXAuY29uZmlndXJhdGlvbi5oZWFkZXJfbm90ZV9mclwiPjwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqdW1ib3Ryb25cIiAqbmdJZj1cIl9zdGVwU2VydmljZS5sYW5ndWFnZSA9PSAnZXMnICYmIG9ialN0ZXAuY29uZmlndXJhdGlvbi5oZWFkZXJfbm90ZV9lcyAmJiBvYmpTdGVwLmNvbmZpZ3VyYXRpb24uaGVhZGVyX25vdGVfZXMgIT0gJydcIj5cclxuICAgICAgICAgICAgICAgIDxwIFtpbm5lckhUTUxdID0gXCJvYmpTdGVwLmNvbmZpZ3VyYXRpb24uaGVhZGVyX25vdGVfZXNcIj48L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJpdGVtc1wiICAqbmdJZj1cIl9zdGVwU2VydmljZS5sYW5ndWFnZSA9PSAnZnInXCIgPlxyXG4gICAgICAgICAgICAgICAgPGxpICAqbmdGb3I9XCJsZXQgdmFsZXVyTGlzdCBvZiBjdXJyZW50TGlzdF9mclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8IS0tZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCIgXCItLT5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwidmFsdWVTZWxlY3RlZCAhPSB2YWxldXJMaXN0XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwie3sgX3N0ZXBTZXJ2aWNlLnRlbXBsYXRlLmxpc3RfYnRufX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNob29zZVZhbCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7e3ZhbGV1ckxpc3R9fVwiPnt7dmFsZXVyTGlzdH19XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInZhbHVlU2VsZWN0ZWQgPT0gdmFsZXVyTGlzdFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIiB0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ7e19zdGVwU2VydmljZS50ZW1wbGF0ZS5saXN0X2J0bn19XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2hvb3NlVmFsKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cInt7dmFsZXVyTGlzdH19XCI+e3t2YWxldXJMaXN0fX1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cIml0ZW1zXCIgKm5nSWY9XCJfc3RlcFNlcnZpY2UubGFuZ3VhZ2UgPT0gJ2VzJ1wiICA+XHJcbiAgICAgICAgICAgICAgICA8bGkgICpuZ0Zvcj1cImxldCB2YWxldXJMaXN0IG9mIGN1cnJlbnRMaXN0X2VzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInZhbHVlU2VsZWN0ZWQgIT0gdmFsZXVyTGlzdFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInt7IF9zdGVwU2VydmljZS50ZW1wbGF0ZS5saXN0X2J0bn19XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DaG9vc2VWYWwoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwie3t2YWxldXJMaXN0fX1cIj57e3ZhbGV1ckxpc3R9fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJ2YWx1ZVNlbGVjdGVkID09IHZhbGV1ckxpc3RcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCIgdGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwie3tfc3RlcFNlcnZpY2UudGVtcGxhdGUubGlzdF9idG59fVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNob29zZVZhbCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7e3ZhbGV1ckxpc3R9fVwiPnt7dmFsZXVyTGlzdH19XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJpdGVtc1wiICpuZ0lmPVwiX3N0ZXBTZXJ2aWNlLmxhbmd1YWdlID09ICdlbidcIiAgPlxyXG4gICAgICAgICAgICAgICAgPGxpICAqbmdGb3I9XCJsZXQgdmFsZXVyTGlzdCBvZiBjdXJyZW50TGlzdF9lblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJ2YWx1ZVNlbGVjdGVkICE9IHZhbGV1ckxpc3RcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ7eyBfc3RlcFNlcnZpY2UudGVtcGxhdGUubGlzdF9idG59fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2hvb3NlVmFsKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cInt7dmFsZXVyTGlzdH19XCI+e3t2YWxldXJMaXN0fX1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwidmFsdWVTZWxlY3RlZCA9PSB2YWxldXJMaXN0XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiIHRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInt7X3N0ZXBTZXJ2aWNlLnRlbXBsYXRlLmxpc3RfYnRufX1cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DaG9vc2VWYWwoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwie3t2YWxldXJMaXN0fX1cIj57e3ZhbGV1ckxpc3R9fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPHVsIGNsYXNzPVwiaXRlbXNcIiAqbmdJZj1cIl9zdGVwU2VydmljZS5sYW5ndWFnZSA9PSAnbmwnXCIgID5cclxuICAgICAgICAgICAgICAgIDxsaSAgKm5nRm9yPVwibGV0IHZhbGV1ckxpc3Qgb2YgY3VycmVudExpc3RfbmxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwidmFsdWVTZWxlY3RlZCAhPSB2YWxldXJMaXN0XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwie3sgX3N0ZXBTZXJ2aWNlLnRlbXBsYXRlLmxpc3RfYnRufX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNob29zZVZhbCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7e3ZhbGV1ckxpc3R9fVwiPnt7dmFsZXVyTGlzdH19XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInZhbHVlU2VsZWN0ZWQgPT0gdmFsZXVyTGlzdFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIiB0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ7e19zdGVwU2VydmljZS50ZW1wbGF0ZS5saXN0X2J0bn19XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2hvb3NlVmFsKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cInt7dmFsZXVyTGlzdH19XCI+e3t2YWxldXJMaXN0fX1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwie3tfc3RlcFNlcnZpY2UudGVtcGxhdGUucGFuZWxfaGVhZGluZ319XCIgKm5nSWY9XCJfc3RlcFNlcnZpY2UubGFuZ3VhZ2UgPT0gJ2VuJyAmJiBvYmpTdGVwLmNvbmZpZ3VyYXRpb24uZm9vdF9ub3RlX2VuICYmIG9ialN0ZXAuY29uZmlndXJhdGlvbi5mb290X25vdGVfZW4gIT0gJydcIiBbaW5uZXJIVE1MXSA9IFwib2JqU3RlcC5jb25maWd1cmF0aW9uLmZvb3Rfbm90ZV9lblwiPjwvZGl2PiBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInt7X3N0ZXBTZXJ2aWNlLnRlbXBsYXRlLnBhbmVsX2hlYWRpbmd9fVwiICpuZ0lmPVwiX3N0ZXBTZXJ2aWNlLmxhbmd1YWdlID09ICdlcycgJiYgb2JqU3RlcC5jb25maWd1cmF0aW9uLmZvb3Rfbm90ZV9lcyAmJiBvYmpTdGVwLmNvbmZpZ3VyYXRpb24uZm9vdF9ub3RlX2VzICE9ICcnXCIgW2lubmVySFRNTF0gPSBcIm9ialN0ZXAuY29uZmlndXJhdGlvbi5mb290X25vdGVfZXNcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInt7X3N0ZXBTZXJ2aWNlLnRlbXBsYXRlLnBhbmVsX2hlYWRpbmd9fVwiICpuZ0lmPVwiX3N0ZXBTZXJ2aWNlLmxhbmd1YWdlID09ICdmcicgJiYgb2JqU3RlcC5jb25maWd1cmF0aW9uLmZvb3Rfbm90ZV9mciAmJiBvYmpTdGVwLmNvbmZpZ3VyYXRpb24uZm9vdF9ub3RlX2ZyICE9ICcnXCIgW2lubmVySFRNTF0gPSBcIm9ialN0ZXAuY29uZmlndXJhdGlvbi5mb290X25vdGVfZnJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInt7X3N0ZXBTZXJ2aWNlLnRlbXBsYXRlLnBhbmVsX2hlYWRpbmd9fVwiICpuZ0lmPVwiX3N0ZXBTZXJ2aWNlLmxhbmd1YWdlID09ICdubCcgJiYgb2JqU3RlcC5jb25maWd1cmF0aW9uLmZvb3Rfbm90ZV9mciAmJiBvYmpTdGVwLmNvbmZpZ3VyYXRpb24uZm9vdF9ub3RlX25sICE9ICcnXCIgW2lubmVySFRNTF0gPSBcIm9ialN0ZXAuY29uZmlndXJhdGlvbi5mb290X25vdGVfbmxcIj48L2Rpdj5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIFxyXG5gXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTGlzdEJ1dHRvbnNDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgb2JqU3RlcDtcclxuICAgIEBJbnB1dCgpIGxpc3RPZkVsZW1lbnRzO1xyXG4gICAgQElucHV0KCkgc3RlcElkeDtcclxuICAgIEBJbnB1dCgpIHZhbHVlU2VsZWN0ZWQ7IC8vIFZhbHVlIHRvIHBhc3MgdG8gdGhlIGZvcm1TZXJ2aWNlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvblxyXG5cclxuICAgIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vIEVtaXR0ZXIgdG8gc2VuZCBiYWNrIGRhdGEgdG8gcGFyZW50IGNvbXBvbmVudFxyXG5cclxuICAgIGN1cnJlbnRMaXN0X2VzO1xyXG4gICAgY3VycmVudExpc3RfZnI7XHJcbiAgICBjdXJyZW50TGlzdF9ubDtcclxuICAgIGN1cnJlbnRMaXN0X2VuO1xyXG4gICAgbGlzdERlZmF1bHQ7XHJcbiAgICBkaXNwbGF5ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX2Zvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSwgcHJpdmF0ZSBfc3RlcFNlcnZpY2U6IFN0ZXBTZXJ2aWNlICkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm9ialN0ZXAuY29uZGl0aW9ucy5sZW5ndGgpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vYmpTdGVwLmNvbmRpdGlvbnMpXHJcbiAgICAgICAgaWYgKHRoaXMub2JqU3RlcC5jb25kaXRpb25zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVDb25kaXRpb24gPSB0aGlzLm9ialN0ZXAuY29uZGl0aW9uc1swXVswXS52YWx1ZTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vYmpTdGVwLmNvbmRpdGlvbnNbMF1bMF0udmFsdWUpXHJcbiAgICAgICAgICAgIGxldCBrZXlDb25kaXRpb24gPSB0aGlzLm9ialN0ZXAuY29uZGl0aW9uc1swXVswXS5rZXk7XHJcbiAgICAgICAgICAgIGxldCB0bXBTdGVwSWR4ID0gdGhpcy5zdGVwSWR4IC0gMTsgLy8gc3RlcElkeCB0ZW1wb3JhaXJlXHJcbiAgICAgICAgICAgIC8qIExPT0sgRk9SIFZBTFVFIFNFTEVDVEVEIElOVE8gRk9STSBTRVJWSUNFICgqKmFycmF5U3RlcHMqKilcclxuICAgICAgICAgICAgICAgIExBIENPTkRJVElPTiBBIFRFU1RFUiBFVCBKRSBMQSBDT01QQVJFIEFWRUMgTEEgVkFMRVVSIERFIExBIFNURVAgQ09VUkFOVEVcclxuICAgICAgICAgICAgICovXHJcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2Zvcm1TZXJ2aWNlLmFycmF5U3RlcHMuZmluZCh4ID0+IHhba2V5Q29uZGl0aW9uXSA9PT0gdmFsdWVDb25kaXRpb24pKTtcclxuLy8gY29uc29sZS5sb2codmFsdWVDb25kaXRpb24pXHJcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleUNvbmRpdGlvbilcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9mb3JtU2VydmljZS5hcnJheVN0ZXBzLmZpbmQoeCA9PiB4W2tleUNvbmRpdGlvbl0gPT09IHZhbHVlQ29uZGl0aW9uKSAhPSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICAgICAvLyBTSSBJTCBZIEEgVU5FIDJlbWUgQ09ORElUSU9OXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub2JqU3RlcC5jb25kaXRpb25zWzFdICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVDb25kaXRpb24yID0gdGhpcy5vYmpTdGVwLmNvbmRpdGlvbnNbMF1bMV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleUNvbmRpdGlvbjIgPSB0aGlzLm9ialN0ZXAuY29uZGl0aW9uc1swXVsxXS5rZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWVDb25kaXRpb24yKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtleUNvbmRpdGlvbjIpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fZm9ybVNlcnZpY2UuYXJyYXlTdGVwcy5maW5kKHggPT4geFtrZXlDb25kaXRpb24yXSA9PT0gdmFsdWVDb25kaXRpb24yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9mb3JtU2VydmljZS5hcnJheVN0ZXBzLmZpbmQoeCA9PiB4W2tleUNvbmRpdGlvbjJdID09PSB2YWx1ZUNvbmRpdGlvbjIpICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGlzcGxheSlcclxuICAgICAgICBmb3IgKGxldCBkYXRhcyBvZiB0aGlzLmxpc3RPZkVsZW1lbnRzKXtcclxuICAgICAgICAgICAgaWYgKGRhdGFzLm5hbWUgPT0gdGhpcy5vYmpTdGVwLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzLmxpc3RfZXMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMaXN0X2VzID0gZGF0YXMubGlzdF9lcztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMaXN0X2VzID0gZGF0YXMubGlzdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YXMubGlzdF9ubC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExpc3RfbmwgPSBkYXRhcy5saXN0X25sO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExpc3RfbmwgPSBkYXRhcy5saXN0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhcy5saXN0X2ZyLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGlzdF9mciA9IGRhdGFzLmxpc3RfZnI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGlzdF9mciA9IGRhdGFzLmxpc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzLmxpc3RfZW4ubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMaXN0X2VuID0gZGF0YXMubGlzdF9lbjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMaXN0X2VuID0gZGF0YXMubGlzdDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25DaG9vc2VWYWwoJGV2ZW50KXtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgIHZhbHVlTmFtZSA6IHRoaXMub2JqU3RlcC5jb25maWd1cmF0aW9uLmZvcm1fdmFsdWUubmFtZSxcclxuICAgICAgICAgICAgdmFsdWVTZWxlY3RlZCA6ICRldmVudC50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIHN0ZXBJZHggOiB0aGlzLnN0ZXBJZHhcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
