const mongoose = require('mongoose');
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((error) => {
        console.log('Connected to MongoDB failed!');
        console.log(error);
    });
