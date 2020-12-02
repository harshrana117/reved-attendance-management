import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { SignIn} from '../components/LoginForm'
import styled from 'styled-components'
import SvgImage from '../images/landing.svg';



const useStyles = makeStyles({
    container:{
        marginTop:'80px'
    }
   });


const LandingPage = () => {

    const classes = useStyles();

    return (
        <div className={classes.container}>
          <SignIn/>
          <ImageContainer>
              <Image src={SvgImage}/>
          </ImageContainer>
        </div>
    )
}

export default LandingPage


const ImageContainer = styled.div`
    padding:20px;
    display:flex;
    justify-content:center;
`

const Image = styled.img`
    max-width:300px;
`