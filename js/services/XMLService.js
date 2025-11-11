/**
 * XML Service
 * Servicio para import/export de recetas en formato XML
 */

import { eventBus, Events } from '../core/EventBus.js';

class XMLService {
    /**
     * Parsea un archivo XML a recetas
     * @param {string} xmlString - Contenido XML
     * @returns {Array} Array de recetas
     */
    parse(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Verificar errores de parseo
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('XML mal formado: ' + parserError.textContent);
        }

        // Buscar elemento raíz
        let recipesRoot = xmlDoc.querySelector('recipes');
        let recipeElements = [];

        // Si no hay raíz, intentar con documentElement
        if (!recipesRoot) {
            recipesRoot = xmlDoc.documentElement;
            const rootTag = recipesRoot.tagName.toLowerCase();

            // Verificar si es una receta individual
            if (rootTag === 'recipe') {
                recipeElements = [recipesRoot];
            }
        }

        // Obtener todas las recetas
        if (recipeElements.length === 0) {
            recipeElements = recipesRoot.querySelectorAll('recipe');
        }

        if (recipeElements.length === 0) {
            throw new Error('No se encontraron recetas en el XML');
        }

        // Parsear cada receta
        const recipes = [];
        recipeElements.forEach(recipeEl => {
            try {
                const recipe = this.parseRecipeElement(recipeEl);
                recipes.push(recipe);
            } catch (error) {
                console.error('Error parseando receta:', error);
            }
        });

