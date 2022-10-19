import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from "yup";
import { AppContext } from "../../context/context";
import { ResourceCategory } from "../../models/types";
import styles from "../../styles/Home.module.css";

export const QuizCategoriesForm: React.FC = () => {
  const router = useRouter();
  const quizState = useContext(AppContext);

  const errorMessage = "Please select at least 1 category to get resources for";

  const validationSchema = Yup.object({ category: Yup.array().min(1, errorMessage) });

  let initialValues = {
    category: [],
    income: null,
    language: "",
    citizenship: "",
    parentAge: null,
    childAge: null,
    family: "",
    employmentStatus: "",
    insurance: "",
    accessibility: "",
  };

  if (quizState.encryptedQuizResponse) {
    initialValues = JSON.parse(
      AES.decrypt(quizState.encryptedQuizResponse, "Secret Passphrase").toString(enc.Utf8)
    );
  }

  const handleSubmit = (values: any) => {
    const combinedValues = Object.assign(initialValues, values);
    console.log(combinedValues);
    const encrypted = AES.encrypt(JSON.stringify(combinedValues), "Secret Passphrase");
    // clear old resources list from cache so cache never gets populated with too many lists
    quizState.changeEncryptedQuizResponse(encrypted.toString());
    router.push("/quiz/2");
  };

  const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {/* form */}
      <Form>
        <span className={styles.form}>
          <label className={styles.label}>Categories</label>
          <div>
            {Object.values(ResourceCategory).map((c) => (
              <label key={c}>
                <Field type="checkbox" name="category" value={c} id={c} />
                {c}
                <br></br>
              </label>
            ))}
          </div>
          <ErrorMessage name="category" render={renderError} />

          <button className={styles.submit} type="submit">
            Continue
          </button>
        </span>
      </Form>
      {/* form */}
    </Formik>
  );
};

function enumValues<E>(value: any): any {
  return Object.keys(value)
    .filter((elt: any) => !isNaN(Number(value[elt])))
    .map((element) => <option key={element}>{element}</option>);
}
