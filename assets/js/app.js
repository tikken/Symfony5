import React from 'react';
import ReactDOM from 'react-dom';

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
            <div className="row">
                <h1>Fuck you</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

console.log('yes')
