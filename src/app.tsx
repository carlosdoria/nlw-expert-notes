import { ChangeEvent, useState } from "react";
import Logo from "./assets/Logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface NoteProps {
  id: string;
  date: Date;
  content: string;
}

const LOCAL_STORAGE_KEY_NOTES = "@nlw-expert:notes";

export function App() {
  const [notesState, setNotesState] = useState<NoteProps[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });
  const [searchState, setSearchState] = useState("");

  const handleCreateNote = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const newNotesArray = [newNote, ...notesState];

    setNotesState(newNotesArray);

    localStorage.setItem(
      LOCAL_STORAGE_KEY_NOTES,
      JSON.stringify(newNotesArray)
    );
  };

  function handleDeleteNote(id: string) {
    const newNotes = notesState.filter((note) => note.id !== id);

    setNotesState(newNotes);

    localStorage.setItem(LOCAL_STORAGE_KEY_NOTES, JSON.stringify(newNotes));
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchState(query);
  };

  const filteredNotes =
    searchState !== ""
      ? notesState.filter((note) =>
          note.content
            .toLocaleLowerCase()
            .includes(searchState.toLocaleLowerCase())
        )
      : notesState;

  return (
    <main className="max-w-6xl px-4 mx-auto my-12 space-y-6">
      <img src={Logo} alt="Logo Nlw Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full text-3xl font-semibold tracking-tight bg-transparent outline-none placeholder:text-state-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard handleCreateNote={handleCreateNote} />

        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            date={note.date}
            content={note.content}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </div>
    </main>
  );
}
