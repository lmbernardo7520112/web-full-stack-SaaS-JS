import React from 'react';
import Header from "../../components/Header";
import { Container } from 'react-bootstrap';

import ShortenetService from '../../services/shortenerService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsBox, StatsRow, StatsBoxTitle } from './styles';


class StatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            shortnedURL: {},
            errorMessage: 'Error',
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
                    <p>Resultado</p>
                )}
            </Container>
        )
    }
}

export default StatsPage;