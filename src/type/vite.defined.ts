export {}
declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
    }
    lastBuildTime: string
  }
}
