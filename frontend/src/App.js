import React, { Component } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { ReactMic } from '@cleandersonlobo/react-mic';
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
            fileNum: 0,
            code: '',
            text: '',
            tabs: 0,
        }

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    startRecording () {
        this.setState({ record: true });
    }

    stopRecording (recordedBlob) {
        this.setState({ 
            record: false,
        });
        if (recordedBlob.blob) {
            this.sendData(recordedBlob);
        }
    }

    sendData(blob) {
        const { fileNum, text } = this.state;
        var fd = new FormData();
        fd.append('file', blob.blob, `${fileNum}.wav`);

        fetch('http://localhost:8000/upload', {
            headers: { Accept: "form-data", 'Access-Control-Allow-Origin': '*' },
            method: "POST", body: fd
        }).then(response => {
            response.json().then(data => {
                this.handleNewLine(data.line)
                this.setState({text: text + data.text + '\n'})
            });
            this.setState({ fileNum: fileNum + 1})
        });
    }

    handleNewLine (newLine) {
        const { code, tabs } = this.state;
        if (newLine.split(' ')[0] === 'def' || newLine.split(' ')[0] === 'if' || newLine.split(' ')[0] === 'for') {
            this.setState({ tabs: tabs + 1 });
        } else if (newLine === '\n') {
            this.setState({ tabs: tabs - 1 });
        }
        let newCode = code + '\t'.repeat(tabs) + newLine
        this.setState({ code: newCode});
    }

    render () {
        const { record, code, text } =  this.state;

        return (
            <div className="App">
                <Grid columns={2} celled style={{height: '100vh'}}>
                    <Grid.Row centered>
                        <ReactMic
                            record={record}
                            onStop={this.stopRecording}
                            strokeColor={'#ffffff'}
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
                            {text}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <AceEditor 
                                mode="python"
                                theme="github"
                                value={code}
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
