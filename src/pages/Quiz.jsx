import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Header, Icon, Loader, Segment } from 'semantic-ui-react';
import QuestionCard from '../components/QuestionCard';
import { htmlDecode, shuffleArray } from '../helperFunctions';
import { dispatchAction } from '../redux/all';
import { quizActions } from '../redux/quiz';

class Quiz extends React.Component {
 /*    constructor(props) {
        super(props);
    } */

    componentDidMount() {
        this.fetchQuestions();
    }

    manageTime = () => {
        this.ti = setInterval(() => {
            let tr = this.props.quiz.questions[this.props.quiz.currentQuestion].timeRemaining;
            if (tr > 0)
                dispatchAction(quizActions.SET_TIME_REM, tr - 1000);
            else
                this.skipQuestion();
        }, 1000);
    }

    ti;

    fetchQuestions = () => {
        fetch('https://opentdb.com/api.php?amount=7&category=' + this.props.quiz.category.id)
            .then(res => res.json())
            .then(data => {
                //console.log('qs', data);
                let questions = data.results.map(x => {
                    x.read = false;
                    x.timeRemaining = 12000;
                    x.question = htmlDecode(x.question);
                    x.correct_answer = htmlDecode(x.correct_answer);
                    let c = x.incorrect_answers.map(y => { return htmlDecode(y) });
                    c.push(htmlDecode(x.correct_answer));
                    shuffleArray(c);
                    let q = Object.assign({}, x, { choices: c });
                    return q;
                })
                dispatchAction(quizActions.SET_QUESTIONS, questions);
                dispatchAction(quizActions.LOADING, false);
            })
            .then(() => {
                dispatchAction(quizActions.SET_PHASE, 'ONGOING');
                this.manageTime();
            });
    }

    skipQuestion = () => {
        clearInterval(this.ti);
        dispatchAction(quizActions.SET_CHOICE, -1);
        dispatchAction(quizActions.SET_SCORE, 's');
        setTimeout(() => {
            if (this.props.quiz.questions.filter(x => { return x.selected }).length < 7) {
                dispatchAction(quizActions.SET_CURRENT_QUESTION, this.props.quiz.currentQuestion + 1);
                this.manageTime();
            }
            else {
                //debugger;
                dispatchAction(quizActions.SET_PHASE, 'COMPLETE');
            }
        }, 1500);
    }


    handleChoiceClick = (e, d) => {
        e.target.blur();
        clearInterval(this.ti);
        dispatchAction(quizActions.SET_CHOICE, d.children);
        dispatchAction(quizActions.SET_SCORE, d.children === this.props.quiz.questions[this.props.quiz.currentQuestion].correct_answer ? 'c' : 'i');
        setTimeout(() => {
            if (this.props.quiz.questions.filter(x => { return x.selected }).length < 7) {
                dispatchAction(quizActions.SET_CURRENT_QUESTION, this.props.quiz.currentQuestion + 1);
                this.manageTime();
            }
            else {
                //debugger;
                dispatchAction(quizActions.SET_PHASE, 'COMPLETE');
            }
        }, 1500);

    }

    handleGoToCategoriesClick = () => {
        clearInterval(this.ti);
        dispatchAction(quizActions.RESET, { id: -1, name: 'CATEGORY_NOT_SELECTED' });
        this.props.history.push('/');
    }

    handlePlayAgainClick = () => {
        let currCat = this.props.quiz.category;
        dispatchAction(quizActions.RESET, currCat);
        this.fetchQuestions();
    }


    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h1' color='teal' textAlign='center'>{this.props.quiz.category.name}</Header>
                        {
                            this.props.quiz.questions.length > 0 ?
                                this.props.quiz.questions.filter(x => !x.selected).length > 0 ?
                                    <React.Fragment>
                                        <QuestionCard time={this.props.quiz.questions[this.props.quiz.currentQuestion].timeRemaining} qno={this.props.quiz.currentQuestion + 1} correct={this.props.quiz.questions[this.props.quiz.currentQuestion].correct_answer} selected={this.props.quiz.questions[this.props.quiz.currentQuestion].selected} onChoice={this.handleChoiceClick} question={this.props.quiz.questions[this.props.quiz.currentQuestion].question} choices={this.props.quiz.questions[this.props.quiz.currentQuestion].choices}></QuestionCard>
                                    </React.Fragment>
                                    :
                                    this.props.quiz.phase === 'COMPLETE' ?
                                        <Segment basic>
                                            <Header as='h2' textAlign='center' color='teal'>Your score: {this.props.quiz.score}</Header>
                                            <Grid centered>
                                                <Grid.Row columns='2' only='computer tablet'>
                                                    <Grid.Column computer='5' mobile='8' tablet='8'>
                                                        <Button onClick={this.handlePlayAgainClick} color='teal' size='medium' basic fluid>Play again</Button>
                                                    </Grid.Column>
                                                    <Grid.Column computer='5' mobile='8' tablet='8'>
                                                        <Button onClick={this.handleGoToCategoriesClick} color='teal' size='medium' basic fluid>Go to categories</Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row only='mobile'>
                                                    <Grid.Column>
                                                        <Button onClick={this.handlePlayAgainClick} color='teal' size='medium' basic fluid>Play again</Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row only='mobile'>
                                                <Grid.Column>
                                                    <Button onClick={this.handleGoToCategoriesClick} color='teal' size='medium' basic fluid>Go to categories</Button>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>
                                        :
                                        <React.Fragment>
                                            <QuestionCard qno={this.props.quiz.currentQuestion + 1} correct={this.props.quiz.questions[this.props.quiz.currentQuestion].correct_answer} selected={this.props.quiz.questions[this.props.quiz.currentQuestion].selected} onChoice={this.handleChoiceClick} question={this.props.quiz.questions[this.props.quiz.currentQuestion].question} choices={this.props.quiz.questions[this.props.quiz.currentQuestion].choices}></QuestionCard>
                                        </React.Fragment>
                                :
                                <Segment basic>
                                    <Loader active inverted size='large'></Loader>
                                </Segment>

                        }
                    </Grid.Column>
                </Grid.Row>
                {
                    this.props.quiz.phase === 'ONGOING' ?
                        <Grid.Row>
                            <Grid.Column width='8'>
                                <Button onClick={this.handleGoToCategoriesClick} icon color='teal' basic labelPosition='left'>
                                    <Icon name='left arrow' />
                              Quit
                        </Button>
                            </Grid.Column>
                            <Grid.Column width='8' textAlign='right'>
                                <Header as='h2' color='teal' style={{marginTop:'auto', marginBottom:'auto'}}>Score: {this.props.quiz.score}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        :
                        ''
                }
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log('z', state);
    return {
        quiz: state.quiz
    }
}

export default connect(mapStateToProps)(withRouter(Quiz));
