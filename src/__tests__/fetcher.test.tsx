import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchPrefec, fetchCompos } from "../api/fetcher";
import fetch from "jest-fetch-mock";

describe("fetchPrefec", () => {
  // 全てのテストが完了した後にfetchのモックをクリアする
  afterAll(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test("fetches prefectures data from API", async () => {
    // fetchのモックをグローバルに設定する。
    // これでfetchは、テスト中このモックに差し替えられる
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        result: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
          // 他の都道府県のデータも追加
        ],
      }),
    });

    const prefectures = await fetchPrefec();
    console.log(prefectures);
    expect(prefectures[0]).toHaveProperty("prefCode"); // 都道府県オブジェクトがprefCodeプロパティを持つことを確認
    //TODO: 他の期待値の確認
  });
});

describe("fetchCompos", () => {
  // 全てのテストが完了した後にfetchのモックをクリアする
  afterAll(() => {
    (global.fetch as jest.Mock).mockClear();
  });
  test("fetches population composition data for a prefecture from API", async () => {
    // fetchのモックをグローバルに設定する。
    // これでfetchは、テスト中このモックに差し替えられる
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        result: {
          data: [
            {
              label: "総人口",
              data: [
                { year: 1960, value: 9683802 },
                { year: 1965, value: 10869244 },
              ],
            },
            {
              label: "年少人口",
              data: [
                { year: 1960, value: 9683802 },
                { year: 1965, value: 10869244 },
              ],
            },
          ],
        },
      }),
    });

    const prefCode = 13; // 東京都のコード
    const compos = await fetchCompos(prefCode);
    expect(compos).toHaveLength(2);
    expect(compos[0]).toHaveProperty("data"); // データが含まれることを確認
    expect(compos[0]).toHaveProperty("label"); //"総人口"などのラベルを持つことを確認
    // TODO:他の期待値の確認...
  });

  test("throws error for invalid prefecture code", async () => {
    const invalidPrefCode = 0; // 不正な都道府県コード
    await expect(fetchCompos(invalidPrefCode)).rejects.toThrowError(
      "prefecture code が不正です"
    );
  });
});
