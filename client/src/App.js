import React, {Component} from 'react';
import Search from './pages/search'
import Groups from './pages/groups'
import Notifs from './pages/notifs'
import Requests from './pages/requests'
import LoginPage from './pages/login'
import Logout from './pages/logout'
import privacyPolicy from './pages/privacyPolicy';
import termsOfUse from './pages/termsOfUse';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import withAuth from './AuthWrapper';
import InvalidPage from './pages/invalidPage';

function LoginRedirector(props) {
    
    const redirectUrl = window.localStorage.getItem('redirectUrl');

    const token = props.location.search.slice(1);
    window.localStorage.setItem('auth-token', token);
    
    window.localStorage.removeItem('redirectUrl');
    return (
        <Redirect to={redirectUrl ? redirectUrl : '/'} />
    )
}

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path = '/login' component={LoginPage} />
                    <Route path = '/logout' component={Logout} />
                    <Route exact path="/" component={withAuth(Search)} />
                    <Route path ="/groups" component={withAuth(Groups)} />
                    <Route path='/requests' component={withAuth(Requests)} />
                    <Route path="/notifs" component={withAuth(Notifs)} />
                    <Route path='/loginRedirect' component={LoginRedirector} />
                    <Route path='/privacyPolicy' component={privacyPolicy} />
                    <Route path='/termsOfUse' component={termsOfUse} />
                    <Route component={InvalidPage} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;