import { useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'
import invariant from 'tiny-invariant'

import { getPost } from '~/post'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `Expected params.slug`)
  return getPost(params.slug)
}

export default function PostSlug() {
  const { html } = useLoaderData()

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
