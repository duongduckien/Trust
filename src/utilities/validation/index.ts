// Languages
import { strings } from '../../utilities/i18n';

export class Validation {

    public loginValidations: any;

    constructor() {
        this.setLoginRules();
    }

    /**
     * Function set rules for login page
     */
    private setLoginRules() {
        this.loginValidations = {
            email: {
                required: {
                    message: strings('EMAIL_REQUIRED'),
                },
                format: {
                    pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: strings('EMAIL_FORMAT'),
                }
            },
            password: {
                required: {
                    message: strings('PASSWORD_REQUIRED'),
                },
                length: {

                }
            }
        }
    }

    /**
     * Function validate fields
     * @param  {any} nameField
     * @param  {any} value
     */
    validate(rules: any, nameField: any, value: any, compareValue?: any) {

        let result = {
            isErr: false,
            msgErr: ''
        }

        if (rules.hasOwnProperty(nameField)) {

            const v = rules[nameField];

            if (v.hasOwnProperty('required') && (value == '' || value === null)) {

                result = { isErr: true, msgErr: v.required.message };
                return result;

            } else if (v.hasOwnProperty('format') && !v.format.pattern.test(value)) {

                result = { isErr: true, msgErr: v.format.message };
                return result;

            } else if (v.hasOwnProperty('number') && !v.number.pattern.test(value)) {

                result = { isErr: true, msgErr: v.number.message };
                return result;

            } else if (v.hasOwnProperty('upperCase') && !v.upperCase.pattern.test(value)) {

                result = { isErr: true, msgErr: v.upperCase.message };
                return result;

            } else if (v.hasOwnProperty('lowerCase') && !v.lowerCase.pattern.test(value)) {

                result = { isErr: true, msgErr: v.lowerCase.message };
                return result;

            } else if (v.hasOwnProperty('minLength') && value.length < v.minLength.value) {

                result = { isErr: true, msgErr: v.minLength.message };
                return result;

            } else if (v.hasOwnProperty('maxLength') && value.length > v.maxLength.value) {

                result = { isErr: true, msgErr: v.maxLength.message };
                return result;

            } else if (v.hasOwnProperty('match') && value !== compareValue) {

                result = { isErr: true, msgErr: v.match.message };
                return result;

            } else {
                result.isErr = false;
                return result;
            }

        } else {
            result.isErr = false;
            return result;
        }

    }

}
