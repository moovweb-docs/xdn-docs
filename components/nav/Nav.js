import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { MenuContext } from '../MenuProvider'
import Section from './Section'

const width = 300

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: width,
    maxHeight: '100vh',
    paddingTop: 64,
    width,
    position: 'fixed',
    left: 24,
    top: 0,
    overflowY: 'auto',
    borderRight: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0, 0, 0, -3),
    background: theme.palette.grey[100],

    [theme.breakpoints.down('md')]: {
      transition: 'transform .1s ease-out',
      position: 'fixed',
      paddingTop: 0,
      left: 0,
      bottom: 0,
      top: 65,
      overflowY: 'auto',
      height: 'calc(100% - 65px)',
      transform: `translateX(-${width}px)`,
      background: theme.palette.background.paper,
      zIndex: theme.zIndex.drawer,
      borderRight: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(0),
      boxShadow: theme.shadows[5],
    },

    [theme.breakpoints.down('xs')]: {
      top: 57,
      height: 'calc(100% - 57px)',
      width: '100%',
      transform: `translateX(-100%)`,
    },
  },
  navBody: {
    padding: theme.spacing(0, 4, 1, 4),
  },
  open: {
    transform: 'translateX(1px)',
  },
  header: {
    backgroundColor: '#242349',
    padding: '7px 24px 3px',

    [theme.breakpoints.down('xs')]: {
      padding: '2px 24px 0 24px',
    },
  },
  logo: {
    width: 180,
    height: 48,
    [theme.breakpoints.up('lg')]: {
      width: '95%',
    },
  },
  section: {
    marginLeft: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(-1.5),
    color: theme.palette.grey[200],
  },
}))

export default function Nav({ navData }) {
  const { open, setOpen } = useContext(MenuContext)
  const classes = useStyles()

  return (
    <nav
      className={clsx({
        [classes.root]: true,
        [classes.open]: open,
      })}
    >
      <div className={classes.navBody}>
        {navData.map((section, i) => (
          <Section key={i} section={section} />
        ))}
      </div>
    </nav>
  )
}

const navItemPropType = {
  text: PropTypes.string,
  as: PropTypes.string,
  href: PropTypes.string,
}

Nav.propTypes = {
  backButton: PropTypes.bool,
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      ...navItemPropType,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          ...navItemPropType,
          items: PropTypes.arrayOf(PropTypes.shape({ ...navItemPropType })),
        }),
      ),
    }),
  ),
  aboveAdornments: PropTypes.node,
}

Nav.defaultProps = {
  navData: [],
}
