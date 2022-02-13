import { Link, useLoaderData } from 'remix'

export type Post = {
  slug: string
  title: string
}

export const loader = async () => {
  const posts: Post[] = [
    {
      slug: 'my-first-post',
      title: 'My First Post',
    },
    {
      slug: '90s-mixtape',
      title: 'A Mixtape I Made Just For You',
    },
  ]

  return posts
}

export default function Posts() {
  const posts = useLoaderData<Post[]>()

  return (
    <ul>
      {posts.map((p) => {
        return (
          <li>
            <Link to={p.slug}>{p.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}
