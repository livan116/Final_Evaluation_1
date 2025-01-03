import React, { useState } from "react";
import style from "./Register.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Google Icon.png";
import tri1 from "../../assets/Polygon_1.png";
import tri2 from "../../assets/Polygon_2.png";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URI;

// console.log(process.env.VITE_API_URI);

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Send the form data to the backend
      const response = await axios.post(
        `${apiUrl}/api/auth/register`,
        formData
      );
      console.log(apiUrl);
      if (response.status === 201) {
        toast.success(response.data.message, {
          duration: 4000,
          position: "top-right",
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }

      if (response.status === 400) {
        toast.error(response.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    } catch (err) {
      console.error(err.response.data);
      toast.error("Registration failed!");
    }
  };
  return (
    <div>
      <div className={style.container}>
        <div className={style.backBtn}>
          <Link to="/">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>
        <div className={style.triangle1}>
          <img src={tri1} alt="triangle1" />
        </div>
        <div className={style.triangle2}>
          <img src={tri2} alt="triangle2" />
        </div>
        <div className={style.semicircle1}></div>

        <form onSubmit={handleSubmit}>
          <div className={style.userName}>
            <label>Username</label> <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter a username"
            />
          </div>
          <div className={style.email}>
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter a email"
            />
          </div>
          <div className={style.password}>
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="..........."
            />
          </div>
          {console.log(formData.password !== formData.confirmPassword)}
          {formData.password !== formData.confirmPassword ? (
            <div className={style.error}>
              <label>Confirm password</label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                placeholder="..........."
                onChange={handleChange}
                value={formData.confirmPassword}
              />
              <p>password doesnot match</p>
            </div>
          ) : (
            <div className={style.confirmPassword}>
              <label>Confirm password</label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                placeholder="..........."
              />
              <div className={style.errorMessage}></div>
            </div>
          )}

          <button className={style.submit}>Sign Up</button>
        </form>
        <div className={style.google}>
          <p>OR</p>
          <button className={style.submit}>
            <div className={style.googleLogo}>
              <img src={logo} alt="" />
            </div>
            Sign Up with Google
          </button>
        </div>
        <div className={style.accountExists}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
        <div className={style.semicircle2}></div>
      </div>
    </div>
  );
};

export default Register;
