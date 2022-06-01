import Layout from "../../components/layout";
import { getAllPostsId, getPostData, PostData } from "../../lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      <h2>{postData.id}</h2>
      <div>{postData.date}</div>
      <main>{postData.htmlContent}</main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllPostsId(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      postData: await getPostData(params.id),
    },
  };
};
