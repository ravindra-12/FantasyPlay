export const colors = {
  navy: '#102843', blue: '#175AC4', amber: '#FFBE52', green: '#18834F', red: '#BD2940',
  pitch: '#126242', liveSoft: '#FDE7EB',
  canvas: '#F5F7FB', card: '#FFFFFF', text: '#0F172A', muted: '#64748B', border: '#E2E8F0', softBlue: '#EFF6FF',
  onPrimary: '#FFFFFF', navySoft: '#263972', blueSoft: '#DBEAFE', amberSoft: '#FEF3C7', successSoft: '#DCFCE7',
  warning: '#B45309', warningSoft: '#FFF7E5', info: '#1D4ED8', infoSoft: '#EFF6FF', live: '#DC2626',
  overlay: 'rgba(15, 23, 42, 0.48)', transparent: 'transparent',
} as const;

export const darkColors = {
  ...colors, canvas: '#0B1120', card: '#172554', text: '#F8FAFC', muted: '#CBD5E1', border: '#334155', softBlue: '#1E3A5F',
} as const;

export const space = { xxs: 4, xs: 8, sm: 12, md: 16, lg: 20, xl: 24, xxl: 32 } as const;
export const radius = { sm: 12, md: 16, lg: 20, full: 999 } as const;
export const type = {
  display: 32, page: 24, section: 19, body: 16, bodySmall: 14, caption: 12, micro: 11,
  lineDisplay: 38, linePage: 30, lineBody: 22, lineCaption: 16,
} as const;
export const shadows = {
  none: {},
  sm: { elevation: 1, shadowColor: colors.text, shadowOpacity: 0.05, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } },
  md: { elevation: 3, shadowColor: colors.text, shadowOpacity: 0.10, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } },
  lg: { elevation: 6, shadowColor: colors.text, shadowOpacity: 0.14, shadowRadius: 18, shadowOffset: { width: 0, height: 7 } },
} as const;

export const brand = { name: 'ElevenArena', currency: '₹', country: 'India' } as const;
export const layout = { controlHeight: 48, iconButton: 44, tabBarHeight: 64, maxContentWidth: 720 } as const;
