import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { minify } from 'rollup-plugin-esbuild-minify'
import preserveDirectives from "rollup-plugin-preserve-directives";
import typescript from '@rollup/plugin-typescript';

export default defineConfig((args) => {

  /** @type {boolean} */
  const isWatch = args.watch === true

  return {
    input: [
      'src/index.ts',
    ],
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: isWatch,
    },
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return
      }
      warn(warning)
    },
    external: [
      'react',
      'react/jsx-runtime',
      'jotai'
    ],
    plugins: [
      preserveDirectives({
        suppressPreserveModulesWarning: true
      }),
      typescript({
        exclude: [
          'cypress',
          '**/*.cy.tsx'
        ]
      }),
      nodeResolve(),
      ...(!isWatch ? [minify()] : []),
    ],
    watch: {
      include: 'src/**',
      clearScreen: false
    }
  }
})
