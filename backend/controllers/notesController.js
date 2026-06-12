import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //newest note first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes", error });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Error fetching note", error });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title: title, content: content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Error creating note", error });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    await Note.findByIdAndUpdate(
      req.params.id,
      { title: title, content: content },
      { new: true },
    );
    const newNote = await Note.findById(req.params.id);
    if (!newNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ message: "Note updated successfully!", note: newNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Error updating note", error });
  }
}

export async function deleteNote(req, res) {
  try {
    const newNote = await Note.findByIdAndDelete(req.params.id);
    if (!newNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ message: "Note deleted successfully!", note: newNote });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Error deleting note", error });
  }
}
