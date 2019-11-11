
const _ = require("lodash");


const cloneStateManager = function(state, model, parameters){

    const clone = {};

    clone.modelName = _.cloneDeep(model);
    clone.application = state.application;
    clone.response = state.response;

    if (state.params) {
        clone.params = state.params;
    }

    if(model){
        clone.model = state.application.get("Models")[model]
    }

    clone.queryParams = parameters.queryParams || {};
    clone.where = parameters.where || {};
    clone.include = parameters.include;
    clone.limit = parameters.limit;
    clone.offset = parameters.offset;
    clone.meta = parameters.meta;
    clone.errors = parameters.errors || [];
    clone.orderBy = parameters.orderBy;
    clone.order = parameters.order;
    clone.orderProperty = parameters.orderProperty;
    clone.orderDirection = parameters.orderDirection;
    

    return clone;

}

module.exports = {
    cloneStateManager
}