'use client';
import { useState, useRef } from 'react';
import { generateId, formatFileSize, cn } from '../../utils/utils';

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  base64: string;
}

interface FileDropZoneProps {
  attachments: FileAttachment[];
  onAdd: (attachment: FileAttachment) => void;
  onRemove: (id: string) => void;
  dropText?: string;
  browseText?: string;
}

export function FileDropZone({
  attachments,
  onAdd,
  onRemove,
  dropText = 'Drop files here or',
  browseText = 'browse',
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onAdd({
          id: generateId(),
          name: file.name,
          size: file.size,
          type: file.type,
          base64,
        });
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer',
          isDragOver
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-white/10 hover:border-white/20 hover:bg-white/3'
        )}
        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
      >
        <svg className="w-8 h-8 mx-auto mb-2 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-white/40 text-sm">{dropText} <span className="text-indigo-400">{browseText}</span></p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={e => { if (e.target.files) processFiles(e.target.files); }}
        />
      </div>

      {attachments.length > 0 && (
        <div className="mt-3 space-y-2">
          {attachments.map(a => (
            <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 group">
              {a.type.startsWith('image/') ? (
                <img src={a.base64} alt={a.name} className="w-10 h-10 rounded object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 truncate">{a.name}</p>
                <p className="text-xs text-white/30">{formatFileSize(a.size)}</p>
              </div>
              <button
                onClick={() => onRemove(a.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded text-white/30 hover:text-red-400 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
