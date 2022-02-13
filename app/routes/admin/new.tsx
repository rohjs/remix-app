import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useTransition,
} from 'remix'
import invariant from 'tiny-invariant'

import { createPost } from '~/post'
import adminStyles from '~/styles/admin.css'

type PostError = {
  slug?: boolean
  title?: boolean
  markdown?: boolean
}

export const links = () => {
  return [{ rel: 'stylesheet', href: adminStyles }]
}

export const action: ActionFunction = async ({ request }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const formData = await request.formData()

  const slug = formData.get('slug')
  const title = formData.get('title')
  const markdown = formData.get('markdown')

  const errors: PostError = {}
  if (!slug) errors.slug = true
  if (!title) errors.title = true
  if (!markdown) errors.markdown = true

  if (Object.keys(errors).length) {
    return errors
  }

  invariant(typeof slug === 'string')
  invariant(typeof title === 'string')
  invariant(typeof markdown === 'string')

  await createPost({ slug, title, markdown })
  return redirect('/admin')
}

export default function NewPost() {
  const errors = useActionData()
  const transition = useTransition()

  return (
    <div className="admin">
      <h2>New Post</h2>
      <Form method="post">
        <p>
          <label>
            Post Title:
            {errors?.title && <em>Title is required</em>}
            <input type="text" name="title" />
          </label>
        </p>
        <p>
          <label>
            Post Slug:
            {errors?.slug && <em>Slug is required</em>}
            <input type="text" name="slug" />
          </label>
        </p>

        <p>
          <label htmlFor="markdown">
            Markdown:
            {errors?.markdown && <em>Markdown is required</em>}
          </label>
          <textarea id="markdown" name="markdown" />
        </p>

        <button type="submit">
          {transition.submission ? 'Creating...' : 'Create a post'}
        </button>
      </Form>
    </div>
  )
}
