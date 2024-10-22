const express = require('express');
const router = express.Router();
const Music = require('../models/music.Models');

// POST: Adicionar nova música
router.post('/', async (req, res) => { 
  const { singer, song, genre, registrationDate } = req.body; 
  try {
    const newMusic = new Music({ singer, song, genre, registrationDate });
    await newMusic.save();
    res.status(201).json(newMusic);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar música" });
  }
});

// GET: Listar todas as músicas
router.get('/', async (req, res) => {
  try {
    const musics = await Music.find();
    res.status(200).json(musics);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar músicas" });
  }
});

// GET: Obter uma música por ID
router.get('/:id', async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) return res.status(404).json({ error: "Música não encontrada" });
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar música" });
  }
});

// PUT: Atualizar uma música
router.put('/:id', async (req, res) => {
  const { singer, song, genre } = req.body;
  try {
    const updatedMusic = await Music.findByIdAndUpdate(req.params.id, { singer, song, genre }, { new: true });
    if (!updatedMusic) return res.status(404).json({ error: "Música não encontrada" });
    res.status(200).json(updatedMusic);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar música" });
  }
});

// DELETE: Excluir uma música
router.delete('/:id', async (req, res) => {
  try {
    const deletedMusic = await Music.findByIdAndDelete(req.params.id);
    if (!deletedMusic) return res.status(404).json({ error: "Música não encontrada" });
    res.status(200).json({ message: "Música excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir música" });
  }
});

module.exports = router;
