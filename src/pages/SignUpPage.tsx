import { useState } from "react";
import { SignUpForm } from "../forms/SignUpForm";
import { CodeVerificationForm } from "../forms/CodeVerificationForm";

export const SignUpPage = () => {
  const [needsActivation, setNeedsActivation] = useState(false);

  if (needsActivation) {
    return (
      <CodeVerificationForm message="We sent a code to your email. Save this code (it won't be available to get it again) and enter it to continue." />
    );
  }

  return <SignUpForm needsActivation={setNeedsActivation} />;
};
