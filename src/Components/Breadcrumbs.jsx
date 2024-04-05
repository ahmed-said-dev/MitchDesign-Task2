import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

const Breadcrumbs = () => {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb" separator=">" sx={{ pt: 3 }}>
      <a href="#/" className="breadcrumb-item">
        الرئيسية
      </a>

      <span className="breadcrumb-item">قسم الحلويات</span>
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
