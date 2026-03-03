export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;      // Corrigé précédemment
  link_github?: string;   // DOIT ÊTRE ICI pour enlever l'erreur NG9
  link_demo?: string;     // DOIT ÊTRE ICI
  categoryId: number; // <--- AJOUTE CETTE LIGNE (clé étrangère)
  category?: {
    id: number;
    name: string;
  };
  technologies?: {
    id: number;
    name: string;
  }[];
}