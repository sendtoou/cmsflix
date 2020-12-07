import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from 'src/app/_models/genre.model';
import { GenreService } from 'src/app/_services/genre.service';
import { AlertService } from 'src/app/_services/alert.service'

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.scss']
})
export class GenreCreateComponent implements OnInit {

  genreForm: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder, private genreService: GenreService, private alertService: AlertService) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm = () => {
    this.genreForm = this.fb.group({
      name: this.fb.group({
        en: ['', Validators.required],
        ch: ['', Validators.required],
        th: ['', Validators.required],
      })
    })
  }

  // invalidateForm = () => {
  //   Object.keys(this.userDetailsForm.controls).forEach(field => {
  //     const control = this.userDetailsForm.get(field);
  //     control.markAsTouched({ onlySelf: true });
  //   });
  // }

  submit(value: any) {
    
    // this.genreService.create(value).subscribe((genre: Genre) => {
    //   console.log(genre)
    // })
    // this.genreForm.reset();

    this.genreService.create(value).subscribe(
      data => {
        this.alertService.success('User added successfully', { keepAfterRouteChange: false, autoClose: true });
        console.log(data)
      }, error => {
        this.alertService.error(error);
      });
      
    



    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.genreForm.invalid) {
    //   return;
    // }
    // console.log(this.genreForm.value)
    // alert('SUCCESS!! :-)')
  }

//   private createUser() {
//     this.accountService.register(this.form.value)
//         .pipe(first())
//         .subscribe(
//             data => {
//                 this.alertService.success('User added successfully', { keepAfterRouteChange: true });
//                 this.router.navigate(['.', { relativeTo: this.route }]);
//             },
//             error => {
//                 this.alertService.error(error);
//                 this.loading = false;
//             });
// }

// private updateUser() {
//   this.accountService.update(this.id, this.form.value)
//       .pipe(first())
//       .subscribe(
//           data => {
//               this.alertService.success('Update successful', { keepAfterRouteChange: true });
//               this.router.navigate(['..', { relativeTo: this.route }]);
//           },
//           error => {
//               this.alertService.error(error);
//               this.loading = false;
//           });
// }



  // submit = () => {
  //   if (this.userDetailsForm.valid) {
  //     this.userModel = this.userDetailsForm.value;
  //     console.log(this.userModel);
  //   } else {
  //     this.invalidateForm();
  //   }
  // }

}
