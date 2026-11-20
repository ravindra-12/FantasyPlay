import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { players } from '@/mocks/data';

type TeamState = {
  selected: string[];
  captain: string;
  viceCaptain: string;
  saved: boolean;
  toggle: (id: string) => boolean;
  chooseCaptain: (id: string) => void;
  chooseVice: (id: string) => void;
  save: () => void;
  reset: () => void;
};
const TeamContext = createContext<TeamState | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [captain, setCaptain] = useState('');
  const [viceCaptain, setViceCaptain] = useState('');
  const [saved, setSaved] = useState(false);
  const toggle = useCallback((id: string) => {
    if (selected.includes(id)) {
      setSelected((current) => current.filter((playerId) => playerId !== id));
      if (captain === id) setCaptain('');
      if (viceCaptain === id) setViceCaptain('');
      setSaved(false);
      return true;
    }
    if (selected.length >= 11) return false;
    const player = players.find((item) => item.id === id);
    const fromTeam = selected.filter((playerId) => players.find((item) => item.id === playerId)?.team === player?.team);
    if (fromTeam.length >= 7) return false;
    setSelected((current) => [...current, id]);
    setSaved(false);
    return true;
  }, [selected, captain, viceCaptain]);
  const value = useMemo(() => ({
    selected, captain, viceCaptain, saved, toggle,
    chooseCaptain: (id: string) => { if (selected.includes(id)) { setCaptain(id); if (id === viceCaptain) setViceCaptain(''); setSaved(false); } },
    chooseVice: (id: string) => { if (selected.includes(id)) { setViceCaptain(id); if (id === captain) setCaptain(''); setSaved(false); } },
    save: () => setSaved(true),
    reset: () => { setSelected([]); setCaptain(''); setViceCaptain(''); setSaved(false); },
  }), [selected, captain, viceCaptain, saved, toggle]);
  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
}
export function useTeam() { const value = useContext(TeamContext); if (!value) throw new Error('TeamProvider missing'); return value; }
