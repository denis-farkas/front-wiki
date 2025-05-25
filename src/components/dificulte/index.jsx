import React, { useState, useEffect } from "react";
import "./dificulte.css"; // You'll need to create this file for custom styles

const Dificulte = ({ id_dificulte }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [dificulte, setDificulte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id_dificulte) return;
    setLoading(true);

    fetch(`${API_URL}/dificulte/read/${id_dificulte}`)
      .then((res) => {
        if (!res.ok) throw new Error("Couldn't fetch dificulte data");
        return res.json();
      })
      .then((data) => {
        setDificulte(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dificulte data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id_dificulte, API_URL]);

  if (loading) return <div className="dificulte-card">Chargement...</div>;
  if (error) return <div className="dificulte-card">Erreur: {error}</div>;
  if (!dificulte)
    return <div className="dificulte-card">Aucun dificulte trouvé</div>;

  return (
    <div className="dificulte-card" style={{ width: "350px" }}>
      <div className="card-body">
        <h5 className="card-title">{dificulte.libelle}</h5>
        <p className="card-text">{dificulte.description}</p>
      </div>
    </div>
  );
};

export default Dificulte;
