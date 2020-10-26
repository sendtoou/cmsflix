import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CelebService } from '../../_services/celeb.service'
import { Celeb } from '../../_models/celeb.model'

@Component({
  selector: 'app-celebrity',
  templateUrl: './celebrity.component.html',
  styleUrls: ['./celebrity.component.scss']
})
export class CelebrityComponent implements OnInit {

  // genderList = ['Male', 'Female']
  public genderList = [
    { "id": 1, "name": "Male" },
    { "id": 2, "name": "Female" }
  ]
  public gender: string; // = this.genderList[1].id;

  localUrl: any[];
  imageURL: string;
  celebForm: FormGroup;

  constructor(public fb: FormBuilder, private celebService: CelebService ) { }

  ngOnInit(): void {
    this.celebForm = this.fb.group({
      name: this.fb.group({
        th: [''],
        en: [''],
        ch: ['']
      }),
      // nameTh: [''],
      // descTh: [''],
      // avatar: [null], // image: new FormControl(null, [Validators.required, requiredFileType('png')])
      imgName: [''],
    })
  }

  // showPreviewImage(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.localUrl = event.target.result;
  //     }
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  showPreview(event: Event) {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
      const file = (event.target as HTMLInputElement).files[0]
      console.log(file);
      this.celebForm.patchValue({
        avatar: file.name
      });
      this.celebForm.get('avatar').updateValueAndValidity()

      // Image Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }

  submit(value: any) {
    console.log(this.celebForm.value)
    this.celebService.create(value).subscribe((celeb: Celeb) => {
      console.log(celeb)
    })
  }

}
