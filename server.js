const path = require('path');
const express = require('express');

express()
    .use(express.static(path.join(__dirname, 'dist')))
    .use('/assets', express.static(path.join(__dirname, 'assets')))
    .listen(process.env.PORT);
