import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/*
export function ValidateDate(control: AbstractControl) {
  if (new Date(control.value) < new Date()) {
    return { invalidUrl: true };
  }
  return null;
}
*/
export function ValidateDate(date?:Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(new Date(control.value), ' ',date)
    /*const begindate = control.get('begindate') ? control.get('begindate').value : null;
    if (with_other && new Date(control.value) < new Date(begindate)) {
      return { invalidUrl: true };
    }
    if (new Date(control.value) < new Date()) {
      return { invalidUrl: true };
    }*/
    //@ts-ignore

    return new Date(control.value) < date ?  null : { invalidUrl: true };

  }
}
