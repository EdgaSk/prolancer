import { Dialog } from "@mui/material";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginUser } from "../api/login";
import styles from "./styles/LoginModal.module.scss";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const registrationShemaYup = (t) =>
  Yup.object({
    email: Yup.string().required(t("reqEmail")).email(t("invalidEmail")),
    password: Yup.string().required(t("reqPassword")).min(8, t("minPassword")),
  });

const initialValues = {
  email: "",
  password: "",
};

const LogModal = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();
  const validationSchema = registrationShemaYup(t);
  const {
    setIsAuthenticated,
    updateUser,
    updateUserRoles,
    updateAccessToken,
    updateRefreshToken,
  } = useContext(UserContext);

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        setIsAuthenticated(true);
        updateUser(response.userId);
        updateUserRoles(response.roles);
        updateAccessToken(response.accessToken);
        updateRefreshToken(response.refreshToken);
        handleClose();
      } else {
        setFieldError("email", t("usernotfound"));
      }
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
      <div className={styles.formCointainer}>
        <p className={styles.title}>{t(`loginTitle`)}</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
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

            <button className={styles.btnSubmit} type="submit">
              {t(`loginBtn`)}
            </button>
          </Form>
        </Formik>
      </div>
    </Dialog>
  );
};

LogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LogModal;
