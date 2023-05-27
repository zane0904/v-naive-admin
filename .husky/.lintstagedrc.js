module.exports = {
    'src/**/*.{js,jsx,ts,tsx,vue}': ['prettier --write', 'eslint --fix'],
    '*.json': ['prettier --write'],
    '*.css': ['prettier --write'],
};
