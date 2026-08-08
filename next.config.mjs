// When building on GitHub Actions for a project Pages site (username.github.io/<repo>),
// assets and links need to be prefixed with the repo name. This detects that automatically
// from the GITHUB_REPOSITORY env var GitHub Actions sets, so nothing needs to be hardcoded.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
let basePath = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*\//, "");
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
