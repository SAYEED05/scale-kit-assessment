import React from "react";
import { MEASUREMENT_SYSTEMS } from "../../utils/constants";
import { LabelValueObj } from "../../types";
import { useData } from "../../Provider/DataProvider";

const MeasurementSystemSelect = () => {
  const { setCurrentMeasurementSystem } = useData();
  return (
    <div className="metric__select">
      <div>
        <label htmlFor="measurement_system">Unit:</label>
      </div>
      <select
        name="measurement_system"
        id="measurement_system"
        defaultValue={MEASUREMENT_SYSTEMS[0].value}
        onChange={(e) => setCurrentMeasurementSystem(e.target.value)}
      >
        {MEASUREMENT_SYSTEMS.map((item: LabelValueObj) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MeasurementSystemSelect;
