---
description: How to release a new version of aura-toast to npm
---

Use this workflow when you are ready to publish updates to npm.

### Prerequisites
- Ensure you are logged in to npm (`npm whoami`). If not, run `npm login`.
- Ensure all tests pass (`npm test`).
- Ensure all changes are committed and pushed to git.

### Steps

1. **Choose Bump Type**
   - For small updates/features (bump by 0.1): Use `minor`
   - For major upgrades/breaking changes: Use `major`

2. **Commit and Version**
   Run the following command (replace `<type>` with `minor` or `major`):
   ```bash
   npm version <type>
   ```
   *Note: This will update `package.json` and create a git tag.*

3. **Build the Package**
   // turbo
   ```bash
   npm run build
   ```

4. **Verify Tarball (Optional)**
   ```bash
   npm pack && tar -tf aura-toast-$(node -p "require('./package.json').version").tgz
   ```

5. **Publish to NPM**
   ```bash
   npm publish
   ```

6. **Push Version Tag to Git**
   ```bash
   git push origin main --tags
   ```
