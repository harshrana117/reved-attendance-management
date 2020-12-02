import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import ErrorImage from '../images/error.svg';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    container: {
        marginTop: '80px',
        padding:'10px'
    }
});


const ErrorPage = () => {

    const classes = useStyles();

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <div className={classes.container}>
                <Typography variant="h2" color="Primary" align="center">Working on this feature</Typography>
                <Typography variant="h6" color="textSecondary" align="center">Maybe, you are a lone wanderer, checking to extremes</Typography>
                <ImageContainer>
                    <Image src={ErrorImage} />
                </ImageContainer>
            </div>
        </Slide>
    )
}

export default ErrorPage

const ImageContainer = styled.div`
    display:flex;
    justify-content:center;
`

const Image = styled.img`
    max-width:500px;
`