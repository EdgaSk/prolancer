import { Dialog } from "@mui/material";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerUser } from "../api/register";
import styles from "./styles/RegModal.module.scss";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registrationShemaYup = (t) =>
  Yup.object({
    role: Yup.string().oneOf(["freelancer", "employer"]).required(t("reqRole")),
    name: Yup.string().required(t("reqName")).min(5, t("minCharacters")),
    surname: Yup.string().required(t("reqSurname")).min(5, t("minCharacters")),
    email: Yup.string().required(t("reqEmail")).email(t("invalidEmail")),
    password: Yup.string()
      .required(t("reqPassword"))
      .min(8, t("minPassword"))
      .matches(passwordRegex, t("matchesPassword")),
    repeatedpassword: Yup.string()
      .required(t("reqrepeatPassword"))
      .oneOf([Yup.ref("password")], t("matchPassword")),
  });

const initialValues = {
  role: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  repeatedpassword: "",
};

const RegModal = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const validationSchema = registrationShemaYup(t);

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        handleClose();
      } else {
        setFieldError("email", t("emailAlreadyExists"));
      }
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
      <div className={styles.formCointainer}>
        <p className={styles.title}>{t(`registerTitle`)}</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.roleBox}>
              <ErrorMessage
                className={styles.error}
                name="role"
                component="div"
              />
              <div className={styles.rolesbox}>
                <div className={styles.radioBtn}>
                  <Field
                    type="radio"
                    name="role"
                    value="freelancer"
                    id="freelancer"
                    className={styles.radio}
                  />
                  <label htmlFor="freelancer" className={styles.radiolabel}>
                    {t(`freelancer`)}
                  </label>
                </div>
                <div className={styles.radioBtn}>
                  <div className={styles.radioBtn}>
                    <Field
                      type="radio"
                      name="role"
                      value="employer"
                      id="employer"
                      className={styles.radio}
                    />
                    <label htmlFor="employer" className={styles.radiolabel}>
                      {t(`employer`)}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.labelBox}>
              <label htmlFor="name">
                {t(`name`)}
                <span>*</span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="name"
                component="div"
              />
            </div>
            <Field name="name" placeholder={t(`yourName`)} type="text" />
            <div className={styles.labelBox}>
              <label htmlFor="surname">
                {t(`surname`)}
                <span>*</span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="surname"
                component="div"
              />
            </div>
            <Field name="surname" placeholder={t(`yourSurname`)} type="text" />
            <div className={styles.labelBox}>
              <label htmlFor="email">
                {t(`emailadress`)}
                <span>*</span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="email"
                component="div"
              />
            </div>
            <Field name="email" placeholder={t(`youremail`)} type="email" />
            <div className={styles.labelBox}>
              <label htmlFor="password">
                {t(`password`)}
                <span>*</span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="password"
                component="div"
              />
            </div>
            <Field
              name="password"
              placeholder={t(`yourpasword`)}
              type="password"
            />
            <div className={styles.labelBox}>
              <label htmlFor="repeatedpassword">
                {t(`repeatpasword`)}
                <span>*</span>
              </label>
              <ErrorMessage
                className={styles.error}
                name="repeatedpassword"
                component="div"
              />
            </div>
            <Field
              name="repeatedpassword"
              placeholder={t(`yourepeatpasword`)}
              type="password"
            />

            <button className={styles.btnSubmit} type="submit">
              {t(`registerBtn`)}
            </button>
          </Form>
        </Formik>
      </div>
    </Dialog>
  );
};

RegModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RegModal;
