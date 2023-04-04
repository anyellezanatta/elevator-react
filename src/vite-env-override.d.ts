declare module "*.svg" {
  const ReactComponent: (props: React.SVGProps<SVGElement>) => JSX.Element;
  export { ReactComponent };
}
