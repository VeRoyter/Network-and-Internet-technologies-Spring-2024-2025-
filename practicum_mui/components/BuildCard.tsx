import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ComponentProps {
    building: {
        img: string,
        title: string,
        description: string[],
    };
    index: number;
}

const StyledTypography = styled(Typography)(({theme})=>({
    color: 'text.secondary',
    textAlign:'justify',
    'p': {marginTop: "16px" }
}))


function BuildCard({ building,index} : ComponentProps) {
    return (
        <Card sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }
        }}>

        <Box sx={{ display: index %2 != 0 ? 'flex' : 'none' }}>   
            <CardMedia
            component="img"
            alt={ building.title }
            image={ building.img }
            />     
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        { building.title }
                    </Typography>
                    <StyledTypography>
                        { building.description.map((item, ind) => (
                        <Typography key={ind} variant="body2">
                            { item }
                        </Typography>
                        ))}
                    </StyledTypography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'end'}} >
                    <Button size="small">Подробнее</Button>
                </CardActions>
            </Box>
            
        </Box>

        <Box sx={{ display: index %2 === 0 ? 'flex' : 'none' }}>        
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        { building.title }
                    </Typography>
                    <StyledTypography>
                        { building.description.map((item, ind) => (
                            <Typography key={ind} variant="body2">
                                { item }
                            </Typography>
                        ))}
                    </StyledTypography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'Start'}} >
                <Button size="small">Подробнее</Button>
                </CardActions>
            </Box>
            <CardMedia
                component="img"
                alt={ building.title }
                image={ building.img }
            />
        </Box>

        </Card>
    )
}


export default BuildCard;