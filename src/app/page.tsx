"use client";

import { config } from "@/config/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      console.log("Username: ", username);
      console.log("Password: ", password);
      
      // const url = `${config.apiUrl}/api/user/admin-signin`;
      // const payload = {
      //   username,
      //   password
      // }
      // const res = await axios.post(url, payload);

      // if (res.status === 200) {
      //   localStorage.setItem(config.tokenKey, res.data);
      //   router.push("/erp/dashboard");
      // }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid username and password."
      })
      
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">
          <i className="fas fa-leaf"></i>Spring-ERP 2025
        </h1>
        <h2 className="login-subtitle">
          ระบบ Enterprise Resource Planning
        </h2>
        <form action="" className="login-form">
          <div className="form-group">
            <label htmlFor="" className="form-label">
              <i className="fas fa-user mr-2"></i>
              Username
            </label>
            <input
              type="text"
              className="form-input" 
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              <i className="fas fa-lock mr-2"></i>
              Password
            </label>
            <input
              type="password"
              className="form-input" 
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="login-button"
            onClick={handleSignIn}
          >
            <i className="fas fa-sign-in-alt"></i>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
