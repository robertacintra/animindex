/** @type {import('next').NextConfig} */

module.exports = {
    experimental: {
        appDir: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.less$/,
            use: [
            'style-loader',
            'css-loader',
            {
                loader: 'less-loader',
                options: {},
            },
            ],
        });
    
        return config;
    },
};