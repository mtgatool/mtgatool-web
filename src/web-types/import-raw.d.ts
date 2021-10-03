declare module "!!raw-loader!*" {
  const content: string;
  export default content;
}

declare module "*.ico" {
  const value: string;
  export default value;
}
