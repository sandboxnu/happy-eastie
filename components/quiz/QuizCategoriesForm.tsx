import { AES, enc } from "crypto-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from 'yup'
import { AppContext } from "../../context/context";
import { Accessibility, Citizenship, EmploymentStatus, Family, Insurance, Language, ResourceCategory, SurveyAnswers } from "../../models/types";
import styles from '../../styles/Home.module.css'

interface QuizFormProps {
  initialValues: string
  onSubmitHandler: (values: any) => void
}

export const QuizCategoriesForm: React.FC<QuizFormProps> = (props: QuizFormProps) => {
  const router = useRouter()
  const quizState = useContext(AppContext)

  const errorMessage = 'Please select at least 1 category to get resources for'

  const validationSchema = Yup.object({ category: Yup.array().min(1, errorMessage)});

  let initialValues : SurveyAnswers =  {
    category: [],
    language: [],
    accessibility: []
  };

  if (props.initialValues) {
    initialValues = JSON.parse(AES.decrypt(props.initialValues, "Secret Passphrase").toString(enc.Utf8))
  }
  
  const handleSubmit = (values: any) => {
    const encrypted = AES.encrypt(JSON.stringify(values), "Secret Passphrase")
    // clear old resources list from cache so cache never gets populated with too many lists
    quizState.changeEncryptedQuizResponse(encrypted.toString())
    router.push('/quiz/2')
  };

  const renderError = (message: string) => <p className={styles.errorMessage}>{message}</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>

      {/* form */}
      <Form>
        <span className={styles.form}>
          <label className={styles.label}>Categories</label>
          <div>
            {Object.values(ResourceCategory).map(c =>
              <label key={c}>
                <Field type="checkbox" name="category" value={c} id={c} />{c}
                <br></br>
              </label>
            )}
          </div>
          <ErrorMessage name="category" render={renderError} />

          <label className={styles.label}>Estimated Annual Income</label>
          <Field type="number" name="income" />
          <ErrorMessage name="income" render={renderError} />

          <label className={styles.label}>Language</label>
          <div>
            {Object.values(Language).map(c =>
              <label key={c}>
                <Field type="checkbox" name="language" value={c} id={c} />{c}
                <br></br>
              </label>
            )}
          </div>

          <label className={styles.label}>Citizenship</label>
          <Field as='select' name="citizenship">
            <option></option>
            {
              enumValues<Citizenship>(Citizenship)
            }
          </Field>

          <label className={styles.label}>Parent Age</label>
          <Field type="number" name="parentAge" />
          <ErrorMessage name="parentAge" render={renderError} />

          <label className={styles.label}>Child Age</label>
          <Field type="number" name="childAge" />
          <ErrorMessage name="childAge" render={renderError} />

          <label className={styles.label}>Family Type</label>
          <Field as='select' name="family">
            <option></option>
            {
              enumValues<Family>(Family)
            }
          </Field>

          <label className={styles.label}>Employment Status</label>
          <Field as='select' name="employmentStatus">
            <option></option>
            {
              enumValues<EmploymentStatus>(EmploymentStatus)
            }
          </Field>

          <label className={styles.label}>Insurance Type</label>
          <Field as='select' name="insurance">
            <option></option>
            {
              enumValues<Insurance>(Insurance)
            }
          </Field>

          <label className={styles.label}>Accessibility Needs</label>
          <div>
            {Object.values(Accessibility).map(c =>
              <label key={c}>
                <Field type="checkbox" name="accessibility" value={c} id={c} />{c}
                <br></br>
              </label>
            )}
          </div>

          <button className={styles.submit} type="submit">Submit</button>
        </span>
      </Form>
      {/* form */}

    </Formik>
  )
}

function enumValues<E>(value: any): any {
  return Object.keys(value)
    .filter((elt: any) => !isNaN(Number(value[elt])))
    .map(element => <option key={element}>{element}</option>)
}

