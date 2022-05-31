import Layout from "../../components/layout";
import { getAllPostsId, getPostData, PostData } from "../../lib/posts";

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      <h2>{postData.id}</h2>
      <div>{postData.date}</div>
      <main>{postData.htmlContent}</main>
    </Layout>
  );
}

export function getStaticPath() {
  return {
    path: getAllPostsId(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      postData: await getPostData(params.id),
    },
  };
}
