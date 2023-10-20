import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const SubmissionServices = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const { accessToken } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("categories", categories);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/services", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Paslauga sėkmingai įkelta!");
      } else {
        alert("Įvyko klaida įkeliant paslaugą.");
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
