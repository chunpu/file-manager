'use client';

import { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  FileCode,
  FileJson,
  FileImage,
} from 'lucide-react';

export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
  fileType?: 'text' | 'markdown' | 'json' | 'image' | 'code';
  content?: string;
  children?: FileItem[];
}

interface FileTreeProps {
  onFileSelect: (file: FileItem) => void;
  selectedFilePath?: string;
}

interface FileTreeNodeProps {
  file: FileItem;
  onFileSelect: (file: FileItem) => void;
  selectedFilePath?: string;
  level: number;
}

async function fetchFiles(path: string): Promise<FileItem[]> {
  const res = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
  return res.json();
}

function FileTreeNode({
  file,
  onFileSelect,
  selectedFilePath,
  level,
}: FileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState<FileItem[]>([]);
  const isSelected = selectedFilePath === file.path;

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file.type === 'folder') {
      if (!isExpanded && children.length === 0) {
        setIsLoading(true);
        try {
          const fetchedChildren = await fetchFiles(file.path);
          setChildren(fetchedChildren);
        } finally {
          setIsLoading(false);
        }
      }
      setIsExpanded(!isExpanded);
    }
  };

  const handleSelect = () => {
    onFileSelect(file);
  };

  const getFileIcon = () => {
    if (file.type === 'folder') {
      return <Folder size={16} className="text-yellow-500" />;
    }
    switch (file.fileType) {
      case 'code':
        return <FileCode size={16} className="text-blue-500" />;
      case 'json':
        return <FileJson size={16} className="text-yellow-500" />;
      case 'markdown':
        return <FileText size={16} className="text-purple-500" />;
      case 'image':
        return <FileImage size={16} className="text-green-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };

  return (
    <div>
      <div
        className={`flex items-center px-2 py-1.5 cursor-pointer transition-colors ${
          isSelected
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={handleSelect}
      >
        <div style={{ width: `${level * 16}px` }} />
        {file.type === 'folder' && (
          <>
            <span onClick={handleToggle} className="flex items-center w-4 h-4">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
            <span className="w-4 h-4 flex items-center">{getFileIcon()}</span>
          </>
        )}
        {file.type === 'file' && (
          <>
            <span className="w-4 h-4 flex items-center" />
            <span className="w-4 h-4 flex items-center">{getFileIcon()}</span>
          </>
        )}
        <span className="ml-2 text-sm truncate">{file.name}</span>
      </div>
      {file.type === 'folder' && isExpanded && (
        <div>
          {children.map(child => (
            <FileTreeNode
              key={child.path}
              file={child}
              onFileSelect={onFileSelect}
              selectedFilePath={selectedFilePath}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTree({
  onFileSelect,
  selectedFilePath,
}: FileTreeProps) {
  const [rootFiles, setRootFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRootFiles() {
      const files = await fetchFiles('');
      setRootFiles(files);
      setIsLoading(false);
    }
    loadRootFiles();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-sm text-gray-500">Loading...</div>;
  }

  return (
    <div className="overflow-y-auto h-full">
      {rootFiles.map(file => (
        <FileTreeNode
          key={file.path}
          file={file}
          onFileSelect={onFileSelect}
          selectedFilePath={selectedFilePath}
          level={0}
        />
      ))}
    </div>
  );
}
