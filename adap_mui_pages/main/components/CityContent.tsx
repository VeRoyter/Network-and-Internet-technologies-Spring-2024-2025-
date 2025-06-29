import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CityData } from '../../CityData';
import CityCard from './CityCard';

function Content() {
  return (
    <Container maxWidth="lg" sx={{ pb: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {CityData.map((city, index) => (
          <Grid key={city.id} size={{ xs: 12, sm: 12, md: 6 }}>
            <CityCard city={city} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Content;
