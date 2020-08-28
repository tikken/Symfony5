import React from 'react';
import ReactDOM from 'react-dom';

import AppointmentsDayView from './components/AppointmentsDayView';
import AppointmentForm from './components/AppointmentForm';
import { sampleAppointments } from './sampleData/sampleData';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Home from './pages/home'
import Admin from './pages/admin'

function App() {
    return (
        <Router>
            <div className="row">

                <Link to="/home">Home</Link>
                <Link to="/admin">Admin</Link>

                <AppointmentsDayView appointments={sampleAppointments} />

                <AppointmentForm />

                <Switch>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    <Route path="/admin">
                        <Admin/>
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'));