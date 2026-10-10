const fs = require('fs');
const path = require('path');

function styleToObject(styleString) {
    if (!styleString) return '{}';
    const obj = {};
    const parts = styleString.split(';');
    for (const part of parts) {
        if (!part.trim()) continue;
        const [key, ...valueParts] = part.split(':');
        if (!key) continue;
        const value = valueParts.join(':');
        const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        obj[camelKey] = value.trim();
    }
    return JSON.stringify(obj);
}

function convertHtmlToJsx(html) {
    // Basic structural replacements
    let jsx = html;
    
    // Convert class to className
    jsx = jsx.replace(/\bclass="/g, 'className="');
    
    // Convert for to htmlFor
    jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
    
    // Remove comments
    jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
    
    // Close unclosed tags
    jsx = jsx.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/g, '<$1$2 />');
    
    // Fix inline styles
    jsx = jsx.replace(/\bstyle="([^"]*)"/g, (match, styleString) => {
        return `style={${styleToObject(styleString)}}`;
    });
    
    // Comment out event handlers temporarily to fix them manually later
    jsx = jsx.replace(/\bon(click|submit|change|input)="(.*?)"/gi, (match, evt, code) => {
        return `/* ${match} */`;
    });

    return jsx;
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.html')) {
            const fullPath = path.join(dir, file);
            let html = fs.readFileSync(fullPath, 'utf8');
            
            try {
                const jsx = convertHtmlToJsx(html);
                
                let baseName = path.basename(file, '.html');
                baseName = baseName.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                    return word.toUpperCase();
                }).replace(/&/g, 'And').replace(/page/gi, 'Page');

                // Special fix for Aboutschoolpage
                baseName = baseName.replace(/school/gi, 'School').replace(/admin/gi, 'Admin').replace(/page/gi, 'Page');
                
                const componentCode = `import React from 'react';\n\nexport default function ${baseName}() {\n  return (\n    <>\n${jsx}\n    </>\n  );\n}\n`;
                
                fs.writeFileSync(path.join(dir, baseName + '.jsx'), componentCode);
                fs.unlinkSync(fullPath);
                console.log('Converted', baseName);
            } catch(e) {
                console.error('Failed to convert', file, e);
            }
        }
    }
}

processDir('src/pages');
processDir('src/components');
