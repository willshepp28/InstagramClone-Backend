
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

    clone.data = _.get(parameters, 'data', {});
    clone.queryParams = _.get(parameters, 'queryParams', {});
    clone.where = _.get(parameters, 'where',{});
    clone.include = _.get(parameters, 'include');
    clone.limit = _.get(parameters, 'limit');
    clone.attributes = _.get(parameters, 'attributes', []);
    clone.offset = _.get(parameters, 'offset');
    clone.meta = _.get(parameters,'meta');
    clone.errors = _.get(parameters, 'errors',[]);
    clone.orderBy = _.get(parameters, 'orderBy');
    clone.order = _.get(parameters, 'order');
    clone.orderProperty = _.get(parameters, 'orderProperty');
    clone.orderDirection = _.get(parameters,'orderDirection');
    

    return clone;

}

module.exports = {
    cloneStateManager
}