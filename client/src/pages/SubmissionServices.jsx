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
        <Form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <Field as="select" name="categories">
              <option value="">Select Category</option>
              <option value="graphicsdesign">{t("graphicsdesign")}</option>
              <option value="digitalmarketing">{t("digitalmarketing")}</option>
              <option value="writingtranslation">
                {t("writingtranslation")}
              </option>
              <option value="videoanimation">{t("videoanimation")}</option>
              <option value="musicaudio">{t("musicaudio")}</option>
              <option value="programmingtech">{t("programmingtech")}</option>
              <option value="data">{t("data")}</option>
              <option value="aiservices">{t("aiservices")}</option>
            </Field>
            <ErrorMessage name="categories" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <Field as="select" name="language">
              <option value="">Select a language</option>
              <option value="english">English</option>
              <option value="lithuanian">Lithuanian</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="italian">Italian</option>
              <option value="portuguese">Portuguese</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="russian">Russian</option>
              <option value="arabic">Arabic</option>
              <option value="hindi">Hindi</option>
              <option value="turkish">Turkish</option>
            </Field>
            <ErrorMessage name="categories" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="englishlanguageLevel">English Language Level</label>
            <Field as="select" name="englishlanguageLevel">
              <option value="">Select a level</option>
              <option value="native">Native</option>
              <option value="fluent">Fluent</option>
              <option value="intermediate">Intermediate</option>
              <option value="basic">Basic</option>
            </Field>
            <ErrorMessage name="englishlanguageLevel" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <Field as="select" name="location">
              <option value="">Select a location</option>
              <option value="london">London</option>
              <option value="paris">Paris</option>
              <option value="berlin">Berlin</option>
              <option value="madrid">Madrid</option>
              <option value="rome">Rome</option>
              <option value="lisbon">Lisbon</option>
              <option value="amsterdam">Amsterdam</option>
              <option value="athens">Athens</option>
              <option value="vilnius">Vilnius</option>
            </Field>
            <ErrorMessage name="location" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field type="text" as="textarea" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="price">Price / hr</label>
              <Field type="number" name="price" />
              <ErrorMessage name="price" component="div" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
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
            <div>
              <img
                src={selectedImage}
                alt="Preview"
                style={{ maxWidth: "100px" }}
              />
            </div>
            <ErrorMessage name="image" component="div" />
          </div>
          {values.categories && (
            <div className="form-group">
              <label>Skills</label>
              {values.categories === "graphicsdesign" && (
                <>
                  <div>
                    <label>
                      <Field type="checkbox" name="skills" value="photoshop" />
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
                      <Field type="checkbox" name="skills" value="animation" />
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
                      <Field type="checkbox" name="skills" value="voiceover" />
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
                      <Field type="checkbox" name="skills" value="javascript" />
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
                      <Field type="checkbox" name="skills" value="databases" />
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
                      <Field type="checkbox" name="skills" value="automation" />
                      Automation
                    </label>
                  </div>
                </>
              )}
              <ErrorMessage name="skills" component="div" />
            </div>
          )}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default SubmissionServices;
