const express = require('express');
const refresh = express.Router();


refresh.get('/new_token', (req, res) => {
    const refreshToken = req.cookies.refreshToken; // 쿠키에서 리프레시 토큰 획득

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh Token이 존재하지 않습니다.' });
    }

    // 단순히 토큰을 반환합니다
    res.json({ refreshToken });
});

module.exports = refresh;