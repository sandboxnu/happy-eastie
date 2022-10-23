import { Grid, Row, Col, Spacer } from "@nextui-org/react";
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
import styles from "../../styles/Home.module.css";

export const QuizPersonalForm: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);

  const errorMessages = {
    incomeError: "Please enter a positive number for income",
  };

  const validationSchema = Yup.object({
    income: Yup.number().integer(errorMessages.incomeError)
      .typeError(errorMessages.incomeError)
      .nullable(),
    language: Yup.array(),
    citizenship: Yup.string(),
    employmentStatus: Yup.string(),
    insurance: Yup.string(),
    accessibility: Yup.array(),
  });

  if (!quizState.encryptedQuizResponse) {
    router.push("quiz/1");
  }

  let initialValues = JSON.parse(
    AES.decrypt(quizState.encryptedQuizResponse, "Secret Passphrase").toString(enc.Utf8)
  );

  const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

  const handleSubmit = (values: any) => {
    const combinedValues = Object.assign(initialValues, values);
    console.log(combinedValues);
    const encrypted = AES.encrypt(JSON.stringify(combinedValues), "Secret Passphrase");
    // clear old resources list from cache so cache never gets populated with too many lists
    quizState.changeEncryptedQuizResponse(encrypted.toString());
    router.push("/quiz/3");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid.Container gap={8} justify="center">
          <Grid md={6} xs={12} direction="column">
            <label className="quiz-field-text">Estimated Annual Income</label>
            <br />
            <Field type="number" name="income" css={{ textAlign: "center" }} />
            <ErrorMessage name="income" render={renderError} />
          </Grid>
          <Grid md={6} xs={12} direction="column">
            <label className="quiz-field-text">Language</label>
            <br />
            {Object.values(Language).map((c) => (
              <label key={c}>
                <Field
                  type="checkbox"
                  name="language"
                  value={c}
                  id={c}
                  css={{ textAlign: "center" }}
                />
                <span>{c}</span>
                <br />
              </label>
            ))}
          </Grid>
          <Grid md={6} xs={12} direction="column">
            <label className="quiz-field-text">Citizenship</label>
            <Field as="select" name="citizenship">
              <option></option>
              {enumValues<Citizenship>(Citizenship)}
            </Field>
          </Grid>
          <Grid md={6} xs={12} direction="column">
            <label className="quiz-field-text">Employment Status</label>
            <Field as="select" name="employmentStatus">
              <option></option>
              {enumValues<EmploymentStatus>(EmploymentStatus)}
            </Field>
          </Grid>
          <Grid md={6} xs={12} direction="column">
            <label className="quiz-field-text">Insurance Type</label>
            <Field as="select" name="insurance">
              <option></option>
              {enumValues<Insurance>(Insurance)}
            </Field>
          </Grid>
          <Grid md={6} xs={12} direction="column">
            <label className="quiz-field-text">Accessibility Needs</label>
            <div>
              {Object.values(Accessibility).map((c) => (
                <label key={c}>
                  <Field type="checkbox" name="accessibility" value={c} id={c} />
                  {c}
                  <br></br>
                </label>
              ))}
            </div>
          </Grid>
        </Grid.Container>
      </Form>
    </Formik>
  );
};

function enumValues<E>(value: any): any {
  return Object.keys(value)
    .filter((elt: any) => !isNaN(Number(value[elt])))
    .map((element) => <option key={element}>{element}</option>);
}
