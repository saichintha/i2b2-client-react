export var addConceptToGroup = (groupNum, conceptInfo) => {
    return {
        type: 'ADD_CONCEPT',
        groupNum,
        conceptInfo
    };
};