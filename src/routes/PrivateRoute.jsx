import { Navigate } from "react-router-dom"

export const PrivateRoute = ({children,redirectTo="/"}) =>{
//verificar se estar autenticado 
const isAuthenticaded =localStorage.getItem("token") !== null
//retornar componente ou navegar para a home
return isAuthenticaded ? children : <Navigate to={redirectTo}/>
}