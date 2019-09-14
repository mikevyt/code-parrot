import React from 'react';
import { Grid } from 'semantic-ui-react';
import GeneratedCode from './GeneratedCode';
import './App.css';

function App() {
    return (
        <div className="App">
            <Grid>
                <Grid.Column>
                    {/* <UploadArea /> */}
                </Grid.Column>
                <Grid.Column>
                        <GeneratedCode />
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default App;
