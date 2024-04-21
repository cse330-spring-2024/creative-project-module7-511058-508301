//source: https://www.geeksforgeeks.org/next-js-custom-server/#
const next = require('next') 
const http = require('http') 

const app = next({dev: process.env.NODE_ENV !== 'production'}) 

app.prepare().then(() => { 
const server = http.createServer((req, res) => { 
    // Handle API routes 
    if (req.url.startsWith('/api')) { 
        // Your API handling logic here 

        // // For example, handle a POST request to /api/login
        // if (req.method === 'POST' && req.url === '/api/login') {
        //     let body = '';
        //     req.on('data', chunk => {
        //         body += chunk.toString();
        //     });
        //     req.on('end', () => {
        //         const { username, password } = JSON.parse(body);
        //         // Check the username and password
        //         if (username === 'admin' && password === 'admin') {
        //             res.writeHead(200, { 'Content-Type': 'application/json' });
        //             res.end(JSON.stringify({ message: 'Login successful' }));
        //         } else {
        //             res.writeHead(401, { 'Content-Type': 'application/json' });
        //             res.end(JSON.stringify({ message: 'Invalid username or password' }));
        //         }
        //     });
        // } else {
        //     res.writeHead(404, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify({ message: 'Route not found' }));
        // }
    } else { 
        // Handle Next.js routes 
        return app.getRequestHandler()(req, res) 
    } 
}) 
server.listen(3000, (err) => { 
    if (err) throw err 
        console.log('> Ready on http://localhost:3000') 
    }) 
})
