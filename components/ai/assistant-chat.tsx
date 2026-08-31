"use client";

import {
  AssistantRuntimeProvider,
  useChatRuntime,
  AssistantChatTransport,
} from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/elements/thread.aui";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function AssistantSurface() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({ api: "/api/chat" }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 end-4 z-40 rounded-full shadow-lg">
            Ask AI
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[min(760px,85vh)] w-[min(720px,calc(100vw-2rem))] overflow-hidden p-0">
          <Thread className="h-full" />
        </DialogContent>
      </Dialog>
    </AssistantRuntimeProvider>
  );
}

export function AssistantChat() {
  return <AssistantSurface />;
}
