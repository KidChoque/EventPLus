import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import das paginas
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Eventos from '../pages/Eventos/Eventos';
import TiposEvento from '../pages/TiposEvento/TiposEvento';
import Teste from '../pages/Teste/Teste';
import Header from '../Components/Header/Header';
import Nav from '../Components/Nav/Nav';
import Footer from '../Components/Footer/Footer';
import { PrivateRoute } from '../routes/PrivateRoute';
import EventosAluno from '../pages/EventosAluno/EventosAluno';
const Rotas = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route element={<Home />} path="/" exact></Route>

            <Route
                element={
                    <PrivateRoute>

                        <TiposEvento />

                    </PrivateRoute>
                }
                path="/tipos-evento">

            </Route>
            <Route
                element={
                    <PrivateRoute>

                        <Eventos />

                    </PrivateRoute>

                }
                path="/eventos">

            </Route>

            <Route
                element={
                    <PrivateRoute>

                        <EventosAluno />

                    </PrivateRoute>

                }
                path="/eventos-aluno">

            </Route>

            <Route element={<Login />} path="/login"></Route>

            <Route element={<Teste />} path="/teste"></Route>
        </Routes>
        <Footer />
    </BrowserRouter>
);

export default Rotas;