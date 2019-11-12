const fs = require("fs");


const BundleServices = function(application){
    const services = {};    

    const path = `${__dirname}/../services`;
    console.log("Bundling Services")
    function getServicesFiles(path){
        fs.readdirSync(path).forEach(function(file) {
            const serviceFile = `${path}/${file}`; 
            services[require(serviceFile).name] = require(serviceFile)(application);
        })
    }

    getServicesFiles(path);
    console.log("Finished Bundling Services");
    return services;
}


module.exports = BundleServices;