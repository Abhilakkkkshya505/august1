# ✨ Happy Girlfriend's Day — Multi-Page Immersive Website

A stunning, fully immersive interactive website celebrating love. Built with React, React Router, Framer Motion, React Three Fiber (R3F), and Tailwind CSS. Restructured for a dreamy, Pinterest-moodboard pretty aesthetic with glassmorphism, 3D float components, and linear storybook page-by-page navigation.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to **Vercel**, **Netlify**, or any static host.

---

## 🎨 What's Inside & Routes

This project is organized as a sequenced storybook presentation. You can click the floating **Next (→)** and **Back (←)** gradient buttons on the bottom sides of the screen to step through the sections, or expand the bottom-center heart menu button.

### 📖 Presentation Route Sequence

| Order | Route | Component / Section | File | Description |
|-------|-------|---------------------|------|-------------|
| 1 | `/` | **Home Page** | [Hero.jsx](src/components/Hero.jsx) & [DaysCounter.jsx](src/components/DaysCounter.jsx) | Landing layout showing your custom name, decorative badges, and a live counter of days/hours/minutes together. |
| 2 | `/gallery` | **Swipeable Gallery** | [PhotoGallery.jsx](src/components/PhotoGallery.jsx) | Tinder-style swipeable card stack. Support mouse dragging on desktop and swipe touch gestures on mobile with interactive 3D card tilt. |
| 3 | `/us-when` | **Us When... Slideshow** | [UsWhen.jsx](src/components/UsWhen.jsx) | Auto-playing slideshow showcasing 15-20 moments with cross-fade transitions, progress lines, and manual play/pause controls. |
| 4 | `/letter` | **Love Letter** | [LoveLetter.jsx](src/components/LoveLetter.jsx) | Glassmorphic letter page with paragraphs fading in one-by-one. |
| 5 | `/why-i-love-you` | **Why I Love You Novel** | [WhyILoveYou.jsx](src/components/WhyILoveYou.jsx) | A long-form storybook chapter reading experience with 3D page-flip transitions, progress bars, and elegant serif typography. |
| 6 | `/memories` | **Our Timeline** | [Memories.jsx](src/components/Memories.jsx) | An alternating milestone timeline with dates, descriptions, and optional photos connected by glowing visual line nodes. |
| 7 | `/music` | **Soundtrack** | [MusicSection.jsx](src/components/MusicSection.jsx) | Spotify playlist embed + retro radio SVG widget with animated dials. |
| 8 | `/future` | **Future Dreams** | [Future.jsx](src/components/Future.jsx) | Interactive bucket list wishlist where you can check off future goals. |
| 9 | `/reasons` | **Reasons I Love You** | [FlipCards.jsx](src/components/FlipCards.jsx) | "Reasons I Love You" cards that flip on click, styled like glowing star cards. |
| 10 | `/closing` | **Closing Screen** | [ClosingScreen.jsx](src/components/ClosingScreen.jsx) | A sweet final text signoff with slow drifting floating CSS hearts and a looping **Replay ↻** button back to Home. |

### 🛠️ Global Accents
- **Heart-Star Space Background** ([HeartStarfield.jsx](src/components/HeartStarfield.jsx)): An immersive Three.js scene rendering a deep indigo-plum space sky filled with glowing custom heart-shaped particle stars (2000 count on desktop, scaled down to 500 on mobile), drifting hero physical glass hearts, shooting stars, and mouse-parallax depth layers.
- **Reading Dim Overlay**: Automatically fades and blurs the R3F starfield behind text-heavy components (such as the Love Letter and Chapters pages) to ensure maximum text readability and strong contrast.
- **Prominent Navigation Controls** (App.jsx overlay): Bottom-left (Back) and bottom-right (Next) pink-magenta gradient buttons featuring idle scale breathing, hover lift, press animation click, and nudging direction indicators.
- **Floating Nav Menu** ([Navbar.jsx](src/components/Navbar.jsx)): Repositioned to the bottom-center (`bottom-6 left-1/2 -translate-x-1/2`) to balance layout.
- **3D Card Hover-Tilt**: Adds standard 3D mouse rotation (tilt-card effect) to main page glass panels across all segments.

