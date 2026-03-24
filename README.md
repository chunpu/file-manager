# File Manager

这是一个基于 Next.js 的文件管理器项目。

## 项目作用

展示和管理当前项目目录的文件系统，提供直观的文件浏览和预览功能。

## 技术栈

- **Next.js 16** - React 框架
- **React 19** - UI 库
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 样式框架
- **Lucide React** - 图标库

## 功能特性

1. **左侧文件目录 Sidebar**
   - 展示当前项目的文件目录结构
   - 文件夹支持按需加载（点击展开时才获取子文件）
   - 支持文件类型图标（代码、JSON、Markdown、图片等）
   - 选中文件高亮显示

2. **右侧文件预览区**
   - 显示选中文件的内容
   - 支持多种文件类型的内容展示
   - 显示文件路径和类型

## 使用方法

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:3000`

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
file-manager/
├── app/
│   ├── api/
│   │   └── files/
│   │       └── route.ts    # 文件系统 API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # 主页面
├── components/
│   ├── FileTree.tsx        # 文件树组件
│   └── FilePreview.tsx     # 文件预览组件
└── package.json
```
