import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};
export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user && userData) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
      setUserData(false);
    }
  }, [user, userData]);
   

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://disease-predictor-1-a2y1.onrender.com/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast.success("Messge sent successfully")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="grid-two-col">
        <img src="/images/contact.png" alt="contact" width="500" height="500" />
        <section className="section-contact">
          <h2 className="container-title">Contact</h2>
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
                  value={contact.username}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control bg-green-box"
                  required
                  placeholder="Enter your email"
                  name="email"
                  autoComplete="off"
                  id="email"
                  value={contact.email}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control bg-green-box"
                  required
                  placeholder="Enter mesage"
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  value={contact.message}
                  onChange={handleInput}
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
