import Navbar from "../components/Navbar";
import structures from "../data";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


const StyledTypography = styled(Typography)(({theme})=>({
    
    color: 'text.secondary',
    textAlign:'center',
    'p': {marginTop: "16px" }
  
}))

function Building() {
    let {id} = useParams() as { id: string };
    let i = parseInt(id);
     return (
        <Container maxWidth="xl">
 <div>
 <Navbar active="0"/>
 <Typography sx={{
    marginLeft:'2%'
 }}>
<Link to="/">
<Button variant="contained" color="info" size="medium">
            Главная
            </Button>
            </Link> &gt; {structures[i].title}
</Typography>
             <StyledTypography variant="h4">
             {structures[i].title}
             </StyledTypography>
             
             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia
        component="img"
        alt={ structures[i].title }
        image={ structures[i].img }
        sx={{
            maxWidth: '30%',
            height: 'auto',
        }}
        />
        </Box>
                <CardContent>
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap:'3%'


                }}>
                    <Box sx={{
                        width:'50%',
                        textAlign:'justify',
                    }}>
                    { structures[i].description[0]}
                    </Box>
                    <Box sx={{
                        width:'50%',
                        textAlign:'justify'

                    }}>
                    { structures[i].description[1]}
                    </Box>

                </Typography>
                </CardContent>


 </div>
 </Container>
 );
}
export default Building;