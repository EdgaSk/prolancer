import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { postServices } from "../api/services";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const SubmissionServices = () => {
  const { accessToken, userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("userId", userData.userId);
      formData.append("title", values.title);
      formData.append("categories", values.categories);
      formData.append("description", values.description);
      formData.append("image", values.image, values.image.name);

      const response = await postServices(accessToken, formData);

      if (response) {
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listingSchemaYup = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    categories: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
  });

  return (
    <Formik
      initialValues={{
        title: "",
        categories: "",
        description: "",
        image: "",
      }}
      validationSchema={listingSchemaYup}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <Field as="select" name="categories">
              <option value="">Select a category</option>
              <option value="Web Development">Web Development</option>
              {/* Other categories */}
            </Field>
            <ErrorMessage name="categories" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" />
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
              }}
            />
            <ErrorMessage name="image" component="div" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default SubmissionServices;

// const SubmissionServices = () => {
//   const [title, setTitle] = useState("");
//   const [categories, setCategories] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const { accessToken, userData } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("userId", userData.userId);
//     formData.append("title", title);
//     formData.append("categories", categories);
//     formData.append("description", description);
//     formData.append("image", image, image.name);
//     console.log(image);
//     console.log(image.name);
//     try {
//       const response = await postServices(accessToken, formData);

//       if (response) {
//         navigate(`/dashboard`);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Categories"
//         value={categories}
//         onChange={(e) => setCategories(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default SubmissionServices;
