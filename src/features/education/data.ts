export interface Education {
  translationKey: string;
  degree: string;
  institution: string;
  period: string;
}

export const education: Education[] = [
  {
    translationKey: "edu.0",
    degree: "Ingeniero en Informática",
    institution: "Universidad Tecnológica de Chile, INACAP",
    period: "2023 – 2024",
  },
  {
    translationKey: "edu.1",
    degree: "Técnico de Nivel Superior Analista Programador",
    institution: "Universidad Tecnológica de Chile, INACAP",
    period: "2019 – 2021",
  },
];
