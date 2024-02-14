import { useState } from "react";
import Logo from "./assets/Logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  const [notes, setNotes] = useState([
    {
      date: new Date(),
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus commodidolor quaerat similique asperiores minus vitae magni nemo animi iustoducimus sapiente, error placeat ratione vel. Voluptatibus sequi quisratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natuscommodi dolor quaerat similique asperiores minus vitae magni nemo animiiusto ducimus sapiente, error placeat ratione vel. Voluptatibus sequiquis ratione.",
    },
    {
      date: new Date(),
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus commodidolor quaerat similique asperiores minus vitae magni nemo animi iustoducimus sapiente, error placeat ratione vel. Voluptatibus sequi quisratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natuscommodi dolor quaerat similique asperiores minus vitae magni nemo animiiusto ducimus sapiente, error placeat ratione vel. Voluptatibus sequiquis ratione.",
    },
    {
      date: new Date(),
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus commodidolor quaerat similique asperiores minus vitae magni nemo animi iustoducimus sapiente, error placeat ratione vel. Voluptatibus sequi quisratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natuscommodi dolor quaerat similique asperiores minus vitae magni nemo animiiusto ducimus sapiente, error placeat ratione vel. Voluptatibus sequiquis ratione.",
    },
  ]);

  return (
    <main className="max-w-6xl px-4 mx-auto my-12 space-y-6">
      <img src={Logo} alt="Logo Nlw Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full text-3xl font-semibold tracking-tight bg-transparent outline-none placeholder:text-state-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />
        {notes.map((note) => (
          <NoteCard date={note.date} content={note.content} />
        ))}
      </div>
    </main>
  );
}
