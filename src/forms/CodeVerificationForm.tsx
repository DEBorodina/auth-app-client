import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { AuthService } from "../sevices/AuthService";
import { AxiosError } from "axios";
import { Layout } from "../components/Layout";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Form } from "../components/Form";
import { InfoText } from "../components/InfoText";
import { ErrorText } from "../components/ErrorText";
import { Container, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import InputMask from "react-input-mask";

const validationSchemaCode = Yup.object().shape({
  code: Yup.string()
    .required("Code is empty")
    .length(4, "Code length should be 4"),
});

export const CodeVerificationForm = () => {
  const [submittingErrors, setSubmittingErrors] = useState("");
  const { setUserData } = useContext(UserContext)!;

  const handleSubmitCode = async ({ code }: { code: string }) => {
    try {
      const userData = await AuthService.verifyCode(code);
      console.log(userData);
      setUserData(userData);
    } catch (e) {
      const message = (e as AxiosError<{ message: string }>)?.response?.data
        ?.message;
      setSubmittingErrors(message || "");
    }
  };

  return (
    <Layout>
      <Formik
        onSubmit={handleSubmitCode}
        initialValues={{ code: "" }}
        validationSchema={validationSchemaCode}
        validateOnBlur
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
        }: FormikProps<{ code: string }>) => (
          <Form onSubmit={handleSubmit}>
            <InfoText sx={{ width: "100%" }}>
              Verification is needed! We sent a code to your email. Enter the
              code to continue.
            </InfoText>
            <Container sx={{ width: "60%" }}>
              <ErrorText>
                {submittingErrors || (touched.code && errors.code)}
              </ErrorText>
              <InputMask
                mask="9  9  9  9"
                value={values.code}
                disabled={false}
                maskChar=" "
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s/g, "");

                  setSubmittingErrors("");
                  handleChange(e);
                }}
                onBlur={handleBlur}
              >
                {
                  <TextField
                    label="Code"
                    variant="outlined"
                    type="text"
                    name="code"
                    inputProps={{ style: { textAlign: "center" } }}
                    fullWidth
                  />
                }
              </InputMask>
            </Container>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              disabled={!dirty || !isValid}
              type="submit"
            >
              Check
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
