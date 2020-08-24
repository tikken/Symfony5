import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Home from './pages/home'
import Admin from './pages/admin'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            entries: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(response => response.json())
            .then(entries => {
                this.setState({
                    entries
                });
            });
    }

    render() {
        return (
            <Router>
                <div className="row">
                    <h1>Fuck you</h1>

                    <Link to="/home">Home</Link>
                    <Link to="/admin">Admin</Link>

                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/admin">
                            <Admin />
                        </Route>
                    </Switch>

                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));