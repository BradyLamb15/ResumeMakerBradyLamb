import React, {useEffect, useState} from 'react'
import {Typography, Paper, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {GraphQLClient, gql } from 'graphql-request'
import Divider from '@material-ui/core/Divider';


const GRAPHCMS_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MTk1MzY4NDIsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NrbXFreHdwdGJ3eWIwMXhuZnU4NWVobTQvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZGEwMjZjNmMtMDU4Yi00ZDRkLTliYjMtNDQ4NzJmMThkZTA4IiwianRpIjoiY2tvMDZmNXBzYnp6bTAxejBhN21haHQyeCJ9.xyN_tQ8CzjQrqKvpO58MVNQs0OhngkjdD-6jQ4DgskRYS3b40PLY8JbphAoeKlT4-7TDr8vG60jioKWe6ir0AJ0BM1kbHR8h1GjTprt2_2pwirY_svYDQAafbIZzOlSo8vyC8MzKMhLrnJx7UlCIWcpiOgg5eWWpaR14m6iMDr9jaMTpPDy-GqDWUcVOCGLWrGdLMODEjxYR2zcmtlR4H2FthKXV_DU1Zb6JrzBhWY878GifxsTZtAHZhjn9aQiraWm1DlPMb6xN2mxXCxuhn3UbcyiWecrSb7aCceqZ-Cb_LTmhUF7YlAbE5h0h7CSUXjcKnYfPQIIFfllcnaileeojkzOlbyBQaKDzNIvEWm6kUjgVTL0vqmhlvpy3n6VwY7OOhZK8W771Y8Cfa_2bSxi_1R0i88LqhyzpwaCtUzgH5DduXihbCj7mPRe__yJhJkqRjjq_p-6LgUbrlpf5h-aLwxWJpxMsvJRTjfqeYeIgNUSWd_0lffYsl78ayMLP9ZKxMZzpkpmoq4SqBnoLwnlHMQVKJSIUeo7Cpy-pUuNb8BcAuMoC6RQu1PGN4Q98z7Q6tXIE4aJtg6e-bulvXDlE9JffB0Wb6su2fFCAsKVru8YMTIRfI4AoJfOUHNX8_xFABl5uQFfS09Iuo_llVdko7BjkKsglkOxVpjGjS14"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
		height: 1200,
		width: 950,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
		backgroundColor: '#f0f4c3'
  },
}))


const dummyResume = {
        "id": "ckmqli2lkn3q10b68mbdq77c4",
        "fullName": "Brady Lamb",
        "jobTitle": "Student",
        "phoneNumber": 4646465,
        "schools": [
          {
            "name": "ASU",
            "degree": "Stair Building",
            "summary": "It was hot work. "
          }
        ],
        "skills": [
          {
            "name": "Smart",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five"
          },
          {
            "name": "Mood",
            "description": "happy nnnassssd"
          }
        ],
				
				 "pastJobs": [
          {
            "jobTitle": "Vacuuming on the Moon",
            "companyName": "Moon Cleaners",
            "summaryOfJob": "Vacuumed the moon"
          }
        ]
      }
			
