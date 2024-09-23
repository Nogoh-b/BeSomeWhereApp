import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(isLogged: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    /*if (!isLogged) {
      const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return emailPattern.test(email) ? null : { 'invalidEmail': { value: email } };
    }*/
    return null; // When isLogged is true, no validation is performed
  };
}
