import React, { useContext, useState } from "react";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/icons/logo-pink.svg";
import LoginImage from "../../assets/icons/login.svg"
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import api, {loginResource} from "../../Services/Service";
import "./Login.css";
import { UserContext, userDecodeToken } from "../../context/AuthContext";

const Login = () => {
  const [user,setUser]= useState({email:"aluno@email.com",senha:""});

  const {userData,setUserData}= useContext(UserContext)

  async function handleSubmit(e){
    //preventDefault - o D é MAIUSCULO
    e.preventDefault();
    //Validar usuário e senha
      if (user.email.length < 3  && user.senha.length < 5 ) {
        alert("Email e senha precisam de 3 caracteres")
        return
      }
      try {
        const promise = await api.post(loginResource,{
            email:user.email,
            senha:user.senha

         


        })

        const userFullToken = userDecodeToken(promise.data);
        setUserData= (userFullToken)

        localStorage.setItem("token",JSON.stringify(userFullToken))
      } catch (error) {
        alert("Verifique os dados e a conexão com a internet !")
        
      }



  }


  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageName="login"
            imageRender={LoginImage}
            altText="Imagem de um homem em frente de uma porta de entrada"
            addClass="login-illustrator "
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              className="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {setUser({...user,email: e.target.value.trim()})}}
              placeholder="Username"
            />
            <Input
              className="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {setUser({...user,senha: e.target.value.trim()})}}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              addClass="frm-login__button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
