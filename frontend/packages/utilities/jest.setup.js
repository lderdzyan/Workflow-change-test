// jest.setup.js

require('@testing-library/jest-dom');
const { TextEncoder, TextDecoder } = require('util');

if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;

if (!global.structuredClone) {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}
