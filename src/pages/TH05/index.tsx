import { useState, useEffect } from 'react';
import ClubTable from './ClubTable';
import ApplicationTable from './ApplicationTable';
import MemberTable from './MemberTable';
import Dashboard from './Dashboard';

export interface Club {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  leader: string;
  active: boolean;
  avatar: string;
}

export interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  skill: string;
  clubId: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  note?: string;
}

export interface History {
  id: number;
  applicationId: number;
  action: string;
  time: string;
  note: string;
}

const KEY = 'club_app';

export default () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(KEY);
    if (data) {
      const parsed = JSON.parse(data);
      setClubs(parsed.clubs || []);
      setApplications(parsed.applications || []);
      setHistory(parsed.history || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ clubs, applications, history }));
  }, [clubs, applications, history]);

  const addHistory = (id: number, action: string, note: string) => {
    setHistory(prev => [...prev, {
      id: Date.now(),
      applicationId: id,
      action,
      time: new Date().toLocaleString(),
      note
    }]);
  };

  return (
    <>
      <Dashboard clubs={clubs} applications={applications} />

      <ClubTable data={clubs} setData={setClubs} applications={applications} />

      <ApplicationTable
        data={applications}
        setData={setApplications}
        clubs={clubs}
        addHistory={addHistory}
        history={history}
      />

      <MemberTable
        applications={applications}
        setApplications={setApplications}
        clubs={clubs}
      />
    </>
  );
};