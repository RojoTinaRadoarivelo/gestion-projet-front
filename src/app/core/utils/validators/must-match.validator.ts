import { ValidatorFn, AbstractControl } from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    // Si un des champs a une erreur déjà (ex: longueur minimale), ne pas appliquer le validateur mustMatch
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    // Vérifier si les valeurs correspondent
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  };
}
