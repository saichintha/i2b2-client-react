export var conceptReducer = (state = [], action) => {
        switch (action.type) {
            case 'ADD_CONCEPT':
                let newConcept = {
                    groupNum: action.groupNum,
                    conceptName: action.conceptName,
                    conceptCode: action.conceptCode,
                    patientNum: action.patientNum,
                    elementID: action.elementID
                };
                return state.concat([newConcept]);
            
            case 'REMOVE_CONCEPT':
                return state.filter(concept => {
                    // console.log('Concept in filter', concept, 'elementID Given', action.elementID);
                    return concept.elementID !== action.elementID;
                });

            case 'RESET_ALL_GROUPS':
                return [];

            default:
                return state;
        };
};

export var queryNameReducer = (state = "", action) => {
        switch (action.type) {
            case 'UPDATE_QUERY_NAME':
                return action.queryName;

            default:
                return state;
        };
};

export var queryResultReducer = (state = [], action) => {
        switch (action.type) {
            case 'ADD_QUERY_RESULT':
                return [
                    action.queryResultPackage,
                    ...state
                ]

            default:
                return state;
        };
};

export var searchResultReducer = (state = [], action) => {
        switch (action.type) {
            case 'ADD_SEARCH_RESULT':
                return [
                    action.searchResultPackage,
                    ...state
                ]

            default:
                return state;
        };
};

export var tabChange = (state = 0, action) => {
        switch (action.type) {
            case 'CHANGE_TAB':
                return action.index;

            default:
                return state;
        };
};
