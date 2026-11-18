import type { Player } from '@/mocks/data';
export interface AuthRepository { requestOtp(phone: string): Promise<void>; verifyOtp(code: string): Promise<{ displayName: string }>; }
export interface MatchRepository { getMatches(): Promise<unknown[]>; getPlayers(matchId: string): Promise<Player[]>; }
export interface FantasyTeamRepository { saveTeam(input: { playerIds: string[]; captainId: string; viceCaptainId: string }): Promise<void>; }
export interface ContestRepository { joinFreeContest(contestId: string, teamId: string): Promise<void>; }
export interface WalletRepository { getDemoBalance(): Promise<{ total: number }>; }
