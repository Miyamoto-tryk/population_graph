import { DisplayData, DisplayLabel } from "@/types";
import { Dispatch, SetStateAction } from "react";
import styles from "@/app/page.module.css";

type Props = {
  setDisplayLabel: Dispatch<SetStateAction<DisplayLabel>>;
};

//ラベルの種類
const displayLabels: DisplayLabel[] = [
  "総人口",
  "年少人口",
  "生産年齢人口",
  "老年人口",
];

//ボタンを表示
const SetLabelButton = ({ setDisplayLabel }: Props) => {
  const handleClick = (label: DisplayLabel) => {
    //ボタンが押されたらラベルを設定
    setDisplayLabel(label);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {/* ボタンを並べる */}
        {displayLabels.map((label: DisplayLabel) => (
          <div key={label} dir="column">
            <button onClick={() => handleClick(label)}>{label}</button>{" "}
          </div>
        ))}
      </div>
    </>
  );
};

export default SetLabelButton;
