// components/CityCard.tsx
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CityProps {
  img: string;
  title: string;
  description: string;
  variant: 'A' | 'B';
}

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CityCard = ({ img, title, description, variant }: CityProps) => {
  if (variant === 'A') {
    return (
      <StyledCard>
        <CardMedia
          component="img"
          height="200"
          image={img}
          alt={title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" align="center">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button variant="outlined" size="small">
            Подробнее
          </Button>
        </Box>
      </StyledCard>
    );
  }

  // Вариант B
  return (
    <StyledCard>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <CardMedia
            component="img"
            height="200"
            image={img}
            alt={title}
            sx={{ height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography variant="h5" align="center" sx={{ p: 2 }}>
            {title}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="center">
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Button variant="outlined" size="small">
          Подробнее
        </Button>
      </Box>
    </StyledCard>
  );
};

export default CityCard;