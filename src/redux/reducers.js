export var addConceptReducer = (state = [], action) => {
        switch (action.type) {
            case 'ADD_CONCEPT':
                return [
                    ...state,
                    {
                        groupNum: action.groupNum,
                        conceptInfo: action.conceptInfo
                    }
                ];

            default:
                return state;
        };
};