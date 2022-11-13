import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const TelInput = ({ useFormMethods, name, required, schema }: any) => {
  let validPhoneNumber = false;
  const validatePhoneNumber = (
    inputNumber: string,
    country: any,
    isDirty: boolean,
    phoneLength: number
  ) => {
    if (isDirty) {
      if (
        inputNumber &&
        inputNumber?.replace(country.dialCode, "")?.trim() === ""
      ) {
        validPhoneNumber = false;
        return false;
      } else if (inputNumber.length < phoneLength) {
        validPhoneNumber = false;
        return false;
      }
      validPhoneNumber = true;
      return true;
    }
    validPhoneNumber = false;
    return false;
  };
  return (
    <Controller
      name={name}
      control={useFormMethods?.control}
      render={props => {
        return (
          <PhoneInput
            onChange={e => {
              useFormMethods.trigger();
              props.field.onChange(e);
            }}
            inputProps={{
              id: name,
              name,
              required,
              autoComplete: "none",
              "data-testid": "input-id",
            }}
            country={"fr"}
            value={props.field.value}
            isValid={(inputNumber, country: any, countries) => {
              const phoneLength = Math.ceil(
                (
                  countries.filter(
                    (val: any) => val.dialCode === country.dialCode
                  )[0] as any
                )?.format.length / 2
              );
              return validatePhoneNumber(
                inputNumber,
                country,
                props.formState.isDirty,
                phoneLength
              );
            }}
            specialLabel=""
          />
        );
      }}
      rules={{
        required,
        validate: () => validPhoneNumber || schema?.errorMessage?.validate,
      }}
    />
  );
};

export default TelInput;
