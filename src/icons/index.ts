import { siLinux, siGnubash, siGit, siDocker, siKubernetes, siTerraform } from 'simple-icons';

function siToSvg(icon: { path: string; slug: string }): string {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${icon.path}"/></svg>`;
}

// LAN and devices SVGs from tools/pdf/icons (Material Design Icons)
const lanSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 2c-1.11 0-2 .89-2 2v3c0 1.11.89 2 2 2h1v2H2v2h4v2H5c-1.11 0-2 .89-2 2v3c0 1.11.89 2 2 2h4c1.11 0 2-.89 2-2v-3c0-1.11-.89-2-2-2H8v-2h8v2h-1c-1.11 0-2 .89-2 2v3c0 1.11.89 2 2 2h4c1.11 0 2-.89 2-2v-3c0-1.11-.89-2-2-2h-1v-2h4v-2h-9V9h1c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 2h4v3h-4zM5 17h4v3H5zm10 0h4v3h-4z"/></svg>`;

const devicesSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 6h18V4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3zm10 6H9v1.78c-.61.55-1 1.33-1 2.22s.39 1.67 1 2.22V20h4v-1.78c.61-.55 1-1.34 1-2.22s-.39-1.67-1-2.22zm-2 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M22 8h-6c-.5 0-1 .5-1 1v10c0 .5.5 1 1 1h6c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1m-1 10h-4v-8h4z"/></svg>`;

export const icons: Record<string, string> = {
  linux: siToSvg(siLinux),
  gnubash: siToSvg(siGnubash),
  git: siToSvg(siGit),
  docker: siToSvg(siDocker),
  kubernetes: siToSvg(siKubernetes),
  terraform: siToSvg(siTerraform),
  lan: lanSvg,
  devices: devicesSvg,
};
