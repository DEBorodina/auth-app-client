import { Formik, FormikProps } from "formik";
import { Layout } from "../components/Layout";
import { Box, Link, TextField } from "@mui/material";
import { Form } from "../components/Form";
import * as Yup from "yup";
import { ErrorText } from "../components/ErrorText";
import { AuthService } from "../sevices/AuthService";
import { useState } from "react";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";
import { ICredentials } from "../types";
import { InfoText } from "../components/InfoText";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 symbols"),
});

export const LogInForm: React.FC<{
  needsActivation: (status: true) => void;
}> = ({ needsActivation }) => {
  const [submittingErrors, setSubmittingErrors] = useState("");

  const handleSubmit = async ({ email, password }: ICredentials) => {
    try {
      await AuthService.login(email, password);
      needsActivation(true);
    } catch (e) {
      const message = (e as AxiosError<{ message: string }>)?.response?.data
        ?.message;
      setSubmittingErrors(message || "");
    }
  };

  return (
    <Layout>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          isValid,
          dirty,
          isSubmitting,
        }: FormikProps<ICredentials>) => (
          <Form onSubmit={handleSubmit}>
            <ErrorText>{submittingErrors}</ErrorText>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              onChange={(e) => {
                setSubmittingErrors("");
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.email}
              fullWidth
            />
            <ErrorText>{touched.email && errors.email}</ErrorText>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={(e) => {
                setSubmittingErrors("");
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.password}
              fullWidth
            />
            <ErrorText>{touched.password && errors.password}</ErrorText>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              disabled={!dirty || !isValid}
              type="submit"
            >
              Log in
            </LoadingButton>
          </Form>
        )}
      </Formik>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          mt: 4,
        }}
      >
        <InfoText sx={{ mb: 0 }}>Don`t have an account yet?</InfoText>
        <Link underline="hover" href="/sign-up" variant="subtitle1">
          Sign up
        </Link>
      </Box>
    </Layout>
  );
};
