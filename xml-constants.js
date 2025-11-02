/**
 * XML Element Name Constants
 * Defines element names for both compact (QR code) and full (export) XML formats
 * 
 * This centralized configuration makes it easier to:
 * - Maintain consistency across parsers
 * - Update format specifications
 * - Add new format variations
 */

const XML_FORMATS = {
    /**
     * Recipe root elements
     */
    RECIPE: {
        SINGLE: 'recipe',
        MULTIPLE: 'recipes'
    },
    
    /**
     * Basic recipe fields
     */
    FIELDS: {
        ID: 'id',
        NAME: 'name',
        CATEGORY: 'category',
        TOTAL_TIME: 'totalTime',
        PREPARATION_METHOD: 'preparationMethod',
        AUTHOR: 'author',
        HISTORY: 'history',
        CARAVAN_FRIENDLY: 'caravanFriendly'
    },
    
    /**
     * Ingredients section
     * Compact: <ingredients><i><n><q><u>
     * Full: <ingredients><ingredient><name><quantity><unit>
     */
    INGREDIENTS: {
        CONTAINER: 'ingredients',
        ITEM: {
            COMPACT: 'i',
            FULL: 'ingredient'
        },
        FIELDS: {
            ID: 'id',
            NAME: {
                COMPACT: 'n',
                FULL: 'name'
            },
            QUANTITY: {
                COMPACT: 'q',
                FULL: 'quantity'
            },
            UNIT: {
                COMPACT: 'u',
                FULL: 'unit'
            },
            ORDER: 'order'
        }
    },
    
    /**
     * Addition sequences section
     * Compact: <sequences><s><step><dur><desc><ings><ing>
     * Full: <additionSequences><sequence><step><duration><description><ingredientIds><ingredientId>
     */
    SEQUENCES: {
        CONTAINER: {
            COMPACT: 'sequences',
            FULL: 'additionSequences'
        },
        ITEM: {
            COMPACT: 's',
            FULL: 'sequence'
        },
        FIELDS: {
            STEP: 'step',
            DURATION: {
                COMPACT: 'dur',
                FULL: 'duration'
            },
            DESCRIPTION: {
                COMPACT: 'desc',
                FULL: 'description'
            },
            INGREDIENTS_CONTAINER: {
                COMPACT: 'ings',
                FULL_NAMES: 'ingredientNames',
                FULL_IDS: 'ingredientIds'
            },
            INGREDIENT_ITEM: {
                COMPACT: 'ing',
                FULL_NAME: 'ingredientName',
                FULL_ID: 'ingredientId'
            }
        }
    },
    
    /**
     * Kitchen appliances section
     * Compact: <appliances><a>
     * Full: <kitchenAppliances><appliance>
     */
    APPLIANCES: {
        CONTAINER: {
            COMPACT: 'appliances',
            FULL: 'kitchenAppliances'
        },
        ITEM: {
            COMPACT: 'a',
            FULL: 'appliance'
        }
    },
    
    /**
     * Multimedia sections
     */
    MEDIA: {
        IMAGES: {
            CONTAINER: 'images',
            ITEM: 'image',
            FIELDS: {
                NAME: 'name',
                TYPE: 'type',
                DATA: 'data',
                SIZE: 'size'
            }
        },
        VIDEOS: {
            CONTAINER: 'videos',
            ITEM: 'video',
            FIELDS: {
                NAME: 'name',
                TYPE: 'type',
                DATA: 'data',
                SIZE: 'size'
            }
        }
    }
};

/**
 * Helper functions for creating CSS selectors
 */
const XMLSelectorHelpers = {
    /**
     * Create a CSS selector that matches multiple element names
     * @param {string[]} names - Array of element names
     * @returns {string} CSS selector (e.g., "name1, name2, name3")
     */
    multiSelector(names) {
        return names.join(', ');
    },
    
    /**
     * Create selector for compact or full format
     * @param {Object} formatObj - Object with COMPACT and FULL properties
     * @param {boolean} includeCompact - Whether to include compact format
     * @returns {string} CSS selector
     */
    formatSelector(formatObj, includeCompact = false) {
        if (includeCompact) {
            return this.multiSelector([formatObj.COMPACT, formatObj.FULL]);
        }
        return formatObj.FULL;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        XML_FORMATS,
        XMLSelectorHelpers
    };
}
