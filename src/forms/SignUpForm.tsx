import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";
import { IAuthCredentials } from "../types";
import { Box, Link, TextField } from "@mui/material";
import { Form } from "../components/Form";
import * as Yup from "yup";
import { ErrorText } from "../components/ErrorText";
import { AuthService } from "../sevices/AuthService";
import { Formik, FormikProps } from "formik";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { InfoText } from "../components/InfoText";

const initialValues = {
  email: "",
  password: "",
  name: "",
  lastName: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 symbols"),
});

export const SignUpForm: React.FC<{
  needsActivation: (status: boolean) => void;
}> = ({ needsActivation }) => {
  const [submittingErrors, setSubmittingErrors] = useState("");

  const handleSubmit = async ({
    email,
    password,
    name,
    lastName,
  }: IAuthCredentials) => {
    try {
      await AuthService.registration(email, password, name, lastName);
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
        }: FormikProps<IAuthCredentials>) => (
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
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              onChange={(e) => {
                setSubmittingErrors("");
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.name}
              fullWidth
            />
            <ErrorText>{touched.name && errors.name}</ErrorText>
            <TextField
              label="Last name"
              variant="outlined"
              type="text"
              name="lastName"
              onChange={(e) => {
                setSubmittingErrors("");
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.lastName}
              fullWidth
            />
            <ErrorText>{touched.lastName && errors.lastName}</ErrorText>
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
              Sign up
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
        <InfoText sx={{ mb: 0 }}>Already have an account?</InfoText>
        <Link underline="hover" href="/login" variant="subtitle1">
          Log in
        </Link>
      </Box>
    </Layout>
  );
};
