export var addConceptToGroup = (groupNum, conceptName, conceptCode, patientNum, elementID) => {
    return {
        type: 'ADD_CONCEPT',
        groupNum,
        conceptName,
        conceptCode,
        patientNum,
        elementID
    };
};

export var removeConceptFromGroup = (elementID) => {
    return {
        type: 'REMOVE_CONCEPT',
        elementID
    };
};

export var resetAllGroups = () => {
    return {
        type: 'RESET_ALL_GROUPS'
    };
};