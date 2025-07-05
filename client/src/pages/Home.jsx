import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <br />
      <main className="hero-section-main">
        <div className="container grid grid-two-col">
          <div className="hero-content">
            <h1>Your Body Talks. We Help You Listen.</h1>
            <p className="paragraph">
              Welcome to MediQ, your smart health companion. Using advanced
              AI-powered algorithms, we help you identify potential health risks
              before symptoms even appear. Whether you're feeling unwell or just
              curious, MediQ gives you instant, intelligent insights—so you can
              take charge of your well-being with confidence.
            </p>
            <NavLink to="/predict">
              <button className=".hero-button">
                Predict Now <FaLongArrowAltRight />{" "}
              </button>
            </NavLink>
          </div>
          <div className="hero-image">
            <img
              src="/images/disease.png"
              alt="disease image"
              className="banner-image"
            />
          </div>
        </div>
      </main>
      <div className="container">
        <div className="grid-two-col">
          <img
            src="/images/about.png"
            alt="register"
            width="500"
            height="500"
          />
          <section className="about-section">
            <h1>🧬 About Our Disease Prediction App</h1>
            <h2>Welcome to your AI-powered health assistant!</h2>
            <p>
              Our Disease Prediction App helps users gain early insights into
              potential illnesses based on the symptoms they experience — all
              from the comfort of their home.
            </p>

            <h2>💡 What We Do</h2>
            <p>
              We use Machine Learning algorithms trained on real medical data to
              analyze the symptoms you enter and predict likely diseases. This
              tool is not a replacement for medical professionals but serves as
              a first-level advisory system to help you understand what your
              body might be telling you.
            </p>

            <h2>🚀 Key Features</h2>
            <p>
              • Symptom-Based Disease Prediction
              <br />
              • Accurate & Fast
              <br />
              • User-Friendly Interface
              <br />• Data Privacy First
            </p>

            <h2>⚠️ Disclaimer</h2>
            <p>
              This tool is meant for educational and preliminary awareness
              purposes only. It does not replace professional medical advice.
              Always consult a certified doctor for serious or persistent
              symptoms.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}