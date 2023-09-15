import { DetailedHTMLProps } from "react";
import { Form as FormikForm } from "formik";

export const Form: React.FC<
  DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
> = ({ children }) => {
  return (
    <FormikForm
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        minHeight: 300,
        width: "100%",
      }}
    >
      {children}
    </FormikForm>
  );
};
