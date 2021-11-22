(function(window, undefined) {
  var dictionary = {
    "ba77e2b2-425c-40d5-a69e-049a92697086": "recipes",
    "5d7ea5d0-1aa2-4c9a-be3e-da9444e9f665": "groups",
    "bc76225e-bbf9-4c6c-82df-a95f798f663d": "profile",
    "a5602292-7d65-4ed2-b700-78da0057a0ec": "settings",
    "57ab6d02-4ff7-40df-92f1-554958a86cac": "loading",
    "f337531e-1804-4591-88d8-a2dc90b58b89": "main",
    "774e3a89-095b-4e86-8c16-696a290e0f68": "phonescreen",
    "97b154a2-a5b0-4b4b-b386-ecf12da9edfb": "Help",
    "0edd48fc-8c9f-4c34-b312-e13042a81790": "home2",
    "9817ea0e-007b-4cef-bb66-aec748210623": "Exercise",
    "5262504f-3583-473c-b5e2-5eb0e8024973": "Diet",
    "344deeef-ff15-4524-9c69-977d638d8bd9": "Signup",
    "050678c8-976c-4d3f-acef-51bdf9d84ba9": "reviews",
    "1de9f0f5-5e80-46fe-938f-a8426948d045": "login",
    "42903d66-0c85-4446-aa3c-cde6e8fb9d0b": "Sleep",
    "dac644fe-9932-480f-a446-493f7d84ca96": "notifications",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);