---

## ✏️ Customization Guide

Everything you need to change is clearly marked with `✏️` comments in the source files.

### 1. Her Name
Edit **`src/components/Hero.jsx`** — line `const HER_NAME = 'My Love'`

### 2. Your Name (for the letter & signature sign-offs)
- Edit **`src/components/LoveLetter.jsx`** — line `const YOUR_NAME = 'Your Name'`
- Edit **`src/components/ClosingScreen.jsx`** — line `const SIGNATURE_NAME = 'Your Name'`

### 3. Photos for the swipe stack
1. Place your photos in **`public/photos/`** folder
2. Name them `1.jpg` through `8.jpg`
3. Edit captions in **`src/components/PhotoGallery.jsx`** — the `PHOTOS` array. *(Note: Captions are currently hidden in the user interface to give photos a full borderless look, but the data array structure is fully preserved for reference or future re-enablement).*

### 4. "Us When..." Slideshow photos
1. Place your photos in **`public/photos/`** folder
2. Name them `us-when-1.jpg` through `us-when-20.jpg`
3. Edit captions in **`src/components/UsWhen.jsx`** — the `SLIDES` array (20 slides available). *(Note: Captions are currently hidden in the user interface to let slides fill the entire card bounds, but the data array is fully preserved).*

### 5. Love Letter Text
Edit **`src/components/LoveLetter.jsx`** — the `LETTER_PARAGRAPHS` array.

### 6. Why I Love You "Chapters" (Storybook Novel)
Edit **`src/components/WhyILoveYou.jsx`** — modify titles, chapter numbers, and paragraphs inside the `CHAPTERS` list. There are 10 complete chapters pre-registered. You can add, edit, or reorder entries easily since the layout rendering is fully modular. *(Note: Clicking the "Index" button on this page allows the reader to jump directly to any chapter).*

### 7. Spotify Playlist
Edit **`src/components/MusicSection.jsx`** — replace `YOUR_PLAYLIST_ID` in the const.

### 8. Start Date (Days Counter)
Edit **`src/components/DaysCounter.jsx`** — line `const START_DATE = new Date('2024-01-15')`

### 9. Reasons
Edit **`src/components/FlipCards.jsx`** — the `REASONS` array.

### 10. Our Timeline milestones
Edit **`src/components/Memories.jsx`** — the `MILESTONES` array. Change the `date`, `title`, `description`, and `photo` properties for each event. Leave `photo: ''` if you want a text-only card.

### 11. Future Bucket List dreams
Edit **`src/components/Future.jsx`** — the `INITIAL_DREAMS` array.

### 12. Password Gated Lock Screen
The site is gated by a lock screen that demands the correct code on every refresh/revisit (no local storage persistence).
- **Correct Code**: `01102025` (defined in **`src/components/LockScreen.jsx`** — line `const CORRECT_CODE = '01102025'`).
- **Hint Message**: Customize `WRONG_HINT` in `LockScreen.jsx`.

### 13. Scratch-to-Reveal Surprise Note
A canvas-based scratch element rendered inside the final card on the Closing Screen.
- **Configure Hidden Content**: Edit **`src/components/ClosingScreen.jsx`** — the `REVEAL_TYPE` (can be `'text'`, `'photo'`, or `'both'`), `REVEAL_TEXT`, and `REVEAL_PHOTO` constants.
- **Threshold**: Automatically clears once 60% of the grid is scratched (defined in `ScratchReveal.jsx`).

### 14. "For Her Eyes Only" Secret Page
A private text-based page hidden from navigation.
- **Trigger**: Click on the tiny, nearly transparent heart symbol (`♥`) located in the absolute bottom-right corner of the card on the Closing Screen.
- **Letter Text**: Edit **`src/components/ForHerEyesOnly.jsx`** — the `SECRET_TITLE` and `SECRET_PARAGRAPHS` arrays.

---

## 🩷 Credits

Built with:
- [React](https://react.dev) + [Vite](https://vite.dev)
- [React Router v6](https://reactrouter.com/)
- [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS v4](https://tailwindcss.com)
- Google Fonts: Playfair Display, Dancing Script, Inter
