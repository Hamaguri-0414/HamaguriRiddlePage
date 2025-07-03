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
   - **Web謎 (Web Riddles)**: Web browser-based riddle content (currently under development - showing placeholder page)
   - **一枚謎 (Single Image Riddles)**: Features single-image riddles with answer checking functionality
     - List view: Max 20 riddles per page with pagination
     - Detail view: Title, date, image, answer input, and share functionality

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

## Feature Specifications

### 一枚謎 (Single Image Riddles) Page
**List Page Features:**
- Display riddle titles in a list format (maximum 20 items per page)
- Pagination system with numbered page selection
- Click on title to navigate to individual riddle detail page

**Detail Page Features:**
- Display riddle title and publication date
- Show riddle image
- Answer input field with submission button
- Correct answer results:
  - Show riddle explanation/solution
  - Display X (Twitter) share button
  - Provide close button to return to puzzle
- Navigation back to list page

**File Structure Design:**
```
single-riddles/
├── index.html              # List page
├── riddle.html            # Detail page
├── style.css              # Single riddles specific styles
└── script.js              # Single riddles specific JavaScript

data/
├── riddles.json           # Riddle metadata
└── riddle-answers.json    # Answer data (hashed)
```

**Data Structure:**
- riddles.json: Contains riddle metadata (id, title, date, image, difficulty, tags)
- riddle-answers.json: Contains hashed answers and explanations
- URL structure: /single-riddles/?page=N for pagination, /single-riddles/riddle.html?id=riddle-XXX for details

**Technical Implementation:**
- SHA-256 hash comparison for answer validation
- Client-side pagination and riddle data loading
- Modal system for correct answer feedback
- Responsive image display and mobile-optimized input

### 謎解きゲーム (Riddle Games) Page
**Current Status: Placeholder Page**
- Displays "under development" message with game development information
- Shows planned features and unityroom publication plans
- Includes breadcrumb navigation and back link to homepage
- Ready for future expansion when games are completed

**File Structure:**
```
games/
└── index.html              # Placeholder page (inline CSS for simplicity)
```

**Future Implementation Plan:**
- Game showcase grid with unityroom embeds
- Game categories and difficulty filters
- Individual game detail pages
- Play statistics and user feedback system

## Current Status

The repository is currently empty except for Claude Code configuration files. No build system, dependencies, or code structure has been established yet.

## Development Conventions

### Code Style Requirements
- **File endings**: Always ensure all source code files end with a newline character
- **Indentation**: Use consistent indentation (spaces preferred)
- **Encoding**: Use UTF-8 encoding for all text files

### Git Commit and PR Guidelines
- **Commit messages**: Write commit titles and descriptions in Japanese
- **Pull Request titles**: Use Japanese for PR titles and descriptions
- **Commit format**: Follow conventional commit style but use Japanese language
- **PR descriptions**: Include Japanese summary and test plan sections

## Development Commands

### Local Development Server
```bash
# Start local server for development (required for testing single-riddles functionality)
python3 -m http.server 8000

# Access the site at:
# http://localhost:8000/          (Homepage)
# http://localhost:8000/single-riddles/  (Single riddles list)
```

**Important**: The single-riddles pages require a local server to function properly due to fetch() API CORS restrictions when opening HTML files directly in browser.

### Hash Generator Tool
```bash
# Open hash generator for creating answer hashes
open tools/hash-generator.html
# or access via: http://localhost:8000/tools/hash-generator.html
```

Use the hash generator tool to create SHA-256 hashes for new riddle answers. Input the correct answer and copy the generated hash to riddle-answers.json.

## Notes for Future Development

When code is added to this repository, update this file with:
- Build commands (e.g., `npm run build`, `python -m build`)
- Test commands (e.g., `npm test`, `pytest`)
- Linting commands (e.g., `npm run lint`, `ruff check`)
- Development server commands (e.g., `npm run dev`, `python -m http.server`)
- Project architecture and key components
- Any specific development conventions or patterns used
