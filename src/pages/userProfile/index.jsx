import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userService } from "../../utils/userService";
import UserContributions from "../../components/userContributions";
import UserCommentaires from "../../components/userCommentaires";
import "./userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState("");
  let actualUser = JSON.parse(localStorage.getItem("user"));
  const id = actualUser.userId;
  const navigate = useNavigate();
  const VITE_URL_API = import.meta.env.VITE_URL_API;

  useEffect(() => {
    let data;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_URL_API}/users/readOneUser?id=${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, VITE_URL_API]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== undefined || user.role === "admin") {
      const token = actualUser.token;
      user.userId = id;
      let data = { user };
      let errorMessage;
      data = JSON.stringify(data);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/users/updateUser",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Modification validée");
            userService.update();
            setTimeout(() => {
              navigate("/signIn");
            }, 3000);
          }
        })
        .catch((error) => {
          errorMessage = error.response?.data?.message || "An error occurred";
          toast.error(errorMessage);
        });
    } else {
      const errorMessage =
        "Vous ne disposez pas des droits pour cette modification";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="main">
      <h2>Mes informations personnelles</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="pseudo">
            Pseudo
          </label>
          <input
            id="pseudo"
            aria-label="Entrez votre adresse pseudo"
            className="form-control"
            type="text"
            name="pseudo"
            value={user && user.pseudo}
            onChange={handleInputChange}
            required
          />
          <div className="mb-3">
            <label className="form-label" htmlFor="mdp">
              Mot de passe
            </label>
            <input
              id="mdp"
              aria-label="Entrez votre mot de passe"
              className="form-control"
              type="password"
              name="mdp"
              placeholder="Entrez votre mot de passe ou un nouveau"
              onChange={handleInputChange}
              required="required"
            />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
      <h2>Mes commentaires</h2>
      <UserCommentaires />
      <h2>Mes contributions</h2>
      <UserContributions />
    </div>
  );
};

export default UserProfile;
