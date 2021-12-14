export const options = {
  attributeNamePrefix: '',
  attrNodeName: 'attr', //default is 'false'
  textNodeName: '#text',
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: true,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: true,
  cdataTagName: '__cdata', //default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  // attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
  // tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ['parse-me-as-string'],
};
