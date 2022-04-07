/**
 * Representation of the link between domains and paths (website names in this case).
 */
const data: Record<string, string> = {
  'http://localhost:3000': 'localhost',
  'https://next-html-rewrite-example.vercel.app': 'next-html-rewrite-example',
};

/**
 * Naive representation of upstash usage.
 */
export const upstash = {
  async getAll() {
    return data;
  },
  async get(domain: string) {
    return data[domain];
  },
};

/**
 * Naive representation of AWS usage for getting website's HTML.
 */
export const aws = {
  get: async (website: string) => {
    const htmlMap: Record<string, string> = {
      localhost: '<h1>Hello World from localhost!</h1>',
      'next-html-rewrite-example': '<h1>Hello World from localhost!</h1>',
    };

    return htmlMap[website];
  },
};
