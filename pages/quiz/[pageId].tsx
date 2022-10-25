import type { NextPage } from "next";
import { useRouter } from "next/router";
import { QuizCategoriesForm } from "../../components/quiz/QuizCategoriesForm";
import { QuizPersonalForm } from "../../components/quiz/QuizPersonalForm";
import { QuizFamilyForm } from "../../components/quiz/QuizFamilyForm";
import { Grid, Progress, Text, Spacer } from "@nextui-org/react";
import styles from "../../styles/quiz.module.css"
import Header from "../../components/header";

const QuizPage: NextPage = () => {
  const router = useRouter();
  const { pageId } = router.query;

  const pageNumber = parseInt(pageId as string);

  let QuizComponent: React.FC;
  switch (pageNumber) {
    case 1:
      QuizComponent = QuizCategoriesForm;
      break;
    case 2:
      QuizComponent = QuizPersonalForm;
      break;
    case 3:
      QuizComponent = QuizFamilyForm;
      break;
    default:
      QuizComponent = QuizCategoriesForm;
      break;
  }

  return (
    <Grid.Container gap={2} alignItems="center" direction="column">
      <Header />
      <Grid xs={4} md={4} direction="column">
        <Text id={styles.quizTitle}>
          Resource Quiz
        </Text>
        <Spacer y={1} />
        <Progress max={4} value={pageNumber} size={"sm"} />
        <Spacer y={1} />
        <Text id={styles.quizSubtitle}>
          Select what you need help with.
        </Text>
      </Grid>

      <QuizComponent />
    </Grid.Container>
  );
};

export default QuizPage;
