declare module "express" {
  interface Router {
    get(path: string, cb: (req: any, res: any) => void): void;
  }

  interface App {
    use: (path: string, router: any) => vold;
    listen: (port: number, cd?: () => void) => void;
  }

  interface Express {
    (): App;
    Router(): Router;
  }

  const express: Express;

  export default express;
}

declare const a: number;
