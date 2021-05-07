import React, {useEffect, useState} from 'react'
import {Typography, Paper, Grid} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core/styles'
import {GraphQLClient, gql } from 'graphql-request'

const GRAPHCMS_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MTk1MzY4NDIsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NrbXFreHdwdGJ3eWIwMXhuZnU4NWVobTQvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZGEwMjZjNmMtMDU4Yi00ZDRkLTliYjMtNDQ4NzJmMThkZTA4IiwianRpIjoiY2tvMDZmNXBzYnp6bTAxejBhN21haHQyeCJ9.xyN_tQ8CzjQrqKvpO58MVNQs0OhngkjdD-6jQ4DgskRYS3b40PLY8JbphAoeKlT4-7TDr8vG60jioKWe6ir0AJ0BM1kbHR8h1GjTprt2_2pwirY_svYDQAafbIZzOlSo8vyC8MzKMhLrnJx7UlCIWcpiOgg5eWWpaR14m6iMDr9jaMTpPDy-GqDWUcVOCGLWrGdLMODEjxYR2zcmtlR4H2FthKXV_DU1Zb6JrzBhWY878GifxsTZtAHZhjn9aQiraWm1DlPMb6xN2mxXCxuhn3UbcyiWecrSb7aCceqZ-Cb_LTmhUF7YlAbE5h0h7CSUXjcKnYfPQIIFfllcnaileeojkzOlbyBQaKDzNIvEWm6kUjgVTL0vqmhlvpy3n6VwY7OOhZK8W771Y8Cfa_2bSxi_1R0i88LqhyzpwaCtUzgH5DduXihbCj7mPRe__yJhJkqRjjq_p-6LgUbrlpf5h-aLwxWJpxMsvJRTjfqeYeIgNUSWd_0lffYsl78ayMLP9ZKxMZzpkpmoq4SqBnoLwnlHMQVKJSIUeo7Cpy-pUuNb8BcAuMoC6RQu1PGN4Q98z7Q6tXIE4aJtg6e-bulvXDlE9JffB0Wb6su2fFCAsKVru8YMTIRfI4AoJfOUHNX8_xFABl5uQFfS09Iuo_llVdko7BjkKsglkOxVpjGjS14"

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullName', headerName: 'Full Name', width: 230 },
  { field: 'jobTitle', headerName: 'Job Title', width: 230 },
  

  
]

const rows = [
  { id: 1, fullName: 'fullName', jobTitle: 'Prog Rock' },
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const SectionB = () => {
  const [resumes, setResumes] = useState(rows)
  
  const token = GRAPHCMS_TOKEN
  const endpoint = 'https://api-us-east-1.graphcms.com/v2/ckmqkxwptbwyb01xnfu85ehm4/master'
  const query = gql`
  {
		resumes {
			id
			fullName
			jobTitle
			skills {
				name
				description
			}
		}
	}
    `
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer ' + token,
    },
  })

  useEffect(() => {
    const fetchResumes = async () => {
      const { resumes } = await graphQLClient.request(query)
      setResumes(resumes)
      console.log("resumes:" + resumes)
    }
    fetchResumes()
  }, [])

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container  spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography>This page shows an example of a DataGrid. Much more intuitive to use than a html table, imho.</Typography>
          </Paper>
        </Grid>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={resumes} columns={columns} pageSize={5} checkboxSelection />
        </div>
      </Grid>
    </div>
  )
}

export default SectionB