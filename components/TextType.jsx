"use client";

import { useEffect, useState } from "react";

export default function TextType({
  texts = [],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1200,
  showCursor = true,
  cursorCharacter = "|",
  cursorBlinkDuration = 0.5,
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!texts.length) return;

    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }, typingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }, deletingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className="inline-block">
      {displayText}
      {showCursor && (
        <span
          className="ml-1 animate-blink"
          style={{ animationDuration: `${cursorBlinkDuration}s` }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
