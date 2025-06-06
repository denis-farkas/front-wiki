import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { generateDateTime } from "../../../utils/generateDate";

const EditContribution = () => {
  const { id_contribution } = useParams();
  let actualUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [contribution, setContribution] = useState({});
  const [temperaments, setTemperaments] = useState([]);
  const [familles, setfamilles] = useState([]);
  const [habitats, setHabitats] = useState([]);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch contribution data
    axios
      .get(`${API_URL}/contribution/readOne/${id_contribution}`)
      .then((response) => setContribution(response.data))
      .catch((error) => console.error("Error fetching contribution:", error));

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
  }, [id_contribution]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContribution((prevData) => ({
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
    if (
      actualUser !== undefined &&
      actualUser.role === "user" &&
      actualUser.idUser === contribution.user_id &&
      contribution.validation === 0
    ) {
      const API_URL = import.meta.env.VITE_API_URL;
      const formData = new FormData();

      // Append all text data
      formData.append("nom_commun", contribution.nom_commun);
      formData.append("nom_scientifique", contribution.nom_scientifique);
      formData.append("description", contribution.description);
      formData.append("taille_max", contribution.taille_max);
      formData.append("alimentation", contribution.alimentation);
      formData.append("temperature", contribution.temperature);
      formData.append("dificulte", contribution.dificulte);
      formData.append("id_temperament", contribution.id_temperament);
      formData.append("id_famille", contribution.id_famille);
      formData.append("id_habitat", contribution.id_habitat);
      formData.append("date_creation", generateDateTime());

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

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${API_URL}/contribution/update/${id_contribution}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      try {
        const response = await axios.request(config);
        if (response.status === 200) {
          toast.success("Modification effectuée avec succès");
          setTimeout(() => {
            navigate("/userContributions");
          }, 3000);
        }
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message || "An error occurred"
          : "An error occurred";
        toast.error(errorMessage);
      }
    } else {
      toast.error(
        "Vous ne disposez pas des droits pour cette modification ou elle a déja été validée. Dans ce cas vous devez en créer une nouvelle"
      );
      navigate("/home");
    }
  };

  return (
    <div className="main-table">
      <div className="center">
        <h2>Modifier la contribution à l'Espèce</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 mx-auto">
          <div className="mt-4">
            <label className="form-label">Nom Commun</label>
            <input
              type="text"
              className="form-control"
              name="nom_commun"
              value={contribution.nom_commun || ""}
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
              value={contribution.nom_scientifique || ""}
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
              value={contribution.description || ""}
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
              value={contribution.taille_max || ""}
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
              value={contribution.alimentation || ""}
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
              value={contribution.temperature || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label">Difficulté</label>
            <select
              className="form-control"
              name="dificulte"
              value={contribution.dificulte || ""}
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
              value={contribution.id_temperament || ""}
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
            <label className="form-label">Catégorie</label>
            <select
              className="form-control"
              name="id_famille"
              value={contribution.id_famille || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
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
              value={contribution.id_habitat || ""}
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
            Modifier contribution
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContribution;
