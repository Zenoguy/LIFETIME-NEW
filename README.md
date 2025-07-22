# LIFETIME Professional Services - HTML/CSS/JS Version

This project has been successfully converted from React to vanilla HTML, CSS, and JavaScript.

## 📁 Project Structure

```
codebase/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── assets/             # Images and media files (create this folder and add your assets)
└── README.md           # This file
```

## 🚀 Getting Started

### 1. Open the website
Simply open `index.html` in any modern web browser to view the website.

### 2. For development
If you want to make changes and see them live, you can:
- Use a simple HTTP server (recommended for images to load properly)
- Use VS Code Live Server extension
- Use Python: `python -m http.server 8000`
- Use Node.js: `npx serve .`

## 📷 Adding Your Images

The current version uses placeholder images from Pexels. To add your original images:

1. Create an `assets/` folder in the project root
2. Add your images to this folder:
   - `LIFETIME LOGO.jpg` - Company logo
   - `gallery1.jpg` - Gallery image 1
   - `LITIME MindManagement.jpg` - Mind management seminar image
   - `SOMENATH DEY PHOTO.jpg` - Founder photo (optional)

3. Update the image paths in `index.html` and `script.js`:
   - Replace `https://via.placeholder.com/120x60/1e40af/fbbf24?text=LIFETIME` with `assets/LIFETIME LOGO.jpg`
   - Replace placeholder URLs with your actual image paths

## ✨ Features Converted

### ✅ Fully Functional Features
- **Responsive Header** - Fixed navigation with scroll effects
- **Hero Section** - Full-screen banner with founder introduction
- **About Section** - Company information and achievements
- **Clients Section** - Client logos and testimonials
- **Services Section** - Expandable service cards
- **Gallery Section** - Image grid with lightbox viewer
- **Testimonials Carousel** - Auto-playing testimonials with navigation
- **Contact Form** - Working contact form with validation
- **Footer** - Complete footer with links and social media
- **Mobile Menu** - Hamburger menu for mobile devices
- **Smooth Scrolling** - Smooth navigation between sections
- **Back to Top Button** - Floating back to top button

### 🎨 Styling Features
- **Modern Design** - Clean, professional appearance
- **Responsive Layout** - Works on all screen sizes
- **Hover Effects** - Interactive hover animations
- **Loading Animations** - Smooth fade-in effects
- **Color Scheme** - Blue (#1e40af) and Yellow (#fbbf24) theme

### 📱 Mobile Responsive
- Fully responsive design
- Mobile-friendly navigation
- Touch/swipe support for testimonials
- Optimized layouts for tablets and phones

## 🛠️ Technical Details

### Dependencies
- **Font Awesome 6.4.0** - Icons
- **Google Fonts (Inter)** - Typography
- **No framework dependencies** - Pure HTML/CSS/JS

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance
- Optimized CSS and JavaScript
- Lazy loading for images
- Smooth animations with CSS transforms
- Minimal HTTP requests

## 🔧 Customization

### Colors
Update the CSS custom properties in `styles.css`:
```css
:root {
  --primary-blue: #1e40af;
  --primary-yellow: #fbbf24;
  --text-gray: #374151;
}
```

### Content
- Update text content directly in `index.html`
- Modify testimonials array in `script.js`
- Add/remove services in the services section

### Styling
- All styles are in `styles.css`
- Organized by sections for easy editing
- Responsive breakpoints included

## 📧 Contact Information

- **Email**: lifetimeworld07@gmail.com
- **Phone**: +91 88 8981 0127 76
- **Location**: Mumbai, Maharashtra, India

## 🚀 Deployment

To deploy this website:

1. **GitHub Pages**: Push to a GitHub repository and enable GitHub Pages
2. **Netlify**: Drag and drop the folder to Netlify
3. **Vercel**: Connect your GitHub repository
4. **Any Web Host**: Upload files via FTP/cPanel

## 📝 Notes

- The original React version has been backed up as `index_react.html.bak`
- All React-specific files (package.json, node_modules, etc.) have been removed
- The website is now dependency-free and can run anywhere
- All functionality from the React version has been preserved

## 🔄 Future Updates

To add new features:
1. Update HTML structure in `index.html`
2. Add styles in `styles.css`
3. Add JavaScript functionality in `script.js`

The code is well-organized and commented for easy maintenance and updates.
