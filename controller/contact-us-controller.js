const express = require('express');
const router = express.Router();
const Contact = require('../model/contactModel');

router.post('/submit', async (req, res) => {
  
    const { name, email, subject, message } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            subject,
            message,
        });

        const storedData = await newContact.save();
        if (storedData){
            res.redirect('/success');
        }else{
            res.redirect('/error')
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
