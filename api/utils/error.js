export const errorHandler=(statuCode,errMessage)=>{
    const error=new Error()
    statuCode=error.statuCode
    errMessage=error.message
    return error;

}