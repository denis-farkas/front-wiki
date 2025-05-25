import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { generateDateTime } from "../../../utils/generateDate";

const BackEspeceCreate = () => {
  let actualUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [espece, setEspece] = useState({});
  const [temperaments, setTemperaments] = useState([]);
  const [familles, setfamilles] = useState([]);
  const [habitats, setHabitats] = useState([]);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch temperaments
    axios
      .get(`${API_URL}/temperament/read`)
      .then((response) => setTemperaments(response.data))
      .catch((error) => console.error("Error fetching temperaments:", error));

    // Fetch familles
    axios
      .get(`${API_URL}/famille/read`)
      .then((response) => setfamilles(response.data))
      .catch((error) => console.error("Error fetching familles:", error));

    // Fetch habitats
    axios
      .get(`${API_URL}/habitat/read`)
      .then((response) => setHabitats(response.data))
      .catch((error) => console.error("Error fetching habitats:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEspece((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (actualUser !== undefined && actualUser.role === "admin") {
      const API_URL = import.meta.env.VITE_API_URL;
      const formData = new FormData();

      // Append all text data
      formData.append("nom_commun", espece.nom_commun);
      formData.append("nom_scientifique", espece.nom_scientifique);
      formData.append("description", espece.description);
      formData.append("taille_max", espece.taille_max);
      formData.append("alimentation", espece.alimentation);
      formData.append("temperature", espece.temperature);
      formData.append("dificulte", espece.dificulte);
      formData.append("id_temperament", espece.id_temperament);
      formData.append("id_famille", espece.id_famille);
      formData.append("id_habitat", espece.id_habitat);
      formData.append("cree_le", generateDateTime());

      // Append images if they exist
      if (e.target.image_1.files[0]) {
        formData.append("image_1", e.target.image_1.files[0]);
      }
      if (e.target.image_2.files[0]) {
        formData.append("image_2", e.target.image_2.files[0]);
      }
      if (e.target.image_3.files[0]) {
        formData.append("image_3", e.target.image_3.files[0]);
      }
      const token = actualUser.token;
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API_URL}/espece/create`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      try {
        const response = await axios.request(config);
        if (response.status === 201) {
          toast.success("Création effectuée avec succès");
          setTimeout(() => {
            navigate("/backEspece");
          }, 3000);
        }
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message || "An error occurred"
          : "An error occurred";
        toast.error(errorMessage);
      }
    } else {
      toast.error("Vous ne disposez pas des droits pour cette création");
      navigate("/home");
    }
  };

  return (
    <div className="main-table">
      <div className="center">
        <h2>Nouvelle Espèce</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 mx-auto">
          <div className="mt-4">
            <label className="form-label">Nom Commun</label>
            <input
              type="text"
              className="form-control"
              name="nom_commun"
              value={espece.nom_commun || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label">Nom Scientifique</label>
            <input
              type="text"
              className="form-control"
              name="nom_scientifique"
              value={espece.nom_scientifique || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="4"
              value={espece.description || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label">Taille Maximum (cm)</label>
            <input
              type="number"
              className="form-control"
              name="taille_max"
              value={espece.taille_max || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label">Alimentation</label>
            <input
              type="text"
              className="form-control"
              name="alimentation"
              value={espece.alimentation || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label">Température (°C)</label>
            <input
              type="number"
              className="form-control"
              name="temperature"
              value={espece.temperature || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label">Difficulté</label>
            <select
              className="form-control"
              name="dificulte"
              value={espece.dificulte || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez une difficulté</option>
              <option value="Debutant">Débutant</option>
              <option value="Intermediaire">Intermédiaire</option>
              <option value="Confirme">Confirmé</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="form-label">Tempérament</label>
            <select
              className="form-control"
              name="id_temperament"
              value={espece.id_temperament || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez un tempérament</option>
              {temperaments.map((temp) => (
                <option key={temp.id_temperament} value={temp.id_temperament}>
                  {temp.libelle}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="form-label">Famille</label>
            <select
              className="form-control"
              name="id_famille"
              value={espece.id_famille || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez une famille</option>
              {familles.map((cat) => (
                <option key={cat.id_famille} value={cat.id_famille}>
                  {cat.libelle}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="form-label">Habitat</label>
            <select
              className="form-control"
              name="id_habitat"
              value={espece.id_habitat || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez un habitat</option>
              {habitats.map((hab) => (
                <option key={hab.id_habitat} value={hab.id_habitat}>
                  {hab.libelle}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="form-label">Image 1</label>
            <input
              type="file"
              className="form-control"
              name="image_1"
              onChange={(e) => handleImageChange(e, setImagePreview1)}
              accept="image/*"
              required
            />
            {imagePreview1 && (
              <img
                src={imagePreview1}
                alt="Preview 1"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
          </div>
          <div className="mt-4">
            <label className="form-label">Image 2 (optionnel)</label>
            <input
              type="file"
              className="form-control"
              name="image_2"
              onChange={(e) => handleImageChange(e, setImagePreview2)}
              accept="image/*"
            />
            {imagePreview2 && (
              <img
                src={imagePreview2}
                alt="Preview 2"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
          </div>
          <div className="mt-4">
            <label className="form-label">Image 3 (optionnel)</label>
            <input
              type="file"
              className="form-control"
              name="image_3"
              onChange={(e) => handleImageChange(e, setImagePreview3)}
              accept="image/*"
            />
            {imagePreview3 && (
              <img
                src={imagePreview3}
                alt="Preview 3"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
          </div>
        </div>
        <div className="center mt-4">
          <button className="btn btn-primary" type="submit">
            Créer
          </button>
        </div>
      </form>
    </div>
  );
};

export default BackEspeceCreate;
