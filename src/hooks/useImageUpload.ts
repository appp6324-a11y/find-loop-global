import { useState } from "react";

export function useImageUpload(max = 5) {
  const [images, setImages] = useState<string[]>([]);

  function onSelectFiles(files: FileList | null) {
    if (!files) return;

    const selected = Array.from(files).slice(0, max);

    selected.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        if (typeof e.target?.result === "string") {
          setImages(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index: number) {
    setImages(prev => prev.filter((_, i) => i !== index));
  }

  return { images, onSelectFiles, removeImage };
}
