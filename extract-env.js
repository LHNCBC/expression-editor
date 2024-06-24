const {readFileSync, writeFileSync} = require('fs');
const {resolve} = require('path');

const environmentPath = resolve('./src/environments/environment.ts');
const outputPath = resolve('cypress.env.json');

const environmentFileContent = readFileSync(environmentPath, 'utf8');

const regex = /export\s+const\s+(\w+)\s*=\s\{([^}]*)\}/g;

let match;
if ((match = regex.exec(environmentFileContent)) !== null) {
  const value = match[2].replace(/['"`]/g, '');

  const properties = value.split(',').map(prop => prop.trim());
  const parsedObject = {};

  properties.forEach(property => {
    const [key, value] = property.split(':').map(item => item.trim());
    parsedObject[key] = value;
  })

  writeFileSync(outputPath, JSON.stringify(parsedObject, null, 2));
}



