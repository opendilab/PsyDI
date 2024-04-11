"use server"

//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers'


interface Session {
  user: {
      /** The user's id. */
    id: string
    turnCount?: number
  }
}

const expireTime = 3 * 60 * 60 * 1000  // 3 hour

export async function auth(force: boolean = false) {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('userId')
  if (!force && hasCookie) {
    const userId = cookiesList.get('userId')?.value
    return {user: {id: userId}}
  } else {
    const userId = uuidv4()
    cookiesList.set('userId', userId, { expires: Date.now() + expireTime })
    cookiesList.set('turnCount', '0', { expires: Date.now() + expireTime })
    console.info('create session', userId);
    return {user: {id: userId}}
  }
}

export async function setTurnCount(turnCount: number) {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('userId')
  if (hasCookie) {
    const userId = cookiesList.get('userId')?.value
    cookiesList.set('turnCount', turnCount.toString(), { expires: Date.now() + expireTime })
    console.log('set turn count', userId, turnCount);
  }
  return true
};

export async function getTurnCount() {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('userId')
  if (hasCookie) {
    const turnCount = parseInt(cookiesList.get('turnCount')?.value || '0')
    const userId = cookiesList.get('userId')?.value
    console.log('get turn count', userId, turnCount);
    return turnCount
  }
};

export async function clear() {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('userId')
  if (hasCookie) {
    const userId = cookiesList.get('userId')?.value
    console.info('clear session', userId);
    cookies().delete('userId')
  }
  return true
}
