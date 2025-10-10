import { useEffect, useRef, useState } from "react";
import {
  ref,
  onValue,
  onDisconnect,
  serverTimestamp,
  set,
} from "firebase/database";
import { realtimeDB } from "@/firebase"; 


export const useActiveSessions = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(count);

  useEffect(() => {
    const sessionId = Math.random().toString(36).substring(2);
    const sessionRef = ref(realtimeDB, `activeSessions/${sessionId}`);

    set(sessionRef, { connectedAt: serverTimestamp() });
    onDisconnect(sessionRef).remove();

    const activeRef = ref(realtimeDB, "activeSessions");
    const unsubscribe = onValue(activeRef, (snapshot) => {
      const data = snapshot.val();
      const newCount = data ? Object.keys(data).length : 0;
      
      // Обновляем только если значение изменилось
      if (newCount !== prevCountRef.current) {
        prevCountRef.current = newCount;
        setCount(newCount);
      }
    });

    return () => {
      unsubscribe();
      set(sessionRef, null).catch(console.error);
    };
  }, []);

  return count;
};
