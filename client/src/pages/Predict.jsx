import { useEffect, useState, useTransition } from "react";
import { predictDisease } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import organs from "../api/organs.json";
import DiseaseCard from "../components/layout/DiseaseCard";

export const Predict = () => {
  const [isPending, startTransition] = useTransition();
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    startTransition(async () => {
      const testSymptoms = ["nausea", "cough", "headache"];
      try {
        const res = await predictDisease(testSymptoms);
        setDiseases(res.data); // ✅ wrap in array
      } catch (error) {
        setDiseases(["Error occurred."]); // ✅ wrap in array
        console.log(error);
      }
    });
  }, []);
  console.log(diseases);
  if (isPending) return <Loader />;

  

  return (
    <div className="container" style={{ padding: "2rem 2rem" }}>
      
      <h1 className="predict-title">
        Select an Organ System
      </h1>

      <ul className="predict-card">
        {organs.map((item) => (
          <DiseaseCard
            key={item.id}
            organ={item.organ}
            image={item.image}
          />
        ))}
      </ul>
    </div>
  );
};
