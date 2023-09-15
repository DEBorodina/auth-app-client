import { Layout } from "../components/Layout";
import { useState } from "react";
import { InfoText } from "../components/InfoText";
import { SignUpForm } from "../forms/SignUpForm";

export const SignUpPage = () => {
  const [needsActivation, setNeedsActivation] = useState(false);

  if (needsActivation) {
    return (
      <Layout>
        <InfoText sx={{ width: "100%" }}>
          Activation is needed! Check your mail and reload the page.
        </InfoText>
      </Layout>
    );
  }

  return <SignUpForm needsActivation={setNeedsActivation} />;
};
