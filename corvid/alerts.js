// alerts.js Public file in wix site

const alertCompID = "CustomElement1";

export function alert(message) {
  if(typeof message === "undefined") throw new Error("message is required field");
  
  let toSend = {};
  
  if(typeof message === "string") {
    toSend.message = message;
    newAlert(toSend);
    return;
  }

  newAlert(message);
}

export function alertSuccess(message) {
  if(typeof message === "undefined") throw new Error("message is required field");
  
  let toSend = {
    type: "success",
  };
  
  if(typeof message === "string") {
    toSend.message = message;
    newAlert(toSend);
    return;
  }

  toSend = {...toSend, ...message};
  newAlert(toSend);
}

export function alertError(message) {
  if(typeof message === "undefined") throw new Error("message is required field");
  
  let toSend = {
    type: "error",
  };
  
  if(typeof message === "string") {
    toSend.message = message;
    newAlert(toSend);
    return;
  }

  toSend = {...toSend, ...message};
  newAlert(toSend);
}


export function alertInfo(message) {
  if(typeof message === "undefined") throw new Error("message is required field");
  
  let toSend = {
    type: "error",
  };
  
  if(typeof message === "string") {
    toSend.message = message;
    newAlert(toSend);
    return;
  }

  toSend = {...toSend, ...message};
  newAlert(toSend);
}


export function alertWarn(message) {
  if(typeof message === "undefined") throw new Error("message is required field");
  
  let toSend = {
    type: "warn",
  };
  
  if(typeof message === "string") {
    toSend.message = message;
    newAlert(toSend);
    return;
  }

  toSend = {...toSend, ...message};
  newAlert(toSend);
}


// count variable is the reason to create this file 
// wix setattribute triggers only when the attribute change
// so, we inc. count everytime, so that attribure will be different
// even for same message
let count = 0;

function newAlert(obj={}) {
  if(!obj.message) throw new Error("message is required field!");
  obj.count = count++;
  $w('#' + alertCompID).setAttribute("newalert",JSON.stringify(obj))
}
