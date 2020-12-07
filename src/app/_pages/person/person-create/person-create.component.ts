import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(public fb: FormBuilder, private personService: PersonService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm = () => {
    this.form = this.fb.group({
      name: this.fb.group({
        en: ['', Validators.required],
        ch: ['', Validators.required],
        th: ['', Validators.required],
      })
    })
  }

  submit(value: any) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    // if (this.form.invalid) {
    //     return;
    // } 
    const msg = 'test message from variable'

    console.log(value)
    this.alertService.error(msg, { keepAfterRouteChange: false, autoClose: true });
    // this.personService.create(value).subscribe(
    //   data => {
    //     this.alertService.success('User added successfully', { keepAfterRouteChange: false, autoClose: true });
    //     console.log(data)
    //   }, error => {
    //     this.alertService.error(error);
    //   });
    // }
  }

   

}
