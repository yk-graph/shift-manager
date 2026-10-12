import shared from '@shift-manager/eslint-config'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([...shared, globalIgnores(['src/generated/**'])])

export default eslintConfig
