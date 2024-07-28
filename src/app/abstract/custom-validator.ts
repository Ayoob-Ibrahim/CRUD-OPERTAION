import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[forbiddenEmailDomains][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: privateMailBlocker,
            multi: true,
        },
    ],
})
export class privateMailBlocker implements Validator {
    forbiddenEmailDomains: string[] = ['yahoo.com', 'gmail.com'];


    validate(control: AbstractControl) {
        if (!control.value) {
            return null;
        }
        const email = control.value as string;
        const domain = email.substring(email.lastIndexOf('@') + 1).toLowerCase();
        if (this.forbiddenEmailDomains.includes(domain)) {
            return { forbiddenDomain: true };
        }
        return null;
    }
}
