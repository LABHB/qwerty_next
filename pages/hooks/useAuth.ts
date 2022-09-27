import axios from "axios";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser";
import { useRouter } from 'next/router';

export const useAuth = () => {
  const router = useRouter();
  const { showMessage } = useMessage();

  // ここの分割代入が機能していない！
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);
  const login = useCallback(
    (id) => {
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            const isAdmin = res.data.id === 10 ? true : false;
            setLoginUser({ ...res.data, isAdmin });
            // showMessage({ title: "ログインしました", status: "success" });
            showMessage({ title: "ログインしました", status: "info" });
            router.push("/home");
          } else {
            showMessage({ title: "ユーザーは見つかりません", status: "error" });
          }
        })
        .catch(() =>
          showMessage({ title: "ログインできません", status: "error" })
        )
        .finally(() => setLoading(false));
    },
    [showMessage ]
  );
  return { login, loading };
};
