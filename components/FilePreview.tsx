'use client';

import { useState, useEffect } from 'react';
import { FileItem } from './FileTree';
import { FileText, FileCode, FileJson, FileImage, FolderOpen, Loader2 } from 'lucide-react';

interface FilePreviewProps {
  file: FileItem | null;
}

export default function FilePreview({ file }: FilePreviewProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setContent(null);
      setError(null);
      return;
    }

    if (file.content) {
      setContent(file.content);
      return;
    }

    if (file.type === 'file') {
      async function fetchContent() {
        setIsLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/files?path=${encodeURIComponent(file.path)}`);
          const data = await res.json();
          if (data.content) {
            setContent(data.content);
          } else {
            setError('Cannot read file content');
          }
        } catch (err) {
          setError('Error loading file');
        } finally {
          setIsLoading(false);
        }
      }
      fetchContent();
    } else {
      setContent(null);
    }
  }, [file]);

  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <FolderOpen size={64} />
        <p className="mt-4 text-lg">Select a file to preview</p>
      </div>
    );
  }

  if (file.type === 'folder') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <FolderOpen size={64} />
        <p className="mt-4 text-lg">{file.name}</p>
        <p className="text-sm">Click the arrow to expand this folder</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 size={48} className="animate-spin text-blue-500" />
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  const getFileIcon = () => {
    switch (file.fileType) {
      case 'code':
        return <FileCode size={24} className="text-blue-500" />;
      case 'json':
        return <FileJson size={24} className="text-yellow-500" />;
      case 'markdown':
        return <FileText size={24} className="text-purple-500" />;
      case 'image':
        return <FileImage size={24} className="text-green-500" />;
      default:
        return <FileText size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {getFileIcon()}
        <span className="font-medium">{file.name}</span>
        <span className="text-sm text-gray-500 ml-auto">{file.path}</span>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {file.fileType === 'image' ? (
          <div className="text-center text-gray-500">
            <FileImage size={64} className="mx-auto mb-4" />
            <p>Image preview not available for binary files</p>
          </div>
        ) : (
          <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
