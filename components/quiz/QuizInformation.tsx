import { Grid, Spacer, Radio } from "@nextui-org/react";
import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { AppContext } from "../../context/context";
import styles from "./Quiz.module.css";

export const QuizInformation: React.FC = () => {
  const [documentation, setDocumentation] = useState<boolean | null>(null);
  const router = useRouter();
  const quizState = useContext(AppContext);

  const errorMessages = {
    negativeError: "Please enter a positive number.",
    wholeNumberError: "Please enter a whole number.",
  };

  const validationSchema = Yup.object({
    householdIncome: Yup.number()
      .integer(errorMessages.wholeNumberError)
      .min(0, errorMessages.negativeError)
      .typeError(errorMessages.wholeNumberError)
      .nullable(),
    householdMembers: Yup.number()
      .integer(errorMessages.wholeNumberError)
      .min(1, errorMessages.negativeError)
      .typeError(errorMessages.wholeNumberError),
  });

  if (quizState.encryptedQuizResponse === "") {
    router.push("/quiz/1");
    return <></>;
  }

  let initialValues = JSON.parse(
    AES.decrypt(quizState.encryptedQuizResponse, "Secret Passphrase").toString(
      enc.Utf8
    )
  );

  const renderError = (message: string) => (
    <p className={styles.errorMessage}>{message}</p>
  );

  const handleSubmit = (values: any) => {
    console.log(values);
    const combinedValues = Object.assign(initialValues, values);

    combinedValues.documentation = documentation;
    console.log(combinedValues);

    const encrypted = AES.encrypt(
      JSON.stringify(combinedValues),
      "Secret Passphrase"
    );

    // clear old resources list from cache so cache never gets populated with too many lists
    quizState.changeEncryptedQuizResponse(encrypted.toString());
    if (document.activeElement?.id === "back") {
      router.push("/quiz/1");
    } else {
      router.push("/quiz/3");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid.Container gap={8} justify="center">
          <Grid md={4} sm={6} xs={12} direction="column">
            <label className={styles.quizFieldText}>Household Income</label>
            <Spacer y={1} />
            <Field
              type="number"
              name="householdIncome"
              className={styles.select}
            />
            <ErrorMessage name="householdIncome" render={renderError} />
          </Grid>

          <Grid md={4} sm={6} xs={12} direction="column">
            <label className={styles.quizFieldText}>Household Members</label>
            <Spacer y={1} />
            <Field
              type="number"
              name="householdMembers"
              className={styles.select}
            />
            <ErrorMessage name="householdMembers" render={renderError} />
          </Grid>

          <Grid md={4} sm={6} xs={12} direction="column">
            <label className={styles.quizFieldText}>
              Do you have some form of photo ID?
            </label>
            <Spacer y={1} />
            <Radio.Group
              name="documentation"
              defaultValue="Unknown"
              onChange={(v) => {
                if (v === "Unknown") {
                  setDocumentation(null);
                } else if (v === "Yes") {
                  setDocumentation(true);
                } else {
                  setDocumentation(false);
                }
              }}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
              <Radio value="Unknown">Prefer not to say</Radio>
            </Radio.Group>
          </Grid>

          <Grid xs={12} justify="space-between">
            <button className={styles.back} type="submit" id="back">
              Back
            </button>

            <button className={styles.continue} type="submit" id="continue">
              Continue
            </button>
          </Grid>
        </Grid.Container>
      </Form>
    </Formik>
  );
};
