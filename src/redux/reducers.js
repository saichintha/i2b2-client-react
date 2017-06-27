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
                    console.log('Concept in filter', concept, 'elementID Given', action.elementID);
                    return concept.elementID !== action.elementID;
                });

            case 'RESET_ALL_GROUPS':
                return [];

            default:
                return state;
        };
};