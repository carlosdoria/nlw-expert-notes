import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCardProps {
  date: Date;
  content: string;
}

export function NoteCard({ content, date }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col gap-3 p-5 overflow-hidden text-left rounded-md outline-none bg-slate-800 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {date.toISOString()}
        </span>

        <p className="text-sm leading-6 text-slate-400">{content}</p>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-1 top-1 rounded-sm bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-col flex-1 gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>

            <p className="text-sm leading-6 text-slate-400">{content}</p>
          </div>

          <button
            type="button"
            className="w-full py-4 text-sm font-medium text-center outline-none bg-slate-800 text-slate-300 group"
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
