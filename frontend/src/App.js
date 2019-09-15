import React, { Component } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { ReactMic } from 'react-mic';
import AceEditor from 'react-ace';

import "brace/mode/python";
import "brace/theme/github";

import './App.css';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            record: false,
            audioBlob: null,
        }

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
    }

    startRecording () {
        this.setState({ record: true });
    }

    stopRecording (recordedBlob) {
        this.setState({ 
            record: false,
        });
        if (recordedBlob.blob) {
            console.log(recordedBlob);
            this.sendData(recordedBlob);
        }
    }

    sendData(blob) {
        var fd = new FormData();
        fd.append('file', blob);
        console.log(fd);

        fetch('http://localhost:8000/', {
            headers: { Accept: "application/x-www-form-urlencoded", 'Access-Control-Allow-Origin': '*' },
            method: "POST", body: fd
        });
    }

    render () {
        const { record } =  this.state;

        return (
            <div className="App">
                <Grid columns={2} celled style={{height: '100vh'}}>
                    <Grid.Row centered>
                        <ReactMic
                            record={record}
                            onStop={this.stopRecording}
                            strokeColor={'#e0e1e2'}
                            backgroundColor={'white'}
                        />
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button
                            icon 
                            labelPosition='left' 
                            onClick={this.startRecording}
                            disabled={record}
                        >
                            <Icon name='record' />
                            Record
                        </Button>
                        <Button
                            icon
                            labelPosition='left'
                            onClick={this.stopRecording}
                            disabled={!record}
                        >
                            <Icon name='stop' />
                            Stop
                        </Button>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            Hello
                            {/* <AceEditor 
                                mode="python"
                                theme="github"
                                value={'for i in range(10):\n\tdong'}
                                style={{height: '95vh'}}
                            /> */}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <AceEditor 
                                mode="python"
                                theme="github"
                                value={'for i in range(10):\n\tdong'}
                                style={{height: '95vh', width: 'auto'}}
                            />
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default App;
