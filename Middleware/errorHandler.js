
const constants= require("../constants")

const errorHandle= (err, req, res, next)=>{
    const statusCode=res.statusCode? res.statusCode : 500;
    const check=constants.constants;
    console.log(err)
    switch(statusCode)
    {
        
        case check.VALIDATION_ERROR:
            res.json({
                title:"validation Failed",
                messgae: err.message,
                stackTrace: err.stack
            });
            break;
            case check.NOT_FOUND:
            res.json({
                title:"Not Found",
                messgae: err.message,
                stackTrace: err.stack
            });
            break;
            case check.UNAUTHORIZED:
            res.json({
                title:"UNAUTHORIZED",
                messgae: err.message,
                stackTrace: err.stack
            });
            break;
            case check.FORBIDDEN:
            res.json({
                title:"FORBIDDEN",
                messgae: err.message,
                stackTrace: err.stack
            });
            break;
            case check.server_error:
            res.json({
                title:"server_error",
                messgae: err.message,
                stackTrace: err.stack
            });
            break;
            default:
                console.log("Everything fine")
                break;
                
    }
};
module.exports=errorHandle;