const defaultQuizState = {
    category: { id: -1, name: 'CATEGORY_NOT_SELECTED' },
    loading: true,
    questions: [],
    currentQuestion: 0,
    score: 0,
    phase: 'NOT_STARTED',
    answerStates: []
}

export const quizActions = {
    LOADING: 'loading',
    SET_CATEGORY: 'setCategory',
    SET_QUESTIONS: 'setQuestions',
    SET_CHOICE: 'setChoice',
    SET_CURRENT_QUESTION: 'setCurrentQuestion',
    SET_SCORE: 'setScore',
    SET_PHASE: 'setPhase',
    RESET: 'resetQuizState',
    SET_TIME_REM: 'setTimeRem'
}

const quiz = (state = defaultQuizState, action) => {
    switch (action.type) {
        case quizActions.LOADING:
            return Object.assign({}, state, { loading: action.payload });
        case quizActions.SET_CATEGORY:
            return Object.assign({}, state, { category: action.payload });
        case quizActions.SET_QUESTIONS:
            return Object.assign({}, state, { questions: action.payload });
        case quizActions.SET_CHOICE:
            state.questions[state.currentQuestion].selected = action.payload;
            return Object.assign({}, state);
        case quizActions.SET_CURRENT_QUESTION:
            return Object.assign({}, state, { currentQuestion: action.payload });
        case quizActions.SET_SCORE:
            state.answerStates.push(action.payload);
            if(action.payload === 'c') {
                if(state.questions[state.currentQuestion].timeRemaining > 9000)
                    state.score += 20;
                else
                state.score += Math.ceil((state.questions[state.currentQuestion].timeRemaining*2)/1000); 
            }
            return Object.assign({}, state);
        case quizActions.SET_PHASE:
            return Object.assign({}, state, { phase: action.payload });
        case quizActions.RESET:
            return Object.assign({}, defaultQuizState, { category: action.payload });
        case quizActions.SET_TIME_REM:
            state.questions[state.currentQuestion].timeRemaining = action.payload;
            return Object.assign({}, state);
        default:
            return state;
    }
}

export default quiz;