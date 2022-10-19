import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { QuizCategoriesForm } from "../../components/quiz/QuizCategoriesForm";
import { QuizPersonalForm } from "../../components/quiz/QuizPersonalForm";
import { QuizFamilyForm } from "../../components/quiz/QuizFamilyForm";

const QuizPage: NextPage = () => {
  const router = useRouter();
  const { pageId } = router.query;

  let QuizComponent: React.FC;
  switch (parseInt(pageId as string)) {
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
    <div className={styles.container}>
      <QuizComponent />
    </div>
  );
};

export default QuizPage;
