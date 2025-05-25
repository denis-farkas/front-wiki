import "./home.css";
import EspecesByFamille from "../especes";
const Home = () => {
  return (
    <div className="container">
      <h1>Wiki Poissons</h1>
      <p>
        Bienvenue sur Wiki Poissons, votre ressource en ligne pour tout ce qui
        concerne les poissons. Explorez notre base de données d'espèces,
        découvrez leurs caractéristiques et apprenez-en plus sur leur habitat.
      </p>
      <p>
        Que vous soyez un passionné d'aquariophilie, un étudiant en biologie
        marine ou simplement curieux, vous trouverez ici une mine d'informations
        sur les poissons du monde entier.
      </p>
      <p>
        Parcourez les espèces par famille pour découvrir la diversité des
        poissons et leurs particularités. Chaque espèce est accompagnée de
        détails essentiels, y compris des images, des descriptions et des
        informations sur leur habitat.
      </p>
      <EspecesByFamille />
    </div>
  );
};

export default Home;
