import type { GetStaticPaths, GetStaticProps } from 'next';
import { upstash, aws } from '../lib/db';

interface Props {
  __HTML: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const websites = await upstash.getAll();

  return {
    // pre-generate the known websites at build time
    paths: Object.keys(websites).map((website) => ({ params: { website } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const __HTML = await aws.get(params!.website as string);

  return !__HTML ? { notFound: true } : { props: { __HTML } };
};

const Noop = () => null;

export default Noop;
