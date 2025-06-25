import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { City } from '../CityData';

// Добавляем 'index' в интерфейс пропсов
interface CityCardProps {
  city: City;
  index: number;
}

function CityCard({ city, index }: CityCardProps) {
  // Определяем, является ли карточка первой в паре (индексы 0, 2, 4...).
  // Для них будет макет "картинка слева".
  const isFirstInPair = index % 2 !== 0;

  if (isFirstInPair) {
    return (
      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Верхняя часть: Картинка + Заголовок */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <CardMedia
            component="img"
            sx={{
              width: 350,
              height: 180,
              objectFit: 'contain', // Картинка не обрезается
              flexShrink: 0,
              alignSelf: 'center',
              p: 2,
            }}
            image={city.img}
            alt={city.title}
          />
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <Typography variant="h5" component="div">
              {city.title}
            </Typography>
          </CardContent>
        </Box>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {city.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'end'}} >
            <Button size="small">Подробнее</Button>
        </CardActions>

      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="240"
        image={city.img}
        alt={city.title}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <Typography variant="h5" component="div">
          {city.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {city.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end'}} >
            <Button size="small">Подробнее</Button>
        </CardActions>
    </Card>
  );
}

export default CityCard;
