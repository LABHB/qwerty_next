import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import '../firebase' // Initialize FirebaseApp

/**
 * useAuthState フックの戻り値の型。
 */
export type AuthState = {
  isSignedIn: boolean
  isLoading: boolean
  userId: string | undefined
  userEmail: string | undefined
  userName: string | undefined
  avatarUrl: string | undefined
}

/**
 * useAuthState が返す初期値。
 * Next.js のサーバーサイドレンダリング時もこの値になる。
 */
const INITIAL_AUTH_STATE: AuthState = {
  isSignedIn: false,
  isLoading: true,
  userId: undefined,
  userEmail: undefined,
  userName: undefined,
  avatarUrl: undefined,
}

/**
 * ユーザーのサインイン状態を取得するためのカスタムフック。
 */
export function useAuthState(): AuthState {
  const [authState, setAuthState] = useState(INITIAL_AUTH_STATE)

  // サインイン状態の変化を監視する
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setAuthState({
          isSignedIn: true,
          isLoading: false,
          userId: user.uid,
          userEmail: user.email,
          userName: user.displayName || undefined,
          avatarUrl: user.photoURL || undefined,
        })
      } else {
        setAuthState({ ...INITIAL_AUTH_STATE, isLoading: false })
      }
    })

    // ページ遷移時にサインイン状態の監視を解除
    return () => unsubscribe()
  }, [])

  return authState
}