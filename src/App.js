import React from 'react'
import PropTypes from 'prop-types'
import {AppBar, Typography, Toolbar, Tab, Tabs, Box, Link} from '@material-ui/core'
import { AccessAlarm, List } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'


import SectionA from './SectionA'
import SectionB from './SectionB'
import SectionC from './SectionC'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const  a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),

  },
}))


const App = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
  
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <List className={classes.icon} />
          <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
            ResumeMaker
          </Typography>
           

          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Layout Example 1" {...a11yProps(0)} />
              <Tab label="Layout Example 2" {...a11yProps(1)} />
              <Tab label="Layout Example 3" {...a11yProps(2)} />
          </Tabs>

        </Toolbar>

        
      </AppBar>
      <main>
        <Typography variant="h2"></Typography>  
        <TabPanel value={value} index={0}>
          <SectionA></SectionA>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SectionB></SectionB>
          
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SectionC></SectionC>
        </TabPanel>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          ResumeMaker
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          We make you look good!
        </Typography>
        <Copyright />
      </footer>
      
      
    </div>

  )
}

export default App
