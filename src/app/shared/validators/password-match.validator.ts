import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const passwordMatchValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    };
}