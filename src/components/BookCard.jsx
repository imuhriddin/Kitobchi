import { Button, Card, Typography } from "@mui/joy";
import { Rating } from "@mui/material";
function BookCard({ item }) {
  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "10px",
        //   margin: "10px 10px",
          borderRadius: "12px",
          backgroundColor: "#EEF2FF",
          minHeight: "450px",
          maxWidth: "450px",

          transition: "scale 0.4s",
          "&:hover": {
            // transform: "translateY(-4px)",
            scale: '1.03'
          },
          "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
          cursor: "pointer",
        }}
      >
        <div className="flex flex-col items-center">
          <img
            style={{ maxWidth: "190px", borderRadius: "8px" }}
            src={item.image}
            alt=""
          />
          <div className="mt-2">
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              sx={{
                color: "#818CF8",
              }}
            >
              {item.author}
            </Typography>
            {/* <Typography sx={{ fontSize: "0.9rem" }}>
              {item.description}
            </Typography> */}
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.1rem",
                color: "#4F46E5",
                marginTop:'5px'
              }}
            >
              {item.price} so'm
            </Typography>
            <Rating
              sx={{ color: "#84CC16", marginTop: '5px' }}
              value={Number(String(item.price)[0])}
              name="read-only"
              readOnly
            />
          </div>
        </div>
        <Button onClick={function () {}} variant="solid">
          Add to cart
        </Button>
      </Card>
    </div>
  );
}

export default BookCard;
