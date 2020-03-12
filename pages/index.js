import fetch from 'isomorphic-fetch'
import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import PageWrapper from '../components/PageWrapper'
import { Typography, makeStyles, Container, Card, CardContent, Grid, Paper, CardActions, CardActionArea } from '@material-ui/core'
import Features from '../components/home/Features'
import getBaseUrl from '../components/utils/getBaseUrl'
import ApiLink from '../components/ApiLink'
import Link from 'next/link'
import ReactIcon from '../components/icons/React.svg'
import VueIcon from '../components/icons/Vue.svg'
import AngularIcon from '../components/icons/Angular.svg'

const useStyles = makeStyles(theme => ({
  hero: {
    paddingTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '& h1, & h2': {
      color: theme.palette.text.secondary,
      fontWeight: 300,
    },
  },

  gettingStarted: {
    marginTop: '1em',
    color: theme.palette.text.primary,
    fontSize: '1.2em',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
  },

  cardActionArea: {
    flex: 1,
  },

  frameworks: {
    marginTop: theme.spacing(4),
  },

  framework: {
    border: `1px solid ${theme.palette.divider}`,
    width: 250,
    margin: 15,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    '&:hover': {
      boxShadow: theme.shadows[8]
    }
  },

  frameworkText: {
    display: 'flex',
    justifyContent: 'center',
  },

  icon: {
    flex: 1,
    padding: theme.spacing(2),
  },
}))

const Home = ({ navData }) => {
  const classes = useStyles()
  return (
    <PageWrapper nav={<Nav navData={navData} aboveAdornments={[<ApiLink key="link" />]} />}>
      <Head>
        <title>Moovweb XDN - Home</title>
      </Head>
      <div className={classes.hero}>
        <Typography variant="h1" style={{ margin: '0.5em 0' }}>
          Moovweb XDN
        </Typography>
        <Typography variant="h2" style={{ maxWidth: 800 }}>
          <div style={{ position: 'relative' }}>Impossibly fast infrastructure for edge PWAs.</div>
        </Typography>
      </div>
      <Grid container className={classes.frameworks}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Paper className={classes.framework} elevation={0}>
                <ReactIcon className={classes.icon} />
                <Typography className={classes.frameworkText}>Get started with Next.js</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.framework} elevation={0}>
                <VueIcon className={classes.icon} />
                <Typography className={classes.frameworkText}>Get started with Nuxt.js</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.framework} elevation={0}>
                <AngularIcon className={classes.icon} />
                <Typography className={classes.frameworkText}>Get started with Angular</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Container maxWidth="md">
        <Features />
      </Container>
    </PageWrapper>
  )
}

export default Home

Home.getInitialProps = async ({ version, versions, req }) => {
  const baseUrl = getBaseUrl(req)
  const navData = await fetch(
    `${baseUrl}/api/guides?version=${version === versions[0] ? '' : version}`,
  ).then(res => res.json())
  return { navData }
}
