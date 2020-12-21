import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Grid, Button, Loader, Segment } from 'semantic-ui-react';
import { dispatchAction } from '../redux/all';
import {categoriesActions} from '../redux/categories';
import { quizActions } from '../redux/quiz';

class Categories extends React.Component {
   /*  constructor(props) {
        super(props);
    } */

    componentDidMount() {
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => {
                    dispatchAction(categoriesActions.SET_CATEGORIES, data.trivia_categories);
                    dispatchAction(categoriesActions.LOADING, false);
            })
    }

    handleCategoryClick = (e,cat) => {
        dispatchAction(quizActions.SET_CATEGORY, { id: cat.id, name:cat.name });
        this.props.history.push('/quiz');
    }

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h1' color='teal' textAlign='center'>Play quiz on any of these amazing topics!</Header>
                        <Grid>
                            <Grid.Row centered>
                                {
                                    this.props.categories.loading ?
                                        <Segment basic>
                                            <Loader active inverted size='large'></Loader>
                                        </Segment>
                                        :
                                        this.props.categories.list.map(c => {
                                            return (
                                                    <Button onClick={(e,cat) => this.handleCategoryClick(e,c)} key={c.id} basic color='teal' style={{ margin: '5px' }}>{c.name}</Button>
                                            )
                                        })
                                }
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(withRouter(Categories));