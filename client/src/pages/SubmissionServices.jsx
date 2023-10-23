import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { postServices } from "../api/services";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles/SubmissionServices.module.scss";
import { useTranslation } from "react-i18next";

const SubmissionServices = () => {
  const { accessToken, userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("userId", userData.userId);
      formData.append("date", new Date().toISOString());
      formData.append("title", values.title);
      formData.append("categories", values.categories);
      formData.append("language", values.language);
      formData.append("englishlanguageLevel", values.englishlanguageLevel);
      formData.append("location", values.location);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("image", values.image, values.image.name);
      formData.append("skills", values.skills);

      const response = await postServices(accessToken, formData);

      if (response) {
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const listingSchemaYup = Yup.object().shape({
    title: Yup.string().required(t("yuPtitle")),
    categories: Yup.string().required(t("yuPcategories")),
    language: Yup.string().required(t("yuPlanguage")),
    englishlanguageLevel: Yup.string().required(t("yuPenglishlanguageLevel")),
    location: Yup.string().required(t("yuPlocation")),
    description: Yup.string().required(t("yuPdescription")),
    price: Yup.number()
      .required(t("yuPprice"))
      .moreThan(0, t("yuPmoreThanZero")),
    image: Yup.mixed().required(t("yuPimage")),
    skills: Yup.array().of(Yup.string()).min(1, t("yuPskills")),
  });

  return (
    <div className={styles.mainCointainer}>
      <p className={styles.pageTitle}>{t("submissionServicesPage")}</p>
      <Formik
        initialValues={{
          title: "",
          categories: "",
          language: "",
          englishlanguageLevel: "",
          location: "",
          description: "",
          price: 0,
          image: "",
          skills: [],
        }}
        validationSchema={listingSchemaYup}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.cointainerForm}>
            <div className={styles.fieldsBox}>
              <div className={styles.labelBox}>
                <label htmlFor="title">{t("formTitle")}</label>
                <ErrorMessage
                  name="title"
                  component="div"
                  className={styles.errorMesage}
                />
              </div>
              <Field type="text" name="title" className={styles.inputStyles} />
            </div>

            <div className={styles.fieldsBox}>
              <div className={styles.labelBox}>
                <label htmlFor="categories">{t("formCategory")}</label>
                <ErrorMessage
                  name="categories"
                  component="div"
                  className={styles.errorMesage}
                />
              </div>
              <Field
                as="select"
                name="categories"
                className={styles.inputStyles}
              >
                <option value="">{t("selectCategory")}</option>
                <option value="graphicsdesign">{t("graphicsdesign")}</option>
                <option value="digitalmarketing">
                  {t("digitalmarketing")}
                </option>
                <option value="writingtranslation">
                  {t("writingtranslation")}
                </option>
                <option value="videoanimation">{t("videoanimation")}</option>
                <option value="musicaudio">{t("musicaudio")}</option>
                <option value="programmingtech">{t("programmingtech")}</option>
                <option value="data">{t("data")}</option>
                <option value="aiservices">{t("aiservices")}</option>
              </Field>
            </div>

            <div className={styles.fieldsBox}>
              <div className={styles.labelBox}>
                <label htmlFor="language">{t("formLanguage")}</label>
                <ErrorMessage
                  name="language"
                  component="div"
                  className={styles.errorMesage}
                />
              </div>
              <Field as="select" name="language" className={styles.inputStyles}>
                <option value="">{t("selectLanguage")}</option>
                <option value="english">{t("english")}</option>
                <option value="lithuanian">{t("lithuanian")}</option>
                <option value="chinese">{t("chinese")}</option>
                <option value="spanish">{t("spanish")}</option>
                <option value="french">{t("french")}</option>
                <option value="german">{t("german")}</option>
                <option value="italian">{t("italian")}</option>
                <option value="portuguese">{t("portuguese")}</option>
                <option value="japanese">{t("japanese")}</option>
                <option value="russian">{t("russian")}</option>
                <option value="arabic">{t("arabic")}</option>
                <option value="hindi">{t("hindi")}</option>
                <option value="turkish">{t("turkish")}</option>
              </Field>
            </div>

            <div className={styles.fieldsBox}>
              <div className={styles.labelBox}>
                <label htmlFor="englishlanguageLevel">
                  {t("formEnglishLevel")}
                </label>
                <ErrorMessage
                  name="englishlanguageLevel"
                  component="div"
                  className={styles.errorMesage}
                />
              </div>
              <Field
                as="select"
                name="englishlanguageLevel"
                className={styles.inputStyles}
              >
                <option value="">{t("selectEnglishLevel")}</option>
                <option value="native">{t("native")}</option>
                <option value="fluent">{t("fluent")}</option>
                <option value="intermediate">{t("intermediate")}</option>
                <option value="basic">{t("basic")}</option>
              </Field>
            </div>

            <div className={styles.fieldsBox}>
              <div className={styles.labelBox}>
                <label htmlFor="location">{t("formLocation")}</label>
                <ErrorMessage
                  name="location"
                  component="div"
                  className={styles.errorMesage}
                />
              </div>
              <Field as="select" name="location" className={styles.inputStyles}>
                <option value="">{t("selectLocation")}</option>
                <option value="london">{t("london")}</option>
                <option value="paris">{t("paris")}</option>
                <option value="berlin">{t("berlin")}</option>
                <option value="madrid">{t("madrid")}</option>
                <option value="rome">{t("rome")}</option>
                <option value="lisbon">{t("lisbon")}</option>
                <option value="amsterdam">{t("amsterdam")}</option>
                <option value="athens">{t("athens")}</option>
                <option value="vilnius">{t("vilnius")}</option>
              </Field>
            </div>

            <div className={styles.fieldsBox}>
              <div className={styles.labelBox}>
                <label htmlFor="description">{t("formDescription")}</label>
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.errorMesage}
                />
              </div>
              <Field type="text" as="textarea" name="description" />
            </div>

            <div className={styles.fieldsBox}>
              <div className={styles.labelBox}>
                <label htmlFor="price">{t("formPrice")}</label>
                <ErrorMessage
                  name="price"
                  component="div"
                  className={styles.errorMesage}
                />
              </div>
              <Field
                type="number"
                name="price"
                className={styles.inputStyles}
              />
            </div>

            <div className={styles.fieldsBox}>
              <div className={styles.labelBox}>
                <label htmlFor="image">{t("formImage")}</label>
                <ErrorMessage
                  name="image"
                  component="div"
                  className={styles.errorMesage}
                />
              </div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("image", file);
                  setSelectedImage(URL.createObjectURL(file));
                }}
              />
              <div className={styles.imgBox}>
                <img
                  className={styles.imagePrew}
                  src={selectedImage}
                  alt="Preview"
                />
              </div>
            </div>

            {values.categories && (
              <div className={styles.fieldsBox}>
                <div className={styles.labelBox}>
                  <label>{t("formSkills")}</label>
                  <ErrorMessage
                    name="skills"
                    component="div"
                    className={styles.errorMesage}
                  />
                </div>
                {values.categories === "graphicsdesign" && (
                  <>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="photoshop"
                        />
                        Photoshop
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="illustrator"
                        />
                        Illustrator
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="paint" />
                        Paint
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="indesign" />
                        InDesign
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="sketch" />
                        Sketch
                      </label>
                    </div>
                  </>
                )}
                {values.categories === "digitalmarketing" && (
                  <>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="seo" />
                        SEO
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="socialmedia"
                        />
                        Social Media Marketing
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="emailmarketing"
                        />
                        Email Marketing
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="ppc" />
                        PPC Advertising
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="contentmarketing"
                        />
                        Content Marketing
                      </label>
                    </div>
                  </>
                )}
                {values.categories === "writingtranslation" && (
                  <>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="copywriting"
                        />
                        Copywriting
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="translation"
                        />
                        Translation
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="proofreading"
                        />
                        Proofreading
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="blogwriting"
                        />
                        Blog Writing
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="technicalwriting"
                        />
                        Technical Writing
                      </label>
                    </div>
                  </>
                )}
                {values.categories === "videoanimation" && (
                  <>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="animation"
                        />
                        Animation
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="videoediting"
                        />
                        Video Editing
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="motiongraphics"
                        />
                        Motion Graphics
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="vfx" />
                        VFX
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="storyboarding"
                        />
                        Storyboarding
                      </label>
                    </div>
                  </>
                )}
                {values.categories === "musicaudio" && (
                  <>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="musicproduction"
                        />
                        Music Production
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="audioediting"
                        />
                        Audio Editing
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="sounddesign"
                        />
                        Sound Design
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="voiceover"
                        />
                        Voiceover
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="podcastediting"
                        />
                        Podcast Editing
                      </label>
                    </div>
                  </>
                )}
                {values.categories === "programmingtech" && (
                  <>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="react" />
                        React
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="nodejs" />
                        Node.js
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="javascript"
                        />
                        JavaScript
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="python" />
                        Python
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="java" />
                        Java
                      </label>
                    </div>
                  </>
                )}
                {values.categories === "data" && (
                  <>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="dataanalysis"
                        />
                        Data Analysis
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="machinelearning"
                        />
                        Machine Learning
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="datavisualization"
                        />
                        Data Visualization
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field type="checkbox" name="skills" value="bigdata" />
                        Big Data
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="databases"
                        />
                        Databases
                      </label>
                    </div>
                  </>
                )}
                {values.categories === "aiservices" && (
                  <>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="machinelearning"
                        />
                        Machine Learning
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="naturallanguageprocessing"
                        />
                        Natural Language Processing
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="computervision"
                        />
                        Computer Vision
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="speechrecognition"
                        />
                        Speech Recognition
                      </label>
                    </div>
                    <div>
                      <label>
                        <Field
                          type="checkbox"
                          name="skills"
                          value="automation"
                        />
                        Automation
                      </label>
                    </div>
                  </>
                )}
              </div>
            )}
            <button className={styles.submitBtn} type="submit">
              {t("submitbtn")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubmissionServices;
