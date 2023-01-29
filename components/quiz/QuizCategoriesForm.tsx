import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from "yup";
import { AppContext } from "../../context/context";
import { SurveyAnswers } from "../../models/types2";
import { Checkbox, Col, Container, Grid, Row } from "@nextui-org/react";
import styles from "./Quiz.module.css";

export const QuizCategoriesForm: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);

  let initialValues: SurveyAnswers = {
    categories: [],
    householdMembers: 1,
    householdIncome: 0,
    languages: [],
    accessibilty: [],
  };

  if (quizState.encryptedQuizResponse != "") {
    initialValues = JSON.parse(
      AES.decrypt(
        quizState.encryptedQuizResponse,
        "Secret Passphrase"
      ).toString(enc.Utf8)
    );
  }

  // TODO: Eventually replace this with an endpoint call of some kind.
  function getCategories(): string[] {
    return [
      "food",
      "healthcare",
      "lgbtqa",
      "housing",
      "disability",
      "military",
      "transportation",
      "utilities",
      "employment",
      "childcare",
      "senior",
      "immigration",
    ];
  }

  const handleSubmit = (values: any) => {
    console.log(values);
    if (values.categories?.length === 0) {
      values.categories = getCategories();
    }
    const combinedValues = Object.assign(initialValues, values);
    const encrypted = AES.encrypt(
      JSON.stringify(combinedValues),
      "Secret Passphrase"
    );
    // clear old resources list from cache so cache never gets populated with too many lists
    quizState.changeEncryptedQuizResponse(encrypted.toString());
    router.push("/quiz/2");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Container>
          <Row>
            <Col>
              <Checkbox.Group>
                {getCategories().map((c) => (
                  <label key={c} className={styles.checkboxItem}>
                    <Field
                      type="checkbox"
                      name="categories"
                      value={c}
                      id={c}
                      className={styles.checkbox}
                    />
                    <span className={styles.categoryText}>{c}</span>
                  </label>
                ))}
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
