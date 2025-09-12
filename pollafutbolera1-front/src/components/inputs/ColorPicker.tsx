"use client";
import * as React from "react";

interface ColorPickerProps {
  onChange: (color: string) => void;
  value?: string;
  initialColor?: string;
}

export function ColorPicker({ onChange, value, initialColor }: ColorPickerProps) {
  const [color, setColor] = React.useState(value || initialColor || "#FF0000");

  React.useEffect(() => {
    if (value && value !== color) {
      setColor(value);
    }
  }, [value]);

  React.useEffect(() => {
    onChange(color);
  }, [color]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="flex items-center">
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-12 h-12 border-none rounded cursor-pointer"
      />
      <span className="ml-4 text-gray-700">{color}</span>
    </div>
  );
}
