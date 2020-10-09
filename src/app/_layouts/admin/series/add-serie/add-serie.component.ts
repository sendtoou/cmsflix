import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { SerieService } from '../../../../_services/serie.service';
import { merge, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.component.html',
  styleUrls: ['./add-serie.component.scss']
})
export class AddSerieComponent implements OnInit {
  // public addSerieForm: FormGroup = new FormGroup({
  //   serieInfo: new FormControl(""),
  //   serieEp: new FormControl(""),
  // })
  addSerieForm: FormGroup;
  results
  constructor(private fb: FormBuilder, private serieService: SerieService) { }

  ngOnInit(): void {
    this.addSerieForm = this.fb.group({
      serieInfo: [],
      serieEp: []
      // globalName: [''],
      // title: this.fb.group({
      //   th: [''],
      //   en: [''],
      //   ch: ['']
      // }),
      // episodes: this.fb.group({
      //   chapter: [''],
      //   epTitle: [''],
      // }),
      // episodes: this.fb.array([]),

    });
  }

  //   this.myForm = this.formBuilder.group({...},
  //     { validator: [ MyValidatorClass.myCrossFieldValidator1 , 
  //                    MyValidatorClass.myCrossFieldValidator12 ,
  //                    MyValidatorClass.myCrossFieldValidator3
  //                  ] 
  // });

  // { validator: Validators.compose([
  //   MyValidatorClass.myCrossFieldValidator1, 
  //   MyValidatorClass.myCrossFieldValidator2
  // ])} 



  submit() {


    // var first = { "A": "B" };
    // var second = { "C": "D" };

    // var third = angular.extend(first, second);

    // console.log(third);


    // this.results = this.addSerieForm.value.serieEp, this.addSerieForm.value.serieInfo
    // console.log("Info form:", this.addSerieForm.value.serieInfo.globalName);
    // console.log("form:", this.addSerieForm.value.serieInfo.title)
    // console.log("detail of add serieInfo form:", this.addSerieForm.value.serieInfo.globalName);
    // console.log("detail of add serieEp form:", this.addSerieForm.value.serieEp);
    // console.log("detail of form:", this.results);

    // console.log("episodes:", this.addSerieForm.value.serieEp.espisodes);
    // console.log("Info form:", this.addSerieForm.value.serieInfo.title);



    const response = this.addSerieForm.value.serieEp
    const item = this.addSerieForm.value.serieInfo
    const newItem = { ...item, ...response }; // or { ...response } if you want to clone response as well
    console.log(newItem );


    this.serieService.create(newItem).subscribe(
      (res) => {
        console.log('resCreate:', res)
      }, (error) => {
        console.log(error);
      }
    )
  }

}
