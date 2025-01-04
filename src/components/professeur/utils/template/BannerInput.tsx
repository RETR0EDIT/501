import React from "react";

interface BannerInputProps {
  handleBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BannerInput: React.FC<BannerInputProps> = ({ handleBannerChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="banner">Bannière test</label>
      <input
        type="file"
        id="banner"
        accept="image/*"
        onChange={handleBannerChange}
        className="form-control"
      />
    </div>
  );
};

export default BannerInput;
