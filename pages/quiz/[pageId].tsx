import type { NextPage } from "next";
import { useRouter } from "next/router";
import { QuizCategoriesForm } from "../../components/quiz/QuizCategoriesForm";
import { QuizPersonalForm } from "../../components/quiz/QuizPersonalForm";
import { QuizFamilyForm } from "../../components/quiz/QuizFamilyForm";
import { Grid, Progress, Text, Col, Spacer } from "@nextui-org/react";
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
    <Grid.Container gap={2} justify="center">
      <Header />
      <Grid xs={8} md={4}>
        <Col>
          <Text color="primary" h2 css={{textAlign: "center", fontSize: "24pt", fontFamily: "Raleway", fontWeight: "600"}}>
            Resource Quiz
          </Text>
          <Progress max={4} value={pageNumber} size={"sm"} />
          <Spacer y={1} />
          <Text color="$secondaryText" css={{textAlign: "center", fontSize: "12pt", fontFamily: "Raleway", fontWeight: "600"}}>
            Select what you need help with.
          </Text>
          <QuizComponent />
        </Col>
      </Grid>
    </Grid.Container>
  );
};

export default QuizPage;
