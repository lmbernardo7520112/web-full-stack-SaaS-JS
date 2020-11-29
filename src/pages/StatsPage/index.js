import React from 'react';
import Header from "../../components/Header";
import { Container } from 'react-bootstrap';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsBox, StatsRow, StatsBoxTitle } from './styles';
import ShortenerService from '../../services/shortenerService';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import vars from '../../configs/vars';

class StatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            shortnedURL: {},
            errorMessage: '',
        }
    }

    async componentDidMount() {
        const { code } = this.props.match.params;

        try {
            const service = new ShortenerService();
            
            const shortnedURL = await service.getStats(code);

            const parsedDate = parseISO(shortnedURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parsedDate, currentDate, {
                    locale: ptBR,
            });

            shortnedURL.relativeDate = relativeDate;

            this.setState({ isLoading: false, shortnedURL});

        } catch (error) {
            this.setState({ isLoading: false, errorMessage: 'Ops, a url solicitada não existe'});

        }
    }


    render() {
        const {errorMessage, shortnedURL} = this.state;
        
        return (
            <Container>
                <Header>Estatísticas</Header>
                {errorMessage ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="m-3">{errorMessage}</p>
                        <p className="btn btn-primary "href="/">Encurtar uma nova URL</p>
                    </StatsContainer>
                ) : (
                    <StatsContainer className="text-center">
                        <p><b>{vars.HOST_APP + shortnedURL.code}</b></p>
                        <p>Redirecionar para: <br/>{shortnedURL.url}</p>
                        <StatsRow>
                            <StatsBox>
                                <b>{shortnedURL.hits}</b>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <b>{shortnedURL.relativeDate}</b>
                                <StatsBoxTitle>Última Visita</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                )}
            </Container>
        )
    }
}

export default StatsPage;