import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import database from '../../firebase';
import firebase from 'firebase';
import {auth} from '../../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(2),
            minWidth: theme.spacing(64),
            minHeight: theme.spacing(16),
        },
    },
    container: {
        marginTop: '60px'
    },
    paper: {
        background: theme.palette.grey[200],
        borderRadius: '10px'
    },
    head: {
        padding: '10px'
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '0px 10px 10px 10px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

const AddCardDialog = () => {
    const classes = useStyles();

    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                setValue('')
               const initialSubjects = [];
                var duplicateFlag = 0; 

                database.ref(`users/${user.uid}/cards`).once('value').then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                initialSubjects.push(childSnapshot.val())
            })

            initialSubjects.forEach((e) => {
                if (e.subject === value)
                    duplicateFlag++;
            })

            if (value !== '' && duplicateFlag===0) {
                database.ref(`users/${user.uid}/cards`).push({
                    subject: value.toLowerCase(),
                    present: 0,
                    total: 0
                }).then(() => {
                    alert("subject card added");
                })
            }
            else if(duplicateFlag>0)
            {
                alert("subject card already exists");
            }
            else {
                alert("please add a subject name");
            }
        })
            } else return null
        })
    }
    return (
        <Grow in={true} mountOnEnter unmountOnExit>
            <div className={classes.container}>
                <div className={classes.root}>
                    <Paper elevation={0} className={classes.paper}>
                        <Typography variant="h6" color="primary" align="center" className={classes.head}>CREATE NEW CARD</Typography>
                        <div className={classes.formContainer}>
                            <form className={classes.form}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    id="subject"
                                    label="Subject"
                                    name="subject"
                                    autoComplete="subject"
                                    size="small"
                                    required
                                    onChange={handleChange}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSubmit}
                                >
                                    create
                                </Button>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div>
        </Grow>
    )
}

export default AddCardDialog
