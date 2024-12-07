import React, { useState } from "react";
import "./style.css";


export default function Navbar() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Visible, setVisible] = useState(true);
  


  // toogle for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleBtn = () => {
    let container = document.querySelector(".login-container");      
      if(container){
          container.classList.toggle("active");
        }else{
            console.error('not found element in body')
        }
    };
    
    const closeBtn = () => {
      let container = document.querySelector(".login-container");
        container.classList.remove("active");
  };

  const toggleSidebar=()=>{
    let sidebar=document.querySelector(".left-section");
        sidebar.classList.add('active')
  }



  return (
    <div>
      {/* navbar starts here */}
      <nav>
      <i className="fa-solid fa-om bars" onClick={toggleSidebar}/>
        <div className="logo">
          <span>𝕮𝖆𝖙𝖊𝖗𝖕𝖎𝖑𝖑𝖊𝖗 𝕸𝖚𝖘𝖎𝖈</span>
        </div>

        <div className="login">
          <button className="login-btn" onClick={toggleBtn}>
         <i className="fa-solid fa-user" />

          </button>
        </div>

        {/* login page starts here */}
        {Visible && (

<div className="login-container">
<div className="login-box">
<i className="fa-solid fa-xmark cross-mark"  onClick={closeBtn}/>

  <h2>Welcome to My Music App</h2>
  <p>Login to enjoy your favorite tunes!</p>
  {/* login input */}
  <form className="login-form">
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        required
      />
    </div>

    {/* password input */}
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          className="eye-button"
          onClick={togglePasswordVisibility}
          aria-label="Toggle password visibility"
        >
          {showPassword ? "👁️" : "🙈"}
        </button>
      </div>
    </div>

    {/* submit btn */}
    <button type="submit" className="login-button">
      Login
    </button>
  </form>
  <p className="signup-prompt">
    Don't have an account? <a href="/signup">Sign up here</a>.
  </p>
</div>
</div>

        )}
       
      </nav>
    </div>
  );
}
