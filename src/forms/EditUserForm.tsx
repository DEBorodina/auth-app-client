import * as Yup from "yup";
import { IUpdateCredentials } from "../types";
import { ErrorText } from "../components/ErrorText";
import { LoadingButton } from "@mui/lab";
import { Form } from "../components/Form";
import { UserService } from "../sevices/UserService";
import { AxiosError } from "axios";
import { Formik, FormikProps } from "formik";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { Layout } from "../components/Layout";
import { Box, TextField } from "@mui/material";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string().min(8, "Password should be at least 8 symbols"),
});

export const EditUserForm: React.FC<{
  setEdit: (edit: boolean) => void;
}> = ({ setEdit }) => {
  const [submittingErrors, setSubmittingErrors] = useState("");

  const { setUserData, userData } = useContext(UserContext)!;
  const { user, messages } = userData!;
  const { name, lastName } = user;
  const initialValues = { name, lastName, password: "" };
  const handleCancel = () => {
    setEdit(false);
  };

  const handleSubmit = async (values: IUpdateCredentials) => {
    try {
      const newUser = await UserService.updateUser(values);
      setUserData({ messages, user: newUser });
      setEdit(false);
    } catch (e) {
      const message = (e as AxiosError<{ message: string }>)?.response?.data
        ?.message;
      setSubmittingErrors(message || "");
    }
  };
  return (
    <Layout sx={{ mt: 0, mb: 16 }}>
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
        }: FormikProps<IUpdateCredentials>) => (
          <Form onSubmit={handleSubmit}>
            <ErrorText>{submittingErrors}</ErrorText>
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
            <Box
              sx={{
                width: "80%",
                justifyContent: "space-around",
                display: "flex",
              }}
            >
              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                disabled={!dirty || !isValid}
                type="submit"
              >
                Update
              </LoadingButton>
              <LoadingButton variant="contained" onMouseDown={handleCancel}>
                Cancel
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
