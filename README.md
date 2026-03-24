# File Manager

这是一个基于 Next.js 的文件管理器项目，可以通过 CLI 快速启动。

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

### 快速启动（推荐）

你可以通过 npx 直接运行，无需安装：

```bash
# 使用当前工作目录
npx @ftft1885/file-manager

# 指定目录
npx @ftft1885/file-manager /path/to/directory
npx @ftft1885/file-manager .

# 指定端口
npx @ftft1885/file-manager -p 8080
npx @ftft1885/file-manager --port 8080

# 指定目录和端口
npx @ftft1885/file-manager -p 8080 /path/to/directory
```

### 查看帮助
```bash
npx @ftft1885/file-manager --help
```

### 本地安装使用

```bash
# 全局安装
npm install -g @ftft1885/file-manager

# 启动
file-manager
# 或
file-manager /path/to/directory

# 指定端口
file-manager -p 8080
file-manager --port 8080

# 查看帮助
file-manager --help
```

### 项目开发

如果你想直接在项目中开发：

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 然后在浏览器中打开 http://localhost:3000

# 构建生产版本
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
