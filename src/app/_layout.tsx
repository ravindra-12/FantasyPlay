import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TeamProvider } from '@/store/team-store';
import { AuthProvider } from '@/store/auth-store';
export default function RootLayout(){return <SafeAreaProvider><AuthProvider><TeamProvider><StatusBar style="light"/><Stack screenOptions={{headerShown:false,animation:'slide_from_right'}}/></TeamProvider></AuthProvider></SafeAreaProvider>;}