const path = require('path');

const config = {
    entry: path.join(__dirname, 'public/js/components/app.js'),
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'public/js/components'),
                exclude: /node_modules/,
                loader: 'babel'
            },
        ]
    },
    node: {
        fs: 'empty'
    }
};

module.exports = config;