This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## ディレクトリ構造

```bash
.
├── README.md
├── jest.config.js
├── next-env.d.ts
├── next.config.mjs
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── **tests**　　#テスト用フォルダ
│   │   ├── PrefecCheckboxes.test.tsx
│   │   ├── **snapshots**
│   │   └── fetcher.test.tsx
│   ├── api
│   │   └── fetcher.tsx # API リクエストを行う関数をまとめた
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.module.css
│   │   └── page.tsx 　　　　　　#　コンポーネントをまとめて表示する
│   ├── components #　コンポーネントフォルダ
│   │   ├── DisplayGraph.tsx #　グラフ描画コンポーネント
│   │   ├── PrefecCheckboxes.tsx 　#　チェクボックス作成コンポーネント
│   │   └── SetLabelButton.tsx 　 #　表示切り替えボタンコンポーネント
│   ├── data_controller 　 #　 components 中で使用する少し長い関数など
│   │   ├── colorPrefecMap.ts 　 #　グラフの色を管理
│   │   ├── extractLabelData.ts 　 #　グラフに表示するデータを抽出する
│   │   ├── getGraphData.ts 　　 #　都道府県の人口構成データをフェッチ/削除を行う
│   │   └── getSelectedPrefec.ts 　#　表示中の都道府県名を追加/削除を行う
│   └── types.tsx 　　　　　　　　　#　型定義ファイル
├── test
│   ├── setupTests.ts
│   └── tsconfig.jest.json
└── tsconfig.json
```
