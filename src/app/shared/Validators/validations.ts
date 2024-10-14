import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noSpacesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const value = control.value;
        const firstCharIsSpace = value.length > 0 && value[0] === ' ';
        return firstCharIsSpace ? { noLeadingSpace: true } : null;
    };
}
