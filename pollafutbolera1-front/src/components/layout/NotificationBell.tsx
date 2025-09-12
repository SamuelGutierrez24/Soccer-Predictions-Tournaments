import { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { useCurrentUser } from "@/src/hooks/auth/userCurrentUser";
import axios from "axios";
import { getAuthorizationHeader } from "@/src/apis/getAuthorizationHeader";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/pollafutbolera";
}

interface Notification {
  id: number;
  content: string;
  timestamp: string;
  read: boolean;
}

interface PageInfo {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export default function NotificationBell() {
  const { user } = useCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(1);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const initialFetchCompleted = useRef(false);

  useEffect(() => {
    if (!user?.userId) {
      return;
    }
    
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const url = `${getBaseUrl()}/notifications/user/${user.userId}?page=${page}&size=${size}`;
        const headers = getAuthorizationHeader();
        const res = await axios.get(url, { headers });
        setNotifications(res.data?._embedded?.notificationDTOList || []);
        setPageInfo(res.data.page);
      } catch (err) {
        console.error("[NotificationBell] Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
    initialFetchCompleted.current = true;
  }, [user, page, size]);

  useEffect(() => {
    if (!user?.userId) return;
    
    const fetchUnreadCount = async () => {
      try {
        const url = `${getBaseUrl()}/notifications/user/${user.userId}/unread/count`;
        const headers = getAuthorizationHeader();
        const res = await axios.get(url, { headers });
        setUnreadCount(res.data);
      } catch (err) {
        console.error("[NotificationBell] Error fetching unread count:", err);
      }
    };
    
    fetchUnreadCount();
  }, [user, notifications]);

  const maxPageSize = pageInfo ? Math.min(10, pageInfo.totalElements) : 10;
  const pageSizeOptions = Array.from({ length: maxPageSize }, (_, i) => i + 1);

  return (
    <div className="relative">
      <button
        className="group relative focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setShowDropdown((s) => !s)}
        aria-label="Notificaciones"
      >
        <Bell className="w-7 h-7 text-primary transition-transform duration-150 group-hover:scale-110" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow-lg animate-pulse" style={{ letterSpacing: '0.04em' }}>{unreadCount}</span>
        )}
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-2xl z-50 p-0 border border-gray-200 animate-fadeIn">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
            <span className="font-bold text-lg text-primary">Notificaciones</span>
            <button
              className="text-xs px-3 py-1 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              disabled={unreadCount === 0}
              onClick={async () => {
                if (!user?.userId) return;
                try {
                  const url = `${getBaseUrl()}/notifications/user/${user.userId}/read`;
                  const headers = getAuthorizationHeader();
                  await axios.put(url, {}, { headers });
                  setNotifications(ns => ns.map(n => ({ ...n, read: true })));
                } catch (err) {
                  console.error("[NotificationBell] Error marking all as read:", err);
                }
              }}
            >
              Marcar todas como leídas
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto px-3 py-2 divide-y divide-gray-100">
            {loading && <div className="text-gray-400 py-5 text-center">Cargando...</div>}
            {!loading && notifications.length === 0 && <div className="text-gray-500 py-5 text-center">Sin notificaciones</div>}
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex flex-col gap-1 py-3 px-2 rounded-xl transition-all mb-1 cursor-pointer ${notif.read ? 'bg-gray-50 text-gray-400' : 'bg-blue-50 border-l-4 border-blue-400 font-semibold shadow-sm hover:bg-blue-100'}`}
                tabIndex={0}
              >
                <div className="text-base text-gray-900">{notif.content}</div>
                <div className="text-xs text-gray-400">{new Date(notif.timestamp).toLocaleString()}</div>
                {!notif.read && (
                  <button
                    className="ml-auto px-2 py-0.5 text-xs bg-green-200 rounded hover:bg-green-300 font-semibold transition"
                    onClick={async () => {
                      try {
                        const url = `${getBaseUrl()}/notifications/${notif.id}/read`;
                        const headers = getAuthorizationHeader();
                        await axios.put(url, {}, { headers });
                        setNotifications(ns => ns.map(n => n.id === notif.id ? { ...n, read: true } : n));
                      } catch (err) {
                        console.error("[NotificationBell] Error marking notification as read:", err);
                      }
                    }}
                  >
                    Marcar como leída
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3 px-5 pb-3">
            <div className="flex items-center gap-2">
              <label className="text-xs">Tamaño:</label>
              <select
                className="border rounded px-2 py-1 text-xs font-semibold bg-white shadow"
                value={size}
                onChange={e => {
                  setSize(Number(e.target.value));
                  setPage(0);
                }}
              >
                {pageSizeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium transition"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={pageInfo ? pageInfo.number === 0 : page === 0}
              >
                Anterior
              </button>
              <span className="text-xs">
                Página {pageInfo ? pageInfo.number + 1 : page + 1} de {pageInfo ? pageInfo.totalPages : 1}
              </span>
              <button
                className="px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium transition"
                onClick={() => setPage((p) => (pageInfo && pageInfo.number < pageInfo.totalPages - 1 ? p + 1 : p))}
                disabled={pageInfo ? pageInfo.number >= pageInfo.totalPages - 1 : true}
              >
                Siguiente
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2 px-5 pb-3">
            <button
              className="text-xs px-3 py-1 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              disabled={notifications.filter(n => !n.read).length === 0}
              onClick={async () => {
                if (!user?.userId) return;
                try {
                  const ids = notifications.filter(n => !n.read).map(n => n.id);
                  const url = `${getBaseUrl()}/notifications/user/${user.userId}/read/batch`;
                  const headers = getAuthorizationHeader();
                  await axios.put(url, ids, { headers });
                  setNotifications(ns => ns.map(n => ({ ...n, read: true })));
                } catch (err) {
                  console.error("[NotificationBell] Error marking batch as read:", err);
                }
              }}
            >
              Marcar página como leídas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}