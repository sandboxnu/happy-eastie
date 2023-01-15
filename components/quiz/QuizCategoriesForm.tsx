import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from "yup";
import { AppContext } from "../../context/context";
import { ResourceCategory, SurveyAnswers } from "../../models/types";
import { Checkbox, Col, Container, Grid, Row } from "@nextui-org/react";
import styles from "./Quiz.module.css";

export const QuizCategoriesForm: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);

  const errorMessage = "Please select at least 1 category to get resources for";

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
        <Container>
          <Row>
            <Col>
            <Checkbox.Group>
              {Object.values(ResourceCategory).map((c) => (
                <label key={c} className={styles.checkboxItem}>
                  <Field type="checkbox" name="category" value={c} id={c} className={styles.checkbox}/>
                  <span className={styles.categoryText}>{c}</span>
                </label>
              ))}
              <ErrorMessage name="category" render={renderError} />
            </Checkbox.Group>
            </Col>
          </Row>

          <Row justify="flex-end">
          <button id="continue" className={styles.continue} type="submit">
              Continue
            </button>
          </Row>
          </Container>
      </Form>
    </Formik>
  );
};
