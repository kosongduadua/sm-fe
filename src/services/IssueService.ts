import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

interface Issue {
  id: number;
  title: string;
  description: string;
}

class IssueService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000', // Replace with your actual API base URL
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getIssues(): Promise<AxiosResponse<Issue[]>> {
    return this.api.get<Issue[]>('/issues');
  }

  getIssue(id: number): Promise<AxiosResponse<Issue>> {
    return this.api.get<Issue>(`/issues/${id}`);
  }

  createIssue(issue: Omit<Issue, 'id'>): Promise<AxiosResponse<Issue>> {
    return this.api.post<Issue>('/issues', issue);
  }

  updateIssue(id: number, issue: Partial<Issue>): Promise<AxiosResponse<Issue>> {
    return this.api.put<Issue>(`/issues/${id}`, issue);
  }

  deleteIssue(id: number): Promise<AxiosResponse<void>> {
    return this.api.delete(`/issues/${id}`);
  }
}

export default new IssueService();