import React, { useEffect, useState } from "react";
import axios from "axios";
import EspeceCard from "../../components/especeCard";

function groupByFamille(especes) {
  return especes.reduce((acc, espece) => {
    if (!acc[espece.famille]) acc[espece.famille] = [];
    acc[espece.famille].push(espece);
    return acc;
  }, {});
}

export default function EspecesByFamille() {
  const [grouped, setGrouped] = useState({});
  const [especes, setEspeces] = useState([]);

  useEffect(() => {
    let data;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3009/espece/read",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setEspeces(response.data.especes);
      })
      .catch((error) => {
        console.log(error);
      });

    setGrouped(groupByFamille(especes));
  }, [especes]);

  return (
    <div>
      <h1>Espèces par Famille</h1>
      {Object.entries(grouped).map(([famille, especes]) => (
        <div key={famille} style={{ marginBottom: "2rem" }}>
          <h2>{famille}</h2>
          <div
            className="espece-cards-container"
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          >
            {especes.map((espece) => (
              <EspeceCard key={espece.id_espece} espece={espece} />
            ))}
          </div>
          <hr />
          <p style={{ fontStyle: "italic", color: "#666" }}>
            {especes.length} espèces trouvées
          </p>
        </div>
      ))}
    </div>
  );
}
