declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }

declare module '*.jpg' {
  const imageUrl: string;
  export default imageUrl;
}
  