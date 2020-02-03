

function create(application){

    function initialize(request, response, next) {
        const state = {};
        state.application = application;
        state.response = response;
        state.domain = request.get("host");
        state.protocol = request.headers["x-forwarded-proto" || request.protocol];
        state.version = 1;
        state.requestInfo = {
            ip: request.headers["x-forwarded-for"] || request.connection.remoteAddress,
            method: request.method,
            // url: request.url,
            startTime: Date.now(),
            id: request.id,
            clientRequestId: request.headers["x-request-id"],
            clientOrigin: request.headers.origin,
        };
        request.state = state;
        next();
    }


    return {
        initialize
    }
}


module.exports = create;