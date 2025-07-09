import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`https://disease-predictor-1-a2y1.onrender.com/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("res from server", res_data);
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message);
      }
      console.log(response);      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="grid-two-col">
        <img
          src="/images/register.png"
          alt="register"
          width="500"
          height="500"
        />
        <section className="section-contact">
          <h2 className="container-title">Register</h2>
          <div className="contact-wrapper container">
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="username">User Name:</label>
                <input
                  type="text"
                  className="form-control bg-green-box"
                  required
                  placeholder="Enter your name"
                  name="username"
                  autoComplete="off"
                  id="username"
                  value={user.username}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control bg-green-box"
                  required
                  placeholder="Enter your email"
                  name="email"
                  autoComplete="off"
                  id="email"
                  value={user.email}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="number"
                  className="form-control bg-green-box"
                  required
                  placeholder="Enter your phone number"
                  name="phone"
                  autoComplete="off"
                  id="phone"
                  value={user.phone}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control bg-green-box"
                  required
                  placeholder="Enter your password"
                  name="password"
                  autoComplete="off"
                  id="password"
                  value={user.password}
                  onChange={handleInput}
                />
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
