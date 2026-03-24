'use client';

import { useState } from 'react';
import FileTree, { FileItem } from '@/components/FileTree';
import FilePreview from '@/components/FilePreview';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h1 className="font-bold text-lg text-gray-900 dark:text-white">File Manager</h1>
        </div>
        <FileTree
          onFileSelect={setSelectedFile}
          selectedFilePath={selectedFile?.path}
        />
      </div>
      <div className="flex-1 bg-white dark:bg-gray-900">
        <FilePreview file={selectedFile} />
      </div>
    </div>
  );
}
