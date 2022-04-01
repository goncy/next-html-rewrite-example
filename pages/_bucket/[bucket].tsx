import { GetStaticPaths, GetStaticProps } from "next"

interface Props {
  html: string
}

const aws = {
  get: async (bucket: string) => `https://next-html-rewrite-example.vercel.app/buckets/${bucket}.html`
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const file = await aws.get(params?.bucket as string);
  const html = await fetch(file).then(res => res.text())

  return {
    props: {
      html
    }
  }
}

export default function BucketPage({html}: Props) {
  return (
    <main dangerouslySetInnerHTML={{__html: html}}></main>
  )
}