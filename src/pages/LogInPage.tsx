import { useState } from "react";
import { CodeVerificationForm } from "../forms/CodeVerificationForm";
import { LogInForm } from "../forms/LogInForm";

export const LogInPage = () => {
  const [needsActivation, setNeedsActivation] = useState(false);

  if (needsActivation) {
    return <CodeVerificationForm />;
  }

  return <LogInForm needsActivation={setNeedsActivation} />;
};
