import { Checkbox, Grid, Spacer } from "@nextui-org/react";
import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import * as Yup from "yup";
import { AppContext } from "../../context/context";
import { Family } from "../../models/types";
import styles from "./Quiz.module.css";

export const QuizAccessibility: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);
  const { cache } = useSWRConfig()
  const [languages, setLanguages] = useState<string[]>([])
  const [accessibilities, setAccessibilities] = useState<string[]>([])


  useEffect(() => {
    getLanguages()
    .then(ls => setLanguages(ls))

    getAccessibility()
    .then(as => setAccessibilities(as))
  })

  // TODO: Eventually replace this with an endpoint call of some kind.
  async function getLanguages(): Promise<string[]> {
    return ["en", "es", "fr", "zh", "de"];
  }

  // TODO: Eventually replace this with an endpoint call of some kind.
  async function getAccessibility(): Promise<string[]> {
    return ["blind", "deaf", "wheelchair", "literacy"];
  }

  const errorMessages = {
    ageError: "Please enter a valid age",
  };

  if (quizState.encryptedQuizResponse === "") {
    router.push("/quiz/1");
    return <></>;
  }

  let initialValues = JSON.parse(
    AES.decrypt(quizState.encryptedQuizResponse, "Secret Passphrase").toString(
      enc.Utf8
    )
  );

  const handleSubmit = (values: any) => {
    const combinedValues = Object.assign(initialValues, values);
    console.log(combinedValues);
    const encrypted = AES.encrypt(
      JSON.stringify(combinedValues),
      "Secret Passphrase"
    );
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Grid.Container gap={4} justify="center" css={{ w: "100vw" }}>
          <Grid md={2} xs={8} direction="column">
            <label className={styles.quizFieldText}>Languages</label>
            <Spacer y={1} />
            <Checkbox.Group>
              {languages.map((c) => (
                <label key={c} className={styles.checkboxItem}>
                  <Field
                    type="checkbox"
                    name="languages"
                    value={c}
                    id={c}
                    className={styles.checkbox}
                  />
                  <span className={styles.categoryText}>{c}</span>
                </label>
              ))}
            </Checkbox.Group>
          </Grid>

          <Grid md={2} xs={8} direction="column">
            <Checkbox.Group>
              <label className={styles.quizFieldText}>Accessibility</label>
              <Spacer y={1} />
              {accessibilities.map((c) => (
                <label key={c} className={styles.checkboxItem}>
                  <Field
                    type="checkbox"
                    name="accessibility"
                    value={c}
                    id={c}
                    className={styles.checkbox}
                  />
                  <span className={styles.categoryText}>{c}</span>
                </label>
              ))}
            </Checkbox.Group>
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
