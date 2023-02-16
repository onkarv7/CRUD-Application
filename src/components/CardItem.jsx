import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import "./Home.css"

export default function CardItem({ item }) {
  return (
    <Box className="main">
      <Card className="cards">
        <CardContent>
          <Box display="flex">
            <CardMedia className="img" image={item.icon_url} alt={item.title} />
            <Box ml="16px">
              <Typography className="title">
                {item.title}
              </Typography>
              <Typography  className="sub-title ">
                Cloud Services
              </Typography>
            </Box>
          </Box>
          <Typography className="link" sx={{mt:"20px" , mb:"8px"}} >
            {item.link}
          </Typography>
          <Typography className="description" >
            {item.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
// export default CardItem;
