// https communication with the server
import { auth } from '@/auth';

type UserData = {
  turnCount: number;
  postList: string[];
};

export class PsyDI {
  private apiUrl: string;
  private data: Record<string, UserData>;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.data = {};
  }

  registerUser(userId: string): boolean {
    if (!(userId in this.data)) {
      this.data[userId] = {
        turnCount: 0,
        postList: [],
      }; 
    }
    return true;
  }

  deleteUser(userId: string): boolean {
    if (userId in this.data) {
      delete this.data[userId];
      return true;
    } else {
      throw new Error('User not registered, delete error');
    }
  }

  getTurnCount(userId: string): number {
    if (userId in this.data) {
        return this.data[userId].turnCount;
    } else {
      throw new Error('User not registered');
    }
  }

  setTurnCount(userId: string, turnCount: number): boolean {
    if (userId in this.data) {
        this.data[userId].turnCount = turnCount;
        return true;
    } else {
      throw new Error('User not registered');
    }
  }

  appendPost(userId: string, post: string): boolean {
    if (userId in this.data) {
        this.data[userId].postList.push(post);
        return true;
    } else {
      throw new Error('User not registered');
    }
  }

  async fetchData(endpoint: string): Promise<any> {
    const url = `${this.apiUrl}/${endpoint}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async create(payload: any): Promise<any> {
    const startTime: Date = new Date();
    let finalPayload: { [key: string]: any } = payload;
    if (finalPayload.turnCount === 0) {
        finalPayload.endpoint = 'post_user_posts';
        let content = finalPayload.rawContent;
        // split string by '\n' into array of strings
        let contentArray = content.split('\n');
        finalPayload.post_list = contentArray;
        finalPayload.rawContent = '';
    } else {
        finalPayload.endpoint = 'post_user_answer';
        finalPayload.answer = finalPayload.rawContent;
        finalPayload.rawContent = '';
    }
    const endpoint = 'post_user_posts';
    console.log('payload:', finalPayload);
    const url = `${this.apiUrl}/${finalPayload.endpoint}`;


    let code = -1;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalPayload),
      });
      const data = await response.json();
      code = data.code;
    } catch (error) {
      console.error('Comm Error:', error);
      throw error;
    }

    const endTime: Date = new Date();
    const elapsedTime: number = endTime.getTime() - startTime.getTime();
    console.log(`${finalPayload.endpoint} elapsed time: ${elapsedTime}ms`);

    if (code === 0) {
      const url = `${this.apiUrl}/get_question`;
      try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({'uid': finalPayload.uid}),
        });
        const data = await response.json();
        if (data.ret.done) {
          const url = `${this.apiUrl}/get_result`;
          const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({'uid': finalPayload.uid}),
          });
          const data = await response.json();
          const result = data.ret.result;
          console.log('QA test done, the result is: ', result);
          return {done: true, 'response_string': result};
        } else {
            return {'done': false, 'response_string': data.ret.question};
        }
      } catch (error) {
        console.error('Comm Error:', error);
        throw error;
      }
    } else {
      console.error('Server Error:');
    }
  }
}

const agent = new PsyDI('https://opendilabcommunity-psydi.hf.space/')

export const getPsyDIAgent = () => {
  return agent;
};

export async function deleteCurrentUser() {
  const userId = (await auth())?.user.id
  agent.deleteUser(userId);
};
