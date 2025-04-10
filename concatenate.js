// Description:
//   Concatenates several source files to produce lhc-forms.js and its source map.
// Optional argument:
//   --output-path - The output directory defaults to ./dist/expression-editor.  This
//                   can be overridden using this optional command-line argument.
//                   The path provided must be relative to the current workspace.
// Examples:
//   node concatenate.js
//   node concatenate.js --output-path docs

const process = require('process');
const ConcatWithSourceMaps = require('concat-with-sourcemaps');
const concat = new ConcatWithSourceMaps(true, 'all.js', '\n');
const fs = require('fs');
const path = require('path');

(async function build() {

  // es2018 files from angular 15 build
  const jsFileDir = './dist/expression-editor';
  //const jsFiles = ['scripts.js', 'runtime.js', 'polyfills.js', 'main.js'
  const jsFiles = ['runtime.js', 'polyfills.js', 'main.js'].map(f=>path.join(jsFileDir, f));

  jsFiles.forEach(f=>{
    let content = fs.readFileSync(f, {encoding: 'utf8'});
    // Remove the sourcemapping statement from the file
    content = content.replace(/\/\/# sourceMappingURL=\S+\.js\.map/, '');
    const fileName = path.basename(f);
    const sourceMapContent = fs.readFileSync(f+'.map', {encoding: 'utf8'});
    concat.add(f, content, sourceMapContent);
  });

  // Add sourcemapping statement to the combined content
  let outputContent = concat.content + "\n//# sourceMappingURL=expression-editor.js.map\n";

  // If an output path is provided, use that; otherwise, use the default jsFileDir
  const args = process.argv.slice(2);
  const outputFileDir = (args && args.length > 1 && args[0] === '--output-path') ? args[1] : jsFileDir;

  // Write outputs
  fs.writeFileSync(path.join(outputFileDir, 'expression-editor.js'), outputContent);
  fs.writeFileSync(path.join(outputFileDir, 'expression-editor.js.map'), concat.sourceMap);

})()