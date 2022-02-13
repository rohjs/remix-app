import { Link, useLoaderData } from 'remix'

import { getPosts } from '~/post'
import type { Post } from '~/post'

export const loader = async () => {
  return getPosts()
}

export default function Posts() {
  const posts = useLoaderData<Post[]>()

  return (
    <ul>
      {posts.map((p) => {
        return (
          <li key={p.slug}>
            <Link to={p.slug}>{p.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}
