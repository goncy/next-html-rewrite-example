import type { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  __HTML: string;
}

const aws = {
  get: async (bucket: string) =>
    `https://next-html-rewrite-example.vercel.app/buckets/${bucket}.html`,
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const file = await aws.get(params!.bucket as string);
  const __HTML = await fetch(file).then((res) => res.text());

  return { props: { __HTML } };
};

const Noop = () => null;

export default Noop;
