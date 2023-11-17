import React, { useEffect, useState } from 'react';
import "./Home.css"
import Banner from '../../Components/Banner/Banner';
import Main from '../../Components/Main/Main'
import VisionSection from '../../Components/VisionSection/VisionSection';
import ContactSection from '../../Components/ContactSection/ContactSection';
import Titulo from '../../Components/Titulo/Titulo';
import NextEvent from '../../Components/NextEvent/NextEvent'
import Container from '../../Components/Container/Container'
import api from '../../Services/Service';
const Home = () => {
    //dados mocados 
    const [nextEvents, setNextEvents] = useState([]);

   // roda somente na inicialização do componente
    useEffect(() => {
        async function getNextEvents() {
            try {
                const promise = api.get(`/Evento/ListarProximos`);
                const dados = (await promise).data;
                console.log(dados)
                setNextEvents(dados); //atualiza o state
            }
            catch(error) {
                alert("Deu ruim na api!")
            }
        }
        console.log(nextEvents)
        getNextEvents(); //Roda a função
    }, []);
    return (
        <Main>
            <Banner />
            <section className='proximos-eventos'>
                <Container>
                    <Titulo titleText={"Próximos Eventos"} />

                    <div className="events-box">
                        {
                            nextEvents.map((e) => {
                                return <NextEvent
                                    key={e.idEvento}
                                    title={e.nomeEvento}
                                    description={e.descricao}
                                    eventDate={e.dataEvento}
                                    idEvent={e.idEvento}
                                />
                            })
                        }
                    </div>
                </Container>



            </section>
            <VisionSection />
            <ContactSection />
        </Main>
    );
};

export default Home;