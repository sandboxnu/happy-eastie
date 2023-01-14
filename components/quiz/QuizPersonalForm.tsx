import { Grid, Row, Spacer } from "@nextui-org/react";
import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from "yup";
import { AppContext } from "../../context/context";
import {
  Accessibility,
  Citizenship,
  EmploymentStatus,
  Insurance,
  Language,
} from "../../models/types";
import styles from "./Quiz.module.css";
import { HelpTooltip } from "../HelpTooltip";

export const QuizPersonalForm: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);

  const errorMessages = {
    incomeError: "Please enter a positive number for income",
    wholeNumberError: "Please enter a whole number",
  };

  const validationSchema = Yup.object({
    income: Yup.number()
      .integer(errorMessages.wholeNumberError)
      .min(0, errorMessages.incomeError)
      .typeError(errorMessages.wholeNumberError)
      .nullable(),
    language: Yup.array(),
    citizenship: Yup.string(),
    employmentStatus: Yup.string(),
    insurance: Yup.string(),
    accessibility: Yup.array(),
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
    const combinedValues = Object.assign(initialValues, values);
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
          <Grid md={2} xs={0} />

          <Grid md={3} xs={12} direction="column">
            <label className={styles.quizFieldText}>Annual Income</label>
            <Spacer y={1} />
            <Field type="number" name="income" className={styles.select} />
            <ErrorMessage name="income" render={renderError} />
          </Grid>
          <Grid md={2} xs={0} />

          <Grid md={3} xs={12} direction="column">
            <label className={styles.quizFieldText}>Language</label>
            <Spacer y={1} />
            {Object.values(Language).map((c) => (
              <label key={c} className={styles.checkboxItem}>
                <Field
                  type="checkbox"
                  name="language"
                  value={c}
                  id={c}
                  style={{ height: "24px", width: "24px" }}
                />
                <span className={styles.categoryText}>{` ${c}`}</span>
                <br />
              </label>
            ))}
          </Grid>
          <Grid md={2} xs={0} />

          <Grid md={2} xs={0} />

          <Grid md={3} xs={12} direction="column">
            <Row align="center">
              <label className={styles.quizFieldText}>Citizenship</label>
              <Spacer x={0.5} />
              <HelpTooltip diameter={27} text="This lets us match you to resources focused on non-citizens, if applicable. This field is optional." />
            </Row>
            <Spacer y={1} />
            <Field as="select" name="citizenship" className={styles.select}>
              <optgroup label="Citizenship">
                <option></option>
                {Object.values(Citizenship).map((element) => <option key={element}>{element}</option>)}
              </optgroup>
            </Field>
          </Grid>
          <Grid md={2} xs={0} />

          <Grid md={3} xs={12} direction="column">
            <label className={styles.quizFieldText}>Employment Status</label>
            <Spacer y={1} />
            <Field
              as="select"
              name="employmentStatus"
              className={styles.select}
            >
              <optgroup label="Employment Status">
                <option></option>
                {Object.values(EmploymentStatus).map((element) => <option key={element}>{element}</option>)}
              </optgroup>
            </Field>
          </Grid>
          <Grid md={2} xs={0} />

          <Grid md={3} xs={12} direction="column">
            <label className={styles.quizFieldText}>Insurance Type</label>
            <Spacer y={1} />
            <Field as="select" name="insurance" className={styles.select}>
              <optgroup label="Insurance status">
                <option></option>
                {Object.values(Insurance).map((element) => <option key={element}>{element}</option>)}
              </optgroup>
            </Field>
          </Grid>
          <Grid md={2} xs={0} />

          <Grid md={3} xs={12} direction="column">
            <label className={styles.quizFieldText}>Accessibility Needs</label>
            <Spacer y={1} />
            {Object.values(Accessibility).map((c) => (
              <label key={c} className={styles.checkboxItem}>
                <Field
                  type="checkbox"
                  name="accessibility"
                  value={c}
                  id={c}
                  style={{ height: "24px", width: "24px" }}
                />
                <span className={styles.categoryText}>{` ${c}`}</span>
                <br />
              </label>
            ))}
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
