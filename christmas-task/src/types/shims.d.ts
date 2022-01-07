declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.mp3' {
  const content: string;
  export default content;
}
