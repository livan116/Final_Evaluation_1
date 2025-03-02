import React, { useEffect, useState } from "react";
import style from "../Register/Register.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Google Icon.png";
import tri1 from "../../assets/Polygon_1.png";
import tri2 from "../../assets/Polygon_2.png";
import toast from "react-hot-toast";


const apiUrl = import.meta.env.VITE_API_URI;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        formData
      );
      console.log(response);
      console.log(formData)
      if(response.status === 200){
        localStorage.setItem('token', response.data.token)
        toast.success("Login Successful", {
          duration: 4000,
          position: "top-right",
        })
        navigate('/form-dashboard')
        toast.success(response.data.message, {
          duration: 4000,
          position: "top-right",
        });
      }
      
    } catch (err) {
      console.error(err);
      toast.error("Registration failed!");
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      toast.success("User Already logged in", {
        duration: 4000,
        position: "top-right",
      });
      navigate('/form-dashboard')
    }
  },[])
  return (
    <div>
      <div className={style.container}>
        <div className={style.backBtn}>
          <Link to='/'>
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
          <button className={style.submit}>Login</button>
        </form>
        <div className={style.google}>
          <p>OR</p>
          <button className={style.submit}>
            <div className={style.googleLogo}>
              <img src={logo} alt="" />
            </div>
            Sign In with Google
          </button>
        </div>
        <div className={style.accountExists}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
        <div className={style.semicircle2}></div>
      </div>
    </div>
  );
};

export default Login;
