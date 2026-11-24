import { useEffect, useState } from 'react';

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  url?: string;
  assets?: {
    large_image?: string;
    small_image?: string;
  };
  application_id?: string;
}

export interface LanyardSpotify {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    global_name: string | null;
    display_name?: string | null;
    avatar: string | null;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web?: boolean;
  active_on_discord_desktop?: boolean;
  active_on_discord_mobile?: boolean;
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
}

export function getDiscordAvatarUrl(
  userId: string,
  avatarHash: string | null | undefined
): string | null {
  if (!avatarHash) return null;
  const ext = avatarHash.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}?size=512`;
}

export function useLanyard(userIds: string[]) {
  const [dataById, setDataById] = useState<Record<string, LanyardData>>({});
  const [loading, setLoading] = useState(true);

  const idsKey = userIds.join(',');

  useEffect(() => {
    let active = true;
    const ids = idsKey.split(',').filter(Boolean);
    if (ids.length === 0) return;

    // 1. Immediate REST fetch for fast initial render
    Promise.all(
      ids.map(async (id) => {
        try {
          const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
          if (!res.ok) return null;
          const json = (await res.json()) as { success: boolean; data?: LanyardData };
          if (json.success && json.data) {
            return [id, json.data] as const;
          }
          return null;
        } catch {
          return null;
        }
      })
    ).then((results) => {
      if (!active) return;
      const next: Record<string, LanyardData> = {};
      for (const entry of results) {
        if (entry) next[entry[0]] = entry[1];
      }
      if (Object.keys(next).length > 0) {
        setDataById((prev) => ({ ...prev, ...next }));
      }
      setLoading(false);
    });

    // 2. Live WebSocket subscription for real-time updates
    let ws: WebSocket | null = null;
    let heartbeatTimer: number | null = null;
    let reconnectTimer: number | null = null;

    const connect = () => {
      if (!active) return;
      if (reconnectTimer) {
        window.clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      try {
        ws = new WebSocket('wss://api.lanyard.rest/socket');

        ws.onmessage = (event) => {
          if (!active) return;
          try {
            const msg = JSON.parse(event.data as string) as {
              op: number;
              t?: string;
              d?: any;
            };

            if (msg.op === 1 && msg.d?.heartbeat_interval) {
              ws?.send(
                JSON.stringify({
                  op: 2,
                  d: { subscribe_to_ids: ids },
                })
              );

              if (heartbeatTimer) window.clearInterval(heartbeatTimer);
              heartbeatTimer = window.setInterval(() => {
                if (ws?.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ op: 3 }));
                }
              }, msg.d.heartbeat_interval);
            } else if (msg.op === 0) {
              if (msg.t === 'INIT_STATE' && msg.d) {
                setDataById((prev) => ({ ...prev, ...(msg.d as Record<string, LanyardData>) }));
                setLoading(false);
              } else if (msg.t === 'PRESENCE_UPDATE' && msg.d?.discord_user?.id) {
                const updated = msg.d as LanyardData;
                setDataById((prev) => ({
                  ...prev,
                  [updated.discord_user.id]: updated,
                }));
              }
            }
          } catch {
            // Ignore malformed socket frames
          }
        };

        ws.onerror = () => {
          ws?.close();
        };

        ws.onclose = () => {
          if (heartbeatTimer) {
            window.clearInterval(heartbeatTimer);
            heartbeatTimer = null;
          }
          if (active) {
            reconnectTimer = window.setTimeout(connect, 5000);
          }
        };
      } catch {
        // Fallback relies on initial REST fetch
      }
    };

    connect();

    return () => {
      active = false;
      if (heartbeatTimer) window.clearInterval(heartbeatTimer);
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      if (
        ws &&
        (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)
      ) {
        ws.close();
      }
    };
  }, [idsKey]);

  return { dataById, loading };
}
