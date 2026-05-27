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
  tags: Tag[];
  /** Bytes por lenguaje devueltos por /repos/{owner}/{repo}/languages */
  languages?: Record<string, number>;
}
