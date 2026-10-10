const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync('backup_frontend/index.html', 'utf8');

// Extract CSS
const cssMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
    fs.writeFileSync('frontend/src/index.css', cssMatch[1].trim());
}

// Extract sections
// Looking for <!-- ===== SOMETHING ===== -->
const components = {};

function extractSection(name, startComment, endComment) {
    const startIdx = htmlContent.indexOf(startComment);
    if (startIdx === -1) return null;
    const endIdx = endComment ? htmlContent.indexOf(endComment, startIdx) : htmlContent.length;
    let content = htmlContent.substring(startIdx + startComment.length, endIdx);
    return content.trim();
}

// Just split the main content by <!-- ==================== PAGE NAME ==================== -->
const mainMatch = htmlContent.match(/<main id="mainContent">([\s\S]*?)<\/main>/);
const mainHtml = mainMatch ? mainMatch[1] : '';

const pages = {};
const pageRegex = /<!-- ====================\s*(.+?)\s*==================== -->([\s\S]*?)(?=<!-- ====================|$)/g;
let match;
while ((match = pageRegex.exec(mainHtml)) !== null) {
    const pageName = match[1].trim();
    const pageContent = match[2].trim();
    pages[pageName] = pageContent;
}

// Other components
components['AnnouncementBar'] = extractSection('AnnouncementBar', '<!-- ===== ANNOUNCEMENT BAR ===== -->', '<!-- ===== NAVBAR ===== -->');
components['Navbar'] = extractSection('Navbar', '<!-- ===== NAVBAR ===== -->', '<!-- ===== ALL PAGES ===== -->');
components['Footer'] = extractSection('Footer', '<!-- ===== FOOTER ===== -->', '<!-- ===== FLOATING ELEMENTS ===== -->');
components['FloatingElements'] = extractSection('FloatingElements', '<!-- ===== FLOATING ELEMENTS ===== -->', '<!-- ===== ADMISSION POPUP MODAL ===== -->');
components['AdmissionPopup'] = extractSection('AdmissionPopup', '<!-- ===== ADMISSION POPUP MODAL ===== -->', '<!-- ===== GALLERY LIGHTBOX ===== -->');
components['Lightbox'] = extractSection('Lightbox', '<!-- ===== GALLERY LIGHTBOX ===== -->', '<!-- ===== TOAST CONTAINER ===== -->');
components['ToastContainer'] = extractSection('ToastContainer', '<!-- ===== TOAST CONTAINER ===== -->', '<script>');

// Save to files
fs.mkdirSync('frontend/src/components', { recursive: true });
fs.mkdirSync('frontend/src/pages', { recursive: true });

function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return word.toUpperCase();
    }).replace(/\s+/g, '');
}

for (const [name, content] of Object.entries(pages)) {
    const componentName = toCamelCase(name).replace(/Page$/, '');
    fs.writeFileSync(`frontend/src/pages/${componentName}.html`, content);
}

for (const [name, content] of Object.entries(components)) {
    if (content) {
        fs.writeFileSync(`frontend/src/components/${name}.html`, content);
    }
}

// Extract JS
const jsMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);
if (jsMatch) {
    fs.writeFileSync('frontend/src/original_script.js', jsMatch[1].trim());
}

console.log('Extraction complete');
