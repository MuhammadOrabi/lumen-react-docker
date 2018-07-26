import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Icon, SideBar, Spinner, Placeholder } from 'self-components';
import { withStyles, Button, Snackbar } from 'material-ui';

import logo from 'self-images/logo.svg';
import sideBarImage from 'self-images/sidebar-2.jpg';
import styles from './style.default';

import routes from '../router.config';

const HoC = () => {
    return (Component) => {
        return class extends React.Component {
            constructor (props) {
                super(props);

                this.state = {
                    counterProps: 0
                };
            }
            changeProps = () => {
                const { counterProps } = this.state;
                this.setState({
                    counterProps: counterProps + 1
                });
            };
            render () {
                const props = {
                    ...this.props,
                    changeProps: this.changeProps,
                    counterProps: this.state.counterProps
                };
                return (
                    <Component {...props} />
                );
            }
        };
    };
};

/* eslint react/no-multi-comp: ["off"] */
class DefaultLayout extends React.Component {
    static propTypes = {
        isError: PropTypes.bool,
        showError: PropTypes.func,
        counterProps: PropTypes.number,
        changeProps: PropTypes.func
    };

    constructor (props) {
        super(props);
        this.state = {
            counter: 0,
            content: null
        };
    }

    onClick = () => {
        this.setState((prevState) => {
            const { counter } = prevState;
            return {
                counter: counter + 1
            };
        });
    };

    onClickProps = () => {
        this.props.changeProps();
        this.props.showError();
    };

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.app}>
                <SideBar
                    routes={routes}
                    logoText="Hello World"
                    logo={logo}
                    color="blue"
                    image={sideBarImage}
                />
                <header className={classes.appHeader}>
                    <img src={logo} className={classes.appLogo} alt="logo" />
                    <h1 className={classes.Title}>Welcome to React</h1>
                </header>
                <p className={classes.appIntro}>
                    我们的 UI 框架是 <a href="https://material-ui-next.com/">Material-UI</a> 框架，基于 Google 的
                    Material-Design 设计理念，所以在开发之前，请先了解 Material-UI 框架的使用方法。

                    参照的设计风格请以<a href="https://creativetimofficial.github.io/material-dashboard-react/#/dashboard">Material-Dashboard</a>为主！

                    <br /><br />样式采用了和 React Native 相似 CSS in JS 的第三方库 - <a href="https://github.com/cssinjs/jss">Jss</a>，需要学习下 Jss 的使用方法同时对于每个组件或者页面的样式来说，
                    我们使用 Material-UI 自带的 withStyles 方法，请参考 layouts/default.js 中的使用方式；
                </p>
                <Placeholder delayMs={3000} fallback={<Spinner size="small" />} className={classes.contentPlaceholder}>
                    {this.state.content}
                    <Icon />
                </Placeholder>
                <p>{window.localLanguage.Hello}</p>
                <Button variant="raised" color="secondary" onClick={this.onClick}>
                    {process.env.REACT_APP_ENV === 'development'
                        ? `state-counter: ${this.state.counter}`
                        : 'Hello Production'}
                </Button>
                <br />
                <Spinner size="small" />
                <br />
                <Button variant="raised" color="secondary" onClick={this.onClickProps}>
                    {process.env.REACT_APP_ENV === 'development'
                        ? `prop-counter: ${this.props.counterProps}`
                        : 'Hello Production'}
                </Button>
                <br />
                <br />
                <br />
                <hr />
                {this.props.children}
                <Snackbar
                    classes={{
                        root: classes.error
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={this.props.isError}
                    autoHideDuration={6000}
                    message="HELLO WORLD!"
                />
            </div>
        );
    }
}

const mapStatesToProps = ({ app }) => ({ ...app });
const mapDispatchToProps = dispatch => ({
    showError: () => dispatch({ type: 'app/showError' })
});

// withRouter 要在 connect 之后执行
export default withRouter(
    connect(mapStatesToProps, mapDispatchToProps)(HoC()(withStyles(styles)(DefaultLayout))));
