export interface Tag {
  name: string;
}

export interface Project {
  name: string;
  description: string;
  logo?: string;
  preview?: string;
  href?: string;
  githubUrl?: string;
  isPrivate?: boolean;
  stars?: number;
  /** Fecha de creación original del repo (ISO 8601). Usada para ordenar. */
  createdAt?: string;
  tags: Tag[];
  /** Bytes por lenguaje devueltos por /repos/{owner}/{repo}/languages */
  languages?: Record<string, number>;
}
