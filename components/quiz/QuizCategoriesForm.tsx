import { AES, enc } from "crypto-js";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { SurveyAnswers } from "../../models/types";
import { Grid, Row } from "@nextui-org/react";
import styles from "./Quiz.module.css";
import { CategoryCard } from "./CategoryCard";
import { useTranslation } from "next-i18next";
import { QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE } from "../../models/constants";
import Loading from '../../components/Loading';

export const QuizCategoriesForm: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation(['quiz', 'common'])

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
    getCategories().then((cs) => {
      setIsLoading(false)
      setAllCategories(cs)
    });

  }, []);

  let initialValues: SurveyAnswers = {
    categories: [],
    householdIncome: 0,
    householdMembers: 1,
    documentation: undefined,
    languages: [],
    accessibility: []
  };

  if (quizState.encryptedQuizResponse != "") {
    initialValues = JSON.parse(
      AES.decrypt(
        quizState.encryptedQuizResponse,
        QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE
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
      QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE
    );
    // clear old resources list from cache so cache never gets populated with too many lists
    quizState.changeEncryptedQuizResponse(encrypted.toString());
    router.push("/quiz/2");
  };

  const getContent = () => {
    if (isLoading) {
      return <Loading relative />
    }
    else {
      return (
        <Grid.Container gap={2}>
          {allCategories.map((c) => (
            <Grid xs={6} sm={4} md={3} key={c}>
              <CategoryCard title={t(`${c}`)} setSelected={cardSelected} />
            </Grid>
          ))}

          <Row justify="flex-end">
            <button id="continue" className={styles.continue} type="submit">
              {t('Continue')}
            </button>
          </Row>
        </Grid.Container>)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        {getContent()}
      </Form>
    </Formik>
  );
};
