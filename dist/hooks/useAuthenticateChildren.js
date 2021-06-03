import { AuthenticateChildrenKey } from '../types';
import React, { Fragment, useMemo } from 'react';
export function useAuthenticateChildren(children) {
    return useMemo(function () {
        var AppComponent = {
            component: React.createElement(Fragment, null),
            route: 'app'
        };
        var LoadingComponent = {
            component: React.createElement(Fragment, null),
            route: 'loading'
        };
        var AuthenticationComponent = {
            component: React.createElement(Fragment, null),
            route: 'authenticate'
        };
        var CreateUserComponent = {
            component: React.createElement(Fragment, null),
            route: 'create_user'
        };
        React.Children.forEach(children, function (child) {
            var props = child.props;
            switch (child.key) {
                case AuthenticateChildrenKey.AppContent:
                    AppComponent = {
                        component: child,
                        route: props.route
                    };
                    break;
                case AuthenticateChildrenKey.Loading:
                    LoadingComponent = {
                        component: child,
                        route: props.route
                    };
                    break;
                case AuthenticateChildrenKey.Authentication:
                    AuthenticationComponent = {
                        component: child,
                        route: props.route
                    };
                    break;
                case AuthenticateChildrenKey.CreateUser:
                    CreateUserComponent = {
                        component: child,
                        route: props.route
                    };
                    break;
                default:
                    break;
            }
        });
        return [AppComponent, LoadingComponent, AuthenticationComponent, CreateUserComponent];
    }, [children]);
}
//# sourceMappingURL=useAuthenticateChildren.js.map