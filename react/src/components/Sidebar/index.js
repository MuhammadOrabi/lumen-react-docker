/* eslint no-undefined: ["off"] */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Icon } from 'self-components';
import { Link } from 'react-router-dom';

import { withStyles, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from 'material-ui';

import sidebarStyle from './assets/style/style.sidebar';

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
    const activeRoute = routeName => window.location.pathname.indexOf(routeName) > -1;
    const { classes, color, logo, image, logoText, routes = [] } = props;
    const links = (
        <List className={classes.list}>
            {routes.map((route, key) => {
                if (route.redirect) return null;
                const listItemClasses = cx({ [` ${classes[color]}`]: activeRoute(route.path) });
                const whiteFontClasses = cx({ [` ${classes.whiteFont}`]: activeRoute(route.path) });
                return (
                <Link
                    to={route.path}
                    className={classes.item}
                    key={key}>
                    <ListItem button className={classes.itemLink + listItemClasses}>
                        <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                            <Icon className={{}} unicode={'\ue62c'} />
                        </ListItemIcon>
                        <ListItemText
                            primary={route.sidebarName}
                            className={classes.itemText + whiteFontClasses}
                            disableTypography
                        />
                    </ListItem>
                </Link>
                );
            })}
        </List>
    );
    const brand = (
        <div className={classes.logo}>
            <a href="https://www.creative-tim.com" className={classes.logoLink}>
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img} />
                </div>
                {logoText}
            </a>
        </div>
    );
    return (
        <React.Fragment>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={props.open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                {brand}
                <div className={classes.sidebarWrapper}>
                    {/* <HeaderLinks /> */}
                    {links}
                </div>
                {image !== undefined ? (
                    <div
                        className={classes.background}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                {brand}
                <div className={classes.sidebarWrapper}>{links}</div>
                {image !== undefined ? (
                    <div
                        className={classes.background}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ) : null}
                </Drawer>
            </Hidden>
        </React.Fragment>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
    logo: PropTypes.any,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.array,
    open: PropTypes.func,
    handleDrawerToggle: PropTypes.func,
    classes: PropTypes.object
};

export default withStyles(sidebarStyle)(Sidebar);
