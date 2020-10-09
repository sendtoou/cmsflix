import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-serie-info',
  templateUrl: './serie-info.component.html',
  styleUrls: ['./serie-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SerieInfoComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SerieInfoComponent),
      multi: true
    }
  ]
})
export class SerieInfoComponent implements OnInit, ControlValueAccessor, OnDestroy {
  // public basicInfoForm: FormGroup = new FormGroup(
  //   {
  //     globalName: new FormControl(""),
  //     title: new FormControl(""),
  //   });
  serieInfoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.serieInfoForm = this.fb.group({
      globalName: ['', Validators.required],
      title: this.fb.group({
        th: [''],
        en: [''],
        ch: ['']
      })
    })
  }

  onChange: any = () => { };
  onTouched: any = () => { };
  // public onTouched: () => void = () => {};

  writeValue(value: any): void {
    // if (value) {
    //   this.value = value;
    // }

    // if (value === null) {
    //   this.form.reset();
    // }
    value && this.serieInfoForm.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.serieInfoForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.serieInfoForm.disable() : this.serieInfoForm.enable();
  }


  ngOnDestroy() {
    // this.subscriptions.forEach(s => s.unsubscribe());
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.serieInfoForm.valid ? null : { serieInfo: { valid: false } };
  }
  // validate(c: AbstractControl): ValidationErrors | null {
  //   // console.log("Basic Info validation", c);
  //   return this.basicInfoForm.valid ? null : { invalidForm: { valid: false, message: "basicInfoForm fields are invalid" } };
  // }
}
