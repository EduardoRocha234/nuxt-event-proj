import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        files: ['**/*.ts', '**/*.vue'],
        rules: {
            'vue/multi-word-components-names': 'off',
            'no-useless-escape': 'off',
            'import/order': 'off',
            'vue/no-v-html': 'off',
        },
        plugins: [],
    }
)
