import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { generateDateTime } from "../../../utils/generateDate";

const ValidateContribution = () => {
  const { id_contribution } = useParams();
  let actualUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [contribution, setContribution] = useState({});

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch contribution data
    axios
      .get(`${API_URL}/contribution/readOne/${id_contribution}`)
      .then((response) => setContribution(response.data))
      .catch((error) => console.error("Error fetching contribution:", error));
  }, [id_contribution]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContribution((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (actualUser !== undefined && actualUser.role === "admin") {
      const API_URL = import.meta.env.VITE_API_URL;
      const formData = new FormData();

      formData.append("validation", "1");
      formData.append("id_contribution", contribution.id_contribution);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${API_URL}/contribution/validation`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      try {
        const response = await axios.request(config);
        if (response.status === 200) {
          toast.success("Validation effectuée avec succès");
          setTimeout(() => {
            navigate("/backContribution");
          }, 3000);
        }
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message || "An error occurred"
          : "An error occurred";
        toast.error(errorMessage);
      }
    } else {
      toast.error("Vous ne disposez pas des droits pour cette modification");
      navigate("/home");
    }
  };

  return (
    <div className="main-table">
      <div className="center">
        <h2>Modifier la contribution</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 mx-auto">
          <div className="form-group">
            <label htmlFor="id_contribution">ID de la contribution</label>
            <input
              type="text"
              className="form-control"
              id="id_contribution"
              name="id_contribution"
              value={contribution.id_contribution || ""}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_creation">Date de création</label>
            <input
              type="text"
              className="form-control"
              id="date_creation"
              name="date_creation"
              value={generateDateTime(contribution.date_creation) || ""}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="validation">Validation</label>
            <select
              className="form-control"
              id="validation"
              name="validation"
              value={contribution.validation || ""}
              onChange={handleInputChange}
            >
              <option value="">Sélectionner une option</option>
              <option value="0">Non validée</option>
              <option value="1">Validée</option>
            </select>
          </div>
          <div className="center mt-4">
            <button className="btn btn-primary" type="submit">
              Modifier
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ValidateContribution;
