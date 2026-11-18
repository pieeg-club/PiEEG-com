"use client";

import { useState } from "react";
import { X, Plus, Tag, Loader2, MessageSquarePlus } from "lucide-react";
import {
  DISCUSSION_CATEGORIES,
  SUGGESTED_TAGS,
  type CreateThreadPayload,
  type DiscussionCategory,
  type DiscussionThread,
} from "@/lib/discussions";
import { DiscussionMarkdownEditor } from "./DiscussionMarkdown";

interface DiscussionComposerModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialThread?: DiscussionThread | null;
  defaultCategory?: DiscussionCategory;
  submitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (payload: CreateThreadPayload) => void;
}

function normalizeTag(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_.+]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 28);
}

export function DiscussionComposerModal(props: DiscussionComposerModalProps) {
  if (!props.open) return null;
  const resetKey = `${props.mode}-${props.initialThread?.id ?? "new"}-${props.defaultCategory ?? "general"}`;
  return <DiscussionComposerDialog key={resetKey} {...props} />;
}

function DiscussionComposerDialog({
  mode,
  initialThread,
  defaultCategory = "general",
  submitting,
  error,
  onClose,
  onSubmit,
}: DiscussionComposerModalProps) {
  const [title, setTitle] = useState(() =>
    mode === "edit" && initialThread ? initialThread.title : ""
  );
  const [category, setCategory] = useState<DiscussionCategory>(() =>
    mode === "edit" && initialThread ? initialThread.category : defaultCategory
  );
  const [tags, setTags] = useState<string[]>(() =>
    mode === "edit" && initialThread ? initialThread.tags || [] : []
  );
  const [tagInput, setTagInput] = useState("");
  const [body, setBody] = useState(() =>
    mode === "edit" && initialThread ? initialThread.body : ""
  );
  const [localError, setLocalError] = useState<string | null>(null);

  const addTag = (raw: string) => {
    const cleaned = normalizeTag(raw);
    if (!cleaned) return;
    if (tags.includes(cleaned)) {
      setTagInput("");
      return;
    }
    if (tags.length >= 5) {
      setLocalError("You can add up to 5 tags per thread.");
      return;
    }
    setLocalError(null);
    setTags((prev) => [...prev, cleaned]);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (tagInput.trim()) addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (trimmedTitle.length < 5) {
      setLocalError("Please enter a descriptive title (at least 5 characters).");
      return;
    }
    if (trimmedBody.length < 10) {
      setLocalError("Please write a body of at least 10 characters.");
      return;
    }

    let finalTags = [...tags];
    if (tagInput.trim() && finalTags.length < 5) {
      const extra = normalizeTag(tagInput);
      if (extra && !finalTags.includes(extra)) {
        finalTags = [...finalTags, extra];
      }
    }

    setLocalError(null);
    onSubmit({
      title: trimmedTitle,
      body: trimmedBody,
      category,
      tags: finalTags.slice(0, 5),
    });
  };

  const combinedError = error || localError;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-zinc-950/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="composer-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <MessageSquarePlus className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="composer-modal-title"
                className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100"
              >
                {mode === "create"
                  ? "Start a New Discussion"
                  : "Edit Discussion Thread"}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Ask hardware/DSP questions, share BCI builds, or help fellow engineers
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            aria-label="Close composer"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1"
        >
          {/* Category selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {DISCUSSION_CATEGORIES.map((cat) => {
                const active = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    disabled={submitting}
                    onClick={() => setCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      active
                        ? "bg-cyan-600 text-white border-cyan-600 dark:bg-cyan-500 dark:text-zinc-950 dark:border-cyan-400 shadow-2xs"
                        : "bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-cyan-400/60"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="disc-title-input"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5"
            >
              Title
            </label>
            <input
              id="disc-title-input"
              type="text"
              required
              maxLength={180}
              disabled={submitting}
              placeholder="e.g. How to filter 50Hz hum on PiEEG-8 in Python?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Body (Markdown) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="disc-body-editor"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
              >
                Details & Context
              </label>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                Markdown & code blocks supported
              </span>
            </div>
            <DiscussionMarkdownEditor
              id="disc-body-editor"
              value={body}
              onChange={setBody}
              rows={7}
              disabled={submitting}
              placeholder="Describe your board (PiEEG-8, PiEEG-16, Octopus-16, IronBCI...), setup, code snippet, or project details..."
            />
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="disc-tags-input"
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Tags (up to 5)</span>
              </label>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {tags.length}/5 selected
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-within:border-cyan-500">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    aria-label={`Remove tag ${t}`}
                    className="hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {tags.length < 5 && (
                <input
                  id="disc-tags-input"
                  type="text"
                  disabled={submitting}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={
                    tags.length === 0
                      ? "Add tag and press Enter (e.g. pieeg-8, dsp)..."
                      : "Add tag..."
                  }
                  className="flex-1 min-w-36 bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none py-0.5"
                />
              )}
            </div>

            {/* Quick-pick suggested tags */}
            {tags.length < 5 && (
              <div className="mt-2 flex flex-wrap items-center gap-1">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mr-1">
                  Quick add:
                </span>
                {SUGGESTED_TAGS.filter((t) => !tags.includes(t))
                  .slice(0, 8)
                  .map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={submitting}
                      onClick={() => addTag(suggestion)}
                      className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-colors cursor-pointer"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      {suggestion}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {combinedError && (
            <p className="text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl px-3.5 py-2.5">
              {combinedError}
            </p>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              disabled={submitting}
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-zinc-950 text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>
                {submitting
                  ? mode === "create"
                    ? "Publishing…"
                    : "Saving…"
                  : mode === "create"
                    ? "Publish Discussion"
                    : "Save Changes"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
