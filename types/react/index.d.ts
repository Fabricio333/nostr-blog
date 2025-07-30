declare namespace React {
  interface ReactNode {}
}
export = React;
export as namespace React;

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
