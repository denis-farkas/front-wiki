import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Commentaires = ({ id_espece }) => {
  const [commentaires, setCommentaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    if (!id_espece) return;
    setLoading(true);

    fetch(`${API_URL}/commentaire/read/${id_espece}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentaires(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id_espece]);

  if (loading) return <div>Chargement des commentaires...</div>;
  if (!commentaires.length)
    return <div>Aucun commentaire pour cette espèce.</div>;
  let actualUser = JSON.parse(localStorage.getItem("user"));

  const deleteComment = (commentId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire?")) {
      const API_URL = import.meta.env.VITE_API_URL;

      fetch(`${API_URL}/commentaire/delete/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Remove the comment from the state
            setCommentaires(
              commentaires.filter(
                (comment) => comment.id_commentaire !== commentId
              )
            );
          } else {
            throw new Error("Erreur lors de la suppression");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Optionally show an error message to the user
        });
    }
  };
  return (
    <div>
      <h3>Commentaires</h3>
      <ul>
        {commentaires.map((commentaire) => (
          <li key={commentaire.id_commentaire}>
            <strong>{commentaire.user_id}:</strong> {commentaire.texte}
            {actualUser && actualUser.id === commentaire.user_id && (
              <div>
                <button
                  onClick={() => {
                    navigate(
                      "/commentaire/update/" + commentaire.id_commentaire
                    ); // Logic to edit the comment
                    console.log("Edit comment:", commentaire.id_commentaire);
                  }}
                >
                  Modifier votre commentaire
                </button>
                <button
                  onClick={() => {
                    deleteComment(commentaire.id_commentaire);
                    console.log("Delete comment:", commentaire.id_commentaire);
                  }}
                >
                  Supprimer votre commentaire
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Commentaires;
