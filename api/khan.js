import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (req, res) {
    const proxy = createProxyMiddleware({
        target: 'https://www.khanacademy.org',
        changeOrigin: true,
        pathRewrite: { '^/api/khan': '' },
        onProxyRes: (proxyRes) => {
            delete proxyRes.headers['x-frame-options'];
            delete proxyRes.headers['content-security-policy'];
        },
    });

    return proxy(req, res);
}
