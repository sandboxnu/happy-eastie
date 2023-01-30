import { AES, enc } from "crypto-js";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { SurveyAnswers } from "../../models/types2";
import { Checkbox, Col, Grid, Row } from "@nextui-org/react";
import styles from "./Quiz.module.css";
import { CategoryCard } from "./CategoryCard";

export const QuizCategoriesForm: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then((cs) => setCategories(cs));
  }, []);

  let initialValues: SurveyAnswers = {
    categories: [],
    householdMembers: 1,
    householdIncome: 0,
    documentation: undefined,
    languages: [],
    accessibility: [],
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
  async function getCategories(): Promise<string[]> {
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
      values.categories = categories;
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
        <Grid.Container gap={2}>

                {categories.map((c) => (
                  // <label key={c} className={styles.checkboxItem}>
                  //   <Field
                  //     type="checkbox"
                  //     name="categories"
                  //     value={c}
                  //     id={c}
                  //     className={styles.checkbox}
                  //   />
                  //   <span className={styles.categoryText}>{c}</span>
                  // </label>
                  <Grid xs={4}>
                                      <CategoryCard title={c} />
                  </Grid>
                ))}


          <Row justify="flex-end">
            <button id="continue" className={styles.continue} type="submit">
              Continue
            </button>
          </Row>
        </Grid.Container>
      </Form>
    </Formik>
  );
};
