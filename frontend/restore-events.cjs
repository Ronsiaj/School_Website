const fs = require('fs');
const path = require('path');

function fixEventsInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.jsx')) {
            const fullPath = path.join(dir, file);
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Convert /* onclick="navigateTo('X')" */ to onClick={(e) => { e.preventDefault(); window.navigateTo('X'); }}
            content = content.replace(/\/\*\s*onclick="navigateTo\('([^']+)'\)(?:;return false)?"\s*\*\//g, (match, p1) => {
                return `onClick={(e) => { e.preventDefault(); window.navigateTo('${p1}'); }}`;
            });

            // Convert other onclicks like /* onclick="heroSlide(1)" */ to onClick={() => window.heroSlide(1)}
            content = content.replace(/\/\*\s*on(click|submit|change|input)="([^"]+)"\s*\*\//g, (match, evt, code) => {
                // Remove return false
                let cleanCode = code.replace(/;return false/g, '');
                
                // Add window. prefix for defined global functions if needed, or just run it via window
                // A simpler way: evaluate it or just attach them to window.
                // We'll replace known function calls with window.func()
                cleanCode = cleanCode.replace(/(heroSlide|goToHeroSlide|goToTestimonial|openLightbox|closeLightbox|lightboxNav|showToast|handleAdminLogin|handleAdminLogout|filterGallery|filterNews|handleContactForm)\(/g, 'window.$1(');

                // for form submits, we need event
                if (evt === 'submit') {
                    return `onSubmit={(e) => { ${cleanCode} }}`;
                }

                // special case for 'this' in filterGallery('all', this) -> React refs are different, but we'll let it be for now and fix manually
                return `on${evt.charAt(0).toUpperCase() + evt.slice(1)}={(e) => { ${cleanCode} }}`;
            });
            
            fs.writeFileSync(fullPath, content);
        }
    }
}

fixEventsInDir('src/pages');
fixEventsInDir('src/components');
