function createHtmlTagFromParameters(parameters) {
    if (Array.isArray(parameters) === false) {
        return parameters.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    var tagName = parameters[0];

    if (parameters.length < 2) {
        return "<" + tagName + "/>";
    }

    var fullTagContent = "";

    for (var i = 1; i < parameters.length; i++) {
        var individualContent = parameters[i];

        var tagContent = createHtmlTagFromParameters(individualContent);

        fullTagContent += tagContent;
    }

    return "<" + tagName + ">" + fullTagContent + "</" + tagName + ">";
}