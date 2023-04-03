import { Checkbox, Grid, Spacer } from "@nextui-org/react";
import { AES, enc } from "crypto-js";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSWRConfig } from "swr";
import { AppContext } from "../../context/context";
import styles from "./Quiz.module.css";
import { QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE } from "../../models/constants";

export const QuizAccessibility: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);
  const { cache } = useSWRConfig();
  const [languages, setLanguages] = useState<string[]>([]);
  const [accessibilities, setAccessibilities] = useState<string[]>([]);
  const { t } = useTranslation(["quiz"]);

  useEffect(() => {
    getLanguages().then((ls) => setLanguages(ls));
    getAccessibility().then((as) => setAccessibilities(as));
  }, []);

  async function getLanguages(): Promise<string[]> {
    const response = await fetch("/api/resources/languages");
    const languages = await response.json();
    return languages;
  }

  async function getAccessibility(): Promise<string[]> {
    const response = await fetch("/api/resources/accessibility");
    const accessibility = await response.json();
    return accessibility;
  }

  const errorMessages = {
    ageError: "Please enter a valid age",
  };

  if (quizState.encryptedQuizResponse === "") {
    router.push("/quiz/1");
    return <></>;
  }

  let initialValues = JSON.parse(
    AES.decrypt(quizState.encryptedQuizResponse, QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE).toString(
      enc.Utf8
    )
  );

  const handleSubmit = (values: any) => {
    const combinedValues = Object.assign(initialValues, values);
    const encrypted = AES.encrypt(
      JSON.stringify(combinedValues),
      QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE
    );
    // clear old resources list from cache so cache never gets populated with too many lists
    cache.delete("/api/resources");
    quizState.changeEncryptedQuizResponse(encrypted.toString());
    if (document.activeElement?.id === "back") {
      router.push("/quiz/2");
    } else {
      router.push({ pathname: "/quiz/results", query: { encryptedQuizResponse: quizState.encryptedQuizResponse } });
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Grid.Container gap={4} justify="center" css={{ w: "100vw" }}>
          <Grid md={2} xs={8} direction="column">
            <label className={styles.quizFieldText}>{t("Languages")}</label>
            <Spacer y={1} />
            <Checkbox.Group>
              {languages.map((c) => (
                <label key={c} className={styles.checkboxItem}>
                  <Field
                    type="checkbox"
                    name="languages"
                    value={t(c)}
                    id={c}
                    className={styles.checkbox}
                  />
                  <span className={styles.categoryText}>{c}</span>
                </label>
              ))}
            </Checkbox.Group>
          </Grid>

          <Grid md={2} xs={0} />

          <Grid md={2} xs={8} direction="column">
            <Checkbox.Group>
              <label className={styles.quizFieldText}>{t("Accessibility")}</label>
              <Spacer y={1} />
              {accessibilities.map((c) => (
                <label key={c} className={styles.checkboxItem}>
                  <Field
                    type="checkbox"
                    name="accessibility"
                    value={t(c)}
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
              {t('Back')}
            </button>

            <button className={styles.submit} type="submit" id="submit">
              {t('Submit')}
            </button>
          </Grid>
        </Grid.Container>
      </Form>
    </Formik>
  );
};
