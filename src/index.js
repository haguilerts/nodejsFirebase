const app = require('./app');



app.listen(app.get('port'));
console.log(`server on port: http://localhost:${app.get('port')}/`, );