/**
 * data-xxx attributes in html are cutting by whitespace.
 * Encoding the json prevents issues when attributes contain whitespaces
 * https://stackoverflow.com/questions/51024627/javascript-data-cuts-the-string-content-by-whitespace
 * @param object
 */
const toEncodedJson = (object) =>  {
    return encodeURIComponent(JSON.stringify(object));
}

const fromEncodedJson = (encodedJson) =>  {
    return JSON.parse(decodeURIComponent(encodedJson));
}

export { toEncodedJson, fromEncodedJson };