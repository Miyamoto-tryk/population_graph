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
});
