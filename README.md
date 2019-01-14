# NOT READY!

# Add Build Number Plugin

Webpack plugin for add build number to files.

## Install

```bash
npm install --save-dev add-build-number-plugin
```

## Usage

In your `webpack.config.js`

```javascript
const AddBuildNumberPlugin = require('add-build-number-plugin');

module.exports = {
    // ...
    plugins: [
        new AddBuildNumberPlugin({
            test: /(.*)\.(js|css|gz)/,
            needHash: /^prefix/,
            output: `$1.[hash].[build-number].$2`,
            var: 'BUILD_NUMBER'
        })
    ]
};
```