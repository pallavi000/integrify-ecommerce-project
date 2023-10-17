// MUI
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// component props type
type BreadCrumbProps = { label: string };

function BreadCrumb({ label }: BreadCrumbProps) {
  const breadcrumbs = [
    <Link color="inherit" to="/">
      Home
    </Link>,
    <Typography color="text.primary">{label}</Typography>,
  ];
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default BreadCrumb;