        return recipes;
    }

    /**
     * Parsea un elemento recipe del XML
     * @param {Element} recipeEl - Elemento recipe
     * @returns {Object} Receta parseada
     */
    parseRecipeElement(recipeEl) {
        const recipe = {
            id: recipeEl.getAttribute('id') || this.generateId(),
            name: this.getTextContent(recipeEl, 'name'),
            category: this.getTextContent(recipeEl, 'category') || 'sin-categoria',
            totalTime: this.getTextContent(recipeEl, 'totalTime'),
            author: this.getTextContent(recipeEl, 'author'),
            history: this.getTextContent(recipeEl, 'history'),
            caravanFriendly: this.getBooleanAttribute(recipeEl, 'caravanFriendly'),
            hospitalFriendly: this.getBooleanAttribute(recipeEl, 'hospitalFriendly'),
            menuFriendly: this.getBooleanAttribute(recipeEl, 'menuFriendly'),
            createdAt: this.getTextContent(recipeEl, 'createdAt') || new Date().toISOString(),
            updatedAt: this.getTextContent(recipeEl, 'updatedAt') || new Date().toISOString(),
            ingredients: this.parseIngredients(recipeEl),
            sequences: this.parseSequences(recipeEl),
            kitchenAppliances: this.parseKitchenAppliances(recipeEl),
            images: this.parseImages(recipeEl)
        };

        return recipe;
    }

    /**
     * Parsea ingredientes
     * @param {Element} recipeEl - Elemento recipe
     * @returns {Array} Ingredientes
     */
    parseIngredients(recipeEl) {
        const ingredientsEl = recipeEl.querySelector('ingredients');
        if (!ingredientsEl) return [];

        const ingredients = [];
        const ingredientEls = ingredientsEl.querySelectorAll('ingredient');

        ingredientEls.forEach(ingEl => {
            ingredients.push({
                name: this.getTextContent(ingEl, 'name'),
                quantity: this.getTextContent(ingEl, 'quantity'),
                unit: this.getTextContent(ingEl, 'unit')
            });
        });

        return ingredients;
    }

    /**
     * Parsea secuencias
     * @param {Element} recipeEl - Elemento recipe
     * @returns {Array} Secuencias
     */
    parseSequences(recipeEl) {
        const sequencesEl = recipeEl.querySelector('sequences');
        if (!sequencesEl) return [];

        const sequences = [];
        const sequenceEls = sequencesEl.querySelectorAll('sequence');

        sequenceEls.forEach(seqEl => {
            sequences.push({
                ingredients: this.getTextContent(seqEl, 'ingredients').split(',').map(s => s.trim()).filter(Boolean),
                description: this.getTextContent(seqEl, 'description'),
                duration: this.getTextContent(seqEl, 'duration')
            });
        });

        return sequences;
    }

    /**
     * Parsea aparatos de cocina
     * @param {Element} recipeEl - Elemento recipe
     * @returns {Array} Aparatos
     */
    parseKitchenAppliances(recipeEl) {
        const appliancesEl = recipeEl.querySelector('kitchenAppliances');
        if (!appliancesEl) return [];

        const appliances = this.getTextContent(appliancesEl, 'kitchenAppliances');
        return appliances ? appliances.split(',').map(s => s.trim()).filter(Boolean) : [];
    }

    /**
     * Parsea imágenes
     * @param {Element} recipeEl - Elemento recipe
     * @returns {Array} Imágenes
     */
    parseImages(recipeEl) {
        const imagesEl = recipeEl.querySelector('images');
        if (!imagesEl) return [];

        const images = [];
        const imageEls = imagesEl.querySelectorAll('image');

        imageEls.forEach(imgEl => {
            images.push({
                data: imgEl.textContent.trim(),
                name: imgEl.getAttribute('name') || 'image.jpg'
            });
        });

        return images;
    }

    /**
     * Genera XML a partir de recetas
     * @param {Array} recipes - Array de recetas
     * @returns {string} XML string
     */
    generate(recipes) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<recipes>\n';

        recipes.forEach(recipe => {
            xml += this.generateRecipeXML(recipe);
        });

        xml += '</recipes>';

        return xml;
    }

    /**
     * Genera XML para una receta
     * @param {Object} recipe - Receta
     * @returns {string} XML string
     */
    generateRecipeXML(recipe) {
        let xml = `  <recipe id="${this.escapeXML(recipe.id)}"`;
        
        if (recipe.caravanFriendly) xml += ' caravanFriendly="true"';
        if (recipe.hospitalFriendly) xml += ' hospitalFriendly="true"';
        if (recipe.menuFriendly) xml += ' menuFriendly="true"';
        
        xml += '>\n';

        // Campos básicos
        xml += `    <name>${this.escapeXML(recipe.name)}</name>\n`;
        xml += `    <category>${this.escapeXML(recipe.category)}</category>\n`;
        
        if (recipe.totalTime) {
            xml += `    <totalTime>${this.escapeXML(recipe.totalTime)}</totalTime>\n`;
        }
        
        if (recipe.author) {
            xml += `    <author>${this.escapeXML(recipe.author)}</author>\n`;
        }
        
        if (recipe.history) {
            xml += `    <history>${this.escapeXML(recipe.history)}</history>\n`;
        }

        xml += `    <createdAt>${recipe.createdAt}</createdAt>\n`;
        xml += `    <updatedAt>${recipe.updatedAt}</updatedAt>\n`;

        // Ingredientes
        if (recipe.ingredients && recipe.ingredients.length > 0) {
            xml += '    <ingredients>\n';
            recipe.ingredients.forEach(ing => {
                xml += '      <ingredient>\n';
                xml += `        <name>${this.escapeXML(ing.name)}</name>\n`;
                if (ing.quantity) xml += `        <quantity>${this.escapeXML(ing.quantity)}</quantity>\n`;
                if (ing.unit) xml += `        <unit>${this.escapeXML(ing.unit)}</unit>\n`;
                xml += '      </ingredient>\n';
            });
            xml += '    </ingredients>\n';
        }

        // Secuencias
        if (recipe.sequences && recipe.sequences.length > 0) {
            xml += '    <sequences>\n';
            recipe.sequences.forEach(seq => {
                xml += '      <sequence>\n';
                xml += `        <ingredients>${this.escapeXML(seq.ingredients.join(', '))}</ingredients>\n`;
                xml += `        <description>${this.escapeXML(seq.description)}</description>\n`;
                if (seq.duration) xml += `        <duration>${this.escapeXML(seq.duration)}</duration>\n`;
                xml += '      </sequence>\n';
            });
            xml += '    </sequences>\n';
        }

        // Aparatos
        if (recipe.kitchenAppliances && recipe.kitchenAppliances.length > 0) {
            xml += '    <kitchenAppliances>\n';
            xml += `      ${this.escapeXML(recipe.kitchenAppliances.join(', '))}\n`;
            xml += '    </kitchenAppliances>\n';
        }

        // Imágenes
        if (recipe.images && recipe.images.length > 0) {
            xml += '    <images>\n';
            recipe.images.forEach(img => {
                xml += `      <image name="${this.escapeXML(img.name)}">${img.data}</image>\n`;
            });
            xml += '    </images>\n';
        }

        xml += '  </recipe>\n';

        return xml;
    }

    /**
     * Obtiene texto de un elemento
     * @param {Element} parent - Elemento padre
     * @param {string} tagName - Nombre del tag
     * @returns {string} Texto o cadena vacía
     */
    getTextContent(parent, tagName) {
        const el = parent.querySelector(tagName);
        return el ? el.textContent.trim() : '';
    }

    /**
     * Obtiene atributo booleano
     * @param {Element} element - Elemento
     * @param {string} attrName - Nombre del atributo
     * @returns {boolean}
     */
    getBooleanAttribute(element, attrName) {
        return element.getAttribute(attrName) === 'true';
    }

    /**
     * Escapa caracteres especiales XML
     * @param {string} str - String a escapar
     * @returns {string} String escapado
     */
    escapeXML(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    /**
     * Genera ID único
     * @returns {string} UUID
     */
    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Descarga XML como archivo
     * @param {string} xmlString - Contenido XML
     * @param {string} filename - Nombre del archivo
     */
    download(xmlString, filename = 'recetas.xml') {
        const blob = new Blob([xmlString], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Instancia singleton
export const xmlService = new XMLService();

// Exportar también la clase
export { XMLService };

/**
 * Ejemplo de uso:
 * 
 * import { xmlService } from './services/XMLService.js';
 * 
 * // Parsear XML
 * const recipes = xmlService.parse(xmlString);
 * 
 * // Generar XML
 * const xml = xmlService.generate(recipes);
 * 
 * // Descargar
 * xmlService.download(xml, 'mis-recetas.xml');
 */
