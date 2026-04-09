"use client";

import TextType from "./TextType";

export default function HeroTyping() {
  return (
    <TextType
      texts={[
        "Selamat Datang di website kami",
        "ayo hubungi kami untuk konsultasi",
        "Harri yang indah!",
        "ayo buat usaha anda menjadi lebih halal",
        "membantu pengalaman mu menjadi lebih menarik!",
      ]}
      typingSpeed={75}
      deletingSpeed={50}
      pauseDuration={1500}
      showCursor
      cursorCharacter="_"
      cursorBlinkDuration={0.5}
    />
  );
}
