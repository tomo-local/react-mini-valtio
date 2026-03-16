# react-mini-valtio

[valtio](https://github.com/pmndrs/valtio) の核となる仕組みを最小限のコードで再実装した学習用プロジェクトです。

[zenn](https://zenn.dev/tomo_local/articles/react-mini-valtio)

## 概要

`Proxy` と React の `useSyncExternalStore` を使い、valtio スタイルのリアクティブな状態管理を約50行で実現しています。

### 提供する API

| API | 説明 |
|-----|------|
| `proxy(obj)` | オブジェクトをリアクティブな Proxy でラップする |
| `subscribe(proxyObj, callback)` | プロパティ変更時にコールバックを呼ぶ |
| `useSnapshot(proxyObj)` | React コンポーネント内でスナップショットを取得する Hook |

## 使い方

```ts
import { proxy, useSnapshot } from './mini-valtio';

// ストアを作成
const state = proxy({ count: 0, text: 'Hello' });

// コンポーネント内で使用
const Counter = () => {
  const snap = useSnapshot(state);
  return (
    <div>
      <p>Count: {snap.count}</p>
      <button onClick={() => state.count++}>Increment</button>
    </div>
  );
};
```

## セットアップ

```bash
npm install
npm run dev
```

## スクリプト

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | TypeScript チェック & プロダクションビルド |
| `npm run preview` | ビルド結果をプレビュー |

## 技術スタック

- React 18
- TypeScript
- Vite
