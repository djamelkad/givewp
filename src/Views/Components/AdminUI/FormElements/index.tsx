import React from 'react';

import cx from 'classnames';
import ReactSelect from 'react-select';
import {Controller} from 'react-hook-form';
import {__} from '@wordpress/i18n';

import CurrencyInput from 'react-currency-input-field';

import styles from './style.module.scss';

/**
 *
 * @unreleased
 */

export type FormElementProps = {
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    id: string;
};

export const Form: React.FC<HTMLFormElement | FormElementProps> = ({children, id, onSubmit}) => (
    <form className={styles.form} id={id} onSubmit={onSubmit}>
        {children}
    </form>
);

/**
 *
 * @unreleased
 */

export type InputFieldProps = {
    name: string;
    type: string;
    placeholder: string;
    label: string;
};

export const TextInputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({name, type, placeholder, label, ...props}, ref) => {
        return (
            <FieldLabel label={label}>
                <div className={cx(styles.textFieldContainer)}>
                    <input ref={ref} name={name} type={type} placeholder={placeholder} {...props} />
                </div>
            </FieldLabel>
        );
    }
);

/**
 *
 * @unreleased
 */

export type CurrencyInputFieldProps = InputFieldProps & {
    currency: string;
    defaultValue: number;
    handleCurrencyChange: () => void;
};

export function CurrencyInputField({defaultValue, placeholder, handleCurrencyChange, currency, label}) {
    return (
        <FieldLabel label={label}>
            <div className={cx(styles.textFieldContainer, styles.currencyField, {})}>
                <CurrencyInput
                    name={'currency-input-field'}
                    allowNegativeValue={false}
                    onValueChange={(value, name) => {
                        handleCurrencyChange(value);
                    }}
                    intlConfig={{
                        locale: navigator.language,
                        currency: currency,
                    }}
                    decimalScale={2}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            </div>
        </FieldLabel>
    );
}

export type LabelProps = {
    label: string;
    children: React.ReactNode;
};

export function FieldLabel({label, children}) {
    return (
        <label>
            {label && <span className={styles.fieldLabel}>{label}</span>}
            {children}
        </label>
    );
}

/**
 *
 * @unreleased
 */

export type SelectDropdownFieldProps = {
    options: Array<{value: any; label: string}>;
    name: string;
    isSearchable: boolean;
    isClearable: boolean;
    placeholder: string;
    label: string;
    styleConfig?: object;
    isLoading?: boolean;
};

export function SelectDropdownField({
    options,
    styleConfig,
    name,
    isSearchable,
    isClearable,
    placeholder,
    isLoading,
    label,
}: SelectDropdownFieldProps) {
    return (
        <FieldLabel label={label}>
            <Controller
                name={name}
                render={({
                    field: {onChange, onBlur, value, name, ref},
                    fieldState: {invalid, isTouched, isDirty, error},
                    formState,
                }) => (
                    <ReactSelect
                        ref={ref}
                        name={name}
                        value={options?.find((option) => option.value === value)}
                        options={options}
                        onChange={(selectedOption) => onChange(selectedOption.value)}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        placeholder={isLoading ? __('Options are loading...') : placeholder ?? ''}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        styles={styleConfig}
                    />
                )}
            />
        </FieldLabel>
    );
}

/**
 *
 * @unreleased
 */

export type DisabledTextFieldProps = {
    name: string;
    type: string;
    placeholder: string;
    value: string;
    label: string;
};

export function DisabledTextField({name, type, placeholder, label, value}: DisabledTextFieldProps) {
    return (
        <FieldLabel label={label}>
            <div className={cx(styles.textFieldContainer)}>
                <input
                    className={styles.disabled}
                    disabled
                    name={name}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        </FieldLabel>
    );
}
