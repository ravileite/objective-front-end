import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Panel from './views/panel'


function App() {
    return (

        <Router>
            <Switch>
                <Route exact path="/">
                    <Panel />
                </Route>
            </Switch>
        </Router>


    );
}

export default App
