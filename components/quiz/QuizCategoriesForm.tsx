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
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function cardSelected(cardTitle: string) {
    let newSelected = [...selectedCategories];
    if (selectedCategories.includes(cardTitle)) {
      newSelected = newSelected.filter((str) => str !== cardTitle);
    } else {
      newSelected.push(cardTitle);
    }
    setSelectedCategories(newSelected);
  }

  useEffect(() => {
    getCategories().then((cs) => setAllCategories(cs));
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

  async function getCategories(): Promise<string[]> {
    const response = await fetch("/api/resources/categories");
    const categories = await response.json();
    return categories;
  }

  const handleSubmit = () => {
    // If they select nothing, allow all categories
    if (selectedCategories.length === 0) {
      initialValues.categories = allCategories;
    } else {
      initialValues.categories = selectedCategories;
    }
    const encrypted = AES.encrypt(
      JSON.stringify(initialValues),
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
          {allCategories.map((c) => (
            <Grid xs={6} sm={6} md={6} key={c}>
              <CategoryCard title={c} setSelected={cardSelected} />
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
