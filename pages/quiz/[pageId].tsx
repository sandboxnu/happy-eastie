import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { QuizCategoriesForm } from "../../components/quiz/QuizCategoriesForm";
import { QuizPersonalForm } from "../../components/quiz/QuizPersonalForm";
import { QuizFamilyForm } from "../../components/quiz/QuizFamilyForm";
import { Grid, Progress, Text, Row, Col, Spacer} from "@nextui-org/react";

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
    <Grid.Container direction="column" xs={12} justify="center" css={{ "margin": "auto"}}>
      <Spacer y={5} />
      <Row>
        <Spacer x={25}/>
        <Col span={4}>
          <Text color="primary" h2>Resources Quiz</Text>
          <Progress max={4} value={pageNumber} size='sm' css={{"width": "300px"}}/>
          <QuizComponent />
        </Col>
        <Spacer x={25}/>
      </Row>
    </Grid.Container>
  );
};

export default QuizPage;
