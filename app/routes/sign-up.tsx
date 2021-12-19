import {ActionFunction, redirect} from '@remix-run/server-runtime'
import {useActionData, useTransition, json, Form} from 'remix'

interface Error {
  [key: string]: string
}

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const email = form.get('email')
  const errors: Error = {}

  if (typeof email !== 'string' || !email.includes('@')) {
    errors.email = "That doesn't look like an email address"
  }

  if (Object.keys(errors)) {
    return json(errors, {status: 422})
  }

  // Magic Sign In Logic

  return redirect('/home')
}

export default function SignUp() {
  const transition = useTransition()
  const actionData = useActionData()

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="border-black border-2 h-2/3 md:w-1/2">
        <Form
          method="post"
          className="px-4 space-y-2  border-black border-2 h-full flex flex-col justify-center"
        >
          <fieldset
            disabled={transition.state === 'submitting'}
            className="h-2/3 flex flex-col justify-around"
          >
            <div className="h-1/4">
              <label htmlFor="email" className="self-start lg:text-xl">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="h-full rounded-lg w-full border-2 border-black lg:text-4xl px-4"
                defaultValue={
                  actionData ? actionData?.values?.email : undefined
                }
              ></input>
            </div>
            {actionData && actionData?.errors?.email ? (
              <p style={{color: 'red'}}>{actionData.errors.email}</p>
            ) : null}
            <button
              type="submit"
              className="border-black border-2 h-1/6 w-2/5 rounded-lg self-center"
            >
              {transition.state === 'submitting' ? 'Creating...' : 'Create'}
            </button>
          </fieldset>
        </Form>
      </div>
    </main>
  )
}
