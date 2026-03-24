import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dirPath = searchParams.get('path') || '';
  
  const fullPath = path.join(ROOT_DIR, dirPath);
  
  try {
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Path not found' }, { status: 404 });
    }
    
    const stats = fs.statSync(fullPath);
    
    if (stats.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      return NextResponse.json({
        name: path.basename(fullPath),
        type: 'file',
        path: dirPath,
        content,
        fileType: getFileType(path.basename(fullPath))
      });
    }
    
    const files = fs.readdirSync(fullPath);
    const items = files
      .filter(file => file !== 'node_modules' && file !== '.git')
      .map(file => {
        const filePath = path.join(fullPath, file);
        const fileStats = fs.statSync(filePath);
        return {
          name: file,
          type: fileStats.isDirectory() ? 'folder' : 'file',
          path: path.join(dirPath, file),
          fileType: fileStats.isFile() ? getFileType(file) : undefined
        };
      });
    
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Error reading directory' }, { status: 500 });
  }
}

function getFileType(filename: string): 'text' | 'markdown' | 'json' | 'image' | 'code' {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.json':
      return 'json';
    case '.md':
    case '.markdown':
      return 'markdown';
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
    case '.svg':
      return 'image';
    case '.js':
    case '.jsx':
    case '.ts':
    case '.tsx':
    case '.py':
    case '.java':
    case '.c':
    case '.cpp':
    case '.go':
    case '.rs':
    case '.html':
    case '.css':
    case '.scss':
    case '.sql':
      return 'code';
    default:
      return 'text';
  }
}
