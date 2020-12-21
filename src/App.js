//import logo from './logo.svg';
import './App.css';
import { Grid } from 'semantic-ui-react';
import Categories from './pages/Categories';
import { Route, Switch } from 'react-router-dom';
import Quiz from './pages/Quiz';

function App() {
  return (
    <Grid padded>
      <Grid.Row centered>
        <Grid.Column computer='10' mobile='16' tablet='12'>
          <Switch>
            <Route path='/' component={Categories} exact></Route>
            <Route path='/quiz' component={Quiz}></Route>
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
