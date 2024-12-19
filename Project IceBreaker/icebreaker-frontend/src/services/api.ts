import { Journal } from "../types/Journal";
import { Interaction } from "../types/History";
import { Line } from "../types/Line";
import { Commitments } from "../types/Commitments";

const baseURL = 'https://clickedtools.com';

const getAuthToken = (): string | null => {
  // const name = 'authToken=';
  // const decodedCookie = decodeURIComponent(document.cookie);
  // const ca = decodedCookie.split(';');
  // for (let i = 0; i < ca.length; i++) {
  //   let c = ca[i];
  //   while (c.charAt(0) === ' ') {
  //     c = c.substring(1);
  //   }
  //   if (c.indexOf(name) === 0) {
  //     return c.substring(name.length, c.length);
  //   }
  // }
  // return null;
  return "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiMTExODY2Mjg2NjMwMDAxNjk5MjUxIiwiZXhwIjoxNzM2MzM2MzU4LCJpYXQiOjE3MzM3NDQzNTgsInNjb3BlIjoidXNlciJ9.gMxxzZeiewRpAYzsG4tzl2c06sQS-s_BK_JwKQ5_Cm6CiGxbK6j8ALDbw8XDaTpHl1jnJ6qusY82JIWLueDMBQ";
};

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`
};

export const fetchLineDetails = async (id: string): Promise<Line> => {
  const response = await fetch(`${baseURL}/api/lines/${id}`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Line not found');
  }
  const line = await response.json();
  return line;
};

export const addJournalNote = async (
  { id, content, rating }: { id: string, content: string; rating: 'DOWNER' | 'HYPE' }
): Promise<void> => {
  const response = await fetch(`${baseURL}/api/journal`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ lineId: id, content, rating }),
  });

  if (!response.ok) {
    throw new Error('Failed to add journal note');
  }
};

export const fetchPersonalJournalList = async (): Promise<Journal[]> => {
  const response = await fetch(`${baseURL}/api/journal/personal`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Journals not found');
  }
  const journals: Journal[] = await response.json();
  journals.map((journal) => journal.isLiked = false);
  return journals;
};

export const fetchJournal = async (id: string): Promise<Journal> => {
  const response = await fetch(`${baseURL}/api/journal/${id}`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Journal not found');
  }
  const journal: Journal = await response.json();
  journal.isLiked = false;
  return journal;
};

export const fetchLineWithId = async (id: string): Promise<Line> => {
  const response = await fetch(`${baseURL}/api/lines/${id}`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Line not found');
  }
  const line = await response.json();
  return line;
};

export const fetchLineWithOpening = async (opening: string): Promise<Line> => {

  const response = await fetch(`${baseURL}/api/lines/opening?opening=${encodeURIComponent(opening)}`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Line not found');
  }
  const line = await response.json();
  return line;
};

export const postLikeForJournal = async (id: string): Promise<void> => {
  const response = await fetch(`${baseURL}/api/journal/like/${id}`, {
    method: 'POST',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to like journal');
  }
};

export const fetchPopularJournalList = async (): Promise<Journal[]> => {
  const response = await fetch(`${baseURL}/api/journal/popular`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Journals not found');
  }
  const journals: Journal[] = await response.json();
  journals.map((journal) => journal.isLiked = false);
  return journals;
}

export const fetchHistory = async (): Promise<Interaction[]> => {
  const response = await fetch(`${baseURL}/api/timeline`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('History not found');
  }
  const history = await response.json();
  return history;
};

export const fetchLines = async (): Promise<Line[]> => {
  const response = await fetch(`${baseURL}/api/lines/random`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Lines not found');
  }
  const lines = await response.json();
  return lines;
};

export const fetchLockedLines = async (): Promise<Commitments> => {
  const response = await fetch(`${baseURL}/api/commitment`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Error fetching commitments');
  }
  const lines = await response.json();
  return lines;
};

export const putCommitmentFailure = async (): Promise<Commitments> => {
  const response = await fetch(`${baseURL}/api/commitment/give_up`, { method: 'PUT', headers });
  if (!response.ok) {
    throw new Error('Error fetching commitments');
  }
  const lines = await response.json();
  return lines;
};

export const putSuccessfulCommitment = async (commitmentId: number): Promise<void> => {
  const commitmentStatus = "COMPLETED"
  const response = await fetch(`${baseURL}/api/commitment/${commitmentId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(commitmentStatus)
  });

  if (!response.ok) {
    throw new Error('Failed to mark commitment as done');
  }
};

export const lockLines = async (lines: string[]): Promise<void> => {
  const response = await fetch(`${baseURL}/api/commitment`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ lineIds: lines }),
  });

  if (!response.ok) {
    throw new Error('Failed to lock lines');
  }
};

export const fetchTimeline = async (): Promise<Interaction[]> => {
  const response = await fetch(`${baseURL}/api/timeline`, { method: 'GET', headers });
  if (!response.ok) {
    throw new Error('Error fetching commitments');
  }
  const lines = await response.json();
  console.log(lines)
  return lines;
}