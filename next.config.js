/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");

module.exports = withLess({
    lessLoaderOptions: {
        loader: 'less-loader',
        lessOptions: {
            options: {
                javascriptEnabled: true,
            },
        modifyVars: {
            "primary-color": "#9900FF",
            "border-radius-base": "2px",
            /* ... */
        },
        },
    },
});