import React from 'react';
import dynamic from 'dva/dynamic';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';

import DefaultLayout from './layouts/default';
import routes from './router.config';

const { ConnectedRouter } = routerRedux;

const Routers = ({ history, app }) => {
    const renderRedirect = () => {
        return (<Redirect to="/dashboard" />);
    };

    return (
        <ConnectedRouter history={history}>
            <DefaultLayout>
                <Switch>
                    <Route exact path="/" render={renderRedirect} />
                    {
                        routes.map(({ path, ...dynamics }, key) => (
                            <Route
                                key={key}
                                exact
                                path={path}
                                component={dynamic({ app, ...dynamics })}
                            />
                        ))
                    }
                </Switch>
            </DefaultLayout>
        </ConnectedRouter>
    );
};

Routers.propTypes = {
    history: PropTypes.object,
    app: PropTypes.object
};

export default Routers;
