import { Link } from 'react-router-dom'
import { Outlet, useLoaderData } from 'remix'

import { getPosts } from '~/post'
import type { Post } from '~/post'
import adminStyles from '~/styles/admin.css'

export const links = () => {
  return [{ rel: 'stylesheet', href: adminStyles }]
}

export const loader = async () => {
  return getPosts()
}

export default function Admin() {
  const posts = useLoaderData<Post[]>()

  return (
    <div>
      <Link to="new">Create a new post</Link>
      <ul className="admin">
        {posts.map((p) => {
          return (
            <li key={p.slug}>
              <Link to={`/posts/${p.slug}`}>{p.title}</Link>
            </li>
          )
        })}
      </ul>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
