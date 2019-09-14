import React from 'react';
import { Grid } from 'semantic-ui-react';
import AceEditor from 'react-ace';

import "brace/mode/python";
import "brace/theme/github";

import './App.css';

function App() {
    return (
        <div className="App">
            <Grid columns={2} divided style={{height: '100vh'}}>
                <Grid.Column width={8}>
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
            </Grid>
        </div>
    );
}

export default App;
