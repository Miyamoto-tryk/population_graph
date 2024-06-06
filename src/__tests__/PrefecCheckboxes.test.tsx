import React, { act } from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByLabelText,
} from "@testing-library/react";
import { PrefecCheckboxes } from "../components/PrefecCheckboxes";
import { fetchPrefec, fetchCompos } from "../api/fetcher";
import TestRender from "react-test-renderer";
import "@testing-library/jest-dom";

import { GraphData, PrefecName, PrefectureInfo } from "../types";

// fetchPrefecをモック
jest.mock("../api/fetcher");

// モックデータ
const mockGraphData: GraphData[] = [];
const mockSelectedPrefec: PrefecName[] = [];
const mockSetGraphData = jest.fn();
const mockSetSelectedPrefec = jest.fn();

const mockPrefecInfo: PrefectureInfo[] = [
  { prefecture: { prefCode: 1, prefName: "北海道" }, isSelected: false },
  { prefecture: { prefCode: 2, prefName: "青森県" }, isSelected: false },
];

describe("Prefectures Component", () => {
  beforeEach(() => {
    // モックをリセット
    jest.clearAllMocks();
  });

  test("PrefecCheckboxes matches snapshot", () => {
    const component = TestRender.create(
      <PrefecCheckboxes
        graphData={mockGraphData}
        selectedPrefec={mockSelectedPrefec}
        setGraphData={mockSetGraphData}
        setSelectedPrefec={mockSetSelectedPrefec}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders loading message initially", async () => {
    (fetchPrefec as jest.Mock).mockResolvedValue([]);

    waitFor(() => {
      render(
        <PrefecCheckboxes
          graphData={[]}
          selectedPrefec={[]}
          setGraphData={mockSetGraphData}
          setSelectedPrefec={mockSetSelectedPrefec}
        />
      );
    });

    expect(screen.getByText("都道府県を取得中...")).toBeInTheDocument();
  });

  it("renders prefecture list after fetch", async () => {
    (fetchPrefec as jest.Mock).mockResolvedValue([
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ]);
    const mockSetPrefec = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [[], mockSetPrefec]);

    render(
      <PrefecCheckboxes
        graphData={[]}
        selectedPrefec={[]}
        setGraphData={mockSetGraphData}
        setSelectedPrefec={mockSetSelectedPrefec}
      />
    );

    await waitFor(() => expect(mockSetPrefec).toHaveBeenCalledTimes(1));
    expect(mockSetPrefec).toHaveBeenCalledWith(mockPrefecInfo);
  });

  it("updates selection state when checkbox is clicked", async () => {
    //fetchPrefecのモック
    (fetchPrefec as jest.Mock).mockResolvedValue([
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ]);
    //fetchComposのモック
    (fetchCompos as jest.Mock).mockResolvedValue([
      {
        label: "総人口",
        data: [
          { year: 1960, value: 9683802 },
          { year: 1965, value: 10869244 },
        ],
      },
    ]);
    const mockNewPrefecInfo: PrefectureInfo[] = [
      { prefecture: { prefCode: 1, prefName: "北海道" }, isSelected: true },
      { prefecture: { prefCode: 2, prefName: "青森県" }, isSelected: false },
    ];
    // useStateのモック作成
    const mockUseState = jest.spyOn(React, "useState");
    const mockSetPrefecInfo = jest.fn();
    mockUseState.mockImplementation(() => [mockPrefecInfo, mockSetPrefecInfo]);

    render(
      <PrefecCheckboxes
        graphData={[]}
        selectedPrefec={[]}
        setGraphData={mockSetGraphData}
        setSelectedPrefec={mockSetSelectedPrefec}
      />
    );
    await waitFor(async () => {
      expect(mockSetPrefecInfo).toHaveBeenCalledTimes(1);
    });
    // await waitFor(() =>
    //   expect(screen.getByText("都道府県を取得中...")).not.toBeInTheDocument()
    // );

    await waitFor(async () => {
      const checkbox = (await screen.getByText("北海道")) as HTMLInputElement;
      await act(async () => {
        fireEvent.click(checkbox);
      });
      expect(mockSetPrefecInfo).toHaveBeenCalledWith(mockNewPrefecInfo);
      expect(mockSetSelectedPrefec).toHaveBeenCalled();
      expect(mockSetGraphData).toHaveBeenCalled();
    });
  });
});
