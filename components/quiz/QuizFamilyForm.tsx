import { Grid, Spacer } from "@nextui-org/react";
import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useSWRConfig } from "swr";
import * as Yup from "yup";
import { AppContext } from "../../context/context";
import { Family } from "../../models/types";
import styles from "../../styles/quiz.module.css";

export const QuizFamilyForm: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);
  const { cache } = useSWRConfig();

  const errorMessages = {
    ageError: "Please enter a valid age",
  };

  const validationSchema = Yup.object({
    parentAge: Yup.number()
      .positive(errorMessages.ageError)
      .integer(errorMessages.ageError)
      .typeError(errorMessages.ageError)
      .nullable(),
    childAge: Yup.number()
      .positive(errorMessages.ageError)
      .integer(errorMessages.ageError)
      .typeError(errorMessages.ageError)
      .nullable(),
    family: Yup.string(),
  });

  if (quizState.encryptedQuizResponse === "") {
    router.push("/quiz/1");
    return <></>;
  }

  let initialValues = JSON.parse(
    AES.decrypt(quizState.encryptedQuizResponse, "Secret Passphrase").toString(enc.Utf8)
  );

  const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

  const handleSubmit = (values: any) => {
    const combinedValues = Object.assign(initialValues, values);
    const encrypted = AES.encrypt(JSON.stringify(combinedValues), "Secret Passphrase");
    // clear old resources list from cache so cache never gets populated with too many lists
    cache.delete("/api/resources");
    quizState.changeEncryptedQuizResponse(encrypted.toString());
    if (document.activeElement?.id === "back") {
      router.push("/quiz/2");
    } else {
      router.push("/quiz/results");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid.Container gap={4} justify="center" css={{ w: "100vw" }}>
          <Grid md={5} xs={0} />

          <Grid md={2} xs={8} direction="column">
            <label className={styles.quizFieldText}>Family Type</label>
            <Spacer y={1} />
            <Field className={styles.familySelect} as="select" name="family">
              <option></option>
              {enumValues<Family>(Family)}
            </Field>
          </Grid>

          <Grid md={5} xs={0} />

          <Grid md={2} xs={8} direction="column">
            <label className={styles.quizFieldText}>Parent Age</label>
            <Spacer y={1} />
            <Field className={styles.ageInput} type="number" name="parentAge" />
            <ErrorMessage name="parentAge" render={renderError} />
          </Grid>
          <Grid md={2} xs={8} direction="column">
            <label className={styles.quizFieldText}>Child Age</label>
            <Spacer y={1} />
            <Field className={styles.ageInput} type="number" name="childAge" />
            <ErrorMessage name="childAge" render={renderError} />
          </Grid>

          <Grid xs={12} justify="space-between">
            <button className={styles.back} type="submit" id="back">
              Back
            </button>

            <button className={styles.submit} type="submit" id="submit">
              Submit
            </button>
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
