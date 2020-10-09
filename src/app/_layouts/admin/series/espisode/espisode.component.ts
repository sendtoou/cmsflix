import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormArray, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-espisode',
  templateUrl: './espisode.component.html',
  styleUrls: ['./espisode.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EspisodeComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EspisodeComponent),
      multi: true
    }
  ]
})
export class EspisodeComponent implements ControlValueAccessor, OnInit {
  // @Input() epForm: FormGroup;
  epForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.epForm = this.fb.group({
      // episodes: this.fb.array([this.newEpisode()]), //show at first stand
      episodes: this.fb.array([]),
    })
  }

  episodes(): FormArray {
    return this.epForm.get("episodes") as FormArray
  }

  newEpisode(): FormGroup {
    return this.fb.group({
      chapter: '',
      epTitle: '',
    })
  }

  addEpisode() {
    this.episodes().push(this.newEpisode());
  }

  removeEpisode(i: number) {
    this.episodes().removeAt(i);
  }
  

  onChange: any = () => {};
  onTouched: any = () => {};
  // public onTouched: () => void = () => { };

  writeValue(value: any): void {
    value && this.epForm.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.epForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.epForm.disable() : this.epForm.enable();
  }

  // validate(c: AbstractControl): ValidationErrors | null {
  //   return this.epForm.valid ? null : { invalidForm: { valid: false, message: "Address fields are invalid" } };
  // }
  validate(_: FormControl) {
    return this.epForm.valid ? null : { epInfo: { valid: false } };
  }

}
