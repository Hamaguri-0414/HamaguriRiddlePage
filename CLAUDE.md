# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Preferences

Please communicate with the user in Japanese. Internal thinking can be in English, but all responses to the user should be in Japanese.

## Documentation Guidelines

Continuously update this CLAUDE.md file with domain knowledge and important information that will be needed across future sessions. This includes:
- Project-specific terminology and concepts
- Important design decisions and architectural choices
- Key business logic or domain rules
- Development patterns and conventions established for this project
- Any recurring issues or solutions discovered during development

## Project Overview

This is the HamaguriRiddlePage project - a portfolio website for sharing riddles and puzzles created by Hamaguri.

### Project Goals
- Create a web-based portfolio to showcase Hamaguri's riddle creations
- Host on GitHub Pages
- Provide an organized way to browse different types of riddles

### Site Structure
The website consists of:
1. **TOP Page**: Main landing page that introduces and links to different riddle categories
2. **子ページ (Child Pages)** for each riddle genre:
   - **謎解きゲーム (Riddle Games)**: Introduces riddle games published on unityroom
   - **一枚謎 (Single Image Riddles)**: Features single-image riddles with answer checking functionality

### Technical Requirements
- Static website suitable for GitHub Pages hosting
- Responsive design for various devices
- Interactive elements for answer checking on single image riddles
- Clean, accessible interface for showcasing riddles

## Technology Stack

**Selected: Pure HTML/CSS/JavaScript**
- Rationale: Simple portfolio site with minimal complexity, no build process needed
- GitHub Pages native support, fast loading, easy maintenance
- Alternative considered: Vue.js (good for scalability but may be overkill)

## Project Structure

```
HamaguriRiddlePage/
├── index.html                 # TOPページ
├── games/
│   └── index.html            # 謎解きゲームページ  
├── single-riddles/
│   └── index.html            # 一枚謎ページ
├── assets/
│   ├── css/
│   │   └── style.css        # 共通スタイル
│   ├── js/
│   │   └── main.js          # メイン機能
│   └── images/
│       └── riddles/         # 謎解き画像
├── data/
│   └── riddles.json         # 一枚謎データ
└── .github/
    └── workflows/
        └── deploy.yml       # GitHub Actions設定（必要に応じて）
```

## Implementation Strategy

### Answer Checking System
- Store correct answers as hashed values in data/riddles.json
- Client-side hash comparison for answer validation
- Feedback animations for correct/incorrect answers

### Responsive Design
- Mobile-first CSS approach using Grid/Flexbox
- Adaptive image sizing for riddle displays
- Touch-friendly interface elements

### Navigation Structure
- Simple header navigation between main sections
- Breadcrumb navigation for user orientation
- Back button functionality for easy navigation

## Current Status

The repository is currently empty except for Claude Code configuration files. No build system, dependencies, or code structure has been established yet.

## Development Conventions

### Code Style Requirements
- **File endings**: Always ensure all source code files end with a newline character
- **Indentation**: Use consistent indentation (spaces preferred)
- **Encoding**: Use UTF-8 encoding for all text files

## Notes for Future Development

When code is added to this repository, update this file with:
- Build commands (e.g., `npm run build`, `python -m build`)
- Test commands (e.g., `npm test`, `pytest`)
- Linting commands (e.g., `npm run lint`, `ruff check`)
- Development server commands (e.g., `npm run dev`, `python -m http.server`)
- Project architecture and key components
- Any specific development conventions or patterns used
