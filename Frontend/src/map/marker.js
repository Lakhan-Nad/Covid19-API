import React from "react";
import * as CONSTANTS from "../helpers/constant";

function Marker({ properties, key, $hover }) {
  return (
    <>
      <div
        key={"marker-" + properties.cluster + "-" + key}
        style={{
          fontSize: "16px",
          fontWeight: "bolder",
          height: "2em",
          width: "2em",
          position: "relative",
          borderRadius: "50%",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: properties.cluster ? "pointer" : "hand",
          background:
            properties.status === CONSTANTS.MIXED
              ? CONSTANTS.M_COLOR
              : CONSTANTS.selectColor(properties.status),
        }}
      >
        <span>{properties.count}</span>
      </div>
      {$hover && (
        <div
          style={{
            zIndex: "2",
            display: "inline-flex",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            width: "8em",
            background: "#fff",
            fontSize: "17px",
            transform: "translateX(-38%) translateY(12%)",
          }}
        >
          <span
            style={{
              zIndex: "-1",
              width: "0.8em",
              height: "0.8em",
              position: "absolute",
              left: "50%",
              top: "0",
              transformOrigin: "100% 100%",
              transform: "translateY(-37%) translateX(-100%) rotate(45deg)",
              background: "#fff",
            }}
          />
          <span style={{ fontWeight: "bold", color: CONSTANTS.R_COLOR }}>
            Recovered: {properties.recovered}
          </span>
          <span style={{ fontWeight: "bold", color: CONSTANTS.A_COLOR }}>
            Active: {properties.active}
          </span>
          <span style={{ fontWeight: "bold", color: CONSTANTS.D_COLOR }}>
            Died: {properties.died}
          </span>
        </div>
      )}
    </>
  );
}

export default Marker;
