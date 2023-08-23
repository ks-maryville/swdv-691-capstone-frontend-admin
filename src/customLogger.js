export const mccLogger = (component, lineNumber, message, data)=>{
    let logObject = {
        info: message,
        data: data || null,
        component: component,
        lineNumber: lineNumber
    }
    console.log(logObject);
}