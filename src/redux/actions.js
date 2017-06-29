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

export var updateQueryName = (queryName) => {
    return {
        type: 'UPDATE_QUERY_NAME',
        queryName
    };
};

export var addQueryResult = (queryResultPackage) => {
    return {
        type: 'ADD_QUERY_RESULT',
        queryResultPackage
    };
};

export var changeTab = (index) => {
    return {
        type: 'CHANGE_TAB',
        index
    };
};