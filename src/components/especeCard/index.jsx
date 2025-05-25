import { Link } from "react-router-dom";
import "./especeCard.css";

const EspeceCard = ({ espece }) => {
  // Handle both single image_url or multiple images in an array
  const image_1 = espece.image_1;
  const image_2 = espece.image_2;
  const image_3 = espece.image_3;

  const images = [];
  if (image_1) images.push(image_1);
  if (image_2) images.push(image_2);
  if (image_3) images.push(image_3);

  // Fallback if no images at all
  if (!images.length) {
    images.push("https://via.placeholder.com/220x180?text=No+Image");
  }

  const carouselId = `carousel-${espece.id_espece}`;

  return (
    <div className="espece-card">
      <div className="espece-image">
        {images.length === 1 ? (
          // Single image, no carousel needed
          <img src={images[0]} alt={espece.libelle} className="card-img" />
        ) : (
          // Multiple images, use carousel
          <div
            id={carouselId}
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={img}
                    className="d-block w-100 card-img"
                    alt={`${espece.libelle} - image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="espece-details">
        <h3 className="espece-title">{espece.libelle}</h3>
        <Link
          to={`/espece/readOne/${espece.id_espece}`}
          className="btn btn-primary btn-sm"
        >
          Voir détails
        </Link>
      </div>
    </div>
  );
};

export default EspeceCard;
