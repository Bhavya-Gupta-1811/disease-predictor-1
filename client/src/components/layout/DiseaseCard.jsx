import { NavLink } from "react-router-dom";
const DiseaseCard = ({ organ, image, onClick }) => {
  return (
    <li
      className="organ-card"
      onClick={onClick}
      style={{ listStyleType: "none", cursor: "pointer" }}
    >
      <NavLink to={`/predict/${organ}`}>
        <img src={image} alt={organ} />
        <h3>{organ}</h3>
      </NavLink>
    </li>
  );
};

export default DiseaseCard;
