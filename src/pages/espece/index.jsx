import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Import component
import Famille from "../../components/famille";
import Habitat from "../../components/habitat";
import Temperament from "../../components/temperament";
import Commentaires from "../../components/commentaires";

// Import CSS
import "./espece.css";

const Espece = () => {
  const { id_espece } = useParams();
  const [espece, setEspece] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // Placeholder image for errors
  const placeholderImage =
    "https://res.cloudinary.com/dfmbhkfao/image/upload/v1716664401/fish_species/placeholder_fish_kcwuxn.jpg";

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchEspece = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/espece/readOne/${id_espece}`
        );
        setEspece(response.data.espece);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching espece:", error);
        toast.error("Erreur lors du chargement des données de l'espèce");
        setLoading(false);
      }
    };

    fetchEspece();
  }, [id_espece]);

  // Function to optimize Cloudinary URLs
  const optimizeCloudinaryUrl = (url, width = 600, height = 400) => {
    if (!url) return placeholderImage;

    // Check if it's a Cloudinary URL
    if (url.includes("cloudinary.com")) {
      // Parse the URL to insert transformation parameters
      const parts = url.split("/upload/");
      if (parts.length === 2) {
        // Add auto format, quality, and resize transformations
        return `${parts[0]}/upload/c_fill,w_${width},h_${height},q_auto,f_auto/${parts[1]}`;
      }
    }

    // Return original URL if not Cloudinary or can't be parsed
    return url;
  };

  // Handle image errors
  const handleImageError = (index) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Handle image navigation
  const handleNextImage = () => {
    if (espece) {
      const imageCount = [
        espece.image_1,
        espece.image_2,
        espece.image_3,
      ].filter((img) => img).length;
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }
  };

  const handlePrevImage = () => {
    if (espece) {
      const imageCount = [
        espece.image_1,
        espece.image_2,
        espece.image_3,
      ].filter((img) => img).length;
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + imageCount) % imageCount
      );
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">Chargement des données de l'espèce...</p>
      </div>
    );
  }

  if (!espece) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Cette espèce n'existe pas ou a été supprimée.
        </div>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Prepare image gallery
  const images = [espece.image_1, espece.image_2, espece.image_3]
    .filter((img) => img)
    .filter((_, index) => !imageErrors[index]);

  const currentImage = images[currentImageIndex] || placeholderImage;

  return (
    <div className="espece-page container py-4">
      <h1 className="text-center mb-4">{espece.nom_commun}</h1>
      <h3 className="text-center text-muted mb-4">{espece.nom_scientifique}</h3>

      <div className="row">
        {/* Left Column - Component Details */}
        <div className="col-md-4">
          <div className="component-container mb-4">
            <h3 className="component-title">Famille</h3>
            <Famille id_famille={espece.id_famille} />
          </div>

          <div className="component-container mb-4">
            <h3 className="component-title">Habitat</h3>
            <Habitat id_habitat={espece.id_habitat} />
          </div>

          <div className="component-container mb-4">
            <h3 className="component-title">Tempérament</h3>
            <Temperament id_temperament={espece.id_temperament} />
          </div>
        </div>

        {/* Right Column - Species Info & Images */}
        <div className="col-md-8">
          {/* Image Gallery */}
          <div className="image-gallery mb-4">
            <div className="main-image-container">
              <img
                src={optimizeCloudinaryUrl(currentImage)}
                alt={espece.nom_commun}
                className="main-image img-fluid rounded"
                onError={() => handleImageError(currentImageIndex)}
              />
              {images.length > 1 && (
                <div className="gallery-controls">
                  <button
                    className="gallery-control prev"
                    onClick={handlePrevImage}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button
                    className="gallery-control next"
                    onClick={handleNextImage}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="thumbnail-container mt-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={optimizeCloudinaryUrl(img, 120, 80)}
                    alt={`${espece.nom_commun} - vue ${index + 1}`}
                    className={`thumbnail ${
                      currentImageIndex === index ? "active" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    onError={() => handleImageError(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Species Details */}
          <div className="species-details">
            <h3 className="details-title">Détails de l'espèce</h3>

            <div className="detail-item">
              <span className="detail-label">Description:</span>
              <p className="detail-value">{espece.description}</p>
            </div>

            <div className="detail-item">
              <span className="detail-label">Taille maximale:</span>
              <span className="detail-value">{espece.taille_max} cm</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Alimentation:</span>
              <span className="detail-value">{espece.alimentation}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Température optimale:</span>
              <span className="detail-value">{espece.temperature}°C</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Difficulté:</span>
              <span className="detail-value">{espece.dificulte}</span>
            </div>

            <div className="mt-4">
              <Link
                to={`/contribution/create/${id_espece}`}
                className="btn btn-primary"
              >
                Proposer une modification
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section at the bottom */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="comments-section p-4 bg-light rounded">
            <Commentaires id_espece={id_espece} />

            <div className="text-center mt-4">
              <Link
                to={`/commentaire/create/${id_espece}`}
                className="btn btn-success"
              >
                Ajouter un commentaire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Espece;
