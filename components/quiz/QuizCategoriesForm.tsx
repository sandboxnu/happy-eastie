import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from "yup";
import { AppContext } from "../../context/context";
import { ResourceCategory, SurveyAnswers } from "../../models/types";
import { Checkbox, Grid } from "@nextui-org/react";
import styles from "../../styles/quiz.module.css";
import { useTranslation } from "next-i18next";

export const QuizCategoriesForm: React.FC = () => {
  const { t } = useTranslation(['common'])
  const router = useRouter();
  const quizState = useContext(AppContext);

  const errorMessage = t('error.category');

  const validationSchema = Yup.object({ category: Yup.array().min(1, errorMessage) });

  let initialValues : SurveyAnswers = {
    category: []
  };

  if (quizState.encryptedQuizResponse != "") {
    initialValues = JSON.parse(
      AES.decrypt(quizState.encryptedQuizResponse, "Secret Passphrase").toString(enc.Utf8)
    );
  }

  const handleSubmit = (values: any) => {
    const combinedValues = Object.assign(initialValues, values);
    const encrypted = AES.encrypt(JSON.stringify(combinedValues), "Secret Passphrase");
    // clear old resources list from cache so cache never gets populated with too many lists
    quizState.changeEncryptedQuizResponse(encrypted.toString());
    router.push("/quiz/2");
  };

  const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid.Container gap={8} css={{ w: "100vw" }} justify="center">
          <Grid xs={10} sm={7} md={3}>
            <Checkbox.Group>
              {Object.values(ResourceCategory).map((c) => (
                <label key={c} className={styles.checkboxItem}>
                  <Field type="checkbox" name="category" value={c} id={c} className={styles.checkbox} style={{"height": "24px", "width": "24px"}}/>
                  <span className={styles.categoryText}>{t(c)}</span>
                </label>
              ))}
              <ErrorMessage name="category" render={renderError} />
            </Checkbox.Group>
          </Grid>

          <Grid xs={12} md={12} justify="flex-end">
            <button id="continue" className={styles.continue} type="submit">
              {t('continue')}
            </button>
          </Grid>
        </Grid.Container>
      </Form>
    </Formik>
  );
};