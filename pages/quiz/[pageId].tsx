import type { NextPage } from "next";
import { useRouter } from "next/router";
import { QuizCategoriesForm } from "../../components/quiz/QuizCategoriesForm";
import { QuizInformation } from "../../components/quiz/QuizInformation";
import { QuizAccessibility } from "../../components/quiz/QuizAccessibility";
import { Grid, Progress, Text, Spacer, Row } from "@nextui-org/react";
import styles from "./[pageId].module.css";
import { HelpTooltip } from "../../components/HelpTooltip";
import Layout from "../../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const QuizPage: NextPage = () => {
  const router = useRouter();
  const { pageId } = router.query;
  const { t } = useTranslation('quiz')

  const pageNumber = parseInt(pageId as string);

  let QuizComponent: React.FC;
  switch (pageNumber) {
    case 1:
      QuizComponent = QuizCategoriesForm;
      break;
    case 2:
      QuizComponent = QuizInformation;
      break;
    case 3:
      QuizComponent = QuizAccessibility;
      break;
    default:
      QuizComponent = QuizCategoriesForm;
      break;
  }

  return (
    <Layout>
    <Grid.Container gap={2} alignItems="center" direction="column">
      <Grid xs={8} direction="column">
        <Text id={styles.quizTitle}>{t('Resource Quiz')}</Text>
        <Spacer y={1} />
        <Progress max={4} value={pageNumber} size={"sm"} />
        <Spacer y={1} />
        <Row align="center">
          <Text id={styles.quizSubtitle}>{t('Select what you need help with.')}</Text>
          <Spacer x={0.3} />
          <HelpTooltip diameter={15} text={t('All answer fields are optional to ensure that you only share as much information as you like.')} />
        </Row>
      </Grid>

      <QuizComponent />
    </Grid.Container>
    </Layout>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["quiz", "common"])),
    },
  };
}

export default QuizPage;
