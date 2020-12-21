const defaultCategoriesState = {
    list: [],
    loading: true
}

export const categoriesActions = {
    LOADING: 'loading',
    SET_CATEGORIES: 'setCategories'
}

const categories = (state = defaultCategoriesState, action) => {
    switch (action.type) {
        case categoriesActions.LOADING:
            return Object.assign({}, state, { loading: action.payload });
        case categoriesActions.SET_CATEGORIES:
            return Object.assign({}, state, { list: action.payload });
        default:
            return state;
    }
}

export default categories;