import SplitType from 'split-type';
/**
 * Safely creates a SplitType instance with error handling
 */
export const createSplitType = (element, options) => {
    try {
        return new SplitType(element, options);
    }
    catch (error) {
        console.warn('SplitType creation failed:', error);
        return null;
    }
};
/**
 * Safely reverts a SplitType instance with error handling
 */
export const revertSplitType = (split) => {
    if (!split)
        return;
    try {
        split.revert();
    }
    catch (error) {
        console.warn('SplitType revert failed:', error);
    }
};
/**
 * Wraps words in overflow hidden containers for reveal animations
 */
export const wrapWordsForReveal = (words) => {
    if (!words)
        return;
    words.forEach((word) => {
        try {
            const wrapper = document.createElement('span');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'inline-block';
            if (word.parentNode) {
                word.parentNode.insertBefore(wrapper, word);
                wrapper.appendChild(word);
            }
        }
        catch (error) {
            console.warn('Word wrapping failed:', error);
        }
    });
};
