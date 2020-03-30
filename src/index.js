import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

let app = document.querySelector('.app');

const stylesCC = {
    trace: 'color: blue'
};

class ClassComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            counter: 1
        };

        console.log(`%cCC: constructor: counter=${this.state.counter}`, stylesCC.trace);
    }

    componentDidMount() { console.log(`%cCC: componentDidMount: counter=${this.state.counter}`, stylesCC.trace); }
    shouldComponentUpdate() { console.log(`%cCC: shouldComponentUpdate: counter=${this.state.counter}`, stylesCC.trace); return true; }
    componentDidUpdate() { console.log(`%cCC: componentDidUpdate: counter=${this.state.counter}`, stylesCC.trace); }
    componentWillUnmount() { console.log(`%cCC: componentWillUnmount: counter=${this.state.counter}`, stylesCC.trace); }

    render() {
        console.log(`%cCC: render: counter=${this.state.counter}`, stylesCC.trace);
        return (
            <div>
                <hr />
                {this.state.counter}
                <button onClick={() => {
                    this.setState({
                        counter: this.state.counter + 1
                    });
                }}>+</button>
                <button onClick={() => {
                    this.setState({
                        counter: this.state.counter - 1
                    });
                }}>-</button>
            </div>
        );
    }
}

const stylesFC = {
    trace: 'color: green'
};

function FunctionalComponent() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log(`%cFC: mount: counter=${counter}`, stylesFC.trace);
    }, []);

    useEffect(() => {
        console.log(`%cFC: set unmount: counter=${counter}`, stylesFC.trace);
        return () => {
            console.log(`%cFC: unmount: counter=${counter}`, stylesFC.trace);
        };
    }, []);

    useEffect(() => {
        console.log(`%cFC: update: counter=${counter}`, stylesFC.trace);
    });

    console.log(`%cFC: render: counter=${counter}`, stylesFC.trace);

    return (
        <div>
            <hr />
            {counter}
            <button onClick={() => {
                setCounter(counter + 1);
            }}>+</button>
            <button onClick={() => {
                setCounter(counter - 1);
            }}>-</button>
        </div>
    );
}

function App() {
    let [ showCC, setShowCC ] = useState(true);
    let [ showFC, setShowFC ] = useState(true);

    function buttonText(v) {
        return !v ? 'Add' : 'Remove';
    }

    return (
        <div>
            <button onClick={() => {
                setShowCC(!showCC);
            }}>{buttonText(showCC)} Class Component</button>

            <button onClick={() => {
                setShowFC(!showFC);
            }}>{buttonText(showFC)} Functional Component</button>

            { showCC && <ClassComponent /> }
            { showFC && <FunctionalComponent /> }
        </div>
    );
}

ReactDOM.render(<App />, app);