import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme";
import { useAuth } from "@/store/auth-store";
import { useTeam } from "@/store/team-store";
import {
  contests,
  matches,
  players,
  type Role,
} from "@/mocks/data";

const push = (p: string) => router.push(p as never);
function Top({ title, caption }: { title: string; caption: string }) {
  const i = useSafeAreaInsets();
  return (
    <View style={[s.top, { paddingTop: i.top + 10 }]}>
      <Pressable
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
      >
        <Text style={s.back}>‹</Text>
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text style={s.topTitle}>{title}</Text>
        <Text style={s.topCaption}>{caption}</Text>
      </View>
      <View style={s.mark}>
        <Text style={s.markText}>11</Text>
      </View>
    </View>
  );
}
function Cta({
  text,
  onPress,
  disabled = false,
  secondary = false,
}: {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[s.cta, secondary && s.secondary, disabled && s.disabled]}
    >
      <Text style={[s.ctaText, secondary && s.secondaryText]}>{text}</Text>
    </Pressable>
  );
}
function Notice({ children }: { children: React.ReactNode }) {
  return (
    <View style={s.notice}>
      <Text style={s.noticeIcon}>ⓘ</Text>
      <Text style={s.noticeText}>{children}</Text>
    </View>
  );
}
function ContestList() {
  const [joined, setJoined] = useState<string[]>([]);
  return (
    <>
      {contests.map((c) => (
        <View key={c.id} style={s.contest}>
          <View style={s.row}>
            <View>
              <Text style={s.contestTitle}>{c.title}</Text>
              <Text style={s.sub}>{c.spots} spots · Sample data</Text>
            </View>
            <Text style={[s.chip, c.type === "Paid Demo" && s.amber]}>
              {c.type}
            </Text>
          </View>
          <View style={[s.row, { marginTop: 14 }]}>
            <View>
              <Text style={s.sub}>ENTRY</Text>
              <Text style={s.amount}>{c.entry}</Text>
            </View>
            <View>
              <Text style={s.sub}>PRIZE POOL</Text>
              <Text style={[s.amount, { textAlign: "right" }]}>{c.prize}</Text>
            </View>
          </View>
          <View style={s.progress}>
            <View
              style={[s.progressFill, { width: c.id === "c3" ? "84%" : "52%" }]}
            />
          </View>
          <Cta
            text={
              joined.includes(c.id)
                ? "Joined · View team"
                : c.type === "Free"
                  ? "Join free contest"
                  : "Preview paid demo"
            }
            onPress={() =>
              c.type === "Free"
                ? setJoined([...joined, c.id])
                : push("/contest/" + c.id)
            }
          />
        </View>
      ))}
    </>
  );
}
function Builder() {
  const { selected, toggle } = useTeam();
  const [role, setRole] = useState<Role | "ALL">("ALL");
  const credits = useMemo(
    () =>
      selected.reduce(
        (n, id) => n + (players.find((p) => p.id === id)?.credits || 0),
        0,
      ),
    [selected],
  );
  const roleCount = (target: Role) => selected.filter((id) => players.find((player) => player.id === id)?.role === target).length;
  const validComposition = selected.length === 11 && roleCount("WK") >= 1 && roleCount("WK") <= 4 && roleCount("BAT") >= 3 && roleCount("BAT") <= 6 && roleCount("AR") >= 1 && roleCount("AR") <= 4 && roleCount("BOWL") >= 3 && roleCount("BOWL") <= 6 && credits <= 100;
  return (
    <>
      <View style={s.builderStat}>
        <View>
          <Text style={s.builderNum}>
            {selected.length}
            <Text style={s.builderMax}> / 11</Text>
          </Text>
          <Text style={s.sub}>PLAYERS</Text>
        </View>
        <View>
          <Text style={s.builderNum}>{(100 - credits).toFixed(1)}</Text>
          <Text style={s.sub}>CREDITS LEFT</Text>
        </View>
        <View>
          <Text style={s.builderNum}>
            {
              selected.filter(
                (id) => players.find((p) => p.id === id)?.team === "MUM",
              ).length
            }{" "}
            :{" "}
            {
              selected.filter(
                (id) => players.find((p) => p.id === id)?.team === "CHE",
              ).length
            }
          </Text>
          <Text style={s.sub}>TEAM SPLIT</Text>
        </View>
      </View>
      <View style={s.filters}>
        {(["ALL", "WK", "BAT", "AR", "BOWL"] as const).map((r) => (
          <Pressable
            key={r}
            onPress={() => setRole(r)}
            style={[s.filter, role === r && s.filterOn]}
          >
            <Text style={[s.filterText, role === r && s.filterTextOn]}>
              {r}
            </Text>
          </Pressable>
        ))}
      </View>
      {players
        .filter((p) => role === "ALL" || p.role === role)
        .map((p) => {
          const on = selected.includes(p.id);
          return (
            <Pressable
              onPress={() => {
                if (!toggle(p.id)) Alert.alert("Team limit reached", "Select at most 11 players and no more than 7 from one team.");
              }}
              key={p.id}
              style={[s.player, on && s.playerOn]}
            >
              <View style={s.avatar}>
                <Text style={s.avatarText}>
                  {p.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")
                    .slice(0, 2)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.playerName}>{p.name}</Text>
                <Text style={s.sub}>
                  {p.team} · {p.role} · Selected by {p.selected}%
                </Text>
              </View>
              <View>
                <Text style={s.credit}>{p.credits}</Text>
                <Text style={s.add}>{on ? "✓" : "+"}</Text>
              </View>
            </Pressable>
          );
        })}
      <Cta
        disabled={!validComposition}
        text={
          validComposition
            ? "Continue to Captain & VC"
            : "Select 11 players to continue"
        }
        onPress={() => push("/fantasy-team/captain")}
      />
      <Text style={s.foot}>
        Rules: 1–4 WK · 3–6 BAT · 1–4 AR · 3–6 BOWL · max 7 from one side.
      </Text>
    </>
  );
}
function Captain() {
  const { selected, captain, viceCaptain, chooseCaptain, chooseVice, save } = useTeam();
  if (selected.length !== 11) return <><Notice>Select 11 players before choosing Captain and Vice Captain.</Notice><Cta text="Build your XI" onPress={() => push('/fantasy-team/create')} /></>;
  return <><View style={s.captainHero}><Icon name="crown-outline" size={30} color={colors.amber} /><Text style={s.captainTitle}>Choose Captain & Vice Captain</Text><Text style={s.captainText}>Captain earns 2× points. Vice Captain earns 1.5× points.</Text></View>{players.filter((player) => selected.includes(player.id)).map((player) => <View style={s.player} key={player.id}><View style={s.avatar}><Text style={s.avatarText}>{player.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</Text></View><View style={{ flex: 1 }}><Text style={s.playerName}>{player.name}</Text><Text style={s.sub}>{player.team} · {player.role} · {player.points} sample pts</Text></View><Pressable accessibilityRole="button" accessibilityLabel={`Make ${player.name} Captain`} onPress={() => chooseCaptain(player.id)} style={[s.choice, captain === player.id && s.choiceActive]}><Text style={[s.choiceText, captain === player.id && s.choiceTextActive]}>C</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel={`Make ${player.name} Vice Captain`} onPress={() => chooseVice(player.id)} style={[s.choice, viceCaptain === player.id && s.viceChoiceActive]}><Text style={[s.choiceText, viceCaptain === player.id && s.choiceTextActive]}>VC</Text></Pressable></View>)}<Cta disabled={!captain || !viceCaptain} text="Save team & preview" onPress={() => { save(); push('/fantasy-team/preview'); }} /></>;
}
function TeamPreview() {
  const { selected, captain, viceCaptain, saved } = useTeam();
  if (!saved || selected.length !== 11 || !captain || !viceCaptain) return <><Notice>Your XI needs a Captain and Vice Captain before it can be previewed.</Notice><Cta text="Choose Captain & Vice Captain" onPress={() => push('/fantasy-team/captain')} /></>;
  return <><View style={s.previewHeader}><Text style={s.previewTitle}>Your Playing XI</Text><Text style={s.previewText}>Saved locally · demo team</Text></View>{players.filter((player) => selected.includes(player.id)).map((player) => <View style={s.player} key={player.id}><View style={s.avatar}><Text style={s.avatarText}>{player.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</Text></View><View style={{ flex: 1 }}><Text style={s.playerName}>{player.name}</Text><Text style={s.sub}>{player.team} · {player.role} · {player.credits} cr</Text></View>{captain === player.id && <Text style={s.captainBadge}>C · 2×</Text>}{viceCaptain === player.id && <Text style={s.viceBadge}>VC · 1.5×</Text>}</View>)}<Cta text="Explore contests" onPress={() => push('/contest/m1')} /><Cta secondary text="Edit team" onPress={() => push('/fantasy-team/create')} /></>;
}
function Wallet() {
  return (
    <>
      <View style={s.balance}>
        <Text style={s.sub}>TOTAL BALANCE · SAMPLE</Text>
        <Text style={s.big}>₹ 1,240.00</Text>
        <View style={s.balanceRow}>
          <Text style={s.balanceItem}>Deposit ₹750</Text>
          <Text style={s.balanceItem}>Winnings ₹490</Text>
        </View>
      </View>
      <Notice>
        DEMO ONLY — amounts shown here cannot be deposited, withdrawn, or used
        for real contest entries.
      </Notice>
      <View style={s.actionRow}>
        <Cta
          text="Add Cash Demo"
          onPress={() => push("/wallet/add-cash-demo")}
        />
        <Cta
          text="Withdraw Demo"
          secondary
          onPress={() => push("/wallet/withdraw-demo")}
        />
      </View>
      <Text style={s.section}>Recent sample activity</Text>
      {[
        "Welcome promo · ₹100",
        "Free contest entry · ₹0",
        "Sample winnings · ₹250",
      ].map((x, i) => (
        <View key={x} style={s.transaction}>
          <View style={s.txIcon}>
            <Text>{i === 0 ? "✦" : "◌"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.playerName}>{x}</Text>
            <Text style={s.sub}>Sample · 17 Nov 2026</Text>
          </View>
          <Text style={s.green}>{i === 1 ? "₹0" : "+₹" + (i ? 250 : 100)}</Text>
        </View>
      ))}
      <Cta
        secondary
        text="View all transactions"
        onPress={() => push("/wallet/transactions")}
      />
    </>
  );
}
function Live() {
  return (
    <>
      <Notice>Demo score — simulated locally, not live cricket data.</Notice>
      <View style={s.score}>
        <Text style={s.scoreTeam}>MUM</Text>
        <Text style={s.scoreRuns}>96/3</Text>
        <Text style={s.scoreOver}>12.4 overs</Text>
        <Text style={s.target}>Need 73 from 44 balls</Text>
      </View>
      <View style={s.statRow}>
        <View style={s.stat}>
          <Text style={s.statN}>54*</Text>
          <Text style={s.sub}>A. Mehta</Text>
        </View>
        <View style={s.stat}>
          <Text style={s.statN}>2/18</Text>
          <Text style={s.sub}>V. Rao</Text>
        </View>
        <View style={s.stat}>
          <Text style={s.statN}>7.58</Text>
          <Text style={s.sub}>RUN RATE</Text>
        </View>
      </View>
      <Cta
        text="Simulate refresh"
        onPress={() =>
          Alert.alert(
            "Demo updated",
            "The score display is a local sample only.",
          )
        }
      />
      <Cta
        secondary
        text="Open scorecard"
        onPress={() => push("/match/m2/scorecard")}
      />
    </>
  );
}
function LoginScreen() {
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const validPhone = phone.replace(/\D/g, "").length === 10;
  return (
    <>
      <View style={s.authHero}>
        <Icon name="shield-account-outline" size={34} color={colors.amber} />
        <Text style={s.heroTitle}>Sign in to ElevenArena</Text>
        <Text style={s.authText}>Your demo account stays on this device.</Text>
      </View>
      <Text style={s.section}>
        {otpSent ? "Enter demo OTP" : "Mobile number"}
      </Text>
      {!otpSent ? (
        <>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            style={s.input}
          />
          <Cta
            text="Continue with demo OTP"
            disabled={!validPhone}
            onPress={() => setOtpSent(true)}
          />
        </>
      ) : (
        <>
          <TextInput
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="123456"
            style={[s.input, s.otpInput]}
          />
          <Text style={s.sub}>Demo OTP: 123456</Text>
          <Cta
            text="Verify and sign in"
            disabled={otp !== "123456"}
            onPress={() => {
              login(phone);
              router.replace("/");
            }}
          />
        </>
      )}
      <Notice>
        Authentication is local to this demo. No data is sent to a server.
      </Notice>
    </>
  );
}
function ProfileScreen() {
  const { isLoggedIn, phone, logout } = useAuth();
  if (!isLoggedIn) return <LoginScreen />;
  return (
    <>
      <View style={s.profile}>
        <View style={s.profileAvatar}>
          <Text style={s.profileA}>AA</Text>
        </View>
        <Text style={s.profileName}>ArenaAce</Text>
        <Text style={s.sub}>{phone ? `+91 ${phone}` : "Demo profile"}</Text>
        <View style={s.statRow}>
          {[
            ["28", "CONTESTS"],
            ["1,204", "XP"],
            ["7", "BADGES"],
          ].map(([value, label]) => (
            <View style={s.stat} key={label}>
              <Text style={s.statN}>{value}</Text>
              <Text style={s.sub}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={s.section}>Account</Text>
      {[
        "Rewards & achievements",
        "Notifications",
        "Help centre",
        "Settings",
      ].map((item) => (
        <Pressable
          key={item}
          style={s.menu}
          onPress={() =>
            push(
              `/${item.toLowerCase().replaceAll(" ", "-").replace("&", "and")}`,
            )
          }
        >
          <Text style={s.playerName}>{item}</Text>
          <Icon name="chevron-right" size={20} color={colors.muted} />
        </Pressable>
      ))}
      <Cta
        text="Log out"
        secondary
        onPress={() =>
          Alert.alert(
            "Log out of demo?",
            "Your sample team remains on this device.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Log out",
                style: "destructive",
                onPress: () => {
                  logout();
                  router.replace("/login");
                },
              },
            ],
          )
        }
      />
    </>
  );
}
function BottomTabs({ path }: { path: string }) {
  const active = path.startsWith("wallet")
    ? "Wallet"
    : path.startsWith("contest")
      ? "Contests"
      : path.startsWith("profile")
        ? "Profile"
        : path.startsWith("match") || path.startsWith("my-matches")
          ? "My Matches"
          : "Home";
  const tabs: [React.ComponentProps<typeof Icon>["name"], string, string][] = [
    ["home-variant-outline", "Home", "/"],
    ["calendar-blank-outline", "My Matches", "/my-matches"],
    ["trophy-outline", "Contests", "/contests"],
    ["wallet-outline", "Wallet", "/wallet"],
    ["account-circle-outline", "Profile", "/profile"],
  ];
  return (
    <View style={s.tabs}>
      {tabs.map(([icon, label, href]) => (
        <Pressable
          key={label}
          accessibilityRole="tab"
          accessibilityState={{ selected: active === label }}
          onPress={() => router.replace(href as never)}
          style={s.tab}
        >
          <Icon
            name={icon}
            size={22}
            color={active === label ? colors.blue : colors.muted}
          />
          <Text style={[s.tabLabel, active === label && s.tabLabelActive]}>
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
function Generic() {
  const params = useLocalSearchParams<{ path?: string[] }>();
  const path = (Array.isArray(params.path) ? params.path : [params.path])
    .filter(Boolean)
    .join("/");
  const first = path.split("/")[0];
  const { isLoggedIn } = useAuth();
  const authRoute = first === "login" || first === "welcome" || first === "otp";
  const title =
    first === "wallet"
      ? "Wallet Demo"
      : first === "fantasy-team"
        ? "Build Your XI"
        : first === "contest" || first === "contests"
          ? "Contests"
          : first === "match"
            ? "Match Centre"
            : first === "profile"
              ? "Your Profile"
              : first === "notifications"
                ? "Notifications"
                : first === "my-matches"
                  ? "My Matches"
                  : first === "welcome" || first === "login" || first === "otp"
                    ? "Welcome to ElevenArena"
                    : "ElevenArena";
  let body: React.ReactNode;
  if (authRoute || !isLoggedIn) body = <LoginScreen />;
  else if (path.includes("captain")) body = <Captain />;
  else if (path.includes("preview")) body = <TeamPreview />;
  else if (path.includes("create") || path.includes("players"))
    body = <Builder />;
  else if (path.includes("wallet") || first === "wallet") body = <Wallet />;
  else if (
    path.includes("live") ||
    path.includes("scorecard") ||
    path.includes("m2")
  )
    body = <Live />;
  else if (first === "contest" || first === "contests") body = <ContestList />;
  else if (
    first === "match" ||
    first === "my-matches" ||
    path === "all-matches"
  )
    body = (
      <>
        {matches.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => push("/match/" + m.id)}
            style={s.simpleCard}
          >
            <Text style={s.contestTitle}>
              {m.a} vs {m.b}
            </Text>
            <Text style={s.sub}>
              {m.time} · {m.venue}
            </Text>
            <Cta text="View match" onPress={() => push("/match/" + m.id)} />
          </Pressable>
        ))}
      </>
    );
  else if (first === "profile") body = <ProfileScreen />;
  else if (false)
    body = (
      <>
        <View style={s.profile}>
          <View style={s.profileAvatar}>
            <Text style={s.profileA}>AA</Text>
          </View>
          <Text style={s.profileName}>ArenaAce</Text>
          <Text style={s.sub}>@arenaace · Dhaka</Text>
          <View style={s.statRow}>
            <View style={s.stat}>
              <Text style={s.statN}>28</Text>
              <Text style={s.sub}>CONTESTS</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statN}>1,204</Text>
              <Text style={s.sub}>XP</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statN}>7</Text>
              <Text style={s.sub}>BADGES</Text>
            </View>
          </View>
        </View>
        {[
          "Rewards & achievements",
          "Referral demo",
          "Help centre",
          "Settings",
          "Legal & about",
        ].map((x) => (
          <Pressable
            key={x}
            onPress={() =>
              push(
                "/" + x.toLowerCase().replaceAll(" ", "-").replace("&", "and"),
              )
            }
            style={s.menu}
          >
            <Text style={s.playerName}>{x}</Text>
            <Text style={s.link}>›</Text>
          </Pressable>
        ))}
      </>
    );
  else
    body = (
      <>
        <View style={s.authHero}>
          <Text style={s.heroTitle}>
            Cricket is better{""}when it is yours.
          </Text>
          <Text style={s.authText}>
            A premium fantasy cricket demo with original mock fixtures and
            local-only interactions.
          </Text>
        </View>
        <Cta text="Continue with demo login" onPress={() => push("/login")} />
        <Cta
          secondary
          text="Preview matches"
          onPress={() => push("/all-matches")}
        />
        <Notice>
          Mock OTP for this UI demo: 123456. No account or personal data is sent
          anywhere.
        </Notice>
      </>
    );
  return (
    <View style={s.page}>
      <Top
        title={title}
        caption={
          path.includes("wallet")
            ? "SAMPLE · NON-TRANSACTIONAL"
            : "DEMO DATA · LOCAL ONLY"
        }
      />
      <ScrollView contentContainerStyle={s.content}>{body}</ScrollView>
      {!authRoute && <BottomTabs path={path} />}
    </View>
  );
}

export default Generic;

/*
 * Legacy duplicate route implementation retained below temporarily while the
 * active route uses the typed, formatted implementation above.
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';
import { contests, leaderboard, matches, players, type Role } from '@/mocks/data';
import { useTeam } from '@/store/team-store';
import { useAuth } from '@/store/auth-store';
const push=(p:string)=>router.push(p as never);
function Top({title,caption}:{title:string;caption:string}){const i=useSafeAreaInsets();return <View style={[s.top,{paddingTop:i.top+10}]}><Pressable onPress={()=>router.canGoBack()?router.back():router.replace('/')} hitSlop={12}><Icon name="arrow-left" size={24} color="#fff"/></Pressable><View style={{flex:1}}><Text style={s.topTitle}>{title}</Text><Text style={s.topCaption}>{caption}</Text></View><View style={s.mark}><Text style={s.markText}>11</Text></View></View>}
function Button({text,onPress,disabled=false,secondary=false}:{text:string;onPress:()=>void;disabled?:boolean;secondary?:boolean}){return <Pressable onPress={onPress} disabled={disabled} style={[s.button,secondary&&s.secondary,disabled&&s.disabled]}><Text style={[s.buttonText,secondary&&s.secondaryText]}>{text}</Text></Pressable>}
function Notice({children}:{children:React.ReactNode}){return <View style={s.notice}><Icon name="information-outline" size={19} color="#B45309"/><Text style={s.noticeText}>{children}</Text></View>}
function Builder(){const {selected,toggle}=useTeam();const [role,setRole]=useState<Role|'ALL'>('ALL');const credits=useMemo(()=>selected.reduce((n,id)=>n+(players.find(p=>p.id===id)?.credits||0),0),[selected]);return <><View style={s.statCard}><View><Text style={s.statBig}>{selected.length}<Text style={s.statSmall}> / 11</Text></Text><Text style={s.sub}>PLAYERS</Text></View><View><Text style={s.statBig}>{(100-credits).toFixed(1)}</Text><Text style={s.sub}>CREDITS LEFT</Text></View><View><Text style={s.statBig}>6 : 5</Text><Text style={s.sub}>MUM · CHE</Text></View></View><View style={s.ruleRow}>{['WK 1–4','BAT 3–6','AR 1–4','BOWL 3–6'].map(x=><Text key={x} style={s.ruleChip}>{x}</Text>)}</View><View style={s.filters}>{(['ALL','WK','BAT','AR','BOWL'] as const).map(r=><Pressable onPress={()=>setRole(r)} key={r} style={[s.filter,role===r&&s.filterOn]}><Text style={[s.filterText,role===r&&s.filterTextOn]}>{r}</Text></Pressable>)}</View>{players.filter(p=>role==='ALL'||p.role===role).map(p=>{const on=selected.includes(p.id);return <Pressable key={p.id} onPress={()=>toggle(p.id)} style={[s.player,on&&s.playerOn]}><View style={s.avatar}><Text style={s.avatarText}>{p.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</Text></View><View style={{flex:1}}><Text style={s.playerName}>{p.name}</Text><Text style={s.sub}>{p.team} · {p.role} · {p.selected}% selected</Text></View><View style={{alignItems:'center'}}><Text style={s.credit}>{p.credits}</Text><View style={[s.add,on&&s.addOn]}><Icon name={on?'check':'plus'} size={17} color={on?'#fff':colors.blue}/></View></View></Pressable>})}<Button disabled={selected.length!==11} text={selected.length===11?"Continue to Captain & Vice Captain":"Select 11 players to continue"} onPress={()=>push('/fantasy-team/captain')}/></>}
function Captain(){const {selected,captain,viceCaptain,chooseCaptain,chooseVice}=useTeam();return <><View style={s.captainHero}><Icon name="crown-outline" size={31} color={colors.amber}/><Text style={s.captainTitle}>Choose Captain & Vice Captain</Text><Text style={s.captainText}>Captain earns 2× points. Vice Captain earns 1.5× points.</Text></View><View style={s.legend}><Text style={s.legendC}>C</Text><Text style={s.sub}>Captain 2×</Text><Text style={s.legendVC}>VC</Text><Text style={s.sub}>Vice Captain 1.5×</Text></View>{players.filter(p=>selected.includes(p.id)).map(p=><View key={p.id} style={s.player}><View style={s.avatar}><Text style={s.avatarText}>{p.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</Text></View><View style={{flex:1}}><Text style={s.playerName}>{p.name}</Text><Text style={s.sub}>{p.team} · {p.role} · {p.points} pts</Text></View><Pressable onPress={()=>chooseCaptain(p.id)} style={[s.choice,captain===p.id&&s.choiceOn]}><Text style={[s.choiceText,captain===p.id&&s.choiceTextOn]}>C</Text></Pressable><Pressable onPress={()=>chooseVice(p.id)} style={[s.choice,viceCaptain===p.id&&s.vcOn]}><Text style={[s.choiceText,viceCaptain===p.id&&s.choiceTextOn]}>VC</Text></Pressable></View>)}<Button disabled={!captain||!viceCaptain} text="Save team & preview" onPress={()=>push('/fantasy-team/preview')}/></>}
function Preview(){const {selected,captain,viceCaptain}=useTeam();return <><View style={s.field}><Text style={s.fieldLabel}>YOUR PLAYING XI</Text>{['WICKET KEEPER','BATTERS','ALL-ROUNDERS','BOWLERS'].map((r,i)=><View key={r} style={s.fieldLine}><Text style={s.fieldRole}>{r}</Text><View style={s.fieldPlayers}>{players.filter(p=>selected.includes(p.id)).slice(i*3,i*3+3).map(p=><View key={p.id} style={s.fieldP}><View style={s.fieldAvatar}><Text style={s.fieldInitial}>{p.name[0]}</Text></View><Text numberOfLines={1} style={s.fieldName}>{p.name.split(' ')[0]}{p.id===captain?' (C)':p.id===viceCaptain?' (VC)':''}</Text></View>)}</View></View>)}</View><Notice>Your XI is mock-only and saved locally for this demo.</Notice><Button text="Explore contests" onPress={()=>push('/contest/m1')}/><Button text="Edit team" secondary onPress={()=>push('/fantasy-team/create')}/></>}
function Contests(){const [joined,setJoined]=useState<string[]>([]);return <>{contests.map(c=><View style={s.contest} key={c.id}><View style={s.row}><View><Text style={s.playerName}>{c.title}</Text><Text style={s.sub}>{c.spots} spots · India sample contest</Text></View><Text style={[s.badge,c.type==='Paid Demo'&&s.badgeAmber]}>{c.type}</Text></View><View style={s.row}><Text style={s.amount}>{c.entry}</Text><Text style={s.amount}>{c.prize}</Text></View><View style={s.progress}><View style={[s.progressIn,{width:c.id==='c3'?'83%':'51%'}]}/></View><Button text={joined.includes(c.id)?'Joined free contest':c.type==='Free'?'Join free contest':'Preview paid demo'} onPress={()=>c.type==='Free'?setJoined(v=>[...v,c.id]):Alert.alert('Paid contest demo','This sample preview cannot accept money or create an entry.')}/></View>)}</>}
function Wallet(){const [amount,setAmount]=useState('500');return <><View style={s.balance}><Text style={s.sub}>TOTAL BALANCE · SAMPLE</Text><Text style={s.balanceNum}>₹ 1,240.00</Text><Text style={s.balanceSub}>Deposit ₹750 · Winnings ₹490</Text></View><Notice>DEMO ONLY — no money can be added, withdrawn, transferred, or used in a paid contest.</Notice><Text style={s.section}>Quick amount preview</Text><View style={s.amounts}>{['₹100','₹500','₹1000'].map(a=><Pressable key={a} onPress={()=>setAmount(a.slice(1))} style={[s.amountChip,amount===a.slice(1)&&s.amountChipOn]}><Text style={[s.amountChipText,amount===a.slice(1)&&s.choiceTextOn]}>{a}</Text></Pressable>)}</View><TextInput keyboardType="number-pad" value={amount} onChangeText={setAmount} placeholder="Enter demo amount" style={s.input}/><Button text={'Preview ₹'+amount+' payment'} onPress={()=>push('/wallet/payment-review-demo')}/><Button secondary text="Preview withdrawal" onPress={()=>push('/wallet/withdraw-demo')}/></>}
function Live(){return <><Notice>Simulated score for UI preview — not live cricket data.</Notice><View style={s.score}><Text style={s.scoreTeam}>BLR</Text><Text style={s.scoreRun}>122/3</Text><Text style={s.scoreOver}>14.2 overs · Target 187</Text></View><View style={s.tiles}>{[['R. Sharma','61*'],['K. Rao','2/21'],['Run rate','8.51']].map(x=><View style={s.tile} key={x[0]}><Text style={s.tileN}>{x[1]}</Text><Text style={s.sub}>{x[0]}</Text></View>)}</View><Button text="Simulate refresh" onPress={()=>Alert.alert('Demo refresh','The sample score has been refreshed locally.')}/><Button secondary text="Scorecard" onPress={()=>push('/match/m2/scorecard')}/></>}
function Leaderboard(){return <>{leaderboard.slice(0,3).map(x=><View style={s.podium} key={x.rank}><Icon name="trophy-outline" size={22} color={x.rank===1?colors.amber:colors.muted}/><Text style={s.playerName}>#{x.rank} {x.name}</Text><Text style={s.amount}>{x.points} pts</Text></View>)}{leaderboard.slice(3).map(x=><View style={[s.rank,x.name.includes('You')&&s.rankMe]} key={x.rank}><Text style={s.rankNo}>{x.rank}</Text><Text style={[s.playerName,{flex:1}]}>{x.name}</Text><Text style={s.amount}>{x.points}</Text></View>)}</>}
function LoginScreen(){const {login}=useAuth();const [phone,setPhone]=useState('');const [otp,setOtp]=useState('');const [sent,setSent]=useState(false);return <View><View style={{backgroundColor:colors.navy,borderRadius:20,padding:21,marginBottom:16}}><Icon name="shield-account-outline" size={34} color={colors.amber}/><Text style={{color:'#fff',fontSize:24,fontWeight:'900',marginTop:10}}>Sign in to ElevenArena</Text><Text style={{color:'#BFDBFE',fontSize:13,marginTop:5}}>Local demo only. No personal data leaves this app.</Text></View><Text style={s.section}>{sent?'Enter demo OTP':'Mobile number'}</Text>{!sent?<><View style={{flexDirection:'row',gap:8}}><View style={{height:48,backgroundColor:'#E8EEF8',borderRadius:13,justifyContent:'center',paddingHorizontal:14}}><Text style={{fontWeight:'900',color:colors.navy}}>+91</Text></View><TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="10-digit mobile number" style={[s.input,{flex:1,marginTop:0}]}/></View><Button disabled={phone.replace(/[^0-9]/g,'').length!==10} text="Continue with demo OTP" onPress={()=>setSent(true)}/></>:<><TextInput value={otp} onChangeText={setOtp} keyboardType="number-pad" maxLength={6} placeholder="123456" style={[s.input,{fontSize:20,textAlign:'center',letterSpacing:8}]}/><Text style={s.sub}>Demo OTP: 123456</Text><Button disabled={otp!=='123456'} text="Verify & sign in" onPress={()=>{login(phone);router.replace('/')}}/></>}<Notice>Authentication is simulated locally. There is no backend or token.</Notice></View>}
function ProfileScreen(){const {isLoggedIn,phone,logout}=useAuth();return <>{isLoggedIn?<><View style={{backgroundColor:'#fff',borderRadius:20,padding:20,alignItems:'center'}}><View style={{height:70,width:70,borderRadius:35,backgroundColor:colors.navy,alignItems:'center',justifyContent:'center'}}><Text style={{color:'#fff',fontWeight:'900',fontSize:20}}>AA</Text></View><Text style={[s.playerName,{fontSize:20,marginTop:9}]}>ArenaAce</Text><Text style={s.sub}>{phone?'+91 '+phone:'India · Demo profile'}</Text></View><View style={{flexDirection:'row',gap:8,marginTop:13}}>{[['28','CONTESTS'],['1,204','XP'],['7','BADGES']].map(x=><View key={x[1]} style={s.tile}><Text style={s.tileN}>{x[0]}</Text><Text style={s.sub}>{x[1]}</Text></View>)}</View><Text style={s.section}>Account</Text>{['Rewards & achievements','Notifications','Help centre','Settings'].map(x=><Pressable key={x} style={s.match} onPress={()=>push('/'+x.toLowerCase().replaceAll(' ','-').replace('&','and'))}><Text style={s.playerName}>{x}</Text><Icon name="chevron-right" size={20} color={colors.muted}/></Pressable>)}<Button secondary text="Log out" onPress={()=>Alert.alert('Log out of demo?', 'Your mock team stays on this device.',[{text:'Cancel',style:'cancel'},{text:'Log out',style:'destructive',onPress:()=>{logout();router.replace('/login')}}])}/></>:<LoginScreen/>}</>}
function BottomMenu({path}:{path:string}){const active=path.includes('wallet')?'Wallet':path.includes('contest')?'Contests':path.includes('profile')?'Profile':path.includes('my-matches')||path.includes('match')?'My Matches':'Home';const items:[string,string,string][]=[['home-variant-outline','Home','/'],['calendar-blank-outline','My Matches','/my-matches'],['trophy-outline','Contests','/contests'],['wallet-outline','Wallet','/wallet'],['account-circle-outline','Profile','/profile']];return <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:8,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:colors.border}}>{items.map(([icon,label,to])=><Pressable key={label} onPress={()=>router.replace(to as never)} style={{alignItems:'center',minWidth:54}}><Icon name={icon as never} size={22} color={active===label?colors.blue:colors.muted}/><Text style={{fontSize:9,fontWeight:'800',color:active===label?colors.blue:colors.muted,marginTop:2}}>{label}</Text></Pressable>)}</View>}
function MatchCentre({id}:{id:string}){const match=matches.find(m=>m.id===id)??matches[0];return <><View style={{backgroundColor:'#fff',borderRadius:20,padding:18,alignItems:'center'}}><Text style={s.sub}>{match.series}</Text><View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',marginTop:16}}><View style={{alignItems:'center',width:100}}><View style={{width:52,height:52,borderRadius:26,backgroundColor:'#DBEAFE',alignItems:'center',justifyContent:'center'}}><Text style={s.playerName}>{match.aShort.slice(0,1)}</Text></View><Text style={[s.playerName,{marginTop:6}]}>{match.aShort}</Text></View><View style={{alignItems:'center'}}><Text style={{color:colors.red,fontSize:11,fontWeight:'900'}}>{match.time}</Text><Text style={{color:colors.muted,fontSize:12,fontWeight:'900',marginTop:6}}>VS</Text></View><View style={{alignItems:'center',width:100}}><View style={{width:52,height:52,borderRadius:26,backgroundColor:'#FEF3C7',alignItems:'center',justifyContent:'center'}}><Text style={s.playerName}>{match.bShort.slice(0,1)}</Text></View><Text style={[s.playerName,{marginTop:6}]}>{match.bShort}</Text></View></View><Text style={[s.sub,{marginTop:15}]}><Icon name="map-marker-outline" size={13} color={colors.muted}/> {match.venue}</Text></View><Notice>Line-ups are sample data. Build your XI locally before the match starts.</Notice><View style={{flexDirection:'row',gap:8}}><View style={{flex:1}}><Button text="Create Team" onPress={()=>push('/fantasy-team/create')}/></View><View style={{flex:1}}><Button secondary text="My Teams" onPress={()=>push('/fantasy-team/preview')}/></View></View><Text style={s.section}>Explore this match</Text><View style={{flexDirection:'row',gap:8}}><Pressable onPress={()=>push('/contest/m1')} style={{backgroundColor:'#fff',borderRadius:15,padding:14,flex:1}}><Icon name="trophy-outline" size={23} color={colors.amber}/><Text style={[s.playerName,{marginTop:7}]}>Contests</Text><Text style={s.sub}>Free & demo leagues</Text></Pressable><Pressable onPress={()=>push('/match/'+id+'/players')} style={{backgroundColor:'#fff',borderRadius:15,padding:14,flex:1}}><Icon name="account-group-outline" size={23} color={colors.blue}/><Text style={[s.playerName,{marginTop:7}]}>Players</Text><Text style={s.sub}>Select your XI</Text></Pressable></View><Button secondary text="Match score & scorecard" onPress={()=>push('/match/m2/live')}/></>}
function Generic(){const {path:raw}=useLocalSearchParams<{path?:string[]}>();const path=(Array.isArray(raw)?raw:[raw]).filter(Boolean).join('/');const isMatchDetail=/^match\/[^/]+$/.test(path);const id=path.split('/')[1]||'m1';const title=path.includes('login')?'Sign in':path.includes('profile')?'Your profile':isMatchDetail?'Match centre':path.includes('captain')?'Captain & VC':path.includes('preview')?'Team preview':path.includes('create')||path.includes('players')?'Create team':path.includes('leaderboard')?'Leaderboard':path.includes('wallet')?'Wallet demo':path.includes('contest')?'Contests':path.includes('live')||path.includes('scorecard')?'Live match':path.includes('profile')?'Your profile':path.includes('notification')?'Notifications':path.includes('match')?'My matches':'ElevenArena';let body:React.ReactNode=path.includes('login')?<LoginScreen/>:path.includes('profile')?<ProfileScreen/>:isMatchDetail?<MatchCentre id={id}/>:path.includes('captain')?<Captain/>:path.includes('preview')?<Preview/>:path.includes('create')||path.includes('players')?<Builder/>:path.includes('leaderboard')?<Leaderboard/>:path.includes('wallet')?<Wallet/>:path.includes('live')||path.includes('scorecard')||path.includes('m2')?<Live/>:path.includes('contest')?<Contests/>:<>{matches.map(m=><Pressable onPress={()=>push('/match/'+m.id)} style={s.match} key={m.id}><Text style={s.playerName}>{m.a} vs {m.b}</Text><Text style={s.sub}>{m.time} · {m.venue}</Text><Button text="Open match" onPress={()=>push('/match/'+m.id)}/></Pressable>)}</>;return <View style={s.page}><Top title={title} caption="INDIA SAMPLE DATA · LOCAL ONLY"/><ScrollView contentContainerStyle={[s.content,{paddingBottom:18}]}>{body}</ScrollView><BottomMenu path={path}/></View>}
export default Generic;
*/
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.canvas },
  top: {
    backgroundColor: colors.navy,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  back: { fontSize: 37, lineHeight: 38, color: "#fff", fontWeight: "300" },
  topTitle: { fontSize: 21, fontWeight: "900", color: "#fff" },
  topCaption: {
    fontSize: 10,
    letterSpacing: 0.7,
    fontWeight: "800",
    color: "#BFDBFE",
    marginTop: 2,
  },
  mark: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: colors.amber,
    alignItems: "center",
    justifyContent: "center",
  },
  markText: { fontWeight: "900", color: colors.navy },
  content: { padding: 16, paddingBottom: 24 },
  tabs: {
    backgroundColor: "#fff",
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 8,
    paddingBottom: 10,
  },
  tab: { alignItems: "center", flex: 1, minWidth: 56 },
  tabLabel: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "800",
    marginTop: 3,
  },
  tabLabelActive: { color: colors.blue },
  notice: {
    backgroundColor: "#FFF7E5",
    borderColor: "#FCD34D",
    borderWidth: 1,
    borderRadius: 13,
    padding: 12,
    flexDirection: "row",
    gap: 9,
    marginBottom: 14,
  },
  noticeIcon: { color: "#B45309", fontSize: 16 },
  noticeText: { color: "#92400E", fontSize: 12, lineHeight: 17, flex: 1 },
  cta: {
    backgroundColor: colors.blue,
    minHeight: 47,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    marginTop: 12,
  },
  ctaText: { color: "#fff", fontWeight: "900", fontSize: 14 },
  secondary: {
    backgroundColor: colors.softBlue,
    borderColor: "#BFDBFE",
    borderWidth: 1,
  },
  secondaryText: { color: colors.blue },
  disabled: { backgroundColor: "#94A3B8" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contest: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 17,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#0F172A",
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  contestTitle: { color: colors.text, fontSize: 16, fontWeight: "900" },
  sub: { color: colors.muted, fontSize: 11, marginTop: 3 },
  chip: {
    color: colors.green,
    backgroundColor: "#DCFCE7",
    fontSize: 10,
    fontWeight: "900",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    overflow: "hidden",
  },
  amber: { color: "#B45309", backgroundColor: "#FEF3C7" },
  amount: { fontWeight: "900", fontSize: 15, color: colors.text, marginTop: 2 },
  progress: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 13,
  },
  progressFill: { height: 6, backgroundColor: colors.blue, borderRadius: 4 },
  builderStat: {
    backgroundColor: colors.navy,
    borderRadius: 18,
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  builderNum: { color: "#fff", fontSize: 21, fontWeight: "900" },
  builderMax: { color: "#93C5FD", fontSize: 14 },
  filters: { flexDirection: "row", gap: 6, marginBottom: 12 },
  filter: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "#E8EEF8",
  },
  filterOn: { backgroundColor: colors.navy },
  filterText: { fontWeight: "800", fontSize: 11, color: colors.muted },
  filterTextOn: { color: "#fff" },
  player: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  playerOn: { borderColor: "#93C5FD", backgroundColor: "#F7FAFF" },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.navy, fontWeight: "900", fontSize: 12 },
  playerName: { fontSize: 14, color: colors.text, fontWeight: "800" },
  credit: { fontWeight: "900", color: colors.text, textAlign: "center" },
  add: {
    color: colors.blue,
    fontWeight: "900",
    fontSize: 21,
    textAlign: "center",
    marginTop: 1,
  },
  foot: {
    fontSize: 10,
    lineHeight: 15,
    color: colors.muted,
    textAlign: "center",
    marginTop: 12,
  },
  captainHero: { backgroundColor: colors.navy, borderRadius: 20, padding: 20, alignItems: "center", marginBottom: 14 },
  captainTitle: { color: "#fff", fontSize: 18, fontWeight: "900", marginTop: 8 },
  captainText: { color: "#BFDBFE", fontSize: 12, textAlign: "center", marginTop: 4 },
  choice: { minHeight: 40, minWidth: 40, borderRadius: 20, borderWidth: 1, borderColor: "#BFDBFE", alignItems: "center", justifyContent: "center", marginLeft: 8 },
  choiceActive: { backgroundColor: colors.blue, borderColor: colors.blue },
  viceChoiceActive: { backgroundColor: colors.amber, borderColor: colors.amber },
  choiceText: { color: colors.blue, fontSize: 11, fontWeight: "900" },
  choiceTextActive: { color: "#fff" },
  previewHeader: { backgroundColor: colors.navy, borderRadius: 20, padding: 20, marginBottom: 14 },
  previewTitle: { color: "#fff", fontSize: 20, fontWeight: "900" },
  previewText: { color: "#BFDBFE", fontSize: 12, marginTop: 4 },
  captainBadge: { color: "#fff", backgroundColor: colors.blue, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 5, fontSize: 10, fontWeight: "900" },
  viceBadge: { color: colors.navy, backgroundColor: colors.amber, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 5, fontSize: 10, fontWeight: "900" },
  balance: {
    backgroundColor: colors.navy,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  big: { fontSize: 30, color: "#fff", fontWeight: "900", marginTop: 6 },
  balanceRow: { flexDirection: "row", gap: 20, marginTop: 14 },
  balanceItem: { color: "#BFDBFE", fontSize: 12, fontWeight: "700" },
  actionRow: { flexDirection: "row", gap: 10 },
  section: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
    marginTop: 24,
    marginBottom: 10,
  },
  transaction: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  txIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
  },
  green: { color: colors.green, fontWeight: "900", fontSize: 12 },
  score: {
    backgroundColor: colors.navy,
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    marginBottom: 12,
  },
  scoreTeam: { color: "#BFDBFE", fontWeight: "900", fontSize: 14 },
  scoreRuns: { color: "#fff", fontWeight: "900", fontSize: 39, marginTop: 5 },
  scoreOver: { color: colors.amber, fontWeight: "800", fontSize: 13 },
  target: { color: "#BFDBFE", fontSize: 12, marginTop: 9 },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 13,
  },
  stat: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    flex: 1,
    alignItems: "center",
  },
  statN: { fontSize: 18, fontWeight: "900", color: colors.text },
  simpleCard: {
    backgroundColor: "#fff",
    borderRadius: 17,
    padding: 16,
    marginBottom: 10,
  },
  profile: {
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
    marginBottom: 14,
  },
  profileAvatar: {
    height: 74,
    width: 74,
    borderRadius: 37,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  profileA: { fontWeight: "900", fontSize: 21, color: "#fff" },
  profileName: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    marginTop: 9,
  },
  menu: {
    backgroundColor: "#fff",
    padding: 17,
    borderRadius: 14,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: { color: colors.blue, fontWeight: "900", fontSize: 15 },
  authHero: {
    backgroundColor: colors.navy,
    padding: 22,
    borderRadius: 20,
    marginBottom: 4,
  },
  heroTitle: { fontSize: 27, lineHeight: 33, fontWeight: "900", color: "#fff" },
  authText: { color: "#BFDBFE", fontSize: 13, lineHeight: 19, marginTop: 9 },
  input: {
    backgroundColor: "#fff",
    borderColor: colors.border,
    borderRadius: 13,
    borderWidth: 1,
    color: colors.text,
    height: 50,
    marginTop: 4,
    paddingHorizontal: 14,
  },
  otpInput: { fontSize: 20, letterSpacing: 8, textAlign: "center" },
});
/* Legacy duplicate style sheet. */
