// 1. 引入所需模块
const express = require('express');
const axios = require('axios');
const path = require('path');
 
// 2. 创建 Express 应用 
const app = express();
const PORT = 3000;
 
// 3. 中间件配置 
app.use(express.json());  // 解析 JSON 请求体 
app.use(express.static(path.join(__dirname,  'public'))); // 静态文件服务 
 
// 4. 路由定义 
// 默认路由 - 返回 index.html  
app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname,  'public', 'index.html')); 
});
 
// /hello 路由 - 返回文本响应 
app.get('/hello',  (req, res) => {
    res.send('Hello  World! 👋');
});
 
// /bye 路由 - 返回 JSON 响应 
app.get('/bye',  (req, res) => {
    res.json({  
        message: 'Goodbye! 👋', 
        timestamp: new Date().toISOString()
    });
});
 
// /who 路由 - 使用 Axios 调用外部 API 
app.get('/who',  async (req, res) => {
    try {
        // 使用 Axios 调用随机用户 API
        const response = await axios.get('https://randomuser.me/api/'); 
        const userData = response.data.results[0]; 
        
        res.json({ 
            name: `${userData.name.first}  ${userData.name.last}`, 
            email: userData.email, 
            location: `${userData.location.city},  ${userData.location.country}` 
        });
    } catch (error) {
        console.error('API  Error:', error);
        res.status(500).send('Error  fetching user data');
    }
});
 
// 5. 启动服务器 
app.listen(PORT,  () => {
    console.log(`Server  running at http://localhost:${PORT}`);
    console.log('Available  routes:');
    console.log(`-  GET /       : Serve index.html`); 
    console.log(`-  GET /hello  : Text response`);
    console.log(`-  GET /bye    : JSON response`);
    console.log(`-  GET /who    : External API data`);
});
