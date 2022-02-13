import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import invariant from 'tiny-invariant'
import { marked } from 'marked'

export type Post = {
  slug: string
  title: string
}

export type PostMarkdownAttributes = {
  title: string
}

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title
}

const postsPath = path.resolve(__dirname, '..', 'posts')

export const getPosts = async () => {
  const files = await fs.readdir(postsPath)

  return Promise.all(
    files.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename))
      const { attributes } = parseFrontMatter<PostMarkdownAttributes>(
        file.toString()
      )

      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data 😡`
      )

      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title,
      }
    })
  )
}

export const getPost = async (slug: string) => {
  const filePath = path.join(postsPath, `${slug}.md`)
  const file = await fs.readFile(filePath)
  const { attributes, body } = parseFrontMatter(file.toString())

  invariant(
    isValidPostAttributes(attributes),
    `Post ${filePath} is missing attributes`
  )
  const html = marked(body)
  return { slug, title: attributes.title, html }
}

type NewPost = {
  slug: string
  title: string
  markdown: string
}

export async function createPost({ slug, title, markdown }: NewPost) {
  const content = `---\ntitle: ${title}\n---\n\n${markdown}`

  await fs.writeFile(path.join(postsPath, `${slug}.md`), content)
  return getPost(slug)
}
