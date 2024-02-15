import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  handleCreateNote: (newNote: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ handleCreateNote }: NewNoteCardProps) {
  const [shouldShowOnboardingState, setShouldShowOnboardingState] =
    useState(true);
  const [contentState, setContentState] = useState("");
  const [isRecordingState, setIsRecordingState] = useState(false);
  const [openModalState, setOpenModalState] = useState(false);

  const handleStartEditor = () => {
    setShouldShowOnboardingState(false);
  };

  const handleContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentState(event.target.value);
    if (event.target.value === "") {
      setShouldShowOnboardingState(true);
    }
  };

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault();

    handleCreateNote(contentState);
    setContentState("");
    setShouldShowOnboardingState(true);
    setOpenModalState(false);

    toast.success("Nota criada com sucesso!");
  };

  const handleStartRecording = () => {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      return toast.error(
        "Infelizmente seu navegador não suporta a API de gravação!"
      );
    }

    setIsRecordingState(true);
    setShouldShowOnboardingState(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true; // Para reconhecer continuamente a fala (só para de gravar se enviarmos o comando de parar)
    speechRecognition.maxAlternatives = 1; // Quantidade de palavras reconhecidas por vez (retorno de uma palavra mais próxima do que foi falado)
    speechRecognition.interimResults = true; // Para tentar reconhecer palavras que ainda não foram faladas (tendo como contexto o que já foi dito anteriormente)

    speechRecognition.onerror = (event) => {
      console.log(event);
    };

    // Função executada sempre que a API de gravação ouvir uma palavra
    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce(
        (textAcc, result) => {
          return textAcc.concat(result[0].transcript);
        },
        ""
      );

      setContentState(transcription);
    };

    speechRecognition.start();
  };

  const handleStopRecording = () => {
    setIsRecordingState(false);
    speechRecognition?.stop();

    if (contentState.trim() === "") {
      setShouldShowOnboardingState(true);
    }
  };

  const handleOpenModal = () => {
    handleStopRecording();
    setShouldShowOnboardingState(true);
    setIsRecordingState(false);
    setContentState("");
    setOpenModalState(!openModalState);
  };

  return (
    <Dialog.Root open={openModalState} onOpenChange={handleOpenModal}>
      <Dialog.Trigger className="flex flex-col gap-3 p-5 text-left rounded-md outline-none bg-slate-700 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 flex w-full flex-col overflow-hidden bg-slate-700 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-[60vh] md:max-w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md">
          <Dialog.Close className="absolute right-1 top-1 rounded-sm bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex flex-col flex-1">
            <div className="flex flex-col flex-1 gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboardingState ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartRecording}
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="flex-1 text-sm leading-6 bg-transparent outline-none resize-none text-slate-400"
                  value={contentState}
                  onChange={handleContentChanged}
                />
              )}
            </div>

            {isRecordingState ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="flex items-center justify-center w-full gap-2 py-4 text-sm font-normal text-center bg-slate-800 text-slate-300 hover:text-slate-100"
              >
                <div className="relative">
                  <div className="absolute size-2.5 animate-ping rounded-full bg-red-500" />
                  <div className="relative size-2.5 rounded-full bg-red-500" />
                </div>
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                disabled={contentState === ""}
                className="w-full py-4 text-sm font-semibold text-center bg-lime-400 disabled:bg-opacity-60 text-lime-950 hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
