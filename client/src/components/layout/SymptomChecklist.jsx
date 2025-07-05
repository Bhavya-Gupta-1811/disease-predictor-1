import { useState, useTransition } from "react";
import { predictDisease } from "../../api/postApi";
import { Loader } from "../UI/Loader";
import symptomsData from "../../api/symptoms.json";
import { useNavigate, useParams } from "react-router-dom";

export const SymptomChecklist = () => {
  const { id: selectedOrgan } = useParams();
  const [isPending, startTransition] = useTransition();
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [predictedDisease, setPredictedDisease] = useState(null);
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(0);

  const symptoms = symptomsData[selectedOrgan] || [];

  const handleSymptomSelect = (symptom, isYes) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [symptom]: isYes,
    }));
  };

  const handleSubmit = async () => {
    // const symptomsPayload = [];

    // Object.keys(symptomsData).forEach((organ) => {
    //   symptomsData[organ].forEach((symptom) => {
    //     symptomsPayload.push(selectedSymptoms[symptom] ? 1 : 0);
    //   });
    // });

    const symptomsPayload = Object.keys(selectedSymptoms).filter(
      (symptom) => selectedSymptoms[symptom] === true
    );        

    startTransition(async () => {
      try {
        const response = await predictDisease(symptomsPayload);
        setPredictedDisease(response.disease || "No disease found");
      } catch (error) {
        console.error("Error in disease prediction:", error);
        setPredictedDisease("Error occurred during prediction.");
      }
    });
  };

  const handleChatLoad = () => {
    setQuestionCount((prev) => {
      const updatedCount = prev + 1;
      if (updatedCount > 5) {
        alert("You’ve asked more than 5 questions. Please login to continue.");
        navigate("/register");
      }
      return updatedCount;
    });
  };
  
  
  if (isPending) return <Loader />;
  return (
    <div className="container symptomdiv">
      <h1 className="symptomh1">
        Select the symptoms related to <span>{selectedOrgan}</span>
      </h1>

      {symptoms.length === 0 ? (
        <p>No symptoms available for this organ.</p>
      ) : (
        <ul className="symptomul">
          {symptoms.map((symptom) => (
            <li key={symptom} className="symptomli">
              <div className="symptomrow">
                <label className="symptomlabel">
                  {symptom
                    .replaceAll("_", " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :
                </label>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleSymptomSelect(symptom, true)}
                    className="symptombtn"
                    style={{
                      backgroundColor: selectedSymptoms[symptom]
                        ? "#2ecc71"
                        : "#bdc3c7",
                    }}
                  >
                    Yes
                  </button>

                  <button
                    onClick={() => handleSymptomSelect(symptom, false)}
                    className={`symptombtn2 ${
                      selectedSymptoms[symptom] === false
                        ? "not-selected"
                        : "selected"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {symptoms.length > 0 && (
        <div className="primary-btn-container">
          <button onClick={handleSubmit}>Predict Disease</button>
        </div>
      )}

      {isPending && <Loader />}

      {predictedDisease && (
        <>
          <div className="newtitle">
            Predicted Disease:
            <span className="prediction">{predictedDisease}</span>
          </div>

          <div className="chatbot-section" style={{ marginTop: "3rem" }}>
            <h2 style={{ marginBottom: "1rem", fontSize:"3rem" }}>
              Ask anything about{" "}
              <span style={{ color: "teal" }}>{predictedDisease}</span>:
            </h2>

            <iframe
              src="https://www.chatbase.co/chatbot-iframe/ydXRYvIglFvNqRopUTEus"
              width="100%"
              height="500"
              style={{ border: "none", borderRadius: "10px" }}
              title="AI Chatbot"
              onLoad={handleChatLoad}
            ></iframe>

            <p style={{ fontSize: "0.9rem", color: "gray" }}>
              (Only 5 questions allowed without login. Current used:{" "}
              {questionCount})
            </p>
          </div>
        </>
      )}
    </div>
  );
};