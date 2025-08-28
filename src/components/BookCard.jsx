import { Button, Card, Typography } from "@mui/joy";
import { Rating } from "@mui/material";
function BookCard({ item }) {

    return (
        <div>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "12px",
                    margin: "0 10px",
                    borderRadius: "12px",
                    backgroundColor: "#EEF2FF",

                    transition: "transform 0.3s, border 0.3s",
                    "&:hover": {
                        transform: "translateY(-2px)",
                    },
                    "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
                    cursor: "pointer",
                }}
            >
                <img
                    style={{ minWidth: "180px", borderRadius: "8px" }}
                    src={item.image}
                    alt=""
                />
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
                <Typography sx={{}}>{item.description}</Typography>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        color: "#4F46E5",
                    }}
                >
                    {item.price} so'm
                </Typography>
                <Rating
                    sx={{ color: "#84CC16" }}
                    value={Number(String(item.price)[0])}
                    name="read-only"
                    readOnly
                />
                <Button onClick={function () { }} variant="solid">
                    Add to cart
                </Button>{" "}
            </Card>
        </div>
    );
}

export default BookCard;
