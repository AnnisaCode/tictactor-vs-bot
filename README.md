# Tic-Tac-Toe vs Bot

A modern, interactive, and secure Tic-Tac-Toe web game where you play as Player X against a smart Bot (O). The app features a beautiful UI, dark/light theme, score tracking, and smooth notifications.

## Features
- Play Tic-Tac-Toe against a bot (Player X vs Bot O)
- Modern and responsive design using Bootstrap
- Dark and light theme toggle
- Animated winner highlight
- Real-time score tracking
- Toastr notifications for win, draw, and errors
- Secure and safe for users (no XSS, no unsafe alerts)
- Fully in English

## How to Use
1. Open `index.html` in your browser.
2. Click on any cell to make your move as Player X.
3. The bot (O) will automatically make its move after a short delay.
4. The game will highlight the winner and update the score.
5. Click "Restart Game" to play again.
6. Use the "Toggle Theme" button to switch between dark and light mode.

## Technologies Used
- HTML5, CSS3
- Bootstrap 4
- JavaScript (Vanilla)
- Toastr.js for notifications

## Folder Structure
- `index.html` — Main HTML file
- `styles.css` — Custom styles and theme
- `app.js` — Game logic and interactivity

## Security
- All user interactions are sanitized and safe
- No direct user input is executed as code
- No use of `alert` for game messages (uses Toastr instead)

## Credits
- UI inspired by Bootstrap
- Notifications powered by Toastr.js

---

© 2025 AnnisaCode 