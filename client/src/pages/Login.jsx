import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/login"

export const Login = () => {

  const [user, setUser] = useState({
      email: "",
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
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
        const res_data = await response.json();
        if (response.ok) {
          toast.success("Login Successful");
          storeTokenInLS(res_data.token);
          setUser({
            email: "",
            password: "",
          })
        navigate("/")
        }
        else {
          toast.error(
            res_data.extraDetails ? res_data.extraDetails : res_data.message
          );
        }      
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <div className="container">
      <div className="grid-two-col">
        <img src="/images/login.png" alt="register" width="500" height="500" />
        <section className="section-contact">
          <h2 className="container-title">Login</h2>
          <div className="contact-wrapper container">
            <form onSubmit={handleFormSubmit}>
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
                <label htmlFor="password">Password: </label>
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

              <button type="submit">Login</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
