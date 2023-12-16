"use server"

//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers'


interface Session {
  user: {
      /** The user's id. */
    id: string
  }
}

export async function auth() {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('userId')
  if (hasCookie) {
    const userId = cookiesList.get('userId')?.value
    return {user: {id: userId}}
  } else {
    const userId = uuidv4()
    cookiesList.set('userId', userId)
    console.info('create session', userId);
    return {user: {id: userId}}
  }
}

export async function clear() {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('userId')
  if (hasCookie) {
    const userId = cookiesList.get('userId')?.value
    console.info('clear session', userId);
    cookies().delete('userId')
  }
}
