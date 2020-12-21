import React from 'react';
import { Button, Grid, Header, Progress } from 'semantic-ui-react';

class QuestionCard extends React.Component {
 /*    constructor(props) {
        super(props);
    } */
    
    render() {
        return (
            <div>
                <Grid padded>
                    <Grid.Row only='computer tablet'>
                        <Header as='h2' color='teal' textAlign='center'>{'Q' + this.props.qno + '. ' + this.props.question}</Header>
                    </Grid.Row>
                    <Grid.Row only='mobile'>
                        <Header as='h3' color='teal' textAlign='center'>{'Q' + this.props.qno + '. ' + this.props.question}</Header>
                    </Grid.Row>
                </Grid>
                {
                    this.props.time !== undefined ?
                        this.props.time > 0 ?
                            this.props.time < 10001 ?
                                (<React.Fragment>
                                    <Progress total={10000} value={this.props.time} color={this.props.time > 3000 ? 'teal' : 'red'} size='tiny'></Progress>
                                    <Header as='h3' color={this.props.time > 3000 ? 'teal' : 'red'}>Time Left: {this.props.time / 1000}</Header>
                                </React.Fragment>)
                                :
                                ''
                            :
                            <Header as='h2' color='red' textAlign='center'>Time up!</Header>
                        :
                        ''
                }
                <Grid centered>
                    {
                        this.props.time !== undefined ?
                            this.props.time > 0 && this.props.time < 10001 ?
                                this.props.choices.map((x,ind) => {
                                    return (
                                        <Grid.Row key={ind}>
                                            <Grid.Column computer='6' tablet='8' mobile='12'>
                                                <Button disabled={this.props.time < 1} fluid size='large' basic color={this.props.selected ? x === this.props.selected ? x === this.props.correct ? 'green' : 'red' : x === this.props.correct ? 'green' : 'teal' : 'teal'} onClick={this.props.onChoice}>{x}</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    )
                                })
                                : ''
                            :
                            this.props.choices.map((x,ind) => {
                                return (
                                    <Grid.Row key={ind}>
                                        <Grid.Column computer='6' tablet='8' mobile='12'>
                                            <Button disabled={this.props.time < 1} fluid size='large' basic color={this.props.selected ? x === this.props.selected ? x === this.props.correct ? 'green' : 'red' : x === this.props.correct ? 'green' : 'teal' : 'teal'} onClick={this.props.onChoice}>{x}</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                )
                            })
                    }
                </Grid>
            </div>
        );
    }
}
export default QuestionCard;