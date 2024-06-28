const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

// Tüm işlemleri getirme
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni işlem oluşturma
router.post('/', async (req, res) => {
  const transaction = new Transaction({
    type: req.body.type,
    amount: req.body.amount,
    date: req.body.date,
    description: req.body.description
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// İşlem güncelleme
router.put('/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// İşlem silme
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting transaction with ID: ${req.params.id}`);
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      console.log(`Transaction with ID ${req.params.id} not found`);
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
