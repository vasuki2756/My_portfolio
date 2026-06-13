"use client";

import { Mail, Send, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function EmailDialog() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSent(false);
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => { if (!open) resetForm(); }}>
      <DialogTrigger asChild>
        <Button variant="default" className="group relative flex items-center gap-3">
          <Mail className="size-4 transition-all duration-500 sm:size-5" />
          <span className="text-sm font-medium tracking-wide sm:text-base">Email me</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogClose asChild>
          <Button
            variant="default"
            size="icon"
            className="absolute top-4 right-4"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Send className="size-6 text-primary" />
            </div>
            <DialogTitle>Message sent!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for reaching out. I&apos;ll get back to you as soon as possible.
            </DialogDescription>
            <DialogClose asChild>
              <Button variant="default" className="mt-2">
                Close
              </Button>
            </DialogClose>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Send me an email</DialogTitle>
              <DialogDescription>
                Fill out the form and I&apos;ll get back to you.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(
                      "h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none",
                      "focus:border-ring focus:ring-1 focus:ring-ring",
                      "placeholder:text-muted-foreground",
                    )}
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none",
                      "focus:border-ring focus:ring-1 focus:ring-ring",
                      "placeholder:text-muted-foreground",
                    )}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={cn(
                    "h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none",
                    "focus:border-ring focus:ring-1 focus:ring-ring",
                    "placeholder:text-muted-foreground",
                  )}
                  placeholder="Collaboration opportunity"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(
                    "min-h-[120px] resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none",
                    "focus:border-ring focus:ring-1 focus:ring-ring",
                    "placeholder:text-muted-foreground",
                  )}
                  placeholder="Hi Vasuki, I'd love to connect..."
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={sending}>
                  {sending ? "Sending..." : "Send"}
                  <Send className="size-3.5" />
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
