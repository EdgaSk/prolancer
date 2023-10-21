import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { postServices } from "../api/services";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const SubmissionServices = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const { accessToken, userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userId", userData.userId);
    formData.append("title", title);
    formData.append("categories", categories);
    formData.append("description", description);
    formData.append("image", image, image.name);
    console.log(image);
    console.log(image.name);
    try {
      const response = await postServices(accessToken, formData);

      if (response) {
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categories"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmissionServices;
