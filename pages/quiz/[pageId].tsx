import type { NextPage } from "next";
import { useRouter } from "next/router";
import { QuizCategoriesForm } from "../../components/quiz/QuizCategoriesForm";
import { QuizPersonalForm } from "../../components/quiz/QuizPersonalForm";
import { QuizFamilyForm } from "../../components/quiz/QuizFamilyForm";
import { Grid, Progress, Text, Spacer, Row } from "@nextui-org/react";
import styles from "../../styles/quiz.module.css";
import Header from "../../components/header";
import { HelpTooltip } from "../../components/HelpTooltip";
import Footer from "../../components/footer";

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
        <Text id={styles.quizTitle}>Resource Quiz</Text>
        <Spacer y={1} />
        <Progress max={4} value={pageNumber} size={"sm"} />
        <Spacer y={1} />
        <Row align="center">
          <Text id={styles.quizSubtitle}>Select what you need help with.</Text>
          <Spacer x={0.3} />
          <HelpTooltip diameter={15} text={"All answer fields are optional to ensure that you only share as much information as you like."} />
        </Row>
      </Grid>

      <QuizComponent />
      <Footer />
    </Grid.Container>
  );
};

export default QuizPage;
