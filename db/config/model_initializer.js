"use strict";

const fs = require("fs");
const _ = require("lodash");


const models = _.omit(require("../models"), ['sequelize', 'Sequelize']);
const instance = null;

const init = function(application){

    console.log("INITIALIZING: Loading Models For Application");
    const ORM = application.get("ORM");
    const dataTypes = application.get("dataTypes");

    const instances = {};

    function getModelsAndAddToInstance(models){
      
        _.forOwn(models, function(model){
            console.log(model)
        })
    }

    getModelsAndAddToInstance(models);
    console.log("FINISHED: Models Done Loading For Application")



    return {
        getInstance: function(application){
            if (instance === null){
                init(application);
            }
            return instance;
        },
    };
}


module.exports = init;