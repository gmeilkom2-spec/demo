const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


const UserSchema = new mongoose.Schema({
email: String,
password: String,
points: { type: Number, default: 0 },
status: { type: String, default: 'Basic' }
});


const User = mongoose.model('User', UserSchema);


app.post('/api/register', async (req, res) => {
const user = new User(req.body);
await user.save();
res.json({ message: 'User registered' });
});


app.post('/api/login', async (req, res) => {
const user = await User.findOne(req.body);
if (!user) return res
