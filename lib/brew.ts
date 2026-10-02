export type Brew = 'light' | 'dark';

export const BREW_KEY = 'brew-mode';

// Runs in <head> before first paint so the saved brew mode applies without a flash.
// Falls back to the visitor's OS light/dark preference.
export const brewInitScript = `(function(){try{var m=localStorage.getItem('${BREW_KEY}');if(m!=='light'&&m!=='dark'){m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-brew',m)}catch(e){}})();`;
