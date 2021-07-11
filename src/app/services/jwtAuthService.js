import localStorageService from "./localStorageService";
import axios from "axios";

import api from "../services/api";

class JwtAuthService {

  // Dummy user object just for the demo
  // user = {
  //   data_alteracao: null,
  //   data_inclusao: null,
  //   email: "emanoeljohannes@hotmail.com",
  //   idusuario: 7,
  //   login: "EmanoelJohannes",
  //   nmusuario: "Emanoel Johannes Cardim",
  //   role: "ADMIN",
  //   senha: "e10adc3949ba59abbe56e057f20f883e",
  //   status: 1,
  //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzdWFyaW8iOjcsImlhdCI6MTU5Nzk4MDQ4MSwiZXhwIjoxNjAwNTcyNDgxfQ.MuJMJtsGKuhipnBLPqO9k3nQBgaom_xoszLQ_QN49TE",
  //   usuario_alteracao: null,
  //   usuario_inclusao: null
  // }

  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, senha) => {

    return new Promise((resolve, reject) => {      
        const user = api.post('sessions', {email, senha});
        
        resolve(user);
    }).then(data => {
      // Login successful
      // Save token

      api.defaults.headers.Authorization = `Bearer ${data.data.user[0].token}`;

      console.log("dataLogin -> ",data.data.user[0]);
      
      this.setSession(data.data.user[0].token);
      // Set user
      this.setUser(data.data.user[0]);

      return data.data;
    });
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  // loginWithToken = () => {
  //   return new Promise((resolve, reject) => {
  //     const userLocalStorage = localStorageService.getItem("auth_user");

  //     if (userLocalStorage) {
  //       const email = userLocalStorage.email;
  //       const senha = userLocalStorage.senha;
  
  //       const user = api.post('sessions', {email, senha});
  
  //       console.log("loginWithToken",user);
  
  //       resolve(user);
  //     }

      

  //   }).then(data => {
  //     // Token is valid
  //     this.setSession(data.data.user[0].token);
  //     // Set user
  //     this.setUser(data.data.user[0]);

  //     console.log("loginWithToken success",data);

  //     return this.user;
  //   });
  // };

  loginWithToken = () => {
      const userLocalStorage = localStorageService.getItem("auth_user");

      if (userLocalStorage) {

        api.defaults.headers.Authorization = `Bearer ${userLocalStorage.token}`;

        this.setSession(userLocalStorage.token);
        // Set user
        this.setUser(userLocalStorage);

        console.log("loginWithToken success", userLocalStorage);

        return userLocalStorage;
      } else {
        return null;
      }
    
  };



  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = token => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {    
    localStorageService.setItem("auth_user", user);
  }
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new JwtAuthService();
