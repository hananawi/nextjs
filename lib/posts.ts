import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface PostData {
  id: string;
  date: number;
  htmlContent?: string;
  title?: string;
}

const postsPath = path.resolve(process.cwd(), "posts");

export function getSortedPostsData(): PostData[] {
  return fs
    .readdirSync(postsPath)
    .map((fileName) => {
      const postContent = fs.readFileSync(path.resolve(postsPath, fileName));
      const matterResult = matter(postContent);
      return {
        ...matterResult.data,
        id: matterResult.data.title || fileName.replace(/\.md$/, ""),
        date: matterResult.data.date.getTime(),
      };
    })
    .sort(({ date: a }, { date: b }) => {
      // return Number(a < b);
      if (a > b) {
        return -1;
      } else return 1;
    });
}

export function getAllPostsId(): {
  params: {
    id: string;
  };
}[] {
  return fs.readdirSync(postsPath).map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, "") },
  }));
}

export async function getPostData(id: string): Promise<PostData> {
  const postContent = fs.readFileSync(path.resolve(postsPath, id));
  const matterResult = matter(postContent);
  const htmlContent = await remark().use(remarkHtml).process(postContent);
  return {
    ...matterResult.data,
    id: id,
    date: matterResult.data.date.getTime(),
    htmlContent: htmlContent.toString(),
  };
}

// console.log(process.cwd(), __dirname);
// console.log(fs.readdirSync("./"));
// fs.lstatSync()
// console.log(getSortedPostsData());
