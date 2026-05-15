const express = require('express');
const router = express.Router();
const Music = require('../models/music.Models');

// POST: Adicionar nova música
router.post('/', async (req, res) => { 
  const { singer, song, genre, registrationDate } = req.body; 

  // Validação simples (Essencial para nível Pleno)
  if (!singer || !song) {
    return res.status(400).json({ error: "Cantor e música são obrigatórios" });
  }

  try {
    const newMusic = new Music({ 
      singer, 
      song, 
      genre, 
      registrationDate: registrationDate || new Date() 
    });
    await newMusic.save();
    res.status(201).json(newMusic);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar música" });
  }
});

// GET: Listar músicas com Busca e Filtro (Funcionalidade de nível Pleno)
router.get('/', async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query = {};

    // Filtro por gênero exato (se enviado)
    if (genre) {
      query.genre = genre;
    }

    // Busca global por Cantor ou Música (Case-insensitive)
    if (search) {
      query.$or = [
        { singer: { $regex: search, $options: 'i' } },
        { song: { $regex: search, $options: 'i' } }
      ];
    }

    // Busca no banco ordenando pelas mais recentes
    const musics = await Music.find(query).sort({ registrationDate: -1 });
    res.status(200).json(musics);
  } catch (error) {
    console.error("Erro na busca:", error);
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
    res.status(500).json({ error: "ID inválido ou erro ao buscar música" });
  }
});

// PUT: Atualizar uma música
router.put('/:id', async (req, res) => {
  const { singer, song, genre } = req.body;
  try {
    const updatedMusic = await Music.findByIdAndUpdate(
      req.params.id, 
      { singer, song, genre }, 
      { new: true, runValidators: true } // runValidators garante que a atualização respeite o Schema
    );
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