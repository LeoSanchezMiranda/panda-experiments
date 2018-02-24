function isArray(element) {
    return Array.isArray(element);
}

function getTag(element) {
    if (isArray(element))
    {
        return element[0];
    }

    return null;
}

function generateTagWithContent(tag, content) {
    return "<" + tag + ">" + content + "</" + tag + ">";
}

function generateSelfClosingTag(tag) {
    return "<" + tag + "/>";
}

function encodeHtml(content) {
    var encodedHtml = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return encodedHtml;
}

function createTagContent(content) {

    var tag = getTag(content);

    if (tag === null) {
        return encodeHtml(content);
    }

    //Te existance of a Tag means this is an array

    var tagContentLength = content.length - 1;

    if (tagContentLength < 1) {
        return generateSelfClosingTag(tag);
    }

    var fullTagContent = "";

    for (var i = 0; i < tagContentLength + 1; i++) {

        if (i > 0) {
            var individualContent = content[i];

            var tagContent = createTagContent(individualContent);

            fullTagContent += tagContent;
        }
    }

    var tagWithContent = generateTagWithContent(tag, fullTagContent);

    return tagWithContent;
}


function createHtml(parameters) {
    var tag = getTag(parameters);

    var tagContentLength = parameters.length - 1;

    if (tagContentLength < 1) {
        return generateSelfClosingTag(tag);
    }

    var fullTagContent = "";

    for (var i = 0; i < tagContentLength + 1; i++) {

        if (i > 0) {
            var content = parameters[i];

            var tagContent = createTagContent(content);

            fullTagContent = fullTagContent + tagContent;
        }
    }

    var tagWithContent = generateTagWithContent(tag, fullTagContent);

    return tagWithContent;

}