const SectionA = () => {
	const [resumes, setResumes] = useState()
	const [currentResume, setCurrentResume] = useState(dummyResume)

  
  const token = GRAPHCMS_TOKEN
  const endpoint = 'https://api-us-east-1.graphcms.com/v2/ckmqkxwptbwyb01xnfu85ehm4/master'
  const query = gql`
  {
		resumes {
			id
			fullName
			jobTitle
			email
			phoneNumber
			profileSummary
			schools {
				name
				degree
				summary
			}
			skills {
				name
				description
			}
			pastJobs {
				jobTitle
				companyName
				summaryOfJob
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
			setCurrentResume(resumes[0])
      console.log("resumes:" + resumes[0].schools[0].name)
    }
    fetchResumes()
  }, [])

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="flex-end" alignItems="center">
			<Paper className={classes.paper} item xs={12} elevation={3} variant="outlined" square>
        <Grid item xs={12}>
          
            <Typography >Layout Example 1</Typography>
          
        </Grid>

        <Grid item xs={12} container>
					<Typography variant="h4" >
          {currentResume.fullName} 
					</Typography>
        </Grid>

        <Grid item x6={6} container justify="flex-start" alignItems="flex-start">
				<Typography variant="h5">
          {currentResume.jobTitle}
					</Typography>
        </Grid>

        <Grid item xs={6} container justify="flex-start" alignItems="flex-start">
				<Typography color="secondary" fontStyle= "italic">
          {currentResume.email}
				</Typography>
        </Grid>

				<Grid item xs={6} container justify="flex-start" alignItems="flex-start">
				<Typography color="secondary">
          {currentResume.phoneNumber}
					</Typography>
        </Grid>

				<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="Primary">
         ----------------
					</Typography>
        </Grid>

					<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="secondary" paragraph={true}>
         
					</Typography>
        </Grid>


				<Grid item xs={6} container justify="flex-start" alignItems="flex-start">
				<Typography variant="h5" color="secondary">
          Profile Summary
					</Typography>

				 
        </Grid>

				
				<Grid item xs={8} container justify="flex-start" alignItems="flex-start" >
				<Typography align='left'>
          {currentResume.profileSummary}
					</Typography>
        </Grid>

								<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="Primary">
         ----------------
					</Typography>
        </Grid>

					<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="secondary" paragraph={true}>
         
					</Typography>
        </Grid>

					<Grid item xs={6} container justify="flex-start" alignItems="flex-start">
				<Typography variant="h5" paragraph={true} color="secondary">
          Experience
					</Typography>
        </Grid>

   			{
          currentResume.pastJobs.map((pastJob) =>
          <Grid xs={8} container justify="flex-start" alignItems="flex-start">
					
            <Typography color="Primary" variant="h6" key={pastJob.jobTitle.toString()}>
              {pastJob.jobTitle}
            </Typography>
            <Typography color="Primary" variant="h6" align='left' key={pastJob.companyName.toString()}>
              /{pastJob.companyName}
            </Typography>
						<Typography variant="h7" align='left' key={pastJob.summaryOfJob.toString()}>
              - {pastJob.summaryOfJob}
            </Typography>
          </Grid>
          )
        }

							<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="Primary">
         ----------------
					</Typography>
        </Grid>

					<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="secondary" paragraph={true}>
         
					</Typography>
        </Grid>



			

				<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="secondary">
          Skills
					</Typography>
        </Grid>

		

				{
          currentResume.skills.map((skill) =>
          <Grid xs={8} container justify="flex-start" alignItems="flex-start">
					
            <Typography color="Primary" variant="h6" key={skill.name.toString()}>
              {skill.name}
            </Typography>
            <Typography variant="h7" align='left' key={skill.description.toString()}>
              - {skill.description}
            </Typography>
          </Grid>
          )
        }

				<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="Primary">
         ----------------
					</Typography>
        </Grid>

				<Grid item xs={6} container justify="flex-start" alignItems="flex-start" >
				<Typography variant="h5" color="secondary" paragraph={true}>
         
					</Typography>
        </Grid>

				<Grid container justify="flex-start" alignItems="flex-start">
				<Typography variant="h5" color="secondary">
          Education
					</Typography>
        </Grid>

				    {
          currentResume.schools.map((school) =>
          <Grid xs={8} container justify="flex-start" alignItems="flex-start">
            <Typography color="Primary" style={{display: 'inline-block'}} variant="h6" key={school.name.toString()}>
              {school.name}
            </Typography>
            <Typography color="Primary" style={{display: 'inline-block'}} variant="h6" key={school.degree.toString()}>
              /{school.degree}
            </Typography>
						<Typography align='left' style={{display: 'inline-block'}} variant="h7" key={school.summary.toString()}>

             - {school.summary}
            </Typography>
            
          </Grid>
          )
        }
			</Paper>


      </Grid>
      
    </div>
  )
}

export default SectionA