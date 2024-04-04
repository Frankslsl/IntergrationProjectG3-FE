let tailwindPlugin;
try {
  tailwindPlugin = require('prettier-plugin-tailwindcss');
} catch (error) {
  console.error('Error loading Tailwind CSS plugin for Prettier:', error);
}

module.exports = {
  // Only include the plugin if it's successfully required
  plugins: tailwindPlugin ? [tailwindPlugin] : [],
};
