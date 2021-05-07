import React from 'react'
import {Typography, Paper, Grid, Button, TextField, RadioGroup, FormControlLabel, Radio} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    
    margin: theme.spacing(1),
    width: '50ch',
    
  },
  radio: {
    
    margin: theme.spacing(1),
    width: '50ch',
    
  }
}))

const SectionC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container  spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography>Form Example</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <form  noValidate autoComplete="off">
            <Grid container  spacing={3}>
              <Grid item xl={12}>
                <RadioGroup  row aria-label="position" name="position" defaultValue="top">
                  <FormControlLabel className={classes.radio}
                    value="top"
                    control={<Radio color="primary" />}
                    label="Home Address"
                    labelPlacement="top"
                  />
                  <FormControlLabel className={classes.radio}
                    value="start"
                    control={<Radio color="primary" />}
                    label="Business Address"
                    labelPlacement="top"
                  />

                </RadioGroup>
              </Grid>




              <Grid item xl={6}>
                <TextField className={classes.textField} id="first-name" label="First Name" />
              </Grid>
              <Grid item xl={6}>
                <TextField className={classes.textField} id="last-name" label="Last Name" />
              </Grid>
              <Grid item xl={6}>
                <TextField className={classes.textField} id="address-1" label="Address Line 1" />
              </Grid>
              <Grid item xl={6}>
                <TextField className={classes.textField} id="address-2" label="Address Line 2" />
              </Grid>

              
              
            </Grid>


          </form>
          
          <Button variant="contained" color="primary">
            Submit
          </Button>
          
          
          </Paper>
        </Grid>
        
      </Grid>
      
    </div>
  )
}

export default SectionC