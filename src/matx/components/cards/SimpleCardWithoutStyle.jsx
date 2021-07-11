import React from "react";
import { Card } from "@material-ui/core";
import { classList } from "utils";

const SimpleCard = ({ children, title, subtitle, icon }) => {
  return (
    <Card elevation={6} className="px-2 py-2 h-full">
      <div
        className={classList({
          "card-title": true,
        })}
      >
        {title}
      </div>
      {subtitle && <div className="card-subtitle">{subtitle}</div>}
      {children}
    </Card>
  );
};

export default SimpleCard;
