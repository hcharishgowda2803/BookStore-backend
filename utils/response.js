let statusCodeMeassage = {
    200: "Success",
    201: "Created",
    202: "Accepted",
    204: "Processed, no content to display",
    301: "Endpoint moved",
    302: "Request can't be fullfiled",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
    413: "Payload too large",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout"
}


export const mongooseErrorHandler = function (err,res){
    if(err.hasOwnProperty('errors')){
        let keys = Object.keys(err.errors);
        keys.forEach((key)=>{
            return err.errors[key]= {
                fields:key,
                message:err.errors[key].message || 'Message not found',
                reason:err.errors[key].reason || 'Reason not found'

            }
        })
    }
}

export const errorHandler = function (statusCode,err,res){
    response(statusCode,err,res)
}

export const response = function (status,result,res){
    let resp = {
        status:{
            code:status,
            message:statusCodeMeassage[status] || null
        },
        response:{
            data:result
        }
    }
    res.status(status).json(resp).end()
}
