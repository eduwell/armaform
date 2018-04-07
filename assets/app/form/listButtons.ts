import {Component, Input, Output, EventEmitter} from '@angular/core'
import {FormService} from "../Engine/form.service";
import {StepService} from "../Engine/step.service";

@Component({
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
})

export class ListButtonsComponent {
    @Input() objStep;
    @Input() listOfElements;
    @Input() stepIdx;
    @Input() valueSelected; // Value to pass to the formService containing the selection

    @Output() change = new EventEmitter(); // Emitter to send back data to parent component

    currentList_es;
    currentList_fr;
    currentList_nl;
    currentList_en;
    listDefault;
    display = false;

    constructor( private _formService: FormService, private _stepService: StepService ) {}

    ngOnInit() {
        // console.log(this.objStep.conditions.length)
        // console.log(this.objStep.conditions)
        if (this.objStep.conditions.length > 0){
            let valueCondition = this.objStep.conditions[0][0].value;
            // console.log(this.objStep.conditions[0][0].value)
            let keyCondition = this.objStep.conditions[0][0].key;
            let tmpStepIdx = this.stepIdx - 1; // stepIdx temporaire
            /* LOOK FOR VALUE SELECTED INTO FORM SERVICE (**arraySteps**)
                LA CONDITION A TESTER ET JE LA COMPARE AVEC LA VALEUR DE LA STEP COURANTE
             */
//             console.log(this._formService.arraySteps.find(x => x[keyCondition] === valueCondition));
// console.log(valueCondition)
//             console.log(keyCondition)
            if (typeof this._formService.arraySteps.find(x => x[keyCondition] === valueCondition) != 'undefined'){
                // SI IL Y A UNE 2eme CONDITION
                if (typeof this.objStep.conditions[1] != 'undefined'){
                    let valueCondition2 = this.objStep.conditions[0][1].value;
                    let keyCondition2 = this.objStep.conditions[0][1].key;
                    // console.log(valueCondition2)
                    // console.log(keyCondition2)
                    console.log(this._formService.arraySteps.find(x => x[keyCondition2] === valueCondition2));
                    if (typeof this._formService.arraySteps.find(x => x[keyCondition2] === valueCondition2) != 'undefined'){
                        this.display = true;
                    }
                }
                else{
                    this.display = true;
                }

            }
        }
        else{
            this.display = true;
        }
        console.log(this.display)
        for (let datas of this.listOfElements){
            if (datas.name == this.objStep.name){
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
    onChooseVal($event){

        this.change.emit({
            valueName : this.objStep.configuration.form_value.name,
            valueSelected : $event.target.value,
            stepIdx : this.stepIdx
        })
    };
}
