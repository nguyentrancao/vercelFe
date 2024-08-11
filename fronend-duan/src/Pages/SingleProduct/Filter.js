import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const ColorFilter = ({ colors, applyFilter }) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorClick = (color) => {
    applyFilter(color);
    setSelectedColor(color);
  };

  return (
    <div>
      {colors.map((color) => (
        <Button
          key={color}
          onClick={() => handleColorClick(color)}
          bg={selectedColor === color ? "#22a8ff" : color}
          color={selectedColor === color ? "white" : "black"}
          borderRadius="10px"
          fontSize="lg"
          variant="outline"
          p={6}
          _hover={
            !selectedColor || selectedColor === color
              ? { backgroundColor: "#22a8ff" }
              : {}
          }
          style={{ marginRight: "10px", marginBottom: "10px" }}
        >
          {color}
        </Button>
      ))}
    </div>
  );
};
const RamFilter = ({ rams, applyFilter }) => {
  const [selectedRam, setSelectedRam] = useState("");

  const handleRamClick = (ram) => {
    applyFilter(ram);
    setSelectedRam(ram);
  };

  return (
    <div>
      {rams.map((ram) => (
        <Button
          key={ram}
          onClick={() => handleRamClick(ram)}
          bg={selectedRam === ram ? "#22a8ff" : "white"}
          color={selectedRam === ram ? "white" : "black"}
          borderRadius="10px"
          fontSize="md"
          variant="outline"
          p={6}
          _hover={
            !selectedRam || selectedRam === ram
              ? { backgroundColor: "#22a8ff" }
              : {}
          }
          style={{ marginRight: "10px", marginBottom: "10px" }}
        >
          {ram}
        </Button>
      ))}
    </div>
  );
};
const StorageValueFilter = ({ storageValues, applyFilter }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueClick = (value) => {
    applyFilter(value);
    setSelectedValue(value);
  };

  return (
    <div>
      {storageValues.map((value) => (
        <Button
          key={value}
          onClick={() => handleValueClick(value)}
          bg={selectedValue === value ? "#22a8ff" : "white"}
          color={selectedValue === value ? "white" : "black"}
          borderRadius="10px"
          fontSize="md"
          variant="outline"
          p={6}
          _hover={
            !selectedValue || selectedValue === value
              ? { backgroundColor: "#22a8ff" }
              : {}
          }
          style={{ marginRight: "10px", marginBottom: "10px" }}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};

export { ColorFilter, StorageValueFilter, RamFilter };
