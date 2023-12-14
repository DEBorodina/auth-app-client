import { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { Layout } from "../components/Layout";
import * as Yup from "yup";
import { IFile } from "../types";
import { AxiosError } from "axios";
import { Formik, FormikProps } from "formik";
import { ErrorText } from "../components/ErrorText";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form } from "../components/Form";
import { v4 as uuid } from "uuid";

const validationSchema = Yup.object().shape({
  fileName: Yup.string().required("File name is required"),
  content: Yup.string().required("Text is required"),
});

export const CreateFileForm: React.FC<{
  onAdd: (values: IFile) => void;
  onCancel: () => void;
  initialValues: IFile | null;
}> = ({ onAdd, onCancel, initialValues }) => {
  const [submittingErrors, setSubmittingErrors] = useState("");

  const { userData } = useContext(UserContext)!;
  const { id } = userData!;
  const initialFormValues = initialValues ?? {
    content: "",
    fileName: "",
    authorId: id,
    id: uuid(),
  };

  const handleSubmit = (values: IFile) => {
    try {
      onAdd(values);
    } catch (e) {
      const message = (e as AxiosError<{ message: string }>)?.response?.data
        ?.message;
      setSubmittingErrors(message || "");
    }
  };

  return (
    <Layout
      sx={{
        mt: 0,
        width: 600,
        pointerEvents: initialValues ? "none" : "default",
      }}
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialFormValues}
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
        }: FormikProps<IFile>) => (
          <Form onSubmit={handleSubmit}>
            <ErrorText>{submittingErrors}</ErrorText>
            <TextField
              label="File name"
              variant="outlined"
              type="text"
              name="fileName"
              onChange={(e) => {
                setSubmittingErrors("");
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.fileName}
              fullWidth
            />
            <ErrorText>{touched.fileName && errors.fileName}</ErrorText>
            <TextField
              label="Text"
              variant="outlined"
              type="text"
              name="content"
              onChange={(e) => {
                setSubmittingErrors("");
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.content}
              rows={4}
              maxRows={4}
              multiline
              fullWidth
            />
            <ErrorText>{touched.content && errors.content}</ErrorText>
            {!initialValues && (
              <Box
                sx={{
                  width: "80%",
                  justifyContent: "space-around",
                  display: "flex",
                  marginBottom: 4,
                }}
              >
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  disabled={!dirty || !isValid}
                  type="submit"
                >
                  Add
                </LoadingButton>
                <LoadingButton variant="contained" onClick={onCancel}>
                  Cancel
                </LoadingButton>
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
